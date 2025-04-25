
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

type Theme = 'light' | 'dark' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('system');
  const [accentColor, setAccentColor] = useState<string>('purple');
  const { toast } = useToast();
  
  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('swiftmail-theme') as Theme;
    const savedAccentColor = localStorage.getItem('swiftmail-accent');
    
    if (savedTheme) {
      setTheme(savedTheme);
    }
    
    if (savedAccentColor) {
      setAccentColor(savedAccentColor);
    }
  }, []);
  
  // Update the document class when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Save theme preference to localStorage
    localStorage.setItem('swiftmail-theme', theme);
    
    // Handle system preference
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      
      root.classList.remove('light', 'dark');
      root.classList.add(systemTheme);
      return;
    }
    
    // Apply theme
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);
  
  // Update accent color
  useEffect(() => {
    localStorage.setItem('swiftmail-accent', accentColor);
    
    // Show toast when accent color changes (except initial load)
    if (accentColor && document.body.dataset.loaded) {
      toast({
        title: 'Appearance updated',
        description: `Accent color changed to ${accentColor}`,
      });
    }
    
    document.body.dataset.loaded = 'true';
  }, [accentColor, toast]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accentColor, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
