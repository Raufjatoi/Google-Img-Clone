import React from 'react';
import { useIsMobile } from './hooks/use-mobile';
import Header from './components/Header';
import ImageGrid from './components/ImageGrid';
import PromptSection from './components/PromptSection';
import MobileLayout from './components/MobileLayout';

function App() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileLayout />;
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <Header />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
        <div className="lg:col-span-5">
          <PromptSection />
        </div>
        <div className="lg:col-span-7">
          <ImageGrid />
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 flex justify-between">
        <div>Disclaimer: AI tools can make mistakes, so double-check them</div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-400">Privacy</a>
          <a href="#" className="hover:text-gray-400">Terms of Service</a>
        </div>
      </div>
    </div>
  );
}

export default App;


