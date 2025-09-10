const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export const reformulateText = async (
  text: string,
  language: "french" | "english"
): Promise<string> => {
  if (!GROQ_API_KEY) {
    throw new Error("Groq API key is not configured");
  }

  const prompt =
    language === "french"
      ? `Reformule cette phrase en français en gardant le même sens mais avec des mots différents. Réponds uniquement avec la phrase reformulée, sans explication : "${text}"`
      : `Reformulate this sentence in English keeping the same meaning but with different words. Reply only with the reformulated sentence, no explanation: "${text}"`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // ✅ modèle Groq recommandé
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API request failed: ${response.status}`);
    }

    const data = await response.json();
    return (
      data.choices[0]?.message?.content?.trim() ||
      "Erreur lors de la reformulation"
    );
  } catch (error) {
    console.error("Error calling Groq API:", error);
    throw error;
  }
};
