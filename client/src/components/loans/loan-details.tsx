import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  X,
  FileText,
  Download,
  Printer,
  Mail,
  CreditCard,
  Calendar,
  Clock,
  DollarSign,
  ArrowLeft,
  AlertCircle,
  Eye,
  Check,
  AlertTriangle,
} from "lucide-react";
import { Loan, Payment, Document, GoldItem, Client } from "@shared/schema";

interface LoanDetailsProps {
  loanId: number;
  onClose: () => void;
}

export function LoanDetails({ loanId, onClose }: LoanDetailsProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");
  const [showTerminateDialog, setShowTerminateDialog] = useState(false);

  const { data: loan, isLoading: isLoadingLoan } = useQuery<Loan>({
    queryKey: [`/api/loans/${loanId}`],
  });

  const { data: payments, isLoading: isLoadingPayments } = useQuery<Payment[]>({
    queryKey: [`/api/loans/${loanId}/payments`],
    enabled: !!loanId,
  });

  const { data: documents, isLoading: isLoadingDocuments } = useQuery<Document[]>({
    queryKey: [`/api/loans/${loanId}/documents`],
    enabled: !!loanId,
  });

  const goldItemIds = loan?.goldItemIds.split(",").map(id => parseInt(id.trim()));
  
  const { data: goldItems } = useQuery<GoldItem[]>({
    queryKey: [`/api/gold-items`],
    enabled: !!goldItemIds && goldItemIds.length > 0,
  });

  const { data: client } = useQuery<Client>({
    queryKey: [`/api/clients/${loan?.clientId}`],
    enabled: !!loan?.clientId,
  });

  const updateLoanStatusMutation = useMutation({
    mutationFn: async (status: string) => {
      const response = await apiRequest("PATCH", `/api/loans/${loanId}/status`, { status });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/loans"] });
      queryClient.invalidateQueries({ queryKey: [`/api/loans/${loanId}`] });
      toast({
        title: "Loan status updated",
        description: "The loan status has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to update loan status",
        description: error.message || "There was a problem updating the loan status.",
        variant: "destructive",
      });
    },
  });

  const terminateLoan = () => {
    updateLoanStatusMutation.mutate("completed");
    setShowTerminateDialog(false);
  };

  const registerPayment = async (paymentId: number) => {
    try {
      await apiRequest("PATCH", `/api/payments/${paymentId}/status`, { 
        status: "paid", 
        paidDate: new Date().toISOString() 
      });
      queryClient.invalidateQueries({ queryKey: [`/api/loans/${loanId}/payments`] });
      toast({
        title: "Payment recorded",
        description: "The payment has been successfully recorded.",
      });
    } catch (error) {
      toast({
        title: "Failed to record payment",
        description: "There was a problem recording the payment.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800">Pending</Badge>;
      case "verification":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-800">Verification</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800">Approved</Badge>;
      case "active":
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800">Active</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-800">Completed</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 border-red-200 dark:border-red-800">Rejected</Badge>;
      case "documentation":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300 border-purple-200 dark:border-purple-800">Documentation Needed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800">Pending</Badge>;
      case "paid":
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800">Paid</Badge>;
      case "overdue":
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 border-red-200 dark:border-red-800">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800">Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 border-red-200 dark:border-red-800">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number | string) => {
    return `$${parseFloat(amount.toString()).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  };

  const getDaysRemaining = (dueDate: Date) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Due today";
    if (diffDays > 0) return `${diffDays} days remaining`;
    return `${Math.abs(diffDays)} days overdue`;
  };

  // Calculate payment progress
  const calculateProgress = () => {
    if (!payments) return 0;
    const totalPayments = payments.length;
    const paidPayments = payments.filter(payment => payment.status === "paid").length;
    return totalPayments > 0 ? (paidPayments / totalPayments) * 100 : 0;
  };

  // Format document type
  const formatDocumentType = (type: string) => {
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get icon for document type
  const getDocumentTypeIcon = (type: string) => {
    switch (type) {
      case "contract":
        return <FileText className="h-4 w-4 text-primary" />;
      case "identification":
        return <Eye className="h-4 w-4 text-secondary" />;
      case "gold_appraisal":
        return <Check className="h-4 w-4 text-accent" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  if (isLoadingLoan) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loan Details</CardTitle>
          <CardDescription>Loading loan information...</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse text-center">
              <div className="h-12 w-12 mx-auto rounded-full bg-muted"></div>
              <div className="mt-4 h-4 w-32 mx-auto bg-muted rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!loan) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loan Details</CardTitle>
          <CardDescription>Loan not found</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 mx-auto text-destructive" />
              <p className="mt-4">Could not find loan information.</p>
              <Button onClick={onClose} className="mt-4">
                Go Back
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="islamic-border border-primary">
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <CardTitle className="text-xl">Loan Details</CardTitle>
            {getStatusBadge(loan.status)}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          Loan contract: {loan.contractNumber}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-primary" />
                    Financing Amount
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">{formatCurrency(loan.financingAmount)}</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {(parseFloat(loan.financingRatio.toString()) * 100).toFixed(0)}% of gold value
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    Term
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">{loan.term} months</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {loan.paymentFrequency} payments
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-primary" />
                    Profit Rate
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">{parseFloat(loan.profit.toString()).toFixed(2)}%</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Shariah-compliant
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Client Information</h3>
                <Card>
                  <CardContent className="p-4">
                    <dl className="space-y-2">
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="col-span-1 font-medium text-sm text-muted-foreground">Client ID:</dt>
                        <dd className="col-span-2 text-sm">{loan.clientId}</dd>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="col-span-1 font-medium text-sm text-muted-foreground">Name:</dt>
                        <dd className="col-span-2 text-sm">{client?.fullName || 'Not available'}</dd>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="col-span-1 font-medium text-sm text-muted-foreground">Email:</dt>
                        <dd className="col-span-2 text-sm">{client?.email || 'Not available'}</dd>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="col-span-1 font-medium text-sm text-muted-foreground">Phone:</dt>
                        <dd className="col-span-2 text-sm">{client?.phone || 'Not available'}</dd>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="col-span-1 font-medium text-sm text-muted-foreground">ID Type:</dt>
                        <dd className="col-span-2 text-sm">{client?.identificationType || 'Not available'}</dd>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="col-span-1 font-medium text-sm text-muted-foreground">ID Number:</dt>
                        <dd className="col-span-2 text-sm">{client?.identificationNumber || 'Not available'}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Gold Collateral</h3>
                <Card>
                  <CardContent className="p-4">
                    <dl className="space-y-2">
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="col-span-1 font-medium text-sm text-muted-foreground">Total Value:</dt>
                        <dd className="col-span-2 text-sm">{formatCurrency(loan.totalGoldValue)}</dd>
                      </div>
                      
                      {goldItems && goldItems.length > 0 ? (
                        goldItems.map((item, index) => (
                          <div key={item.id} className="border-t pt-2 mt-2">
                            <p className="font-medium text-sm mb-2">Item {index + 1}</p>
                            <div className="grid grid-cols-3 gap-1">
                              <dt className="col-span-1 font-medium text-sm text-muted-foreground">Type:</dt>
                              <dd className="col-span-2 text-sm">{item.type}</dd>
                            </div>
                            <div className="grid grid-cols-3 gap-1">
                              <dt className="col-span-1 font-medium text-sm text-muted-foreground">Weight:</dt>
                              <dd className="col-span-2 text-sm">{item.weight}g</dd>
                            </div>
                            <div className="grid grid-cols-3 gap-1">
                              <dt className="col-span-1 font-medium text-sm text-muted-foreground">Purity:</dt>
                              <dd className="col-span-2 text-sm">{item.purity}K</dd>
                            </div>
                            <div className="grid grid-cols-3 gap-1">
                              <dt className="col-span-1 font-medium text-sm text-muted-foreground">Value:</dt>
                              <dd className="col-span-2 text-sm">{formatCurrency(item.estimatedValue)}</dd>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-muted-foreground italic">Gold item details not available</div>
                      )}
                    </dl>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Payment Progress</h3>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        {payments ? 
                          `${payments.filter(p => p.status === "paid").length} of ${payments.length} payments completed` : 
                          "No payment data"
                        }
                      </span>
                      <span className="text-sm font-medium">
                        {calculateProgress().toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={calculateProgress()} className="h-2" />
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {loan.status === "active" && (
                      <>
                        <Button variant="outline" size="sm">
                          <Printer className="h-4 w-4 mr-2" />
                          Print Schedule
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4 mr-2" />
                          Email Client
                        </Button>
                        <AlertDialog open={showTerminateDialog} onOpenChange={setShowTerminateDialog}>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <X className="h-4 w-4 mr-2" />
                              Terminate Loan
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Terminate Loan Contract?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action will mark the loan as completed and release the collateral. This cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={terminateLoan} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                Terminate
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                    
                    {loan.status === "approved" && (
                      <Button 
                        onClick={() => updateLoanStatusMutation.mutate("active")}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Activate Loan
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader className="px-6 py-4 border-b border-border">
                <div className="flex justify-between items-center">
                  <CardTitle>Payment Schedule</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {isLoadingPayments ? (
                  <div className="p-8 text-center">
                    <div className="animate-pulse text-center">
                      <div className="h-8 w-32 mx-auto bg-muted rounded mb-4"></div>
                      <div className="h-4 w-48 mx-auto bg-muted rounded"></div>
                    </div>
                  </div>
                ) : !payments || payments.length === 0 ? (
                  <div className="p-8 text-center">
                    <AlertTriangle className="h-8 w-8 mx-auto text-warning" />
                    <p className="mt-2">No payment schedule available</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payment #</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Timeline</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment, index) => (
                        <TableRow key={payment.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{new Date(payment.dueDate).toLocaleDateString()}</TableCell>
                          <TableCell>{formatCurrency(payment.amount)}</TableCell>
                          <TableCell>{getPaymentStatusBadge(payment.status)}</TableCell>
                          <TableCell className={`${
                            payment.status === "overdue" ? "text-red-500" : 
                            new Date(payment.dueDate).getTime() - new Date().getTime() < 3 * 24 * 60 * 60 * 1000 ? "text-yellow-500" : "text-muted-foreground"
                          }`}>
                            {getDaysRemaining(new Date(payment.dueDate))}
                          </TableCell>
                          <TableCell>
                            {payment.status === "pending" && (
                              <Button variant="outline" size="sm" onClick={() => registerPayment(payment.id)}>
                                Record Payment
                              </Button>
                            )}
                            {payment.status === "paid" && payment.paidDate && (
                              <span className="text-xs text-muted-foreground">
                                Paid on {new Date(payment.paidDate).toLocaleDateString()}
                              </span>
                            )}
                            {payment.status === "overdue" && (
                              <Button variant="outline" size="sm" onClick={() => registerPayment(payment.id)}>
                                Record Late Payment
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader className="px-6 py-4 border-b border-border">
                <div className="flex justify-between items-center">
                  <CardTitle>Loan Documents</CardTitle>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {isLoadingDocuments ? (
                  <div className="p-8 text-center">
                    <div className="animate-pulse text-center">
                      <div className="h-8 w-32 mx-auto bg-muted rounded mb-4"></div>
                      <div className="h-4 w-48 mx-auto bg-muted rounded"></div>
                    </div>
                  </div>
                ) : !documents || documents.length === 0 ? (
                  <div className="p-8 text-center">
                    <AlertTriangle className="h-8 w-8 mx-auto text-warning" />
                    <p className="mt-2">No documents available for this loan</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documents.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>
                            <div className="flex items-center">
                              {getDocumentTypeIcon(doc.type)}
                              <span className="ml-2">{doc.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{formatDocumentType(doc.type)}</TableCell>
                          <TableCell>{new Date(doc.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>{getDocumentStatusBadge(doc.status)}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Mail className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader className="px-6 py-4 border-b border-border">
                <CardTitle>Loan History</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="relative pl-6 pb-4 border-l-2 border-border">
                    <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-primary"></div>
                    <div className="text-sm">
                      <p className="font-medium">{new Date(loan.createdAt).toLocaleString()}</p>
                      <p className="text-muted-foreground">Loan application created</p>
                    </div>
                  </div>
                  
                  <div className="relative pl-6 pb-4 border-l-2 border-border">
                    <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-blue-500"></div>
                    <div className="text-sm">
                      <p className="font-medium">{new Date(loan.updatedAt).toLocaleString()}</p>
                      <p className="text-muted-foreground">Status updated to {loan.status}</p>
                    </div>
                  </div>
                  
                  {payments && payments.filter(p => p.status === "paid").map((payment, index) => (
                    <div key={payment.id} className="relative pl-6 pb-4 border-l-2 border-border">
                      <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-green-500"></div>
                      <div className="text-sm">
                        <p className="font-medium">{payment.paidDate ? new Date(payment.paidDate).toLocaleString() : "Unknown date"}</p>
                        <p className="text-muted-foreground">
                          Payment #{index + 1} received - {formatCurrency(payment.amount)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t border-border pt-6 flex justify-between">
        <Button variant="outline" onClick={onClose}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to List
        </Button>
        <div className="space-x-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print Details
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            View Contract
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default LoanDetails;
