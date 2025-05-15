
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ImageIcon, Grid2X2, Square } from 'lucide-react';
import GenerationAnimation from './GenerationAnimation';

const ImageGrid = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const isMobile = useIsMobile();
  
  // Listen for generated images
  useEffect(() => {
    const handleImagesGenerated = (event: CustomEvent) => {
      setImages(event.detail);
      setIsLoading(false);
    };
    
    window.addEventListener('imagesGenerated', handleImagesGenerated as EventListener);
    
    return () => {
      window.removeEventListener('imagesGenerated', handleImagesGenerated as EventListener);
    };
  }, []);

  // Set loading state when generation starts
  useEffect(() => {
    const handleGenerationStart = () => {
      setIsLoading(true);
    };
    
    window.addEventListener('generationStart', handleGenerationStart as EventListener);
    
    return () => {
      window.removeEventListener('generationStart', handleGenerationStart as EventListener);
    };
  }, []);

  // Toggle view handler
  useEffect(() => {
    const handleToggleView = () => {
      setIsGridView(prev => !prev);
    };
    
    window.addEventListener('toggleView', handleToggleView as EventListener);
    
    return () => {
      window.removeEventListener('toggleView', handleToggleView as EventListener);
    };
  }, []);

  const toggleView = () => {
    setIsGridView(prev => !prev);
  };

  if (isMobile) {
    // Mobile view - single image
    return (
      <div className="flex flex-col">
        <div className="w-full aspect-square mb-4 relative">
          <div className="h-full rounded-lg bg-zinc-900/80 flex items-center justify-center">
            {isLoading && <GenerationAnimation isLoading={isLoading} />}
            {isLoading ? (
              <div className="w-8 h-8 border-4 border-gray-600 border-t-indigo-500 rounded-full animate-spin"></div>
            ) : images.length > 0 ? (
              <img 
                src={images[0]} 
                alt="Generated image" 
                className="w-full h-full object-cover rounded-lg"
              />
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
          ></textarea>
          <div className="flex justify-end">
            <button className="bg-zinc-800 text-white text-xs px-2 py-1 rounded">tab</button>
          </div>
        </div>
      </div>
    );
  } else {
    // Desktop view with toggle
    return (
      <div className="h-full flex flex-col">
        {/* View toggle buttons */}
        <div className="flex justify-end mb-2">
          <div className="flex space-x-2">
            <button 
              className={`${!isGridView ? 'bg-indigo-600' : 'bg-zinc-900/80'} rounded-md p-1`}
              onClick={toggleView}
              aria-label="Single view"
            >
              <Square className="w-5 h-5" />
            </button>
            <button 
              className={`${isGridView ? 'bg-indigo-600' : 'bg-zinc-900/80'} rounded-md p-1`}
              onClick={toggleView}
              aria-label="Grid view"
            >
              <Grid2X2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {isGridView ? (
          // Grid view
          <div className="grid grid-cols-2 gap-2 flex-grow relative">
            {isLoading && <GenerationAnimation isLoading={isLoading} />}
            {images.length > 0 ? (
              images.map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg bg-zinc-900/80">
                  <img 
                    src={image} 
                    alt={`Generated image ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            ) : (
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="aspect-square rounded-lg bg-zinc-900/80 flex items-center justify-center">
                  {isLoading ? (
                    <div className="w-8 h-8 border-4 border-gray-600 border-t-indigo-500 rounded-full animate-spin"></div>
                  ) : null}
                </div>
              ))
            )}
          </div>
        ) : (
          // Single image view
          <div className="flex-grow relative">
            {isLoading && <GenerationAnimation isLoading={isLoading} />}
            {images.length > 0 ? (
              <div className="h-full rounded-lg bg-zinc-900/80 overflow-hidden">
                <img 
                  src={images[0]} 
                  alt="Generated image" 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="h-full rounded-lg bg-zinc-900/80 flex items-center justify-center">
                {isLoading ? (
                  <div className="w-8 h-8 border-4 border-gray-600 border-t-indigo-500 rounded-full animate-spin"></div>
                ) : null}
              </div>
            )}
            
            {/* Pagination for single view */}
            {images.length > 1 && (
              <div className="flex justify-center mt-4">
                <div className="bg-zinc-900 rounded-full py-2 px-4 flex items-center justify-between">
                  <button className="text-gray-400 mr-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <span className="text-white text-sm">1 / {images.length}</span>
                  <button className="text-gray-400 ml-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
};

export default ImageGrid;
