
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GitBranch, 
  Container, 
  Zap, 
  Server, 
  Database,
  Settings,
  Users,
  Activity,
  Code2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, color: 'text-blue-400' },
  { name: 'CodeBridge', href: '/code-bridge', icon: Code2, color: 'text-purple-400' },
  { name: 'API Testing', href: '/api-testing', icon: Zap, color: 'text-green-400' },
  { name: 'GitLab', href: '/gitlab', icon: GitBranch, color: 'text-orange-400' },
  { name: 'Docker', href: '/docker', icon: Container, color: 'text-cyan-400' },
  { name: 'Servers', href: '/servers', icon: Server, color: 'text-purple-400' },
  { name: 'AI-DB', href: '/ai-db', icon: Database, color: 'text-pink-400' },
];

const bottomNavigation = [
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Activity', href: '/activity', icon: Activity },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">DevOps Toolkit</h1>
        <p className="text-sm text-gray-400 mt-1">Cross-platform IDE Plugin</p>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )
            }
          >
            <item.icon className={cn('h-5 w-5 mr-3', item.color)} />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-gray-800 space-y-2">
        {bottomNavigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )
            }
          >
            <item.icon className="h-5 w-5 mr-3 text-gray-400" />
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
