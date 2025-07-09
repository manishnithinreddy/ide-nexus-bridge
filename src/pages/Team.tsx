
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  UserPlus, 
  Settings, 
  Search,
  Mail,
  Shield,
  Crown,
  User
} from 'lucide-react';

export const Team = () => {
  const [teamMembers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'Admin',
      department: 'DevOps',
      status: 'active',
      lastActive: '2 minutes ago',
      permissions: ['All Access']
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      role: 'Developer',
      department: 'Frontend',
      status: 'active',
      lastActive: '15 minutes ago',
      permissions: ['Code Access', 'API Testing']
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@company.com',
      role: 'DevOps Engineer',
      department: 'Infrastructure',
      status: 'away',
      lastActive: '1 hour ago',
      permissions: ['Server Access', 'Docker Management']
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Database Admin',
      department: 'Data',
      status: 'offline',
      lastActive: '1 day ago',
      permissions: ['Database Access', 'AI-DB Services']
    }
  ]);

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return <Crown className="h-4 w-4 text-yellow-400" />;
      case 'developer': return <User className="h-4 w-4 text-blue-400" />;
      case 'devops engineer': return <Shield className="h-4 w-4 text-purple-400" />;
      case 'database admin': return <Shield className="h-4 w-4 text-pink-400" />;
      default: return <User className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'away': return 'text-yellow-400 bg-yellow-400/10';
      case 'offline': return 'text-gray-400 bg-gray-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Team Management</h1>
          <p className="text-gray-400">Manage team members, roles, and permissions</p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-blue-500 hover:bg-blue-600">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
          <Button variant="outline" className="border-gray-600">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search team members..." 
            className="pl-10 bg-gray-800 border-gray-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="bg-gray-800 border-gray-700 p-6">
            <div className="flex items-start space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-gray-700 text-white">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold text-white truncate">{member.name}</h3>
                  {getRoleIcon(member.role)}
                </div>
                
                <div className="flex items-center space-x-2 mb-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <p className="text-gray-400 text-sm truncate">{member.email}</p>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    {member.role}
                  </Badge>
                  <Badge className={getStatusColor(member.status)}>
                    {member.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-400">Department: </span>
                    <span className="text-white">{member.department}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Last active: </span>
                    <span className="text-white">{member.lastActive}</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-gray-400 text-sm mb-1">Permissions:</p>
                  <div className="flex flex-wrap gap-1">
                    {member.permissions.map((permission, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="border-blue-500 text-blue-400 text-xs"
                      >
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <Button size="sm" variant="outline" className="border-gray-600 flex-1">
                    Edit
                  </Button>
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600 flex-1">
                    Message
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="bg-gray-800 border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Users className="h-6 w-6 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Team Statistics</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">4</p>
            <p className="text-gray-400 text-sm">Total Members</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">2</p>
            <p className="text-gray-400 text-sm">Active Now</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">1</p>
            <p className="text-gray-400 text-sm">Away</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-400">1</p>
            <p className="text-gray-400 text-sm">Offline</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
