import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { ApplicationForm } from "@/components/loans/application-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Plus
} from "lucide-react";
import { Loan } from "@shared/schema";

export default function LoanOrigination() {
  const [selectedLoan, setSelectedLoan] = useState<number | null>(null);
  const [currentTab, setCurrentTab] = useState("applications");
  const [showNewApplicationForm, setShowNewApplicationForm] = useState(false);
  
  const { data: allLoans, isLoading } = useQuery<Loan[]>({
    queryKey: ["/api/loans"],
  });
  
  const loans = allLoans?.filter(loan => {
    if (currentTab === "applications") return loan.status === "pending";
    if (currentTab === "verification") return loan.status === "verification";
    if (currentTab === "approval") return loan.status === "approved" || loan.status === "documentation";
    return true;
  });
  
  // Format status for badge display
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800">Pending</Badge>;
      case "verification":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-800">Verification</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800">Approved</Badge>;
      case "documentation":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300 border-purple-200 dark:border-purple-800">Documentation Needed</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 border-red-200 dark:border-red-800">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getActionButtonText = (status: string) => {
    switch (status) {
      case "pending":
        return "Review";
      case "verification":
        return "Verify";
      case "documentation":
        return "Request Docs";
      case "approved":
        return "Approve";
      default:
        return "View";
    }
  };
  
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Loan Origination</h1>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Manage, review, and process new loan applications
            </p>
          </div>
          <div className="mt-4 md:mt-0 w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search applications..."
                className="pl-8 w-full"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verification">Verification</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="documentation">Documentation</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="applications" onValueChange={setCurrentTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="applications" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Applications
            </TabsTrigger>
            <TabsTrigger value="verification" className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4" />
              Verification
            </TabsTrigger>
            <TabsTrigger value="approval" className="flex items-center">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Approval
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="applications">
            {showNewApplicationForm ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">New Gold Financing Application</h2>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowNewApplicationForm(false)}
                  >
                    Back to Applications List
                  </Button>
                </div>
                <ApplicationForm />
              </div>
            ) : (
              <Card>
                <CardHeader className="px-6 py-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>New Applications</CardTitle>
                      <CardDescription>Review and process new applications</CardDescription>
                    </div>
                    <Button 
                      className="flex items-center"
                      onClick={() => setShowNewApplicationForm(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      New Application
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Contract #</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-10">
                            Loading applications...
                          </TableCell>
                        </TableRow>
                      ) : !loans || loans.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-10">
                            No applications found in this category
                          </TableCell>
                        </TableRow>
                      ) : (
                        loans.map((loan) => (
                          <TableRow key={loan.id}>
                            <TableCell>
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                    {`C${loan.clientId}`}
                                  </AvatarFallback>
                                </Avatar>
                                <span>Client {loan.clientId}</span>
                              </div>
                            </TableCell>
                            <TableCell>{loan.contractNumber}</TableCell>
                            <TableCell>${loan.financingAmount.toString()}</TableCell>
                            <TableCell>{getStatusBadge(loan.status)}</TableCell>
                            <TableCell>{loan.createdAt ? new Date(loan.createdAt).toLocaleDateString() : "N/A"}</TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="link" 
                                className="text-primary"
                                onClick={() => setSelectedLoan(loan.id)}
                              >
                                {getActionButtonText(loan.status)}
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
                    Showing {loans?.length || 0} applications
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm" disabled>Next</Button>
                  </div>
                </CardFooter>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="verification">
            <Card>
              <CardHeader className="px-6 py-4 border-b border-border">
                <CardTitle>Applications for Verification</CardTitle>
                <CardDescription>Verify client details and gold assessments</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Verification functionality will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approval">
            <Card>
              <CardHeader className="px-6 py-4 border-b border-border">
                <CardTitle>Applications for Approval</CardTitle>
                <CardDescription>Approve or request additional documentation</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Approval functionality will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}