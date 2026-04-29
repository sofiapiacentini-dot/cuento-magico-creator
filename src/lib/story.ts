export type View = "landing" | "form" | "preview" | "payment" | "success";

export type FormState = {
  protagonistName: string;
  gender: string;
  sidekickType: string;
  sidekickName: string;
  world: string;
  theme: string;
  bookTitle: string;
  dedication: string;
  illustrationStyle: string;
};

export type StoryPage = {
  title: string;
  emoji: string;
  text: string;
};

export type StoryRow = {
  id: string;
  created_at: string;
  world: string;
  book_title: string;
  illustration_style: string;
};

export const defaultForm: FormState = {
  protagonistName: "Luna",
  gender: "Nena",
  sidekickType: "Mascota",
  sidekickName: "Milo",
  world: "Bosque",
  theme: "Valentía",
  bookTitle: "Luna y el secreto de las luciérnagas",
  dedication: "Para que nunca olvides que tu imaginación puede iluminar cualquier camino.",
  illustrationStyle: "Acuarela",
};

export const worldEmoji: Record<string, string> = {
  Bosque: "🌳",
  Ciudad: "🏙️",
  Espacio: "🚀",
  Mar: "🐳",
  Castillo: "🏰",
};

export const makeStoryPages = (form: FormState): StoryPage[] => {
  const hero = form.protagonistName || "Luna";
  const friend = form.sidekickType !== "Sin personaje" ? form.sidekickName || "Milo" : "su voz interior";
  const place = form.world.toLowerCase();
  const lesson = form.theme.toLowerCase();

  return [
    {
      title: "Página 1",
      emoji: worldEmoji[form.world],
      text: `${hero} despertó con una cosquilla de aventura. En el ${place}, algo brillaba como si una estrella se hubiera escondido entre los caminos.`,
    },
    {
      title: "Página 2",
      emoji: form.sidekickType === "Mascota" ? "🐶" : "🤝",
      text: `Junto a ${friend}, ${hero} siguió pequeñas señales doradas. Cada paso pedía un poquito de ${lesson}, y cada duda se volvía más chiquita.`,
    },
    {
      title: "Página 3",
      emoji: "🌟",
      text: `Cuando el camino se oscureció, ${hero} respiró profundo y recordó que los corazones valientes también sienten miedo. Entonces una puerta mágica se abrió.`,
    },
  ];
};

export const toStoryInsert = (form: FormState, storyId: string, email?: string | null) => ({
  id: storyId,
  protagonist_name: form.protagonistName,
  gender: form.gender,
  sidekick_type: form.sidekickType,
  sidekick_name: form.sidekickType === "Sin personaje" ? null : form.sidekickName,
  world: form.world,
  theme: form.theme,
  book_title: form.bookTitle,
  dedication: form.dedication,
  illustration_style: form.illustrationStyle,
  paid: false,
  user_email: email ?? null,
});
