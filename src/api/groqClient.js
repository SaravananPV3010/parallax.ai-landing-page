const MODELS = [
  'qwen/qwen3-32b',
  'openai/gpt-oss-20b',
  'llama-3.1-8b-instant',
  'llama-3.3-70b-versatile',
  'groq/compound-mini',
  'groq/compound'
];

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const getGroqApiKey = () => {
  return import.meta.env.VITE_GROQ_API_KEY;
};

/**
 * @param {string} prompt
 * @param {string} model
 */
export const callGroqAPI = async (prompt, model) => {
  const apiKey = getGroqApiKey();

  if (!apiKey) {
    throw new Error('Missing Groq API key. Set VITE_GROQ_API_KEY in .env.local and restart the dev server.');
  }

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;

  if (typeof content !== 'string' || !content.trim()) {
    throw new Error(`Groq model ${model} returned an empty response.`);
  }

  return content;
};

export const getRandomModels = () => {
  const shuffled = [...MODELS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 2);
};

/**
 * @param {string} prompt
 */
export const callTwoModels = async (prompt) => {
  const [modelA, modelB] = getRandomModels();

  /**
   * @param {string} model
   */
  const runModel = async (model) => {
    try {
      const response = await callGroqAPI(prompt, model);
      return { model, response, error: '' };
    } catch (error) {
      return {
        model,
        response: '',
        error: error instanceof Error ? error.message : `Groq model ${model} failed.`,
      };
    }
  };

  const [responseA, responseB] = await Promise.all([
    runModel(modelA),
    runModel(modelB),
  ]);

  return {
    modelA: responseA,
    modelB: responseB,
  };
};