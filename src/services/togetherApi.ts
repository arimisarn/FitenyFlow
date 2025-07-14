const TOGETHER_API_KEY = import.meta.env.VITE_TOGETHER_API_KEY;
const TOGETHER_API_URL = 'https://api.together.xyz/v1/chat/completions';

export const reformulateText = async (text: string, language: 'french' | 'english'): Promise<string> => {
  if (!TOGETHER_API_KEY) {
    throw new Error('Together API key is not configured');
  }

  const prompt = language === 'french' 
    ? `Reformule cette phrase en français en gardant le même sens mais avec des mots différents. Réponds uniquement avec la phrase reformulée, sans explication : "${text}"`
    : `Reformulate this sentence in English keeping the same meaning but with different words. Reply only with the reformulated sentence, no explanation: "${text}"`;

  try {
    const response = await fetch(TOGETHER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOGETHER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || 'Erreur lors de la reformulation';
  } catch (error) {
    console.error('Error calling Together API:', error);
    throw error;
  }
};