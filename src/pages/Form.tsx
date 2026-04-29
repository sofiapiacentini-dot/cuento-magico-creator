import { Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FormState, View } from "@/lib/story";
import { worldEmoji } from "@/lib/story";

const genders = ["Nena", "Nene", "Sin género"];
const sidekickTypes = ["Amigo/a", "Mascota", "Hermano/a", "Sin personaje"];
const worlds = ["Bosque", "Ciudad", "Espacio", "Mar", "Castillo"];
const themes = ["Amistad", "Valentía", "Honestidad", "Superación", "Compartir"];
const styles = [
  { name: "Acuarela", icon: "🎨", description: "Suave, artesanal y lleno de ternura." },
  { name: "Cartoon", icon: "✏️", description: "Expresivo, divertido y muy colorido." },
  { name: "Línea simple", icon: "📐", description: "Minimalista, claro y moderno." },
];

const optionBase = "rounded-full border px-4 py-3 text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const FieldLabel = ({ children }: { children: string }) => <label className="text-sm font-extrabold uppercase tracking-wide text-muted-foreground">{children}</label>;
const SectionTitle = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div className="space-y-1"><p className="text-sm font-extrabold uppercase tracking-wide text-accent">{eyebrow}</p><h2 className="text-2xl font-black text-foreground md:text-3xl">{title}</h2></div>
);

type Props = {
  form: FormState;
  setField: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  setView: (view: View) => void;
};

export default function Form({ form, setField, setView }: Props) {
  const chooseClass = (active: boolean) => `${optionBase} ${active ? "border-primary bg-primary text-primary-foreground shadow-magic" : "border-border bg-card text-card-foreground hover:-translate-y-0.5 hover:border-accent hover:shadow-soft"}`;

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
              <div className="space-y-2"><FieldLabel>Nombre del protagonista</FieldLabel><input value={form.protagonistName} onChange={(e) => setField("protagonistName", e.target.value)} className="w-full rounded-2xl border border-input bg-background px-5 py-4 text-lg font-bold shadow-inner-soft outline-none transition focus:border-primary focus:ring-2 focus:ring-ring" placeholder="Ej: Luna" /></div>
              <div className="flex flex-wrap gap-3">{genders.map((gender) => <button type="button" key={gender} onClick={() => setField("gender", gender)} className={chooseClass(form.gender === gender)}>{gender}</button>)}</div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-border bg-card p-6 shadow-soft md:p-8">
            <SectionTitle eyebrow="Sección 2" title="Personaje secundario" />
            <div className="mt-6 flex flex-wrap gap-3">{sidekickTypes.map((type) => <button type="button" key={type} onClick={() => setField("sidekickType", type)} className={chooseClass(form.sidekickType === type)}>{type}</button>)}</div>
            {form.sidekickType !== "Sin personaje" && <div className="mt-5 space-y-2"><FieldLabel>Nombre del personaje secundario</FieldLabel><input value={form.sidekickName} onChange={(e) => setField("sidekickName", e.target.value)} className="w-full rounded-2xl border border-input bg-background px-5 py-4 text-lg font-bold shadow-inner-soft outline-none transition focus:border-primary focus:ring-2 focus:ring-ring" placeholder="Ej: Milo" /></div>}
          </section>

          <section className="rounded-[2rem] border border-border bg-card p-6 shadow-soft md:p-8">
            <SectionTitle eyebrow="Sección 3" title="El mundo del cuento" />
            <div className="mt-6 space-y-5">
              <div className="space-y-3"><FieldLabel>Escenario</FieldLabel><div className="flex flex-wrap gap-3">{worlds.map((world) => <button type="button" key={world} onClick={() => setField("world", world)} className={chooseClass(form.world === world)}>{worldEmoji[world]} {world}</button>)}</div></div>
              <div className="space-y-3"><FieldLabel>Tema o moraleja</FieldLabel><div className="flex flex-wrap gap-3">{themes.map((theme) => <button type="button" key={theme} onClick={() => setField("theme", theme)} className={chooseClass(form.theme === theme)}>{theme}</button>)}</div></div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-border bg-card p-6 shadow-soft md:p-8">
            <SectionTitle eyebrow="Sección 4" title="Tu libro" />
            <div className="mt-6 grid gap-5">
              <div className="space-y-2"><FieldLabel>Nombre del libro</FieldLabel><input value={form.bookTitle} onChange={(e) => setField("bookTitle", e.target.value)} className="w-full rounded-2xl border border-input bg-background px-5 py-4 text-lg font-bold shadow-inner-soft outline-none transition focus:border-primary focus:ring-2 focus:ring-ring" /></div>
              <div className="space-y-2"><FieldLabel>Dedicatoria</FieldLabel><textarea value={form.dedication} onChange={(e) => setField("dedication", e.target.value)} className="min-h-32 w-full rounded-2xl border border-input bg-background px-5 py-4 text-lg font-semibold shadow-inner-soft outline-none transition focus:border-primary focus:ring-2 focus:ring-ring" /></div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-border bg-card p-6 shadow-soft md:p-8">
            <SectionTitle eyebrow="Sección 5" title="Estilo de ilustración" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {styles.map((style) => <button type="button" key={style.name} onClick={() => setField("illustrationStyle", style.name)} className={`rounded-[2rem] border p-5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${form.illustrationStyle === style.name ? "-translate-y-1 border-primary bg-primary-soft shadow-magic" : "border-border bg-background hover:-translate-y-1 hover:shadow-soft"}`}><span className="text-4xl">{style.icon}</span><span className="mt-4 block text-xl font-black">{style.name}</span><span className="mt-2 block text-sm font-semibold text-muted-foreground">{style.description}</span></button>)}
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
