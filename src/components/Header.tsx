
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MoreVertical } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [showAboutDialog, setShowAboutDialog] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      <header className={`flex justify-between items-center ${isMobile ? 'py-4 px-4' : 'py-4 px-6'}`}>
        <div className="flex items-center">
          <h1 className="text-foreground text-xl font-medium">ImageFX</h1>
          <ChevronDown className="w-5 h-5 text-muted-foreground ml-1" />
        </div>
        
        <div className="flex items-center">
          <button 
            className="mx-4"
            onClick={() => setShowAboutDialog(true)}
            aria-label="About ImageFX"
          >
            <HelpCircle className="w-6 h-6 text-foreground" />
          </button>
          <button className="mx-4">
            <MoreVertical className="w-6 h-6 text-foreground" />
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

      <Dialog open={showAboutDialog} onOpenChange={setShowAboutDialog}>
        <DialogContent className="bg-background text-foreground border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl text-primary">About ImageFX</DialogTitle>
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
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
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








