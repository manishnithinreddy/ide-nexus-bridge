
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Phone, 
  MapPin,
  Crown,
  Shield,
  User
} from 'lucide-react';

interface TeamProps {
  containerSize?: string;
}

export const Team: React.FC<TeamProps> = ({ containerSize }) => {
  const isCompact = containerSize === 'compact';

  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'Team Lead',
      department: 'Engineering',
      status: 'online',
      avatar: 'JD',
      location: 'San Francisco, CA',
      phone: '+1 (555) 123-4567'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      role: 'Senior Developer',
      department: 'Engineering',
      status: 'online',
      avatar: 'JS',
      location: 'New York, NY',
      phone: '+1 (555) 234-5678'
    },
    {
      id: 3,
      name: 'Bob Wilson',
      email: 'bob.wilson@company.com',
      role: 'DevOps Engineer',
      department: 'Operations',
      status: 'away',
      avatar: 'BW',
      location: 'Austin, TX',
      phone: '+1 (555) 345-6789'
    },
    {
      id: 4,
      name: 'Alice Johnson',
      email: 'alice.johnson@company.com',
      role: 'Product Manager',
      department: 'Product',
      status: 'offline',
      avatar: 'AJ',
      location: 'Seattle, WA',
      phone: '+1 (555) 456-7890'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleIcon = (role: string) => {
    if (role.includes('Lead')) return <Crown className="h-4 w-4 text-yellow-400" />;
    if (role.includes('Senior')) return <Shield className="h-4 w-4 text-blue-400" />;
    return <User className="h-4 w-4 text-gray-400" />;
  };

  return (
    <div className={`space-y-${isCompact ? '3' : '6'} ${isCompact ? 'p-3' : 'p-6'}`}>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className={`font-bold text-white mb-2 flex items-center gap-3 ${isCompact ? 'text-xl' : 'text-3xl'}`}>
              <Users className={`${isCompact ? 'h-6 w-6' : 'h-8 w-8'} text-blue-400`} />
              Team Management
            </h1>
            <p className={`text-gray-400 ${isCompact ? 'text-sm' : ''}`}>
              {isCompact ? 'Manage team members' : 'Manage team members, roles, and collaboration'}
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="h-4 w-4 mr-2" />
            {isCompact ? 'Add' : 'Add Member'}
          </Button>
        </div>

        {/* Team Stats */}
        <div className={`grid gap-${isCompact ? '2' : '4'} mb-${isCompact ? '3' : '6'} ${
          isCompact ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'
        }`}>
          <Card className="bg-gray-800 border-gray-700">
            <div className={isCompact ? 'p-3' : 'p-4'}>
              <div className="text-center">
                <div className={`font-bold text-white ${isCompact ? 'text-lg' : 'text-2xl'}`}>
                  {teamMembers.length}
                </div>
                <div className="text-xs text-gray-400">Total Members</div>
              </div>
            </div>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <div className={isCompact ? 'p-3' : 'p-4'}>
              <div className="text-center">
                <div className={`font-bold text-green-400 ${isCompact ? 'text-lg' : 'text-2xl'}`}>
                  {teamMembers.filter(m => m.status === 'online').length}
                </div>
                <div className="text-xs text-gray-400">Online</div>
              </div>
            </div>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <div className={isCompact ? 'p-3' : 'p-4'}>
              <div className="text-center">
                <div className={`font-bold text-yellow-400 ${isCompact ? 'text-lg' : 'text-2xl'}`}>
                  {teamMembers.filter(m => m.status === 'away').length}
                </div>
                <div className="text-xs text-gray-400">Away</div>
              </div>
            </div>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <div className={isCompact ? 'p-3' : 'p-4'}>
              <div className="text-center">
                <div className={`font-bold text-gray-400 ${isCompact ? 'text-lg' : 'text-2xl'}`}>
                  {teamMembers.filter(m => m.status === 'offline').length}
                </div>
                <div className="text-xs text-gray-400">Offline</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Team Members */}
      <div className={`grid gap-${isCompact ? '3' : '4'} ${isCompact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
        {teamMembers.map((member) => (
          <Card key={member.id} className="bg-gray-800 border-gray-700">
            <div className={isCompact ? 'p-3' : 'p-4'}>
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <Avatar className={isCompact ? 'h-8 w-8' : 'h-12 w-12'}>
                    <AvatarFallback className="bg-gray-700 text-white">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 ${getStatusColor(member.status)}`}></div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-lg'}`}>
                        {member.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {getRoleIcon(member.role)}
                        <span className="text-sm text-gray-400">{member.role}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                      {member.department}
                    </Badge>
                  </div>

                  <div className={`space-y-1 text-sm ${isCompact ? 'text-xs' : ''}`}>
                    <div className="flex items-center text-gray-400">
                      <Mail className="h-3 w-3 mr-2" />
                      {member.email}
                    </div>
                    {!isCompact && (
                      <>
                        <div className="flex items-center text-gray-400">
                          <Phone className="h-3 w-3 mr-2" />
                          {member.phone}
                        </div>
                        <div className="flex items-center text-gray-400">
                          <MapPin className="h-3 w-3 mr-2" />
                          {member.location}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <Badge 
                      className={`text-xs ${getStatusColor(member.status)}`}
                      variant="outline"
                    >
                      {member.status}
                    </Badge>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost" className="h-8 px-2 text-gray-400 hover:text-white">
                        <Mail className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 px-2 text-gray-400 hover:text-white">
                        <Phone className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
