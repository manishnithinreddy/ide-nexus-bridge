
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Database,
  Zap,
  Save
} from 'lucide-react';

export const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    desktop: true,
    slack: false
  });

  const [preferences, setPreferences] = useState({
    darkMode: true,
    autoSave: true,
    showLineNumbers: true,
    enableAI: true
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Customize your DevOps toolkit experience</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <User className="h-6 w-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Profile Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                  <Input 
                    id="name" 
                    defaultValue="John Doe" 
                    className="bg-gray-900 border-gray-600 text-white mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue="john.doe@company.com" 
                    className="bg-gray-900 border-gray-600 text-white mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="role" className="text-gray-300">Role</Label>
                  <Input 
                    id="role" 
                    defaultValue="Senior DevOps Engineer" 
                    className="bg-gray-900 border-gray-600 text-white mt-1"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="department" className="text-gray-300">Department</Label>
                  <Input 
                    id="department" 
                    defaultValue="Engineering" 
                    className="bg-gray-900 border-gray-600 text-white mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="timezone" className="text-gray-300">Timezone</Label>
                  <Input 
                    id="timezone" 
                    defaultValue="UTC-8 (Pacific)" 
                    className="bg-gray-900 border-gray-600 text-white mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                  <Input 
                    id="phone" 
                    defaultValue="+1 (555) 123-4567" 
                    className="bg-gray-900 border-gray-600 text-white mt-1"
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="h-6 w-6 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">Notification Preferences</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Email Notifications</Label>
                  <p className="text-gray-400 text-sm">Receive notifications via email</p>
                </div>
                <Switch 
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Push Notifications</Label>
                  <p className="text-gray-400 text-sm">Receive push notifications on mobile</p>
                </div>
                <Switch 
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Desktop Notifications</Label>
                  <p className="text-gray-400 text-sm">Show desktop notifications</p>
                </div>
                <Switch 
                  checked={notifications.desktop}
                  onCheckedChange={(checked) => setNotifications({...notifications, desktop: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Slack Integration</Label>
                  <p className="text-gray-400 text-sm">Send notifications to Slack</p>
                </div>
                <Switch 
                  checked={notifications.slack}
                  onCheckedChange={(checked) => setNotifications({...notifications, slack: checked})}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Palette className="h-6 w-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Application Preferences</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Dark Mode</Label>
                  <p className="text-gray-400 text-sm">Use dark theme for the interface</p>
                </div>
                <Switch 
                  checked={preferences.darkMode}
                  onCheckedChange={(checked) => setPreferences({...preferences, darkMode: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Auto Save</Label>
                  <p className="text-gray-400 text-sm">Automatically save changes</p>
                </div>
                <Switch 
                  checked={preferences.autoSave}
                  onCheckedChange={(checked) => setPreferences({...preferences, autoSave: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Show Line Numbers</Label>
                  <p className="text-gray-400 text-sm">Display line numbers in code editor</p>
                </div>
                <Switch 
                  checked={preferences.showLineNumbers}
                  onCheckedChange={(checked) => setPreferences({...preferences, showLineNumbers: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Enable AI Features</Label>
                  <p className="text-gray-400 text-sm">Use AI-powered code generation and assistance</p>
                </div>
                <Switch 
                  checked={preferences.enableAI}
                  onCheckedChange={(checked) => setPreferences({...preferences, enableAI: checked})}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gray-800 border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Database className="h-6 w-6 text-pink-400" />
                <h3 className="text-lg font-semibold text-white">Database Connections</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">PostgreSQL</span>
                  <Button size="sm" variant="outline" className="border-gray-600">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">MongoDB</span>
                  <Button size="sm" variant="outline" className="border-gray-600">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Redis</span>
                  <Button size="sm" variant="outline" className="border-gray-600">
                    Configure
                  </Button>
                </div>
              </div>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="h-6 w-6 text-green-400" />
                <h3 className="text-lg font-semibold text-white">External Services</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">GitLab</span>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                    Connected
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Docker Hub</span>
                  <Button size="sm" variant="outline" className="border-gray-600">
                    Connect
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Slack</span>
                  <Button size="sm" variant="outline" className="border-gray-600">
                    Connect
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Security Settings</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="current-password" className="text-gray-300">Current Password</Label>
                <Input 
                  id="current-password" 
                  type="password" 
                  className="bg-gray-900 border-gray-600 text-white mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="new-password" className="text-gray-300">New Password</Label>
                <Input 
                  id="new-password" 
                  type="password" 
                  className="bg-gray-900 border-gray-600 text-white mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="confirm-password" className="text-gray-300">Confirm New Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  className="bg-gray-900 border-gray-600 text-white mt-1"
                />
              </div>
              
              <div className="pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Label className="text-white">Two-Factor Authentication</Label>
                    <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                  </div>
                  <Button className="bg-green-500 hover:bg-green-600">
                    Enable 2FA
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">API Access Tokens</Label>
                    <p className="text-gray-400 text-sm">Manage your API access tokens</p>
                  </div>
                  <Button variant="outline" className="border-gray-600">
                    Manage Tokens
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
