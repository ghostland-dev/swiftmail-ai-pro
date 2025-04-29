
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Palette, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export function AppearanceCard() {
  const { theme, setTheme, accentColor, setAccentColor } = useTheme();
  
  const accentColors = [
    { value: 'purple', color: 'bg-purple-500', label: 'Purple' },
    { value: 'blue', color: 'bg-blue-500', label: 'Blue' },
    { value: 'green', color: 'bg-green-500', label: 'Green' },
    { value: 'red', color: 'bg-red-500', label: 'Red' },
    { value: 'orange', color: 'bg-orange-500', label: 'Orange' },
    { value: 'pink', color: 'bg-pink-500', label: 'Pink' },
  ];
  
  const isDarkMode = theme === 'dark' || (theme === 'system' && 
    window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <Card className="border shadow-md transition-all duration-300">
      <CardHeader>
        <CardTitle>Theme</CardTitle>
        <CardDescription>Customize the look and feel</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <Palette className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Appearance</p>
              <p className="text-sm text-muted-foreground">
                Choose your preferred theme
              </p>
            </div>
          </div>
          
          <RadioGroup 
            value={theme} 
            className="grid grid-cols-3 gap-2 mt-3"
            onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}
          >
            <div className="flex flex-col items-center gap-1">
              <Label
                htmlFor="theme-light"
                className={cn(
                  "cursor-pointer border rounded-md p-3 hover:bg-accent flex flex-col items-center gap-2 w-full transition-all",
                  theme === "light" && "border-primary bg-accent"
                )}
              >
                <Sun className="h-6 w-6" />
                <RadioGroupItem value="light" id="theme-light" className="sr-only" />
                <span className="text-sm">Light</span>
              </Label>
            </div>
            
            <div className="flex flex-col items-center gap-1">
              <Label
                htmlFor="theme-dark"
                className={cn(
                  "cursor-pointer border rounded-md p-3 hover:bg-accent flex flex-col items-center gap-2 w-full transition-all",
                  theme === "dark" && "border-primary bg-accent"
                )}
              >
                <Moon className="h-6 w-6" />
                <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
                <span className="text-sm">Dark</span>
              </Label>
            </div>
            
            <div className="flex flex-col items-center gap-1">
              <Label
                htmlFor="theme-system"
                className={cn(
                  "cursor-pointer border rounded-md p-3 hover:bg-accent flex flex-col items-center gap-2 w-full transition-all",
                  theme === "system" && "border-primary bg-accent"
                )}
              >
                <Monitor className="h-6 w-6" />
                <RadioGroupItem value="system" id="theme-system" className="sr-only" />
                <span className="text-sm">System</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <Palette className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Accent Color</p>
              <p className="text-sm text-muted-foreground">
                Change the primary color of the interface
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 mt-3">
            {accentColors.map((colorOption) => (
              <button
                key={colorOption.value}
                className={cn(
                  "flex items-center gap-2 p-3 rounded-md border transition-all hover:bg-accent/50",
                  accentColor === colorOption.value && "border-primary bg-accent"
                )}
                onClick={() => setAccentColor(colorOption.value)}
                aria-label={`Set accent color to ${colorOption.value}`}
              >
                <span 
                  className={`w-5 h-5 rounded-full ${colorOption.color}`}
                  aria-hidden="true"
                ></span>
                <span className="text-sm">{colorOption.label}</span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
