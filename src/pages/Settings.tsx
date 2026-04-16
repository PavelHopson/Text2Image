import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Eye, EyeOff, Zap, ExternalLink } from 'lucide-react';
import { getAIConfig, saveAIConfig } from '../services/aiService';
import { AIProvider, AI_PROVIDERS } from '../types';

const OLLAMA_CONFIG_KEY = 'text2image-ollama-config';

export const Settings: React.FC = () => {
  const [provider, setProvider] = useState<AIProvider>('gemini');
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [ollamaBaseUrl, setOllamaBaseUrl] = useState('http://localhost:11434');

  useEffect(() => {
    const c = getAIConfig();
    setProvider(c.provider);
    setApiKey(c.apiKey);
    setModel(c.model);
    try {
      const oc = JSON.parse(localStorage.getItem(OLLAMA_CONFIG_KEY) || '{}');
      if (oc.baseUrl) setOllamaBaseUrl(oc.baseUrl);
    } catch {}
  }, []);

  const handleProviderChange = (p: AIProvider) => {
    setProvider(p);
    setModel(AI_PROVIDERS[p].models[0]);
    setApiKey('');
  };

  const handleSave = () => {
    saveAIConfig({ provider, apiKey, model });
    if (provider === 'ollama') {
      localStorage.setItem(OLLAMA_CONFIG_KEY, JSON.stringify({ baseUrl: ollamaBaseUrl }));
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const providerLinks: Record<AIProvider, string> = {
    gemini: 'https://ai.google.dev/gemini-api/docs/api-key',
    openai: 'https://platform.openai.com/api-keys',
    openrouter: 'https://openrouter.ai/keys',
    ollama: 'https://ollama.com/download',
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="studio-card p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 text-glow">
            <Zap className="w-5 h-5 text-accent-light" /> Настройки AI
          </h2>
          {saved && (
            <span className="flex items-center gap-1 text-sm text-green-400 animate-fade-in">
              <CheckCircle className="w-4 h-4" /> Сохранено
            </span>
          )}
        </div>

        <p className="text-sm text-gray-400">
          Подключите свой API ключ для генерации изображений. Ключ хранится только в вашем браузере.
        </p>

        {/* Provider */}
        <div>
          <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-[0.2em] mb-3 block">Провайдер</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {(Object.keys(AI_PROVIDERS) as AIProvider[]).map((p) => (
              <button
                key={p}
                onClick={() => handleProviderChange(p)}
                className="studio-card p-4 text-left transition-all"
                style={provider === p ? {
                  borderColor: 'rgba(107, 163, 255, 0.4)',
                  background: 'rgba(107, 163, 255, 0.06)',
                  boxShadow: '0 0 20px rgba(107, 163, 255, 0.08)',
                } : {}}
              >
                <div className={`font-semibold text-sm ${provider === p ? 'text-white' : 'text-gray-400'}`}>
                  {AI_PROVIDERS[p].name}
                </div>
                <div className="text-[10px] text-gray-500 mt-1 font-mono tracking-[0.05em]">
                  {AI_PROVIDERS[p].models.length} моделей
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Model */}
        <div>
          <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-[0.2em] mb-2 block">Модель</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="input-field input-eclipse text-sm"
          >
            {AI_PROVIDERS[provider].models.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Или введите ID модели вручную"
            className="input-field input-eclipse text-xs font-mono mt-2"
          />
        </div>

        {/* Ollama Base URL */}
        {provider === 'ollama' && (
          <div>
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-[0.2em] mb-2 block">Base URL</label>
            <input
              type="text"
              value={ollamaBaseUrl}
              onChange={(e) => setOllamaBaseUrl(e.target.value)}
              placeholder="http://localhost:11434"
              className="input-field input-eclipse text-sm font-mono"
            />
            <p className="text-[10px] text-gray-500 mt-1">Ollama работает локально, API ключ не нужен. Промпты улучшаются без цензуры.</p>
          </div>
        )}

        {/* API Key */}
        {provider !== 'ollama' && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-[0.2em]">API Ключ</label>
            <a
              href={providerLinks[provider]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-accent-light hover:text-white flex items-center gap-1"
            >
              Получить ключ <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={AI_PROVIDERS[provider].placeholder}
              className="input-field input-eclipse text-sm font-mono pr-10"
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-3 text-gray-500 hover:text-white transition-colors"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        )}

        {/* Save */}
        <button onClick={handleSave} className="btn-generate w-full flex items-center justify-center gap-2">
          <Save className="w-4 h-4" /> Сохранить настройки
        </button>
      </div>

      {/* Info */}
      <div className="studio-card p-4">
        <h3 className="text-sm font-semibold text-gray-300 mb-2">Как это работает?</h3>
        <ol className="text-xs text-gray-400 space-y-1.5 list-decimal list-inside">
          <li>Вы вводите промпт на любом языке</li>
          <li>AI улучшает ваш промпт, добавляя детали для выбранного стиля</li>
          <li>Улучшенный промпт отправляется в модель генерации изображений</li>
          <li>Результат сохраняется в историю (локально в браузере)</li>
        </ol>
      </div>
    </div>
  );
};
