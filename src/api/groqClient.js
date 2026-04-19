const MODELS = [
  'qwen/qwen3-32b',
  'openai/gpt-oss-20b',
  'llama-3.1-8b-instant',
  'llama-3.3-70b-versatile',
  'groq/compound-mini',
  'groq/compound'
];

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const callGroqAPI = async (prompt, model) => {
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
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
  return data.choices[0].message.content;
};

export const getRandomModels = () => {
  const shuffled = [...MODELS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 2);
};

export const callTwoModels = async (prompt) => {
  const [modelA, modelB] = getRandomModels();

  const [responseA, responseB] = await Promise.all([
    callGroqAPI(prompt, modelA),
    callGroqAPI(prompt, modelB),
  ]);

  return {
    modelA: { response: responseA, model: modelA },
    modelB: { response: responseB, model: modelB },
  };
};