import React, { useState } from 'react';
import Header from './Header';
import PromptSection from './PromptSection';
import { ImageIcon, Settings as SettingsIcon } from 'lucide-react';
import Settings from './Settings';
import { useTheme } from '../providers/ThemeProvider';
import GenerationAnimation from './GenerationAnimation';

const MobileLayout = () => {
  const [prompt, setPrompt] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('input');

  const handleGenerateImages = () => {
    setIsGenerating(true);
    // Your image generation logic here
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
      <Header />
      
      <div className="flex-grow px-4 pb-20">
        {activeTab === 'input' ? (
          <>
            <div className="w-full aspect-square mb-4 relative">
              <div className="h-full rounded-lg bg-secondary flex items-center justify-center">
                {isGenerating && (
                  <div className="absolute inset-0 z-0">
                    <GenerationAnimation isLoading={isGenerating} />
                  </div>
                )}
                {isGenerating ? (
                  <div className="w-8 h-8 border-4 border-gray-600 border-t-indigo-500 rounded-full animate-spin z-10"></div>
                ) : null}
              </div>
            </div>
            
            {/* Add PromptSection here */}
            <div className="bg-secondary rounded-lg p-4 mb-4">
              <textarea 
                className="w-full bg-transparent text-foreground text-lg resize-none outline-none"
                placeholder="A futuristic city with flying cars and neon lights, cyberpunk style"
                rows={4}
              ></textarea>
              
              <div className="mt-4">
                <h3 className="text-muted-foreground text-sm mb-2">Style suggestions</h3>
                <div className="flex flex-wrap gap-2">
                  {['35mm film', 'minimal', 'sketchy', 'handmade'].map((style, index) => (
                    <button
                      key={index}
                      className="px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground hover:bg-muted/80"
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <Settings isOpen={true} />
        )}
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border transition-colors duration-300">
        <div className="flex justify-between px-8 py-4">
          <button 
            className={`text-sm pb-1 transition-all duration-200 ${
              activeTab === 'input' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-foreground hover:text-primary/80'
            }`}
            onClick={() => setActiveTab('input')}
          >
            Input
          </button>
          <button 
            className={`text-sm pb-1 transition-all duration-200 ${
              activeTab === 'settings' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-foreground hover:text-primary/80'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>
      </div>
      
      <div className="fixed bottom-16 right-6">
        <button 
          className="bg-primary rounded-full p-3 transition-all duration-200 hover:bg-primary/90 hover:shadow-lg active:scale-95"
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

