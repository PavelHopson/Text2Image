import React from 'react';
import { AspectRatio } from '../types';

const RATIOS: { id: AspectRatio; label: string; w: number; h: number }[] = [
  { id: '1:1', label: '1:1', w: 1, h: 1 },
  { id: '16:9', label: '16:9', w: 16, h: 9 },
  { id: '9:16', label: '9:16', w: 9, h: 16 },
  { id: '4:3', label: '4:3', w: 4, h: 3 },
  { id: '3:4', label: '3:4', w: 3, h: 4 },
];

interface Props {
  selected: AspectRatio;
  onSelect: (ratio: AspectRatio) => void;
}

export const AspectRatioPicker: React.FC<Props> = ({ selected, onSelect }) => (
  <div className="flex gap-2">
    {RATIOS.map((r) => (
      <button
        key={r.id}
        onClick={() => onSelect(r.id)}
        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all ${
          selected === r.id
            ? 'bg-accent/15 text-accent-light ring-1 ring-accent/40'
            : 'bg-white/[0.03] text-gray-500 hover:bg-white/[0.06] hover:text-white'
        }`}
      >
        <div
          className={`border-2 rounded-sm ${selected === r.id ? 'border-accent-light' : 'border-gray-600'}`}
          style={{ width: `${r.w * 4}px`, height: `${r.h * 4}px` }}
        />
        <span className="text-[10px] font-mono">{r.label}</span>
      </button>
    ))}
  </div>
);
