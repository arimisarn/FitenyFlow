// src/services/translateApi.ts
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export const translateText = async (
  text: string,
  targetLanguage: "french" | "english"
): Promise<string> => {
  if (!GROQ_API_KEY) throw new Error("Groq API key is not configured");

  const prompt =
    targetLanguage === "french"
      ? `Translate this sentence into French: "${text}". Reply only with the translation.`
      : `Traduisez cette phrase en anglais : "${text}". Répondez uniquement avec la traduction.`;

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content?.trim() || "Erreur de traduction";
};
