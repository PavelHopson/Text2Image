import React, { useState } from 'react';
import { Header } from './components/Header';
import { Generator } from './pages/Generator';
import { History } from './pages/History';
import { PromptCatalog } from './pages/PromptCatalog';
import { Settings } from './pages/Settings';

type Page = 'generator' | 'history' | 'catalog' | 'settings';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('generator');

  return (
    <div className="min-h-screen bg-surface-500">
      <Header currentPage={page} onNavigate={setPage} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {page === 'generator' && <Generator />}
        {page === 'history' && <History />}
        {page === 'catalog' && (
          <PromptCatalog onUsePrompt={(prompt) => {
            // Navigate to generator — the prompt will be in clipboard
            navigator.clipboard.writeText(prompt);
            setPage('generator');
          }} />
        )}
        {page === 'settings' && <Settings />}
      </main>
    </div>
  );
};

export default App;
