import React from 'react';
import { useTheme } from '../providers/ThemeProvider';
import { Moon, Sun } from 'lucide-react';
import { Switch } from './ui/switch';

interface SettingsProps {
  isOpen: boolean;
}

const Settings: React.FC<SettingsProps> = ({ isOpen }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div 
      className={`mt-4 bg-secondary rounded-lg overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100 p-4' : 'max-h-0 opacity-0 p-0'
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">Settings</h2>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
          <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
        </div>
        <Switch 
          checked={theme === 'light'} 
          onCheckedChange={toggleTheme} 
          className="transition-all duration-200"
        />
      </div>
    </div>
  );
};

export default Settings;



