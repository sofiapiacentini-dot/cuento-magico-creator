import { FormEvent, useState } from "react";
import { Check, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import type { View } from "@/lib/story";

type Props = {
  email: string;
  isSendingLink: boolean;
  onSaveEmail: (email: string) => Promise<void>;
  setView: (view: View) => void;
};

export default function Success({ email, isSendingLink, onSaveEmail, setView }: Props) {
  const [value, setValue] = useState(email);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await onSaveEmail(value);
  };

  return (
    <main className="min-h-screen bg-section px-4 py-10 text-foreground md:py-16">
      <section className="mx-auto max-w-2xl text-center">
        <div className="mx-auto flex size-28 animate-bounce items-center justify-center rounded-full bg-success text-success-foreground shadow-glow">
          <Check className="size-14" />
        </div>
        <h1 className="mt-8 text-4xl font-black md:text-6xl">¡Tu cuento está listo!</h1>
        <p className="mt-4 text-xl font-semibold text-muted-foreground">El pago se acreditó. Podés descargar tu PDF ahora.</p>
        <p className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-card px-5 py-3 font-bold text-card-foreground shadow-soft"><Mail className="size-4 text-primary" /> También te enviamos el link a tu email</p>

        <Button className="mt-8 w-full sm:w-auto" variant="magic" size="xl" onClick={() => toast({ title: "Próximamente" })}><Download /> Descargar mi cuento en PDF</Button>

        <section className="mt-8 rounded-[2rem] border border-border bg-card p-6 text-left shadow-soft md:p-8">
          <h2 className="text-2xl font-black">¿Querés guardar este cuento?</h2>
          <p className="mt-2 font-medium text-muted-foreground">Te mandamos un magic link para acceder después a tus cuentos.</p>
          <form className="mt-5 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
            <input value={value} onChange={(event) => setValue(event.target.value)} type="email" required placeholder="tu@email.com" className="min-h-14 flex-1 rounded-full border border-input bg-background px-5 font-bold shadow-inner-soft outline-none transition focus:border-primary focus:ring-2 focus:ring-ring" />
            <Button type="submit" variant="sun" size="lg" disabled={isSendingLink}>{isSendingLink ? "Enviando..." : "Guardar con mi email"}</Button>
          </form>
        </section>

        <button className="mt-8 font-black text-primary underline-offset-4 hover:underline" onClick={() => setView("form")}>Crear otro cuento</button>
      </section>
    </main>
  );
}
