
import React, { useState, useEffect } from 'react';
import { generateImages } from '../services/geminiService';
import { Copy, RefreshCw, ImageIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const PromptSection = () => {
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
            className="bg-indigo-400 rounded-full p-3"
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
            className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-6 py-2 flex items-center space-x-2"
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
    <div className="flex flex-col h-full">
      {/* Navigation bar */}
      <div className="bg-zinc-900/80 rounded-full px-4 py-2 mb-4 flex items-center justify-between">
        <div className="flex items-center text-gray-400 space-x-2">
          <button className="hover:text-gray-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span>0 / 0</span>
          <button className="hover:text-gray-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="flex space-x-2">
          <button 
            className={`${!isGridView ? 'bg-indigo-600' : 'bg-zinc-900/80'} rounded-md p-1`}
            onClick={toggleView}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
          <button 
            className={`${isGridView ? 'bg-indigo-600' : 'bg-zinc-900/80'} rounded-md p-1`}
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
      <div className="bg-zinc-900/80 rounded-3xl flex-grow flex flex-col mb-4 relative p-6">
        {/* Selected styles at the top - only show if there are selected styles */}
        {selectedStyles.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedStyles.map((style, index) => (
              <div key={index} className="bg-indigo-500/30 text-indigo-300 rounded-full px-3 py-1 flex items-center">
                <span>{style}</span>
                <button 
                  className="ml-2 text-indigo-300 hover:text-indigo-100"
                  onClick={() => handleStyleSelect(style)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <span className="ml-1 text-teal-400 text-lg">•</span>
              </div>
            ))}
          </div>
        )}
        
        {/* Textarea for prompt */}
        <div className="flex-grow">
          <textarea
            className="w-full h-full bg-transparent text-gray-300 text-2xl font-light resize-none focus:outline-none"
            placeholder="Describe what you want to create..."
            value={prompt}
            onChange={handlePromptChange}
          />
        </div>
        
        {/* Bottom actions with copy and refresh icons */}
        <div className="flex items-center mt-4">
          <button className="text-gray-400 hover:text-gray-300 mr-4">
            <Copy size={20} />
          </button>
          <button className="text-gray-400 hover:text-gray-300">
            <RefreshCw size={20} />
          </button>
          
          {/* Create button in the corner */}
          {renderCreateButton()}
        </div>
        
        {/* Bottom style tags */}
        <div className="mt-8">
          <div className="flex flex-wrap gap-2">
            <button className="bg-zinc-800/90 hover:bg-zinc-700 rounded-full px-3 py-1 text-gray-300 flex items-center space-x-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>More</span>
            </button>
            {availableStyles.map((style, index) => (
              <button 
                key={index} 
                className={`${selectedStyles.includes(style) ? 'bg-indigo-500/30 text-indigo-300' : 'bg-zinc-800/90 text-gray-300'} hover:bg-zinc-700 rounded-full px-3 py-1`}
                onClick={() => handleStyleSelect(style)}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Settings bar */}
      <div className="bg-zinc-900/80 rounded-full px-6 py-3 flex items-center justify-between">
        <span className="text-indigo-400 font-medium">Settings</span>
        <button className="text-gray-400">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PromptSection;












