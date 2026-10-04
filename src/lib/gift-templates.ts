export const giftTemplates = [
  { id: "portrait", name: "Photo", description: "Your photo in the spotlight" },
  { id: "record", name: "Record", description: "A sleeve and vinyl record" },
  {
    id: "letter",
    name: "Letter",
    description: "A personal note on warm paper",
  },
] as const;
export type GiftTemplate = (typeof giftTemplates)[number]["id"];
export function giftTemplate(value: unknown): GiftTemplate {
  return giftTemplates.find((t) => t.id === value)?.id ?? "portrait";
}
