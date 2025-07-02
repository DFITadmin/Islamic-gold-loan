import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  Plus,
  Shield,
  UserCog,
  User,
  Users,
  Lock,
  KeyRound
} from "lucide-react";
import { User as UserType } from "@shared/schema";

export default function UserManagement() {
  const { data: users, isLoading } = useQuery<UserType[]>({
    queryKey: ["/api/users"],
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredUsers = searchQuery 
    ? users?.filter(user => 
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;
    
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 border-red-200 dark:border-red-800">Admin</Badge>;
      case "loan_officer":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-800">Loan Officer</Badge>;
      case "customer":
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800">Customer</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };
  
  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-5 w-5 text-red-500" />;
      case "loan_officer":
        return <UserCog className="h-5 w-5 text-blue-500" />;
      case "customer":
        return <User className="h-5 w-5 text-green-500" />;
      default:
        return <User className="h-5 w-5 text-muted-foreground" />;
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };
  
  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500";
      case "loan_officer":
        return "bg-blue-500";
      case "customer":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">User Management</h1>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Manage system users and permissions
            </p>
          </div>
          <div className="mt-4 md:mt-0 w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search users..." 
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="default">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <h3 className="text-2xl font-bold mt-2">{users?.length || 0}</h3>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Loan Officers</p>
                  <h3 className="text-2xl font-bold mt-2">
                    {users?.filter(user => user.role === "loan_officer").length || 0}
                  </h3>
                </div>
                <div className="bg-blue-500/10 p-2 rounded-full">
                  <UserCog className="h-5 w-5 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Administrators</p>
                  <h3 className="text-2xl font-bold mt-2">
                    {users?.filter(user => user.role === "admin").length || 0}
                  </h3>
                </div>
                <div className="bg-red-500/10 p-2 rounded-full">
                  <Shield className="h-5 w-5 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="px-6 py-4 border-b border-border">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>System Users</CardTitle>
                <CardDescription>
                  Manage user accounts and access permissions
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      Loading users...
                    </TableCell>
                  </TableRow>
                ) : !filteredUsers || filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback className={`${getRoleColor(user.role)} text-white text-xs`}>
                              {getInitials(user.fullName)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user.fullName}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getRoleIcon(user.role)}
                          <span className="ml-2">{getRoleBadge(user.role)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm">
                          <UserCog className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Lock className="h-4 w-4 mr-2" />
                          Reset
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="px-6 py-4 border-t border-border flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredUsers?.length || 0} users
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </CardFooter>
        </Card>
        
        <div className="mt-6">
          <Card className="islamic-border border-primary">
            <CardHeader className="px-6 py-4 border-b border-border">
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                System security and access control settings
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="p-4 border-b border-border">
                    <div className="flex items-center">
                      <Lock className="h-5 w-5 mr-2 text-primary" />
                      <CardTitle className="text-base">Authentication Policy</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-muted-foreground">Require 2FA for admin users</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Password Complexity</p>
                          <p className="text-sm text-muted-foreground">Strong passwords required</p>
                        </div>
                        <Button variant="outline" size="sm">Edit Rules</Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Login Attempts</p>
                          <p className="text-sm text-muted-foreground">Maximum 5 failed attempts</p>
                        </div>
                        <Button variant="outline" size="sm">Change</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="p-4 border-b border-border">
                    <div className="flex items-center">
                      <KeyRound className="h-5 w-5 mr-2 text-primary" />
                      <CardTitle className="text-base">Role Permissions</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Administrator</p>
                          <p className="text-sm text-muted-foreground">Full system access</p>
                        </div>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Loan Officer</p>
                          <p className="text-sm text-muted-foreground">Limited approval access</p>
                        </div>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Customer</p>
                          <p className="text-sm text-muted-foreground">Self-service portal only</p>
                        </div>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
