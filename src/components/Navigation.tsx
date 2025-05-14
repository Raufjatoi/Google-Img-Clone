
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ImageIcon } from 'lucide-react';

const Navigation = () => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return null; // No navigation on desktop
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800">
      <div className="flex justify-between px-8 py-4">
        <button className="text-indigo-400 text-sm border-b-2 border-indigo-400 pb-1">
          Input
        </button>
        <button className="text-white text-sm">
          Settings
        </button>
      </div>
      
      <div className="absolute bottom-16 right-6">
        <button className="bg-indigo-400 rounded-full p-3">
          <ImageIcon className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Navigation;



