import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Download, Lock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import type { FormState, StoryPage, View } from "@/lib/story";
import { worldEmoji } from "@/lib/story";

type Props = {
  form: FormState;
  storyPages: StoryPage[];
  setView: (view: View) => void;
};

export default function Preview({ form, storyPages, setView }: Props) {
  const [generatedPages, setGeneratedPages] = useState<StoryPage[]>([]);
  const [isGenerating, setIsGenerating] = useState(true);
  const [hasError, setHasError] = useState(false);
  const requestBody = useMemo(
    () => ({
      protagonistName: form.protagonistName,
      gender: form.gender,
      sidekickType: form.sidekickType,
      sidekickName: form.sidekickName,
      world: form.world,
      theme: form.theme,
      illustrationStyle: form.illustrationStyle,
    }),
    [form.protagonistName, form.gender, form.sidekickType, form.sidekickName, form.world, form.theme, form.illustrationStyle],
  );

  const loadStory = async () => {
    setIsGenerating(true);
    setHasError(false);

    const { data, error } = await supabase.functions.invoke<Array<{ title: string; text: string }>>("generate-story", {
      body: requestBody,
    });

    if (error || !data) {
      setGeneratedPages([]);
      setHasError(true);
      setIsGenerating(false);
      return;
    }

    setGeneratedPages(
      data.map((page, index) => ({
        ...page,
        emoji: storyPages[index]?.emoji ?? "🌟",
      })),
    );
    setIsGenerating(false);
  };

  useEffect(() => {
    loadStory();
  }, [requestBody]);

  const pagesToShow = generatedPages.length ? generatedPages : storyPages;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setView("form")} aria-label="Volver al formulario"><ArrowLeft /></Button>
            <div><p className="text-sm font-bold text-muted-foreground">Preview de Cuentomío</p><h1 className="text-xl font-black md:text-2xl">{form.bookTitle || "Mi cuento personalizado"}</h1></div>
          </div>
          <Button variant="magic" size="lg" onClick={() => setView("payment")}><Download /> Descargar — $1.000</Button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="mb-8 rounded-[2rem] border border-accent/30 bg-accent-soft p-5 text-center font-bold text-accent-foreground shadow-soft">Esta es tu preview. Pagá $1.000 ARS para descargar el PDF sin marca de agua.</div>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="sticky top-32 h-fit overflow-hidden rounded-[2.5rem] bg-hero-gradient p-8 text-primary-foreground shadow-glow">
            <div className="absolute inset-0 bg-sparkle opacity-60" />
            <div className="relative flex min-h-[520px] flex-col items-center justify-center text-center">
              <div className="mb-8 animate-float rounded-[2rem] bg-primary-foreground/15 p-8 text-7xl shadow-soft backdrop-blur">{worldEmoji[form.world]}</div>
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

            {isGenerating ? (
              Array.from({ length: 3 }).map((_, index) => (
                <article key={index} className="overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-soft">
                  <div className="grid gap-6 md:grid-cols-[140px_1fr] md:items-center">
                    <Skeleton className="aspect-square rounded-[2rem]" />
                    <div className="space-y-4">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-11/12" />
                      <Skeleton className="h-5 w-4/5" />
                    </div>
                  </div>
                </article>
              ))
            ) : hasError ? (
              <article className="rounded-[2rem] border border-dashed border-primary/35 bg-primary-soft p-8 text-center shadow-soft">
                <h3 className="text-2xl font-black">No pudimos generar el cuento, intentá de nuevo</h3>
                <Button className="mt-6" variant="magic" size="lg" onClick={loadStory}><RefreshCw /> Reintentar</Button>
              </article>
            ) : (
              pagesToShow.map((page) => (
                <article key={page.title} className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-soft">
                  <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[140%] -translate-x-1/2 -translate-y-1/2 -rotate-12 text-center text-3xl font-black uppercase tracking-[0.35em] text-watermark">CUENTOMÍO · PREVIEW</div>
                  <div className="relative z-20 grid gap-6 md:grid-cols-[140px_1fr] md:items-center">
                    <div className="flex aspect-square items-center justify-center rounded-[2rem] bg-secondary text-6xl shadow-inner-soft">{page.emoji}</div>
                    <div><p className="mb-2 text-sm font-black uppercase tracking-wide text-accent">{page.title}</p><p className="text-xl font-semibold leading-relaxed text-card-foreground">{page.text}</p></div>
                  </div>
                </article>
              ))
            )}

            <article className="rounded-[2rem] border border-dashed border-primary/35 bg-primary-soft p-8 text-center shadow-soft">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-magic"><Lock /></div>
              <h3 className="text-3xl font-black">7 páginas más te esperan</h3>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Completá el pago para desbloquear el cuento completo, sin marca de agua y listo para imprimir.</p>
              <Button className="mt-6" variant="magic" size="lg" onClick={() => setView("payment")}>Pagar y descargar PDF</Button>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
