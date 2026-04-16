import React, { useState, useEffect } from 'react';
import { Heart, Download, Trash2, Clock, X } from 'lucide-react';
import { getHistory, toggleLike, deleteFromHistory, clearHistory } from '../services/historyService';
import { GeneratedImage, AI_PROVIDERS } from '../types';

export const History: React.FC = () => {
  const [items, setItems] = useState<GeneratedImage[]>([]);
  const [filter, setFilter] = useState<'all' | 'liked'>('all');
  const [preview, setPreview] = useState<GeneratedImage | null>(null);

  const reload = () => setItems(getHistory());
  useEffect(reload, []);

  const filtered = filter === 'liked' ? items.filter(i => i.liked) : items;

  const handleLike = (id: string) => {
    toggleLike(id);
    reload();
  };

  const handleDelete = (id: string) => {
    deleteFromHistory(id);
    reload();
    if (preview?.id === id) setPreview(null);
  };

  const handleClear = () => {
    if (confirm('Удалить всю историю генераций?')) {
      clearHistory();
      reload();
    }
  };

  const handleDownload = (img: GeneratedImage) => {
    const a = document.createElement('a');
    a.href = img.imageUrl;
    a.download = `text2image-${img.id}.png`;
    a.click();
  };

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    const diff = Date.now() - ts;
    if (diff < 3600000) return `${Math.floor(diff / 60000)} мин назад`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} ч назад`;
    return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <Clock className="w-16 h-16 text-gray-700 mb-4" />
        <h2 className="text-xl font-bold text-gray-400 mb-2 text-glow">История пуста</h2>
        <p className="text-gray-500 text-sm">Сгенерируйте первое изображение — оно появится здесь.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Lightbox */}
      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
          onClick={() => setPreview(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setPreview(null)} className="absolute -top-10 right-0 text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <img src={preview.imageUrl} alt={preview.prompt} className="w-full rounded-2xl" />
            <div className="mt-4 studio-card p-4">
              <p className="text-sm text-gray-300">{preview.prompt}</p>
              <p className="text-xs text-gray-500 mt-2 font-mono tracking-[0.05em]">
                {AI_PROVIDERS[preview.provider]?.name} / {preview.model} / {preview.style} / {preview.aspectRatio}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-[0.1em] uppercase transition-all ${filter === 'all' ? 'bg-accent/15 text-accent-light' : 'text-gray-400 hover:text-white'}`}
          >
            Все ({items.length})
          </button>
          <button
            onClick={() => setFilter('liked')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-[0.1em] uppercase transition-all flex items-center gap-1 ${filter === 'liked' ? 'bg-accent/15 text-accent-light' : 'text-gray-400 hover:text-white'}`}
          >
            <Heart className="w-3 h-3" /> Избранное
          </button>
        </div>
        <button onClick={handleClear} className="text-xs text-gray-500 hover:text-red-400 transition-colors tracking-[0.1em] uppercase">
          Очистить
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((img) => (
          <div key={img.id} className="studio-card overflow-hidden group relative animate-slide-up">
            <div className="aspect-square cursor-pointer" onClick={() => setPreview(img)}>
              <img src={img.imageUrl} alt={img.prompt} className="w-full h-full object-cover" />
            </div>

            {/* Overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
                backdropFilter: 'blur(2px)',
                WebkitBackdropFilter: 'blur(2px)',
              }}
            >
              <p className="text-xs text-white line-clamp-2 mb-2">{img.prompt}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400 font-mono">{formatTime(img.timestamp)}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleLike(img.id); }}
                    className={`p-1.5 rounded-lg transition-all ${img.liked ? 'text-orange-400 like-glow' : 'text-gray-400 hover:text-orange-400'}`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${img.liked ? 'fill-current' : ''}`} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDownload(img); }} className="p-1.5 rounded-lg text-gray-400 hover:text-white transition-colors">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(img.id); }} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
