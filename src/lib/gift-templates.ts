export const giftTemplates = [
  { id: "record", name: "Note", description: "A personal note and photo" },
  {
    id: "portrait",
    name: "Card",
    description: "A framed photo and dedication",
  },
  {
    id: "letter",
    name: "Letter",
    description: "Your message on layered stationery",
  },
] as const;
export type GiftTemplate = (typeof giftTemplates)[number]["id"];
export function giftTemplate(value: unknown): GiftTemplate {
  return giftTemplates.find((t) => t.id === value)?.id ?? "record";
}

export const giftScenes = [
  { id: "record", name: "Record Player" },
  { id: "teddy", name: "Teddy Bear" },
  { id: "equalizer", name: "Equalizer" },
] as const;
export type GiftScene = (typeof giftScenes)[number]["id"];
export function giftScene(value: unknown): GiftScene {
  return giftScenes.find((scene) => scene.id === value)?.id ?? "record";
}
