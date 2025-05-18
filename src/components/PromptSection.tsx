
import React, { useState, useEffect } from 'react';
import { generateImages } from '../services/geminiService';
import { Copy, RefreshCw, ImageIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PromptSectionProps {
  onSettingsClick?: () => void;
}

const PromptSection: React.FC<PromptSectionProps> = ({ onSettingsClick }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [availableStyles, setAvailableStyles] = useState(['35mm film', 'minimal', 'sketchy', 'handmade', 'abstract', 'chiaroscuro', 'natural light', 'bokeh']);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Set initial typing state based on whether there's content
    setIsTyping(prompt.trim().length > 0);
  }, []);

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    setIsTyping(e.target.value.trim().length > 0);
  };

  const handleGenerateImages = async () => {
    if (!prompt.trim() && selectedStyles.length === 0) return;
    
    setIsGenerating(true);
    try {
      window.dispatchEvent(new CustomEvent('generationStart'));
      const images = await generateImages(prompt);
      window.dispatchEvent(new CustomEvent('imagesGenerated', { detail: images }));
    } catch (error) {
      console.error('Failed to generate images:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleView = () => {
    setIsGridView(!isGridView);
    window.dispatchEvent(new CustomEvent('toggleView'));
  };

  const handleStyleSelect = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter(s => s !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  const renderCreateButton = () => {
    if (isMobile) {
      return (
        <div className="absolute bottom-16 right-6">
          <button 
            className="bg-indigo-400 rounded-full p-3 transition-all duration-200 hover:bg-indigo-500 active:scale-95"
            onClick={handleGenerateImages}
            disabled={isGenerating}
          >
            <ImageIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      );
    } else {
      return (
        <div className="absolute bottom-28 right-6">
          <button 
            className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-6 py-2 flex items-center space-x-2 transition-all duration-200 hover:shadow-lg active:scale-95"
            onClick={handleGenerateImages}
            disabled={isGenerating}
          >
            <span>{isGenerating ? 'Generating...' : isTyping ? 'Create' : 'I\'m feeling lucky'}</span>
          </button>
        </div>
      );
    }
  };

  return (
    <div className="relative">
      {/* Navigation bar */}
      <div className="bg-secondary rounded-full px-4 py-2 mb-4 flex items-center justify-between">
        <div className="flex items-center text-gray-400 space-x-2">
          <button className="hover:text-gray-300 transition-colors duration-200">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span>0 / 0</span>
          <button className="hover:text-gray-300 transition-colors duration-200">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="flex space-x-2">
          <button 
            className={`${!isGridView ? 'bg-indigo-600' : 'bg-zinc-900/80'} rounded-md p-1 transition-all duration-200 hover:bg-zinc-800`}
            onClick={toggleView}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
          <button 
            className={`${isGridView ? 'bg-indigo-600' : 'bg-zinc-900/80'} rounded-md p-1 transition-all duration-200 hover:bg-zinc-800`}
            onClick={toggleView}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Main prompt area - flex-grow to take available space */}
      <div className="bg-secondary rounded-3xl flex-grow flex flex-col mb-4 relative p-6">
        {/* Selected styles at the top - only show if there are selected styles */}
        {selectedStyles.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedStyles.map((style, index) => (
              <div key={index} className="bg-indigo-500/30 text-indigo-300 rounded-full px-3 py-1 flex items-center">
                <span>{style}</span>
                <button 
                  className="ml-2 text-indigo-300 hover:text-indigo-100 transition-colors duration-200"
                  onClick={() => handleStyleSelect(style)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        
        {/* Textarea for prompt */}
        <textarea
          className="flex-grow bg-transparent text-white text-lg resize-none outline-none mb-4"
          placeholder="A futuristic city with flying cars and neon lights, cyberpunk style"
          value={prompt}
          onChange={handlePromptChange}
          rows={6}
        />
        
        {/* Style suggestions */}
        <div className="mt-auto">
          <h3 className="text-gray-400 text-sm mb-2">Style suggestions</h3>
          <div className="flex flex-wrap gap-2">
            {availableStyles.map((style, index) => (
              <button
                key={index}
                onClick={() => handleStyleSelect(style)}
                className={`px-3 py-1 rounded-full text-xs transition-all duration-200 ${
                  selectedStyles.includes(style)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {renderCreateButton()}
    </div>
  );
};

export default PromptSection;























