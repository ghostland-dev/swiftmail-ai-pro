
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Key, ArrowRight, Lock, ChevronRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Invalid credentials",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate login - in a real app this would call an API
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
      toast({
        title: "Welcome back!",
        description: "Successfully logged in to SwiftMail",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Left side: Hero section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 lg:p-20 space-y-8">
        <div className="max-w-lg">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-3 rounded-xl shadow-lg">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h1 className="ml-4 text-4xl font-bold text-gray-900">SwiftMail</h1>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            The <span className="text-purple-600">smarter way</span> to manage your emails
          </h2>
          
          <p className="text-lg text-gray-600 mb-8">
            Boost your productivity with our AI-powered email client designed for professionals.
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="bg-purple-100 p-2 rounded-full">
                <ChevronRight className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <h3 className="font-medium">Smart Sorting</h3>
                <p className="text-sm text-gray-500">Automatically categorizes your emails</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-purple-100 p-2 rounded-full">
                <ChevronRight className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <h3 className="font-medium">Quick Replies</h3>
                <p className="text-sm text-gray-500">AI-generated responses save time</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-purple-100 p-2 rounded-full">
                <ChevronRight className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <h3 className="font-medium">Focus Mode</h3>
                <p className="text-sm text-gray-500">Eliminate distractions</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-purple-100 p-2 rounded-full">
                <ChevronRight className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <h3 className="font-medium">Keyboard Shortcuts</h3>
                <p className="text-sm text-gray-500">Navigate effortlessly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side: Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white md:bg-transparent">
        <div className="w-full max-w-md space-y-6">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>
                Sign in to continue to your inbox
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-5 pt-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email address"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
                
                <Separator className="my-2" />
                
                <div className="text-center text-sm">
                  <span className="text-gray-500">Don't have an account?</span>{' '}
                  <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                    Sign up for free
                  </a>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
