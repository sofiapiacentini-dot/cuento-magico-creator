import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import Landing from "./Landing";
import Form from "./Form";
import Preview from "./Preview";
import Payment from "./Payment";
import Success from "./Success";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { defaultForm, makeStoryPages, toStoryInsert, type FormState, type View } from "@/lib/story";

const Index = () => {
  const [view, setView] = useState<View>("landing");
  const [form, setForm] = useState<FormState>(defaultForm);
  const [storyId, setStoryId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSendingLink, setIsSendingLink] = useState(false);
  const [generatedPages, setGeneratedPages] = useState<Array<{ title: string; text: string }>>([]);
  const storyPages = useMemo(() => makeStoryPages(form), [form]);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    return () => listener.subscription.unsubscribe();
  }, []);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handlePay = async () => {
    setIsSaving(true);
    const nextStoryId = storyId ?? crypto.randomUUID();
    const userEmail = user?.email ?? null;

    const { error: insertError } = await supabase
      .from("stories")
      .insert(toStoryInsert(form, nextStoryId, userEmail));

    if (insertError) {
      setIsSaving(false);
      toast({ title: "No pudimos guardar el cuento", description: insertError.message });
      return;
    }

    const { error: updateError } = await supabase
      .from("stories")
      .update({ paid: true, user_email: userEmail })
      .eq("id", nextStoryId);

    setIsSaving(false);

    if (updateError) {
      toast({ title: "El pago se simuló, pero faltó actualizar el cuento", description: updateError.message });
      return;
    }

    setStoryId(nextStoryId);
    setView("success");
  };

  const handleSaveEmail = async (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return;

    setIsSendingLink(true);
    if (storyId) {
      await supabase.from("stories").update({ user_email: cleanEmail }).eq("id", storyId);
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: cleanEmail,
      options: { emailRedirectTo: `${window.location.origin}/mis-cuentos` },
    });

    setIsSendingLink(false);

    if (error) {
      toast({ title: "No pudimos enviar el magic link", description: error.message });
      return;
    }

    toast({ title: "Magic link enviado", description: "Revisá tu email para acceder a tus cuentos." });
  };

  const goToView = (nextView: View) => {
    if (nextView === "form") {
      setStoryId(null);
    }
    setView(nextView);
  };

  if (view === "form") return <Form form={form} setField={setField} setView={goToView} />;
  if (view === "preview") return <Preview form={form} storyPages={storyPages} setGeneratedPages={setGeneratedPages} setView={goToView} />;
  if (view === "payment") return <Payment form={form} isSaving={isSaving} onPay={handlePay} setView={goToView} />;
  if (view === "success") return <Success email={user?.email ?? ""} form={form} generatedPages={generatedPages} isSendingLink={isSendingLink} onSaveEmail={handleSaveEmail} setView={goToView} />;

  return <Landing setView={goToView} user={user} />;
};

export default Index;
