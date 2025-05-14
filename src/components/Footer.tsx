
import React from 'react';

const Footer = () => {
  return (
    <footer className="flex justify-between items-center py-3 px-6 text-xs">
      <p className="text-gray-500">Disclaimer: /FX tools can make mistakes, so double-check them</p>
      <div className="flex">
        <a href="#" className="text-gray-500 hover:text-gray-400">Privacy</a>
        <span className="mx-4 text-gray-500">|</span>
        <a href="#" className="text-gray-500 hover:text-gray-400">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
