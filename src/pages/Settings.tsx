
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Globe,
  Key,
  Database,
  Monitor,
  Smartphone
} from 'lucide-react';

interface SettingsProps {
  containerSize?: string;
}

export const Settings: React.FC<SettingsProps> = ({ containerSize }) => {
  const isCompact = containerSize === 'compact';
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    desktop: true,
    security: true
  });

  const [privacy, setPrivacy] = useState({
    analytics: false,
    sharing: true,
    publicProfile: false
  });

  return (
    <div className={`space-y-${isCompact ? '3' : '6'} ${isCompact ? 'p-3' : 'p-6'}`}>
      <div>
        <h1 className={`font-bold text-white mb-2 flex items-center gap-3 ${isCompact ? 'text-xl' : 'text-3xl'}`}>
          <SettingsIcon className={`${isCompact ? 'h-6 w-6' : 'h-8 w-8'} text-gray-400`} />
          Settings
        </h1>
        <p className={`text-gray-400 ${isCompact ? 'text-sm' : ''}`}>
          {isCompact ? 'Manage app preferences' : 'Manage your application preferences and configurations'}
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="general" className={isCompact ? 'text-xs px-2' : ''}>General</TabsTrigger>
          <TabsTrigger value="notifications" className={isCompact ? 'text-xs px-2' : ''}>
            {isCompact ? 'Notifs' : 'Notifications'}
          </TabsTrigger>
          <TabsTrigger value="security" className={isCompact ? 'text-xs px-2' : ''}>Security</TabsTrigger>
          <TabsTrigger value="integrations" className={isCompact ? 'text-xs px-2' : ''}>
            {isCompact ? 'Integrations' : 'Integrations'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className={`grid gap-${isCompact ? '3' : '4'} ${isCompact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
            {/* Profile Settings */}
            <Card className="bg-gray-800 border-gray-700">
              <div className={isCompact ? 'p-3' : 'p-4'}>
                <div className="flex items-center mb-4">
                  <User className="h-5 w-5 text-blue-400 mr-2" />
                  <h3 className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-lg'}`}>
                    Profile Settings
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`text-gray-300 ${isCompact ? 'text-sm' : 'text-base'}`}>
                      Public Profile
                    </span>
                    <Switch 
                      checked={privacy.publicProfile}
                      onCheckedChange={(checked) => setPrivacy({...privacy, publicProfile: checked})}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-gray-300 ${isCompact ? 'text-sm' : 'text-base'}`}>
                      Activity Sharing
                    </span>
                    <Switch 
                      checked={privacy.sharing}
                      onCheckedChange={(checked) => setPrivacy({...privacy, sharing: checked})}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-gray-300 ${isCompact ? 'text-sm' : 'text-base'}`}>
                      Analytics Collection
                    </span>
                    <Switch 
                      checked={privacy.analytics}
                      onCheckedChange={(checked) => setPrivacy({...privacy, analytics: checked})}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Theme Settings */}
            <Card className="bg-gray-800 border-gray-700">
              <div className={isCompact ? 'p-3' : 'p-4'}>
                <div className="flex items-center mb-4">
                  <Palette className="h-5 w-5 text-purple-400 mr-2" />
                  <h3 className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-lg'}`}>
                    Appearance
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className={`text-gray-300 block mb-2 ${isCompact ? 'text-sm' : 'text-base'}`}>
                      Theme
                    </label>
                    <div className="flex space-x-2">
                      <Badge variant="default" className="cursor-pointer">Dark</Badge>
                      <Badge variant="outline" className="cursor-pointer border-gray-600 text-gray-400">Light</Badge>
                      <Badge variant="outline" className="cursor-pointer border-gray-600 text-gray-400">Auto</Badge>
                    </div>
                  </div>
                  <div>
                    <label className={`text-gray-300 block mb-2 ${isCompact ? 'text-sm' : 'text-base'}`}>
                      Color Scheme
                    </label>
                    <div className="flex space-x-2">
                      <div className="w-6 h-6 bg-blue-600 rounded-full cursor-pointer border-2 border-white"></div>
                      <div className="w-6 h-6 bg-purple-600 rounded-full cursor-pointer"></div>
                      <div className="w-6 h-6 bg-green-600 rounded-full cursor-pointer"></div>
                      <div className="w-6 h-6 bg-orange-600 rounded-full cursor-pointer"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Language & Region */}
            <Card className="bg-gray-800 border-gray-700">
              <div className={isCompact ? 'p-3' : 'p-4'}>
                <div className="flex items-center mb-4">
                  <Globe className="h-5 w-5 text-green-400 mr-2" />
                  <h3 className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-lg'}`}>
                    Language & Region
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className={`text-gray-300 block mb-2 ${isCompact ? 'text-sm' : 'text-base'}`}>
                      Language
                    </label>
                    <Badge variant="default">English (US)</Badge>
                  </div>
                  <div>
                    <label className={`text-gray-300 block mb-2 ${isCompact ? 'text-sm' : 'text-base'}`}>
                      Timezone
                    </label>
                    <Badge variant="outline" className="border-gray-600 text-gray-400">
                      UTC-8 (Pacific Time)
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Display Settings */}
            <Card className="bg-gray-800 border-gray-700">
              <div className={isCompact ? 'p-3' : 'p-4'}>
                <div className="flex items-center mb-4">
                  <Monitor className="h-5 w-5 text-cyan-400 mr-2" />
                  <h3 className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-lg'}`}>
                    Display
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`text-gray-300 ${isCompact ? 'text-sm' : 'text-base'}`}>
                      Compact Mode
                    </span>
                    <Switch checked={isCompact} disabled />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-gray-300 ${isCompact ? 'text-sm' : 'text-base'}`}>
                      Auto-resize
                    </span>
                    <Switch checked={true} />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <div className={isCompact ? 'p-3' : 'p-4'}>
              <div className="flex items-center mb-4">
                <Bell className="h-5 w-5 text-yellow-400 mr-2" />
                <h3 className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-lg'}`}>
                  Notification Preferences
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <div>
                    <span className={`text-gray-300 ${isCompact ? 'text-sm' : 'text-base'}`}>
                      Email Notifications
                    </span>
                    <p className="text-gray-500 text-sm">Receive updates via email</p>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                  />
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <span className={`text-gray-300 ${isCompact ? 'text-sm' : 'text-base'}`}>
                      Push Notifications
                    </span>
                    <p className="text-gray-500 text-sm">Browser push notifications</p>
                  </div>
                  <Switch 
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                  />
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <span className={`text-gray-300 ${isCompact ? 'text-sm' : 'text-base'}`}>
                      Desktop Notifications
                    </span>
                    <p className="text-gray-500 text-sm">System desktop alerts</p>
                  </div>
                  <Switch 
                    checked={notifications.desktop}
                    onCheckedChange={(checked) => setNotifications({...notifications, desktop: checked})}
                  />
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <span className={`text-gray-300 ${isCompact ? 'text-sm' : 'text-base'}`}>
                      Security Alerts
                    </span>
                    <p className="text-gray-500 text-sm">Critical security notifications</p>
                  </div>
                  <Switch 
                    checked={notifications.security}
                    onCheckedChange={(checked) => setNotifications({...notifications, security: checked})}
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className={`grid gap-${isCompact ? '3' : '4'} ${isCompact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
            <Card className="bg-gray-800 border-gray-700">
              <div className={isCompact ? 'p-3' : 'p-4'}>
                <div className="flex items-center mb-4">
                  <Shield className="h-5 w-5 text-red-400 mr-2" />
                  <h3 className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-lg'}`}>
                    Authentication
                  </h3>
                </div>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full bg-gray-700 border-gray-600 text-gray-300">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full bg-gray-700 border-gray-600 text-gray-300">
                    Setup 2FA
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <div className={isCompact ? 'p-3' : 'p-4'}>
                <div className="flex items-center mb-4">
                  <Key className="h-5 w-5 text-blue-400 mr-2" />
                  <h3 className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-lg'}`}>
                    API Keys
                  </h3>
                </div>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full bg-gray-700 border-gray-600 text-gray-300">
                    Generate API Key
                  </Button>
                  <Button variant="outline" className="w-full bg-gray-700 border-gray-600 text-gray-300">
                    Manage Keys
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <div className={`grid gap-${isCompact ? '3' : '4'} ${isCompact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
            <Card className="bg-gray-800 border-gray-700">
              <div className={isCompact ? 'p-3' : 'p-4'}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Database className="h-5 w-5 text-green-400 mr-2" />
                    <span className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-base'}`}>
                      Database Connections
                    </span>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
                <p className="text-gray-400 text-sm mb-3">
                  {isCompact ? '3 connected databases' : 'Manage database connections and credentials'}
                </p>
                <Button size="sm" variant="outline" className="bg-gray-700 border-gray-600 text-gray-300">
                  Configure
                </Button>
              </div>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <div className={isCompact ? 'p-3' : 'p-4'}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Smartphone className="h-5 w-5 text-purple-400 mr-2" />
                    <span className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-base'}`}>
                      Mobile App
                    </span>
                  </div>
                  <Badge variant="outline" className="border-gray-600 text-gray-400">Inactive</Badge>
                </div>
                <p className="text-gray-400 text-sm mb-3">
                  {isCompact ? 'Connect mobile app' : 'Connect with the CodeBridge mobile application'}
                </p>
                <Button size="sm" variant="outline" className="bg-gray-700 border-gray-600 text-gray-300">
                  Setup
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
