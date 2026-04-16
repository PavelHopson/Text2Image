import React from 'react';
import { Sparkles, Clock, Settings, Zap, BookOpen } from 'lucide-react';

interface Props {
  currentPage: string;
  onNavigate: (page: any) => void;
}

export const Header: React.FC<Props> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'generator', label: 'Генератор', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'catalog', label: 'Каталог', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'history', label: 'История', icon: <Clock className="w-4 h-4" /> },
    { id: 'settings', label: 'Настройки', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div
        className="border-b border-white/[0.06]"
        style={{
          background: 'rgba(5, 7, 10, 0.75)',
          backdropFilter: 'blur(20px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center"
              style={{ boxShadow: '0 0 20px rgba(107, 163, 255, 0.35), 0 0 40px rgba(107, 163, 255, 0.1)' }}
            >
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-none text-glow">Text2Image</h1>
              <p className="text-[10px] text-gray-500 font-mono tracking-[0.15em] uppercase">Eclipse Studio</p>
            </div>
          </div>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium tracking-[0.15em] uppercase transition-all ${
                  currentPage === item.id
                    ? 'text-accent-light'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
                {currentPage === item.id && (
                  <span
                    className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent, #6BA3FF, transparent)',
                      boxShadow: '0 0 8px rgba(107, 163, 255, 0.5)',
                    }}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="header-line" />
    </header>
  );
};
