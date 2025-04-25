
import React, { useState } from 'react';
import { EmailHeader } from '@/components/EmailHeader';
import { EmailSidebar } from '@/components/EmailSidebar';
import { EmailList, Email } from '@/components/EmailList';
import { EmailDetail } from '@/components/EmailDetail';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Calendar,
  Paperclip,
  FileText,
  Users,
  X,
  ChevronDown
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { mockEmails } from '@/lib/data';

const SearchResults = () => {
  const [query, setQuery] = useState<string>('important emails');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [searchResults, setSearchResults] = useState<Email[]>(
    // Filter emails that match the query in subject or preview
    mockEmails.filter(
      email => email.subject.toLowerCase().includes('project') || 
               email.preview.toLowerCase().includes('project')
    )
  );

  const clearSearch = () => {
    setQuery('');
    // In a real app, this would reset to all emails
    setSearchResults([]);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would perform an actual search
    
    // For demo purposes, filter emails that contain the query
    if (query.trim()) {
      const filtered = mockEmails.filter(
        email => email.subject.toLowerCase().includes(query.toLowerCase()) || 
                 email.preview.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <EmailHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <EmailSidebar />
        
        <div className="flex flex-1 overflow-hidden flex-col">
          <div className="p-4 border-b">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input 
                  type="search" 
                  placeholder="Search emails..."
                  className="pl-10"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Button
                      variant="ghost" 
                      size="icon" 
                      className="h-5 w-5" 
                      onClick={clearSearch}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex gap-1">
                    Filters
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> 
                    <span>Date Range</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Paperclip className="h-4 w-4" /> 
                    <span>Has Attachment</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>From Specific Person</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Advanced Search</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Search</Button>
            </form>
          </div>
          
          <div className="flex flex-1 overflow-hidden border-t">
            <div className="w-1/3 border-r overflow-hidden flex flex-col">
              <div className="p-2 border-b">
                <h2 className="font-medium">
                  Results for "{query}" ({searchResults.length})
                </h2>
              </div>
              
              {searchResults.length > 0 ? (
                <EmailList 
                  emails={searchResults} 
                  onSelectEmail={setSelectedEmail}
                  selectedEmail={selectedEmail}
                />
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground p-8 text-center">
                  <div>
                    <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="font-medium mb-1">No results found</h3>
                    <p className="text-sm">Try adjusting your search or filter to find what you're looking for.</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex-1 overflow-hidden">
              <EmailDetail email={selectedEmail} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
