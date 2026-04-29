import { useMemo, useState } from "react";
import { ArrowLeft, BookOpen, Check, Download, Heart, Lock, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { label: "Personalizás", icon: "🧸", text: "Elegí nombre, mundo y moraleja." },
  { label: "La IA genera", icon: "✨", text: "Creamos un cuento único en minutos." },
  { label: "Ves la preview", icon: "📖", text: "Revisás páginas con marca de agua." },
  { label: "Descargás", icon: "💛", text: "PDF imprimible al confirmar el pago." },
];

const coverExamples = [
  { title: "Luna y el bosque brillante", emoji: "🦊", tone: "cover-forest" },
  { title: "Mateo viaja a las estrellas", emoji: "🚀", tone: "cover-space" },
  { title: "Sofi y el castillo musical", emoji: "🏰", tone: "cover-castle" },
  { title: "Tomi descubre el mar", emoji: "🐳", tone: "cover-sea" },
];

const genders = ["Nena", "Nene", "Sin género"];
const sidekickTypes = ["Amigo/a", "Mascota", "Hermano/a", "Sin personaje"];
const worlds = ["Bosque", "Ciudad", "Espacio", "Mar", "Castillo"];
const themes = ["Amistad", "Valentía", "Honestidad", "Superación", "Compartir"];
const styles = [
  { name: "Acuarela", icon: "🎨", description: "Suave, artesanal y lleno de ternura." },
  { name: "Cartoon", icon: "✏️", description: "Expresivo, divertido y muy colorido." },
  { name: "Línea simple", icon: "📐", description: "Minimalista, claro y moderno." },
];

type View = "landing" | "form" | "preview";

type FormState = {
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

const defaultForm: FormState = {
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

const worldEmoji: Record<string, string> = {
  Bosque: "🌳",
  Ciudad: "🏙️",
  Espacio: "🚀",
  Mar: "🐳",
  Castillo: "🏰",
};

const optionBase = "rounded-full border px-4 py-3 text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const makeStoryPages = (form: FormState) => {
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

const FieldLabel = ({ children }: { children: string }) => (
  <label className="text-sm font-extrabold uppercase tracking-wide text-muted-foreground">{children}</label>
);

const SectionTitle = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div className="space-y-1">
    <p className="text-sm font-extrabold uppercase tracking-wide text-accent">{eyebrow}</p>
    <h2 className="text-2xl font-black text-foreground md:text-3xl">{title}</h2>
  </div>
);

const Index = () => {
  const [view, setView] = useState<View>("landing");
  const [form, setForm] = useState<FormState>(defaultForm);
  const storyPages = useMemo(() => makeStoryPages(form), [form]);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const chooseClass = (active: boolean) =>
    `${optionBase} ${active ? "border-primary bg-primary text-primary-foreground shadow-magic" : "border-border bg-card text-card-foreground hover:-translate-y-0.5 hover:border-accent hover:shadow-soft"}`;

  if (view === "preview") {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setView("form")} aria-label="Volver al formulario">
                <ArrowLeft />
              </Button>
              <div>
                <p className="text-sm font-bold text-muted-foreground">Preview de Cuentomío</p>
                <h1 className="text-xl font-black md:text-2xl">{form.bookTitle || "Mi cuento personalizado"}</h1>
              </div>
            </div>
            <Button variant="magic" size="lg">
              <Download /> Descargar — $1.000
            </Button>
          </div>
        </header>

        <section className="mx-auto max-w-6xl px-4 py-8 md:py-12">
          <div className="mb-8 rounded-[2rem] border border-accent/30 bg-accent-soft p-5 text-center font-bold text-accent-foreground shadow-soft">
            Esta es tu preview. Pagá $1.000 ARS para descargar el PDF sin marca de agua.
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="sticky top-32 h-fit overflow-hidden rounded-[2.5rem] bg-hero-gradient p-8 text-primary-foreground shadow-glow">
              <div className="absolute inset-0 bg-sparkle opacity-60" />
              <div className="relative flex min-h-[520px] flex-col items-center justify-center text-center">
                <div className="mb-8 animate-float rounded-[2rem] bg-primary-foreground/15 p-8 text-7xl shadow-soft backdrop-blur">
                  {worldEmoji[form.world]}
                </div>
                <p className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-accent">Cuentomío</p>
                <h2 className="text-4xl font-black leading-tight md:text-5xl">{form.bookTitle}</h2>
                <p className="mt-8 max-w-sm text-lg leading-relaxed text-primary-foreground/85">{form.dedication}</p>
              </div>
            </article>

            <div className="space-y-6">
              <div className="grid gap-3 rounded-[2rem] border border-border bg-card p-5 shadow-soft sm:grid-cols-3">
                <p><span className="font-black">Protagonista:</span> {form.protagonistName}</p>
                <p><span className="font-black">Mundo:</span> {form.world}</p>
                <p><span className="font-black">Estilo:</span> {form.illustrationStyle}</p>
              </div>

              {storyPages.map((page) => (
                <article key={page.title} className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-soft">
                  <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[140%] -translate-x-1/2 -translate-y-1/2 -rotate-12 text-center text-3xl font-black uppercase tracking-[0.35em] text-watermark">
                    CUENTOMÍO · PREVIEW
                  </div>
                  <div className="relative z-20 grid gap-6 md:grid-cols-[140px_1fr] md:items-center">
                    <div className="flex aspect-square items-center justify-center rounded-[2rem] bg-secondary text-6xl shadow-inner-soft">
                      {page.emoji}
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-black uppercase tracking-wide text-accent">{page.title}</p>
                      <p className="text-xl font-semibold leading-relaxed text-card-foreground">{page.text}</p>
                    </div>
                  </div>
                </article>
              ))}

              <article className="rounded-[2rem] border border-dashed border-primary/35 bg-primary-soft p-8 text-center shadow-soft">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-magic">
                  <Lock />
                </div>
                <h3 className="text-3xl font-black">7 páginas más te esperan</h3>
                <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Completá el pago para desbloquear el cuento completo, sin marca de agua y listo para imprimir.</p>
                <Button className="mt-6" variant="magic" size="lg">Pagar y descargar PDF</Button>
              </article>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (view === "form") {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border bg-background/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5">
            <button onClick={() => setView("landing")} className="flex items-center gap-3 rounded-full font-black text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-magic">C</span>
              Cuentomío
            </button>
            <p className="hidden text-sm font-bold text-muted-foreground sm:block">Preview gratis antes de pagar</p>
          </div>
        </header>

        <section className="mx-auto max-w-5xl px-4 py-10 md:py-14">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-sm font-black text-accent-foreground"><Sparkles className="size-4" /> Crear mi cuento</p>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">Personalizá una aventura única.</h1>
            <p className="mt-4 text-lg text-muted-foreground">Completá los detalles y generamos una preview completa para revisar antes de pagar.</p>
          </div>

          <form className="space-y-6" onSubmit={(event) => { event.preventDefault(); setView("preview"); }}>
            <section className="rounded-[2rem] border border-border bg-card p-6 shadow-soft md:p-8">
              <SectionTitle eyebrow="Sección 1" title="El protagonista" />
              <div className="mt-6 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
                <div className="space-y-2">
                  <FieldLabel>Nombre del protagonista</FieldLabel>
                  <input value={form.protagonistName} onChange={(e) => setField("protagonistName", e.target.value)} className="w-full rounded-2xl border border-input bg-background px-5 py-4 text-lg font-bold shadow-inner-soft outline-none transition focus:border-primary focus:ring-2 focus:ring-ring" placeholder="Ej: Luna" />
                </div>
                <div className="flex flex-wrap gap-3">
                  {genders.map((gender) => <button type="button" key={gender} onClick={() => setField("gender", gender)} className={chooseClass(form.gender === gender)}>{gender}</button>)}
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-border bg-card p-6 shadow-soft md:p-8">
              <SectionTitle eyebrow="Sección 2" title="Personaje secundario" />
              <div className="mt-6 flex flex-wrap gap-3">
                {sidekickTypes.map((type) => <button type="button" key={type} onClick={() => setField("sidekickType", type)} className={chooseClass(form.sidekickType === type)}>{type}</button>)}
              </div>
              {form.sidekickType !== "Sin personaje" && (
                <div className="mt-5 space-y-2">
                  <FieldLabel>Nombre del personaje secundario</FieldLabel>
                  <input value={form.sidekickName} onChange={(e) => setField("sidekickName", e.target.value)} className="w-full rounded-2xl border border-input bg-background px-5 py-4 text-lg font-bold shadow-inner-soft outline-none transition focus:border-primary focus:ring-2 focus:ring-ring" placeholder="Ej: Milo" />
                </div>
              )}
            </section>

            <section className="rounded-[2rem] border border-border bg-card p-6 shadow-soft md:p-8">
              <SectionTitle eyebrow="Sección 3" title="El mundo del cuento" />
              <div className="mt-6 space-y-5">
                <div className="space-y-3">
                  <FieldLabel>Escenario</FieldLabel>
                  <div className="flex flex-wrap gap-3">{worlds.map((world) => <button type="button" key={world} onClick={() => setField("world", world)} className={chooseClass(form.world === world)}>{worldEmoji[world]} {world}</button>)}</div>
                </div>
                <div className="space-y-3">
                  <FieldLabel>Tema o moraleja</FieldLabel>
                  <div className="flex flex-wrap gap-3">{themes.map((theme) => <button type="button" key={theme} onClick={() => setField("theme", theme)} className={chooseClass(form.theme === theme)}>{theme}</button>)}</div>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-border bg-card p-6 shadow-soft md:p-8">
              <SectionTitle eyebrow="Sección 4" title="Tu libro" />
              <div className="mt-6 grid gap-5">
                <div className="space-y-2">
                  <FieldLabel>Nombre del libro</FieldLabel>
                  <input value={form.bookTitle} onChange={(e) => setField("bookTitle", e.target.value)} className="w-full rounded-2xl border border-input bg-background px-5 py-4 text-lg font-bold shadow-inner-soft outline-none transition focus:border-primary focus:ring-2 focus:ring-ring" />
                </div>
                <div className="space-y-2">
                  <FieldLabel>Dedicatoria</FieldLabel>
                  <textarea value={form.dedication} onChange={(e) => setField("dedication", e.target.value)} className="min-h-32 w-full rounded-2xl border border-input bg-background px-5 py-4 text-lg font-semibold shadow-inner-soft outline-none transition focus:border-primary focus:ring-2 focus:ring-ring" />
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-border bg-card p-6 shadow-soft md:p-8">
              <SectionTitle eyebrow="Sección 5" title="Estilo de ilustración" />
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {styles.map((style) => (
                  <button type="button" key={style.name} onClick={() => setField("illustrationStyle", style.name)} className={`rounded-[2rem] border p-5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${form.illustrationStyle === style.name ? "-translate-y-1 border-primary bg-primary-soft shadow-magic" : "border-border bg-background hover:-translate-y-1 hover:shadow-soft"}`}>
                    <span className="text-4xl">{style.icon}</span>
                    <span className="mt-4 block text-xl font-black">{style.name}</span>
                    <span className="mt-2 block text-sm font-semibold text-muted-foreground">{style.description}</span>
                  </button>
                ))}
              </div>
            </section>

            <div className="rounded-[2rem] bg-hero-gradient p-6 text-center shadow-glow md:p-8">
              <Button type="submit" variant="sun" size="xl"><Wand2 /> Generar mi cuento ✨</Button>
              <p className="mt-4 font-bold text-primary-foreground/90">Vas a poder ver la preview completa antes de pagar</p>
            </div>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative min-h-screen pb-12">
        <div className="pointer-events-none absolute inset-0 bg-sparkle" />
        <div className="pointer-events-none absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
        <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 py-6">
          <div className="flex items-center gap-3 text-primary">
            <span className="flex size-12 items-center justify-center rounded-full bg-primary text-xl font-black text-primary-foreground shadow-magic">C</span>
            <div>
              <p className="text-2xl font-black">Cuentomío</p>
              <p className="hidden text-sm font-bold text-muted-foreground sm:block">El cuento con el nombre de tu hijo/a, listo en minutos</p>
            </div>
          </div>
          <Button variant="outlineMagic" onClick={() => setView("form")}>Crear mi cuento</Button>
        </header>

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 pt-8 lg:grid-cols-[1fr_0.86fr] lg:pt-16">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-sm font-black text-accent-foreground shadow-soft"><Sparkles className="size-4" /> Historias mágicas personalizadas</p>
            <h1 className="text-5xl font-black leading-[0.98] md:text-7xl">Un cuento único donde tu peque es protagonista.</h1>
            <p className="mt-6 max-w-2xl text-xl font-medium leading-relaxed text-muted-foreground">Creá en minutos un libro infantil personalizado, con preview antes de pagar y descarga inmediata en PDF imprimible.</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button variant="magic" size="xl" onClick={() => setView("form")}><BookOpen /> Crear mi cuento ahora</Button>
              <div className="rounded-2xl bg-card px-5 py-3 text-sm font-black text-card-foreground shadow-soft">$1.000 por libro · Descarga inmediata · Imprimible</div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="book-tilt overflow-hidden rounded-[2.75rem] bg-hero-gradient p-7 text-primary-foreground shadow-glow">
              <div className="absolute inset-0 bg-sparkle opacity-50" />
              <div className="relative flex min-h-[520px] flex-col justify-between rounded-[2rem] border border-primary-foreground/20 bg-primary-foreground/10 p-7 backdrop-blur-sm">
                <div className="flex justify-between text-sm font-black uppercase tracking-[0.22em]"><span>Cuentomío</span><span>PDF</span></div>
                <div className="text-center">
                  <div className="mb-8 inline-flex animate-float rounded-[2rem] bg-primary-foreground/15 p-8 text-8xl shadow-soft">🌙</div>
                  <h2 className="text-5xl font-black leading-none">Luna y el bosque brillante</h2>
                  <p className="mx-auto mt-6 max-w-xs text-lg text-primary-foreground/80">Una aventura sobre valentía, amistad y luces escondidas.</p>
                </div>
                <div className="flex items-center justify-between text-sm font-bold"><span>Para 4 a 8 años</span><span>10 páginas</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-section px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Cómo funciona" title="Cuatro pasos simples para crear magia" />
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {steps.map((step, index) => (
              <article key={step.label} className="rounded-[2rem] border border-border bg-card p-6 shadow-soft transition-transform duration-200 hover:-translate-y-1">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-4xl">{step.icon}</span>
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary-soft text-sm font-black text-primary">{index + 1}</span>
                </div>
                <h3 className="text-xl font-black">{step.label}</h3>
                <p className="mt-2 font-medium text-muted-foreground">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionTitle eyebrow="Ejemplos" title="Portadas listas para soñar" />
            <Button variant="magic" onClick={() => setView("form")}>Crear mi cuento ahora</Button>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {coverExamples.map((cover) => (
              <article key={cover.title} className={`${cover.tone} group min-h-[300px] overflow-hidden rounded-[2rem] p-5 text-primary-foreground shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-glow`}>
                <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-primary-foreground/20 bg-primary-foreground/10 p-5 backdrop-blur-sm">
                  <span className="text-6xl transition-transform duration-300 group-hover:scale-110">{cover.emoji}</span>
                  <div>
                    <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-primary-foreground/70">Cuentomío</p>
                    <h3 className="text-2xl font-black leading-tight">{cover.title}</h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-hero-gradient p-8 text-center text-primary-foreground shadow-glow md:p-12">
          <Heart className="mx-auto mb-4 size-10 text-accent" />
          <h2 className="text-4xl font-black md:text-5xl">Tu cuento personalizado está a minutos.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/85">Preview gratis, pago único de $1.000 ARS y descarga inmediata en PDF.</p>
          <Button className="mt-8" variant="sun" size="xl" onClick={() => setView("form")}><Check /> Empezar ahora</Button>
        </div>
      </section>
    </main>
  );
};

export default Index;
