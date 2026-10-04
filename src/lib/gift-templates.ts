export const giftTemplates = [
  { id: "record", name: "Record", description: "The original record room" },
  { id: "portrait", name: "Photo", description: "A framed photo and walnut player" },
  {
    id: "letter",
    name: "Letter",
    description: "Layered stationery and a walnut player",
  },
] as const;
export type GiftTemplate = (typeof giftTemplates)[number]["id"];
export function giftTemplate(value: unknown): GiftTemplate {
  return giftTemplates.find((t) => t.id === value)?.id ?? "record";
}
