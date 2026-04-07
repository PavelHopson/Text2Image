import React, { useState } from 'react';
import { Header } from './components/Header';
import { Generator } from './pages/Generator';
import { History } from './pages/History';
import { Settings } from './pages/Settings';

type Page = 'generator' | 'history' | 'settings';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('generator');

  return (
    <div className="min-h-screen bg-surface-500">
      <Header currentPage={page} onNavigate={setPage} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {page === 'generator' && <Generator />}
        {page === 'history' && <History />}
        {page === 'settings' && <Settings />}
      </main>
    </div>
  );
};

export default App;
