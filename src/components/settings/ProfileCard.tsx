
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';

export function ProfileCard() {
  const [form, setForm] = useState({
    name: 'Jane Doe',
    displayName: 'Jane',
    email: 'jane.doe@example.com',
    signature: 'Best regards, Jane'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [tempForm, setTempForm] = useState(form);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setTempForm(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    setForm(tempForm);
    setIsEditing(false);
    
    // In a real app, this would save to a backend
    localStorage.setItem('swiftmail-profile', JSON.stringify(tempForm));
    
    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been saved successfully.',
    });
  };

  const handleCancel = () => {
    setTempForm(form);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </div>
        {!isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <span className="text-2xl">{form.displayName.substring(0, 2)}</span>
          </Avatar>
          <div>
            <Button variant="outline" size="sm" className="mb-1">
              Upload new photo
            </Button>
            <p className="text-xs text-muted-foreground">
              JPG, GIF or PNG. 1MB max.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name
            </label>
            <Input 
              id="name" 
              value={isEditing ? tempForm.name : form.name} 
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="displayName" className="text-sm font-medium">
              Display Name
            </label>
            <Input 
              id="displayName" 
              value={isEditing ? tempForm.displayName : form.displayName} 
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <Input 
              id="email" 
              value={isEditing ? tempForm.email : form.email} 
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="signature" className="text-sm font-medium">
              Email Signature
            </label>
            <Input 
              id="signature" 
              value={isEditing ? tempForm.signature : form.signature} 
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
            />
          </div>
        </div>
        
        {isEditing && (
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
