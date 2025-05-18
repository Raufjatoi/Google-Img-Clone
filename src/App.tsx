import React, { useState } from 'react';
import { useIsMobile } from './hooks/use-mobile';
import Header from './components/Header';
import ImageGrid from './components/ImageGrid';
import PromptSection from './components/PromptSection';
import MobileLayout from './components/MobileLayout';
import { ThemeProvider } from './providers/ThemeProvider';
import Settings from './components/Settings';
import GenerationAnimation from './components/GenerationAnimation';
import { Settings as SettingsIcon } from 'lucide-react';

function App() {
  const isMobile = useIsMobile();
  const [showSettings, setShowSettings] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Listen for generation events
  React.useEffect(() => {
    const handleGenerationStart = () => {
      setIsGenerating(true);
    };
    
    const handleImagesGenerated = () => {
      setIsGenerating(false);
    };
    
    window.addEventListener('generationStart', handleGenerationStart as EventListener);
    window.addEventListener('imagesGenerated', handleImagesGenerated as EventListener);
    
    return () => {
      window.removeEventListener('generationStart', handleGenerationStart as EventListener);
      window.removeEventListener('imagesGenerated', handleImagesGenerated as EventListener);
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground p-4 transition-colors duration-300">
        {/* Global animation that covers the entire page */}
        <GenerationAnimation isLoading={isGenerating} />
        
        {isMobile ? (
          <MobileLayout />
        ) : (
          <>
            <Header />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
              <div className="lg:col-span-5">
                <PromptSection />
                
                {/* Settings button (below prompt section) */}
                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={() => setShowSettings(!showSettings)}
                    className="bg-secondary hover:bg-secondary/80 rounded-full p-2 transition-all duration-200"
                    aria-label="Settings"
                  >
                    <SettingsIcon className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Settings panel with slide down animation */}
                <Settings isOpen={showSettings} />
              </div>
              <div className="lg:col-span-7">
                <ImageGrid />
              </div>
            </div>
            
            <div className="mt-4 text-xs text-muted-foreground flex justify-between">
              <div>Disclaimer: AI tools can make mistakes, so double-check them</div>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              </div>
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;

