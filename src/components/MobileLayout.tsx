import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import { ImageIcon } from 'lucide-react';

const MobileLayout = () => {
  const [prompt, setPrompt] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGenerateImages = () => {
    setIsGenerating(true);
    // Your image generation logic here
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <div className="flex-grow px-4 pb-20">
        <div className="w-full aspect-square mb-4">
          <div className="h-full rounded-lg bg-zinc-900/80 flex items-center justify-center">
            {isGenerating ? (
              <div className="w-8 h-8 border-4 border-gray-600 border-t-indigo-500 rounded-full animate-spin"></div>
            ) : null}
          </div>
        </div>
        
        <div className="bg-zinc-900 rounded-full w-full py-2 px-4 flex items-center justify-between mb-4">
          <button className="text-gray-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className="text-white text-sm">0 / 0</span>
          <button className="text-gray-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="bg-zinc-900/80 rounded-lg p-4">
          <textarea 
            className="w-full bg-transparent text-gray-300 text-lg resize-none outline-none"
            placeholder="High-angle view of a collection of antique, porcelain teacups and saucers in a dusty antique shop, fujifilm x100f, f8, 1/125s, iso 200"
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <div className="flex justify-end">
            <button className="bg-zinc-800 text-white text-xs px-2 py-1 rounded">tab</button>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800">
        <div className="flex justify-between px-8 py-4">
          <button className="text-indigo-400 text-sm border-b-2 border-indigo-400 pb-1">
            Input
          </button>
          <button className="text-white text-sm">
            Settings
          </button>
        </div>
      </div>
      
      <div className="fixed bottom-16 right-6">
        <button 
          className="bg-indigo-400 rounded-full p-3"
          onClick={handleGenerateImages}
          disabled={isGenerating}
        >
          <ImageIcon className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default MobileLayout;