
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MoreVertical } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [showAboutDialog, setShowAboutDialog] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <header className="flex justify-between items-center py-4 px-4">
          <div className="flex items-center">
            <h1 className="text-white text-xl font-medium">ImageFX</h1>
            <ChevronDown className="w-5 h-5 text-gray-400 ml-1" />
          </div>
          
          <div className="flex items-center">
            <button 
              className="mx-4"
              onClick={() => setShowAboutDialog(true)}
              aria-label="About ImageFX"
            >
              <HelpCircle className="w-6 h-6 text-white" />
            </button>
            <button className="mx-4">
              <MoreVertical className="w-6 h-6 text-white" />
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt="User avatar"
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </header>
      ) : (
        <header className="flex justify-between items-center py-4 px-6">
          <div className="flex items-center">
            <h1 className="text-white text-2xl font-medium">ImageFX</h1>
            <ChevronDown className="w-5 h-5 text-gray-400 ml-1" />
          </div>
          
          <div className="flex items-center">
            <button 
              className="mr-4 flex items-center justify-center"
              onClick={() => setShowAboutDialog(true)}
              aria-label="About ImageFX"
            >
              <HelpCircle className="w-6 h-6 text-white" />
            </button>
            <MoreVertical className="w-6 h-6 text-white mr-4" />
            <div className="w-10 h-10 rounded-full bg-purple-500 overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt="User avatar"
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </header>
      )}

      <Dialog open={showAboutDialog} onOpenChange={setShowAboutDialog}>
        <DialogContent className="bg-[#1e1e3a] text-white border-none max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl text-indigo-300">About ImageFX</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <p>
              We want the ImageFX experience to be safe, fun, and educational. Therefore, we prohibit users from knowingly generating certain categories of content.
            </p>
            <p>
              ImageFX features precautions to protect minors so certain queries that could lead to outputs of children will not be generated. Additionally, certain queries that could lead to outputs of prominent people will also not be generated.
            </p>
          </div>
          <div className="flex justify-end mt-4">
            <button 
              className="text-indigo-300 hover:text-indigo-200"
              onClick={() => setShowAboutDialog(false)}
            >
              Got it
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;







