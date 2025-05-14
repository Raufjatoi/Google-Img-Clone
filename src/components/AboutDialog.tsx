import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AboutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AboutDialog = ({ open, onOpenChange }: AboutDialogProps) => {
  console.log("AboutDialog rendered with open:", open);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            onClick={() => onOpenChange(false)}
          >
            Got it
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutDialog;


