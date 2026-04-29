import { FormEvent, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Check, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { makeStoryPages, worldEmoji, type FormState, type View } from "@/lib/story";

type Props = {
  email: string;
  form: FormState;
  generatedPages: Array<{ title: string; text: string }>;
  isSendingLink: boolean;
  onSaveEmail: (email: string) => Promise<void>;
  setView: (view: View) => void;
};

export default function Success({ email, form, generatedPages, isSendingLink, onSaveEmail, setView }: Props) {
  const [value, setValue] = useState(email);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);
  const fallbackPages = makeStoryPages(form).map(({ title, text }) => ({ title, text }));
  const pagesForPdf = generatedPages.length ? generatedPages : fallbackPages;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await onSaveEmail(value);
  };

  const handleDownloadPdf = async () => {
    if (!pdfRef.current) return;

    setIsGeneratingPdf(true);
    const content = pdfRef.current;
    const previousDisplay = content.style.display;

    try {
      content.style.display = "block";
      await document.fonts?.ready;

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfPages = Array.from(content.querySelectorAll<HTMLElement>("[data-pdf-page]"));

      for (const [index, page] of pdfPages.entries()) {
        const canvas = await html2canvas(page, { backgroundColor: "#ffffff", scale: 2, useCORS: true });
        const image = canvas.toDataURL("image/jpeg", 0.95);
        if (index > 0) pdf.addPage();
        pdf.addImage(image, "JPEG", 0, 0, 210, 297);
      }

      const filename = `${(form.bookTitle || "Mi cuento").trim().replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+/g, "-").replace(/^-+|-+$/g, "") || "cuento"}.pdf`;
      pdf.save(filename);
    } catch (error) {
      toast({ title: "No pudimos generar el PDF", description: "Intentá descargarlo de nuevo." });
    } finally {
      content.style.display = previousDisplay;
      setIsGeneratingPdf(false);
    }
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

        <Button className="mt-8 w-full sm:w-auto" variant="magic" size="xl" onClick={handleDownloadPdf} disabled={isGeneratingPdf}>
          <Download /> {isGeneratingPdf ? "Generando PDF..." : "Descargar mi cuento en PDF"}
        </Button>

        <div ref={pdfRef} style={{ display: "none", position: "absolute", left: "-10000px", top: 0, width: "794px" }}>
          <section data-pdf-page style={{ width: "794px", height: "1123px", padding: "72px", boxSizing: "border-box", background: "linear-gradient(135deg, #3f1d85 0%, #6C3FC4 58%, #9b7be6 100%)", color: "#ffffff", fontFamily: "Inter, Arial, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div style={{ fontSize: "120px", marginBottom: "56px" }}>{worldEmoji[form.world]}</div>
            <h2 style={{ margin: 0, fontSize: "54px", lineHeight: 1.15, fontWeight: 900 }}>{form.bookTitle || "Mi cuento personalizado"}</h2>
            <p style={{ margin: "48px 0 0", maxWidth: "560px", fontSize: "24px", lineHeight: 1.55, fontWeight: 600 }}>{form.dedication}</p>
          </section>

          {pagesForPdf.map((page, index) => (
            <section key={`${page.title}-${index}`} data-pdf-page style={{ width: "794px", height: "1123px", padding: "72px", boxSizing: "border-box", background: "#ffffff", fontFamily: "Inter, Arial, sans-serif" }}>
              <div style={{ minHeight: "979px", border: "2px solid #eeeaf8", borderRadius: "32px", padding: "56px", boxSizing: "border-box" }}>
                <p style={{ margin: "0 0 40px", color: "#777777", fontSize: "14px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" }}>Página {index + 1}</p>
                <p style={{ margin: 0, color: "#111111", fontSize: "18px", lineHeight: 1.8, fontWeight: 500 }}>{page.text}</p>
              </div>
            </section>
          ))}
        </div>

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
