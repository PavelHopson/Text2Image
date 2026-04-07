export type AIProvider = 'gemini' | 'openai' | 'openrouter';

export interface AIConfig {
  provider: AIProvider;
  apiKey: string;
  model: string;
}

export const AI_PROVIDERS: Record<AIProvider, { name: string; models: string[]; placeholder: string }> = {
  gemini: {
    name: 'Google Gemini',
    models: ['gemini-2.0-flash-preview-image-generation', 'imagen-3.0-generate-002'],
    placeholder: 'AIza...',
  },
  openai: {
    name: 'OpenAI DALL-E',
    models: ['dall-e-3', 'dall-e-2', 'gpt-image-1'],
    placeholder: 'sk-...',
  },
  openrouter: {
    name: 'OpenRouter',
    models: ['google/gemini-2.0-flash-exp:free', 'stabilityai/stable-diffusion-3', 'black-forest-labs/flux-1.1-pro'],
    placeholder: 'sk-or-...',
  },
};

export type ImageStyle =
  | 'photo'
  | 'digital-art'
  | 'anime'
  | 'oil-painting'
  | '3d-render'
  | 'pixel-art'
  | 'watercolor'
  | 'sketch'
  | 'cyberpunk'
  | 'minimalist';

export interface StyleOption {
  id: ImageStyle;
  label: string;
  icon: string;
  prompt: string;
}

export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

export interface GeneratedImage {
  id: string;
  prompt: string;
  enhancedPrompt: string;
  style: ImageStyle;
  aspectRatio: AspectRatio;
  provider: AIProvider;
  model: string;
  imageUrl: string;
  timestamp: number;
  liked: boolean;
}

export type GenerationState = 'idle' | 'enhancing' | 'generating' | 'complete' | 'error';
