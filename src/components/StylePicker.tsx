import React from 'react';
import { ImageStyle, StyleOption } from '../types';

const STYLES: StyleOption[] = [
  { id: 'photo', label: 'Фото', icon: '📸', prompt: 'photorealistic, DSLR, sharp focus, 8k' },
  { id: 'digital-art', label: 'Арт', icon: '🎨', prompt: 'digital art, vibrant colors, detailed illustration' },
  { id: 'anime', label: 'Аниме', icon: '🌸', prompt: 'anime style, cel shading, manga illustration, vibrant' },
  { id: 'oil-painting', label: 'Масло', icon: '🖌️', prompt: 'oil painting, thick brushstrokes, classical art, gallery quality' },
  { id: '3d-render', label: '3D', icon: '🧊', prompt: '3D render, octane render, cinematic lighting, volumetric' },
  { id: 'pixel-art', label: 'Пиксель', icon: '👾', prompt: 'pixel art, 16-bit, retro game style, crisp pixels' },
  { id: 'watercolor', label: 'Акварель', icon: '💧', prompt: 'watercolor painting, soft edges, paper texture, delicate' },
  { id: 'sketch', label: 'Скетч', icon: '✏️', prompt: 'pencil sketch, graphite drawing, crosshatching, detailed' },
  { id: 'cyberpunk', label: 'Киберпанк', icon: '🌃', prompt: 'cyberpunk, neon lights, rain, futuristic city, blade runner' },
  { id: 'minimalist', label: 'Минимал', icon: '⬜', prompt: 'minimalist, clean, simple shapes, flat design, modern' },
];

interface Props {
  selected: ImageStyle;
  onSelect: (style: ImageStyle) => void;
}

export const StylePicker: React.FC<Props> = ({ selected, onSelect }) => (
  <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
    {STYLES.map((s) => (
      <button
        key={s.id}
        onClick={() => onSelect(s.id)}
        className={`flex flex-col items-center gap-1 py-3 px-1 rounded-xl text-xs font-medium transition-all ${
          selected === s.id
            ? 'bg-accent/15 text-accent-light ring-1 ring-accent/40 scale-105'
            : 'bg-white/[0.03] text-gray-400 hover:bg-white/[0.06] hover:text-white'
        }`}
      >
        <span className="text-xl">{s.icon}</span>
        <span className="truncate w-full text-center">{s.label}</span>
      </button>
    ))}
  </div>
);

export function getStylePrompt(style: ImageStyle): string {
  return STYLES.find(s => s.id === style)?.prompt || '';
}
