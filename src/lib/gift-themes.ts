export function giftTheme(occasion: string) {
  switch (occasion) {
    case "Birthday":
      return {
        id: "birthday",
        label: "A birthday worth remembering",
        note: "Another year. A little more you.",
        motif: "stars",
      };
    case "Anniversary":
      return {
        id: "anniversary",
        label: "For all the years, and all the little things",
        note: "Your kind of love. On repeat.",
        motif: "orbits",
      };
    case "Wedding":
      return {
        id: "wedding",
        label: "The beginning of your next chapter",
        note: "A song to keep coming back to.",
        motif: "botanical",
      };
    case "Apology / reconnection":
      return {
        id: "reconnection",
        label: "Some things are easier to say in a song",
        note: "Take a moment. This one is for you.",
        motif: "botanical",
      };
    case "Just because":
      return {
        id: "just-because",
        label: "No occasion needed",
        note: "You were on someone’s mind.",
        motif: "orbits",
      };
    default:
      return {
        id: "other",
        label: "A little something, made just for you",
        note: "Some things deserve a song.",
        motif: "stars",
      };
  }
}
