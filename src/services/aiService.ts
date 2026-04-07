import { AIConfig, AIProvider } from '../types';

const STORAGE_KEY = 'text2image-ai-config';

export function getAIConfig(): AIConfig {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch {}
  }
  return { provider: 'gemini', apiKey: process.env.API_KEY || '', model: 'gemini-2.0-flash-preview-image-generation' };
}

export function saveAIConfig(config: AIConfig) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

// ====== PROMPT ENHANCER ======

export async function enhancePrompt(userPrompt: string, style: string): Promise<string> {
  const config = getAIConfig();
  const systemPrompt = `Ты — эксперт по промптам для генерации изображений. Улучши промпт пользователя, добавив детали композиции, освещения, цветовой палитры и технические параметры для стиля "${style}". Верни ТОЛЬКО улучшенный промпт на английском языке, без пояснений. Максимум 200 слов.`;

  if (config.provider === 'gemini' && config.apiKey) {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: config.apiKey });
    const r = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${systemPrompt}\n\nПромпт: ${userPrompt}`,
    });
    return r.text || userPrompt;
  }

  if (config.provider === 'openai' && config.apiKey) {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.apiKey}` },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt }], max_tokens: 300 }),
    });
    const d = await r.json();
    return d.choices?.[0]?.message?.content || userPrompt;
  }

  if (config.provider === 'openrouter' && config.apiKey) {
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.apiKey}` },
      body: JSON.stringify({ model: 'google/gemini-2.5-flash', messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt }], max_tokens: 300 }),
    });
    const d = await r.json();
    return d.choices?.[0]?.message?.content || userPrompt;
  }

  return userPrompt;
}

// ====== IMAGE GENERATION ======

export async function generateImage(prompt: string, aspectRatio: string): Promise<string> {
  const config = getAIConfig();

  if (config.provider === 'gemini' && config.apiKey) {
    return generateWithGemini(prompt, config, aspectRatio);
  }
  if (config.provider === 'openai' && config.apiKey) {
    return generateWithOpenAI(prompt, config, aspectRatio);
  }
  if (config.provider === 'openrouter' && config.apiKey) {
    return generateWithOpenRouter(prompt, config);
  }

  // Fallback — placeholder
  const seed = Math.abs(hashCode(prompt));
  return `https://picsum.photos/seed/${seed}/1024/1024`;
}

async function generateWithGemini(prompt: string, config: AIConfig, aspectRatio: string): Promise<string> {
  const { GoogleGenAI } = await import('@google/genai');
  const ai = new GoogleGenAI({ apiKey: config.apiKey });

  if (config.model.includes('imagen')) {
    // Imagen 3
    const r = await ai.models.generateImages({
      model: config.model,
      prompt,
      config: { numberOfImages: 1 },
    });
    const img = r.generatedImages?.[0];
    if (img?.image?.imageBytes) {
      return `data:image/png;base64,${img.image.imageBytes}`;
    }
  } else {
    // Gemini with image output
    const r = await ai.models.generateContent({
      model: config.model,
      contents: prompt,
      config: { responseModalities: ['TEXT', 'IMAGE'] },
    });
    const parts = r.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if ((part as any).inlineData) {
        const d = (part as any).inlineData;
        return `data:${d.mimeType};base64,${d.data}`;
      }
    }
  }
  throw new Error('Gemini не вернул изображение');
}

async function generateWithOpenAI(prompt: string, config: AIConfig, aspectRatio: string): Promise<string> {
  const size = aspectRatio === '16:9' ? '1792x1024' : aspectRatio === '9:16' ? '1024x1792' : '1024x1024';
  const r = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.apiKey}` },
    body: JSON.stringify({ model: config.model || 'dall-e-3', prompt, n: 1, size, quality: 'hd' }),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(d.error?.message || 'OpenAI error');
  return d.data?.[0]?.url || d.data?.[0]?.b64_json ? `data:image/png;base64,${d.data[0].b64_json}` : '';
}

async function generateWithOpenRouter(prompt: string, config: AIConfig): Promise<string> {
  const r = await fetch('https://openrouter.ai/api/v1/images/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.apiKey}` },
    body: JSON.stringify({ model: config.model, prompt, n: 1 }),
  });
  const d = await r.json();
  return d.data?.[0]?.url || '';
}

function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return h;
}
