
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Palette, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export function AppearanceCard() {
  const { theme, setTheme, accentColor, setAccentColor } = useTheme();
  
  const accentColors = [
    { value: 'purple', color: 'bg-purple-500' },
    { value: 'blue', color: 'bg-blue-500' },
    { value: 'green', color: 'bg-green-500' },
    { value: 'red', color: 'bg-red-500' },
    { value: 'orange', color: 'bg-orange-500' },
    { value: 'pink', color: 'bg-pink-500' },
  ];
  
  const isDarkMode = theme === 'dark' || (theme === 'system' && 
    window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme</CardTitle>
        <CardDescription>Customize the look and feel</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Palette className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Appearance</p>
              <p className="text-sm text-muted-foreground">
                Choose your preferred theme
              </p>
            </div>
          </div>
          
          <RadioGroup 
            value={theme} 
            className="flex items-center gap-4 mt-2"
            onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}
          >
            <div className="flex flex-col items-center gap-1">
              <Label
                htmlFor="theme-light"
                className="cursor-pointer border rounded-md p-2 hover:bg-accent flex flex-col items-center gap-1"
              >
                <Sun className="h-5 w-5" />
                <RadioGroupItem value="light" id="theme-light" className="sr-only" />
                <span className="text-xs">Light</span>
              </Label>
            </div>
            
            <div className="flex flex-col items-center gap-1">
              <Label
                htmlFor="theme-dark"
                className="cursor-pointer border rounded-md p-2 hover:bg-accent flex flex-col items-center gap-1"
              >
                <Moon className="h-5 w-5" />
                <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
                <span className="text-xs">Dark</span>
              </Label>
            </div>
            
            <div className="flex flex-col items-center gap-1">
              <Label
                htmlFor="theme-system"
                className="cursor-pointer border rounded-md p-2 hover:bg-accent flex flex-col items-center gap-1"
              >
                <Monitor className="h-5 w-5" />
                <RadioGroupItem value="system" id="theme-system" className="sr-only" />
                <span className="text-xs">System</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Palette className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Accent Color</p>
              <p className="text-sm text-muted-foreground">
                Change the primary color of the interface
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            {accentColors.map((colorOption) => (
              <button
                key={colorOption.value}
                className={`w-6 h-6 rounded-full ${colorOption.color} cursor-pointer transition-all ${
                  accentColor === colorOption.value 
                    ? 'ring-2 ring-offset-2 ' + (isDarkMode ? 'ring-white' : 'ring-black') 
                    : ''
                }`}
                onClick={() => setAccentColor(colorOption.value)}
                aria-label={`Set accent color to ${colorOption.value}`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
