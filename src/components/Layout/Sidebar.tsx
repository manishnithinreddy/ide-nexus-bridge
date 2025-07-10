
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
  Code2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  containerSize?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle, containerSize }) => {
  const isCompact = containerSize === 'compact';
  
  return (
    <div className={cn(
      "bg-gray-900 border-r border-gray-800 flex flex-col h-full transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className={cn(
        "border-b border-gray-800 flex items-center justify-between",
        isCompact ? "p-2" : "p-4"
      )}>
        {!collapsed && (
          <div>
            <h1 className={cn(
              "font-bold text-white",
              isCompact ? "text-sm" : "text-xl"
            )}>
              DevOps Toolkit
            </h1>
            {!isCompact && (
              <p className="text-xs text-gray-400 mt-1">Cross-platform IDE Plugin</p>
            )}
          </div>
        )}
        
        {onToggle && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-gray-400 hover:text-white hover:bg-gray-800 p-1"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        )}
      </div>

      {/* Main Navigation */}
      <nav className={cn(
        "flex-1 space-y-1",
        isCompact ? "p-1" : "p-4"
      )}>
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center rounded-lg text-sm font-medium transition-colors group',
                isCompact ? 'px-2 py-1' : 'px-3 py-2',
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )
            }
            title={collapsed ? item.name : undefined}
          >
            <item.icon className={cn(
              'flex-shrink-0',
              item.color,
              collapsed ? 'h-5 w-5' : 'h-5 w-5 mr-3'
            )} />
            {!collapsed && (
              <span className={cn(
                "truncate",
                isCompact ? "text-xs" : "text-sm"
              )}>
                {item.name}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className={cn(
        "border-t border-gray-800 space-y-1",
        isCompact ? "p-1" : "p-4"
      )}>
        {bottomNavigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center rounded-lg text-sm font-medium transition-colors',
                isCompact ? 'px-2 py-1' : 'px-3 py-2',
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )
            }
            title={collapsed ? item.name : undefined}
          >
            <item.icon className={cn(
              'flex-shrink-0 text-gray-400',
              collapsed ? 'h-5 w-5' : 'h-5 w-5 mr-3'
            )} />
            {!collapsed && (
              <span className={cn(
                "truncate",
                isCompact ? "text-xs" : "text-sm"
              )}>
                {item.name}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
