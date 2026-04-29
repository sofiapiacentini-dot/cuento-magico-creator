import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { Link, useNavigate } from "react-router-dom";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { StoryRow } from "@/lib/story";
import { worldEmoji } from "@/lib/story";

export default function MisCuentos() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [stories, setStories] = useState<StoryRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) navigate("/", { replace: true });
    });

    supabase.auth.getSession().then(({ data }) => {
      const currentUser = data.session?.user ?? null;
      setUser(currentUser);
      if (!currentUser) {
        navigate("/", { replace: true });
        return;
      }

      supabase
        .from("stories")
        .select("id, created_at, world, book_title, illustration_style")
        .order("created_at", { ascending: false })
        .then(({ data: rows, error }) => {
          if (error) toast({ title: "No pudimos cargar tus cuentos", description: error.message });
          setStories(rows ?? []);
          setLoading(false);
        });
    });

    return () => listener.subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return <main className="flex min-h-screen items-center justify-center bg-background text-lg font-black text-primary">Cargando tus cuentos...</main>;
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-accent">Mis cuentos</p>
            <h1 className="text-3xl font-black">{user?.email}</h1>
          </div>
          <Button asChild variant="magic" size="lg"><Link to="/"><Plus /> Crear nuevo cuento</Link></Button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10">
        {stories.length === 0 ? (
          <article className="rounded-[2.5rem] border border-border bg-card p-10 text-center shadow-soft">
            <p className="text-6xl">📚</p>
            <h2 className="mt-4 text-3xl font-black">Todavía no guardaste cuentos</h2>
            <Button asChild className="mt-6" variant="sun" size="lg"><Link to="/">Crear mi primer cuento</Link></Button>
          </article>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <article key={story.id} className="rounded-[2rem] border border-border bg-card p-6 shadow-soft transition-transform duration-200 hover:-translate-y-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex size-16 items-center justify-center rounded-[1.5rem] bg-primary-soft text-4xl shadow-inner-soft">{worldEmoji[story.world] ?? "📖"}</div>
                  <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-black text-accent-foreground">{story.illustration_style}</span>
                </div>
                <h2 className="mt-5 text-2xl font-black leading-tight">{story.book_title}</h2>
                <p className="mt-2 font-semibold text-muted-foreground">{new Date(story.created_at).toLocaleDateString("es-AR")}</p>
                <Button className="mt-6 w-full" variant="outlineMagic" onClick={() => toast({ title: "Próximamente" })}><Download /> Descargar PDF</Button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
