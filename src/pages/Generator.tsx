import React, { useState } from 'react';
import { Sparkles, Download, Loader2, AlertCircle, Wand2, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { StylePicker, getStylePrompt } from '../components/StylePicker';
import { AspectRatioPicker } from '../components/AspectRatioPicker';
import { enhancePrompt, generateImage, getAIConfig } from '../services/aiService';
import { addToHistory } from '../services/historyService';
import { ImageStyle, AspectRatio, GenerationState, AI_PROVIDERS } from '../types';

export const Generator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<ImageStyle>('photo');
  const [ratio, setRatio] = useState<AspectRatio>('1:1');
  const [state, setState] = useState<GenerationState>('idle');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const config = getAIConfig();
  const providerName = AI_PROVIDERS[config.provider]?.name || config.provider;
  const hasKey = !!config.apiKey;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setError('');
    setImageUrl('');

    try {
      // Step 1: Enhance prompt
      setState('enhancing');
      const stylePrompt = getStylePrompt(style);
      const enhanced = hasKey
        ? await enhancePrompt(prompt, stylePrompt)
        : `${prompt}, ${stylePrompt}`;
      setEnhancedPrompt(enhanced);

      // Step 2: Generate image
      setState('generating');
      const url = await generateImage(`${enhanced}, ${stylePrompt}`, ratio);
      setImageUrl(url);
      setState('complete');

      // Save to history
      addToHistory({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        prompt,
        enhancedPrompt: enhanced,
        style,
        aspectRatio: ratio,
        provider: config.provider,
        model: config.model,
        imageUrl: url,
        timestamp: Date.now(),
        liked: false,
      });
    } catch (err: any) {
      setState('error');
      setError(err.message || 'Ошибка генерации');
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `text2image-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in studio-grid min-h-[calc(100vh-5rem)]">
      {/* LEFT: Controls */}
      <div className="space-y-6">
        {/* Prompt */}
        <div className="studio-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 text-glow">
              <Wand2 className="w-5 h-5 text-accent-light" /> Промпт
            </h2>
            <span className="text-[10px] font-mono text-gray-500 bg-white/[0.04] px-2 py-1 rounded tracking-[0.1em] uppercase">
              {providerName} / {config.model}
            </span>
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Опишите изображение... Например: Кот-астронавт на Марсе, смотрит на закат"
            rows={4}
            className="input-field input-eclipse resize-none text-sm"
          />

          {!hasKey && (
            <div className="flex items-start gap-2 text-xs text-yellow-400/80 bg-yellow-400/[0.06] border border-yellow-400/10 rounded-lg p-3">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>API ключ не настроен — будет использован placeholder. Добавьте ключ в Настройках.</span>
            </div>
          )}

          {/* Style Picker */}
          <div>
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-[0.2em] mb-2 block">
              Стиль генерации
            </label>
            <StylePicker selected={style} onSelect={setStyle} />
          </div>

          {/* Advanced */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-white transition-colors tracking-[0.1em] uppercase"
          >
            {showAdvanced ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            Дополнительно
          </button>

          {showAdvanced && (
            <div className="space-y-3 animate-fade-in">
              <div>
                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-[0.2em] mb-2 block">
                  Соотношение сторон
                </label>
                <AspectRatioPicker selected={ratio} onSelect={setRatio} />
              </div>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || state === 'enhancing' || state === 'generating'}
            className="btn-generate w-full flex items-center justify-center gap-2"
          >
            {state === 'enhancing' || state === 'generating' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin spinner-glow" />
                {state === 'enhancing' ? 'Улучшаю промпт...' : 'Генерирую изображение...'}
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> Сгенерировать
              </>
            )}
          </button>
        </div>

        {/* Enhanced Prompt */}
        {enhancedPrompt && (
          <div className="studio-card p-4 animate-slide-up">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-[0.2em]">Улучшенный промпт</span>
              <button
                onClick={() => navigator.clipboard.writeText(enhancedPrompt)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-mono">{enhancedPrompt}</p>
          </div>
        )}
      </div>

      {/* RIGHT: Result */}
      <div className="space-y-4">
        <div className={`studio-card overflow-hidden aspect-square flex items-center justify-center relative ${imageUrl && state === 'complete' ? 'image-success' : ''}`}>
          {state === 'idle' && !imageUrl && (
            <div className="text-center p-8">
              <div
                className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/[0.03] flex items-center justify-center"
                style={{ boxShadow: '0 0 40px rgba(107, 163, 255, 0.04)' }}
              >
                <Sparkles className="w-10 h-10 text-gray-700" />
              </div>
              <p className="text-gray-500 text-sm tracking-wide">Введите промпт и нажмите "Сгенерировать"</p>
            </div>
          )}

          {(state === 'enhancing' || state === 'generating') && (
            <div className="text-center p-8">
              <Loader2 className="w-12 h-12 text-accent animate-spin mx-auto mb-4 spinner-glow" />
              <p className="text-gray-400 text-sm">
                {state === 'enhancing' ? 'AI улучшает ваш промпт...' : 'Генерация изображения...'}
              </p>
              <div className="mt-4 w-48 h-1 bg-white/[0.06] rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent to-accent-dark rounded-full animate-shimmer"
                     style={{ backgroundSize: '200% 100%', width: '100%', boxShadow: '0 0 8px rgba(107, 163, 255, 0.4)' }} />
              </div>
            </div>
          )}

          {state === 'error' && (
            <div className="text-center p-8">
              <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <p className="text-red-400 text-sm">{error}</p>
              <button onClick={() => setState('idle')} className="btn-secondary mt-4 text-sm py-2 px-4">
                Попробовать снова
              </button>
            </div>
          )}

          {imageUrl && state === 'complete' && (
            <img src={imageUrl} alt={prompt} className="w-full h-full object-cover animate-fade-in" />
          )}
        </div>

        {imageUrl && state === 'complete' && (
          <button onClick={handleDownload} className="btn-secondary w-full flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Скачать изображение
          </button>
        )}
      </div>
    </div>
  );
};
