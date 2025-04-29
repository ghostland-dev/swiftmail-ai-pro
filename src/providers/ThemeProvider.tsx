
import * as React from 'react';
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
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>('system');
  const [accentColor, setAccentColor] = React.useState<string>('purple');
  const [resolvedTheme, setResolvedTheme] = React.useState<'light' | 'dark'>('light');
  const { toast } = useToast();
  
  React.useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('swiftmail-theme') as Theme;
    const savedAccentColor = localStorage.getItem('swiftmail-accent');
    
    if (savedTheme) {
      setTheme(savedTheme);
    }
    
    if (savedAccentColor) {
      setAccentColor(savedAccentColor);
    }
    
    // Add a class to the body for pre-transition state
    document.body.classList.add('theme-transition-ready');
  }, []);
  
  // Update the document class when theme changes
  React.useEffect(() => {
    const root = window.document.documentElement;
    
    // Save theme preference to localStorage
    localStorage.setItem('swiftmail-theme', theme);
    
    // Apply a class to prepare for theme transition
    root.classList.add('theme-transition');
    
    // Handle system preference
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      
      root.classList.remove('light', 'dark');
      root.classList.add(systemTheme);
      setResolvedTheme(systemTheme);
    } else {
      // Apply theme
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      setResolvedTheme(theme as 'light' | 'dark');
    }
    
    // Remove transition class after theme is applied
    setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 300);
  }, [theme]);
  
  // Update accent color and apply to CSS variables
  React.useEffect(() => {
    localStorage.setItem('swiftmail-accent', accentColor);
    
    // Show toast when accent color changes (except initial load)
    if (accentColor && document.body.dataset.loaded) {
      toast({
        title: 'Appearance updated',
        description: `Accent color changed to ${accentColor}`,
      });
    }
    
    document.body.dataset.loaded = 'true';
    
    // Apply accent color to CSS variables
    const root = document.documentElement;
    const colors = {
      purple: { hue: '262', saturation: '80%' },
      blue: { hue: '221', saturation: '83%' },
      green: { hue: '142', saturation: '71%' },
      red: { hue: '0', saturation: '72%' },
      orange: { hue: '24', saturation: '95%' },
      pink: { hue: '330', saturation: '81%' }
    };
    
    const colorInfo = colors[accentColor as keyof typeof colors] || colors.purple;
    
    root.style.setProperty('--accent-hue', colorInfo.hue);
    root.style.setProperty('--accent-saturation', colorInfo.saturation);
    
  }, [accentColor, toast]);

  // Set up system theme change listener
  React.useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      const newTheme = mediaQuery.matches ? 'dark' : 'light';
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newTheme);
      setResolvedTheme(newTheme);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      accentColor, 
      setAccentColor, 
      resolvedTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
