import { corsHeaders } from "@supabase/supabase-js/cors";
import { z } from "npm:zod@3.25.76";

const StoryRequestSchema = z.object({
  protagonistName: z.string().trim().min(1).max(80),
  gender: z.string().trim().min(1).max(40),
  sidekickType: z.string().trim().min(1).max(60),
  sidekickName: z.string().trim().max(80).optional().default(""),
  world: z.string().trim().min(1).max(80),
  theme: z.string().trim().min(1).max(80),
  illustrationStyle: z.string().trim().min(1).max(80),
});

const StoryPageSchema = z.object({
  title: z.string(),
  text: z.string(),
});

const StoryPagesSchema = z.array(StoryPageSchema).length(10);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const parsed = StoryRequestSchema.safeParse(await req.json());

    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "Invalid request", details: parsed.error.flatten().fieldErrors }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const openAiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openAiApiKey) {
      return new Response(JSON.stringify({ error: "OPENAI_API_KEY is not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { protagonistName, gender, sidekickType, sidekickName, world, theme } = parsed.data;
    const companion = sidekickType === "Sin personaje" ? "sin acompañante" : `${sidekickName || "un personaje mágico"} (${sidekickType})`;

    const openAiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openAiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        response_format: { type: "json_object" },
        temperature: 0.8,
        messages: [
          {
            role: "system",
            content:
              "Sos un escritor de cuentos infantiles en español rioplatense. Escribís historias para chicos de 4 a 8 años. Tus cuentos son cálidos, imaginativos y terminan con una moraleja clara.",
          },
          {
            role: "user",
            content: `Escribí un cuento infantil de exactamente 10 páginas usando estos datos: protagonista ${protagonistName} (${gender}), acompañado por ${companion}, en un escenario de ${world}, con el tema central de ${theme}. Cada página debe tener entre 2 y 4 oraciones. Respondé SOLO con un JSON array de 10 objetos con el formato: [{ title: 'Página 1', text: '...' }, ...]`,
          },
        ],
      }),
    });

    if (!openAiResponse.ok) {
      const errorBody = await openAiResponse.text();
      console.error("OpenAI error", openAiResponse.status, errorBody);
      return new Response(JSON.stringify({ error: "No pudimos generar el cuento" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const openAiData = await openAiResponse.json();
    const rawContent = openAiData.choices?.[0]?.message?.content;
    const content = typeof rawContent === "string" ? JSON.parse(rawContent) : rawContent;
    const storyCandidate = Array.isArray(content) ? content : content?.pages ?? content?.story ?? content?.cuento;
    const storyPages = StoryPagesSchema.parse(storyCandidate);

    return new Response(JSON.stringify(storyPages), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("generate-story error", error);
    return new Response(JSON.stringify({ error: "No pudimos generar el cuento" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
