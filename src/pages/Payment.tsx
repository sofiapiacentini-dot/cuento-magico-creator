import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FormState, View } from "@/lib/story";
import { worldEmoji } from "@/lib/story";

type Props = {
  form: FormState;
  isSaving: boolean;
  onPay: () => void;
  setView: (view: View) => void;
};

export default function Payment({ form, isSaving, onPay, setView }: Props) {
  return (
    <main className="min-h-screen bg-section px-4 py-8 text-foreground md:py-12">
      <section className="mx-auto max-w-3xl">
        <Button variant="ghost" onClick={() => setView("preview")}><ArrowLeft /> Volver a la preview</Button>
        <div className="mt-8 text-center">
          <p className="text-7xl">🎉</p>
          <h1 className="mt-4 text-4xl font-black md:text-6xl">Casi listo 🎉</h1>
          <p className="mt-4 text-xl font-semibold text-muted-foreground">Pagá y descargá tu cuento en segundos</p>
        </div>

        <article className="mt-8 rounded-[2.5rem] border border-border bg-card p-6 shadow-glow md:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex size-24 shrink-0 items-center justify-center rounded-[2rem] bg-primary-soft text-6xl shadow-inner-soft">{worldEmoji[form.world]}</div>
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-accent">Resumen del cuento</p>
              <h2 className="mt-1 text-3xl font-black">{form.bookTitle}</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-4 rounded-[2rem] bg-secondary p-5 sm:grid-cols-3">
            <p><span className="block text-xs font-black uppercase tracking-wide text-muted-foreground">Estilo</span><span className="font-black">{form.illustrationStyle}</span></p>
            <p><span className="block text-xs font-black uppercase tracking-wide text-muted-foreground">Escenario</span><span className="font-black">{form.world}</span></p>
            <p><span className="block text-xs font-black uppercase tracking-wide text-muted-foreground">Tema</span><span className="font-black">{form.theme}</span></p>
          </div>
          <div className="mt-6 flex items-center justify-between rounded-[2rem] border border-accent/30 bg-accent-soft p-5">
            <span className="text-lg font-black">Total</span>
            <span className="text-3xl font-black text-accent-foreground">$1.000 ARS</span>
          </div>
          <Button className="mt-8 w-full bg-blue-500 text-white hover:bg-blue-600" size="xl" onClick={onPay} disabled={isSaving}>{isSaving ? "Guardando..." : "Pagar con Mercado Pago"}</Button>
          <p className="mt-5 flex items-center justify-center gap-2 text-center text-sm font-bold text-muted-foreground"><ShieldCheck className="size-4 text-primary" /> Pago 100% seguro · Tu PDF se descarga inmediatamente</p>
        </article>
      </section>
    </main>
  );
}
