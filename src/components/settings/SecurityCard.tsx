
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Shield, LockKeyhole, KeyRound } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export function SecurityCard() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(true);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const { toast } = useToast();

  const handleTwoFactorToggle = (checked: boolean) => {
    if (checked) {
      // In a real app, this would open a 2FA setup flow
      setShowPasswordDialog(true);
    } else {
      setTwoFactorEnabled(false);
      toast({
        title: 'Two-Factor Authentication Disabled',
        description: 'Your account is now less secure.',
        variant: 'destructive'
      });
    }
  };

  const handleEnableTwoFactor = () => {
    setTwoFactorEnabled(true);
    setShowPasswordDialog(false);
    toast({
      title: 'Two-Factor Authentication Enabled',
      description: 'Your account is now more secure.'
    });
  };

  const handleSessionTimeoutToggle = (checked: boolean) => {
    setSessionTimeout(checked);
    toast({
      title: checked ? 'Auto Logout Enabled' : 'Auto Logout Disabled',
      description: checked 
        ? 'You will be logged out after 30 minutes of inactivity.' 
        : 'You will stay logged in until you manually log out.'
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Manage your account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={handleTwoFactorToggle} />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LockKeyhole className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Session Timeout</p>
                <p className="text-sm text-muted-foreground">
                  Automatically log out after 30 minutes of inactivity
                </p>
              </div>
            </div>
            <Switch checked={sessionTimeout} onCheckedChange={handleSessionTimeoutToggle} />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <KeyRound className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-muted-foreground">
                  Update your password to keep your account secure
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={() => setShowPasswordDialog(true)}>
              Change
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and a new password.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="current" className="text-sm font-medium">
                Current Password
              </label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-2">
              <label htmlFor="new" className="text-sm font-medium">
                New Password
              </label>
              <Input id="new" type="password" />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirm" className="text-sm font-medium">
                Confirm New Password
              </label>
              <Input id="confirm" type="password" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>Cancel</Button>
            <Button onClick={handleEnableTwoFactor} className="bg-purple-600 hover:bg-purple-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
