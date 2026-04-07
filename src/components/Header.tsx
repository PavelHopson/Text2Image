import React from 'react';
import { Sparkles, Clock, Settings, Zap } from 'lucide-react';

interface Props {
  currentPage: string;
  onNavigate: (page: any) => void;
}

export const Header: React.FC<Props> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'generator', label: 'Генератор', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'history', label: 'История', icon: <Clock className="w-4 h-4" /> },
    { id: 'settings', label: 'Настройки', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-surface-500/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-neon-pink flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-none">Text2Image</h1>
            <p className="text-[10px] text-gray-500 font-mono">STUDIO v1.0</p>
          </div>
        </div>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPage === item.id
                  ? 'bg-accent/15 text-accent-light'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
