import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, rgb, type PDFFont } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { ClientError } from "./beta-http";
export type KeepsakeContent = {
  recipient: string;
  title: string;
  lyrics: string;
};
const fontFile = path.join(
  process.cwd(),
  "src/assets/fonts/cormorant-garamond-regular.ttf",
);
const xml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
function wrap(text: string, font: PDFFont, size: number, width: number) {
  const lines: string[] = [];
  for (const paragraph of text.split("\n")) {
    if (!paragraph.trim()) {
      lines.push("");
      continue;
    }
    let line = "";
    for (const word of paragraph.trim().split(/\s+/)) {
      if (font.widthOfTextAtSize(word, size) > width)
        throw new ClientError(
          "A word in these lyrics is too long for the print. Your song is still available.",
          409,
        );
      const next = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(next, size) > width) {
        lines.push(line);
        line = word;
      } else line = next;
    }
    if (line) lines.push(line);
  }
  return lines;
}
export async function buildKeepsake(content: KeepsakeContent) {
  const fontBytes = await readFile(fontFile);
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const font = await doc.embedFont(fontBytes, { subset: true });
  const page = doc.addPage([576, 720]);
  const clean = (s: string) =>
    s
      .replace(/\r/g, "")
      .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "")
      .trim();
  const recipient = clean(content.recipient),
    title = clean(content.title);
  const lyrics = clean(content.lyrics)
    .replace(/^\s*\[[^\]\n]*\]\s*$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  if (!lyrics)
    throw new ClientError(
      "This version doesn’t have printable lyrics yet. Choose another version.",
      409,
    );
  const chars = new Set(font.getCharacterSet());
  if (
    [...`${recipient}${title}${lyrics}`].some(
      (c) => c !== "\n" && !chars.has(c.codePointAt(0)!),
    )
  )
    throw new ClientError(
      "These lyrics need a different lettering style before we can offer the print. Your song and downloads are still available.",
      409,
    );
  const ink = rgb(0.12, 0.2, 0.23),
    gold = rgb(0.63, 0.48, 0.27),
    paper = rgb(0.99, 0.97, 0.92);
  page.drawRectangle({ x: 0, y: 0, width: 576, height: 720, color: paper });
  page.drawRectangle({
    x: 22,
    y: 22,
    width: 532,
    height: 676,
    borderWidth: 0.8,
    borderColor: gold,
  });
  page.drawRectangle({
    x: 27,
    y: 27,
    width: 522,
    height: 666,
    borderWidth: 0.25,
    borderColor: gold,
  });
  const elements: string[] = [
    `<rect width="576" height="720" fill="#fcf7eb"/><rect x="22" y="22" width="532" height="676" fill="none" stroke="#a17a45" stroke-width=".8"/><rect x="27" y="27" width="522" height="666" fill="none" stroke="#a17a45" stroke-width=".25"/>`,
  ];
  function line(x1: number, y: number, x2: number) {
    page.drawLine({
      start: { x: x1, y: 720 - y },
      end: { x: x2, y: 720 - y },
      thickness: 0.5,
      color: gold,
    });
    elements.push(
      `<path d="M${x1} ${y}H${x2}" stroke="#a17a45" stroke-width=".5"/>`,
    );
  }
  function text(
    value: string,
    x: number,
    y: number,
    size: number,
    center = false,
    light = false,
  ) {
    const left = center ? x - font.widthOfTextAtSize(value, size) / 2 : x;
    page.drawText(value, {
      x: left,
      y: 720 - y,
      size,
      font,
      color: light ? gold : ink,
    });
    elements.push(
      `<text x="${left.toFixed(3)}" y="${y}" font-size="${size}" fill="${light ? "#a17a45" : "#1f333b"}">${xml(value)}</text>`,
    );
  }
  text("A STORY ONLY YOU COULD TELL", 288, 63, 10, true, true);
  let recipientSize = 31;
  while (
    font.widthOfTextAtSize(`For ${recipient}`, recipientSize) > 460 &&
    recipientSize > 17
  )
    recipientSize--;
  if (font.widthOfTextAtSize(`For ${recipient}`, recipientSize) > 460)
    throw new ClientError(
      "This recipient name is too long for the print. Your song and gift page are still available.",
      409,
    );
  text(`For ${recipient}`, 288, 105, recipientSize, true);
  let titleSize = 23;
  let titleLines = wrap(title, font, titleSize, 460);
  while (titleLines.length > 2 && titleSize > 15) {
    titleSize--;
    titleLines = wrap(title, font, titleSize, 460);
  }
  if (titleLines.length > 2)
    throw new ClientError("The song title is too long for this print.", 409);
  titleLines.forEach((s, i) =>
    text(s, 288, 139 + i * (titleSize + 3), titleSize, true),
  );
  const start = 177 + (titleLines.length - 1) * (titleSize + 3);
  line(243, start - 14, 333);
  const availableHeight = 638 - start;
  let size = 15,
    columns = 1,
    lines = wrap(lyrics, font, size, 450);
  while (lines.length * size * 1.32 > availableHeight && size > 12) {
    size -= 0.5;
    lines = wrap(lyrics, font, size, 450);
  }
  if (lines.length * size * 1.32 > availableHeight) {
    columns = 2;
    size = 12;
    lines = wrap(lyrics, font, size, 218);
    while (
      Math.ceil(lines.length / 2) * size * 1.32 > availableHeight &&
      size > 9
    ) {
      size -= 0.5;
      lines = wrap(lyrics, font, size, 218);
    }
  }
  if (Math.ceil(lines.length / columns) * size * 1.32 > availableHeight)
    throw new ClientError(
      "These lyrics are too long for an 8 × 10 print. Your full song and lyrics are still yours to keep.",
      409,
    );
  const perColumn = Math.ceil(lines.length / columns);
  lines.forEach((s, i) => {
    if (!s) return;
    const col = Math.floor(i / perColumn),
      row = i % perColumn;
    text(
      s,
      columns === 1 ? 288 : 58 + col * 242,
      start + row * size * 1.32,
      size,
      columns === 1,
    );
  });
  line(223, 662, 353);
  text("YOUR SONG", 288, 682, 11, true, true);
  doc.setTitle(`${title} | Your Song lyric keepsake`);
  doc.setAuthor("The Gift Smith");
  doc.setSubject("Personalized 8 × 10 inch lyric print");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="576" height="720" viewBox="0 0 576 720"><defs><style>@font-face{font-family:Keepsake;src:url(data:font/ttf;base64,${fontBytes.toString("base64")})}text{font-family:Keepsake,Georgia,serif}</style></defs>${elements.join("")}<g transform="translate(288 382) rotate(-28)"><text text-anchor="middle" fill="#a17a45" opacity=".22" font-size="53">YOUR KEEPSAKE PREVIEW</text></g></svg>`;
  return { pdf: await doc.save(), svg };
}
