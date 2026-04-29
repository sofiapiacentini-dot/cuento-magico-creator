import type { User } from "@supabase/supabase-js";
import { Link } from "react-router-dom";
import { BookOpen, Check, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { View } from "@/lib/story";

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

const SectionTitle = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div className="space-y-1">
    <p className="text-sm font-extrabold uppercase tracking-wide text-accent">{eyebrow}</p>
    <h2 className="text-2xl font-black text-foreground md:text-3xl">{title}</h2>
  </div>
);

export default function Landing({ setView, user }: { setView: (view: View) => void; user: User | null }) {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative min-h-screen pb-12">
        <div className="pointer-events-none absolute inset-0 bg-sparkle" />
        <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 py-6">
          <div className="flex items-center gap-3 text-primary">
            <span className="flex size-12 items-center justify-center rounded-full bg-primary text-xl font-black text-primary-foreground shadow-magic">C</span>
            <div>
              <p className="text-2xl font-black">Cuentomío</p>
              <p className="hidden text-sm font-bold text-muted-foreground sm:block">El cuento con el nombre de tu hijo/a, listo en minutos</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {user && <Button asChild variant="outlineMagic"><Link to="/mis-cuentos">Mis cuentos</Link></Button>}
            <Button variant="outlineMagic" onClick={() => setView("form")}>Crear mi cuento</Button>
          </div>
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
}
