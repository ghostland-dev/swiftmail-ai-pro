
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/button';
import { RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // In a production app, you would log to a service like Sentry here
  }
  
  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
            <p className="text-muted-foreground mb-6">
              We've encountered an unexpected error. Please try refreshing the page.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button onClick={() => window.location.reload()}>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Refresh page
              </Button>
              <Button variant="outline" onClick={this.handleReset}>
                Try to recover
              </Button>
            </div>
            
            {process.env.NODE_ENV !== 'production' && this.state.error && (
              <div className="mt-6 p-4 bg-background/50 border rounded-md text-left overflow-auto max-h-60">
                <p className="font-mono text-sm">{this.state.error.toString()}</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
