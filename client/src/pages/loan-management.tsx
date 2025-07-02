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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Filter, PieChart, FileText, Clock } from "lucide-react";
import { LoanDetails } from "@/components/loans/loan-details";
import { Loan } from "@shared/schema";

export default function LoanManagement() {
  const [selectedLoan, setSelectedLoan] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("active");
  
  const { data: allLoans, isLoading } = useQuery<Loan[]>({
    queryKey: ["/api/loans"],
  });
  
  const loans = allLoans?.filter(loan => {
    if (activeTab === "active") return loan.status === "active";
    if (activeTab === "completed") return loan.status === "completed";
    return true;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800">Active</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-800">Completed</Badge>;
      case "overdue":
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 border-red-200 dark:border-red-800">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Loan Management</h1>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Manage and monitor active gold financing contracts
            </p>
          </div>
          <div className="mt-4 md:mt-0 w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search contracts..." className="pl-8 w-full" />
            </div>
            <Button variant="outline" className="w-full md:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Active Loans</p>
                  <h3 className="text-2xl font-bold mt-2">182</h3>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Financing</p>
                  <h3 className="text-2xl font-bold mt-2">$1.2M</h3>
                </div>
                <div className="bg-secondary/10 p-2 rounded-full">
                  <PieChart className="h-5 w-5 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Financing Amount</p>
                  <h3 className="text-2xl font-bold mt-2">$6,593</h3>
                </div>
                <div className="bg-accent/10 p-2 rounded-full">
                  <PieChart className="h-5 w-5 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Payments Due Soon</p>
                  <h3 className="text-2xl font-bold mt-2">24</h3>
                </div>
                <div className="bg-red-500/10 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`${selectedLoan ? "hidden md:block" : ""} md:col-span-${selectedLoan ? "1" : "3"}`}>
            <Card>
              <CardHeader className="px-6 py-4 border-b border-border">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Loan Contracts</CardTitle>
                    <CardDescription>
                      Manage and monitor gold financing contracts
                    </CardDescription>
                  </div>
                  <Tabs defaultValue="active" onValueChange={setActiveTab}>
                    <TabsList>
                      <TabsTrigger value="active">Active</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Contract #</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10">
                          Loading loans...
                        </TableCell>
                      </TableRow>
                    ) : !loans || loans.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10">
                          No loans found
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
                          <TableCell>{new Date(loan.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>{getStatusBadge(loan.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="link" 
                              className="text-primary"
                              onClick={() => setSelectedLoan(loan.id)}
                            >
                              View Details
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
                  Showing {loans?.length || 0} loan contracts
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" disabled>Next</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          {selectedLoan && (
            <div className="md:col-span-2">
              <LoanDetails 
                loanId={selectedLoan}
                onClose={() => setSelectedLoan(null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
