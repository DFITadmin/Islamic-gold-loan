import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Search, 
  Banknote, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  CalendarDays,
  Send,
  Receipt,
  Phone,
  Mail,
  MessageSquare,
  Eye,
  Edit,
  Download,
  Filter,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Payment, Loan, Client } from "@shared/schema";

// Form schemas for payment actions
const reminderSchema = z.object({
  method: z.enum(["sms", "email", "whatsapp"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const paymentSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  paymentMethod: z.enum(["bank_transfer", "online_banking", "cash", "cheque"]),
  referenceNumber: z.string().optional(),
  paidDate: z.date(),
  notes: z.string().optional(),
});

export default function LoanServicing() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  // Fetch payments based on active tab
  const { data: payments, isLoading } = useQuery<Payment[]>({
    queryKey: ["/api/payments", activeTab],
    select: (data) => {
      if (!data) return [];
      
      // Filter by search term
      let filtered = data.filter(payment => {
        if (!searchTerm) return true;
        const contractNumber = `GF-${payment.loanId * 1000 + 342}`;
        return contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
               `Client ${payment.loanId}`.toLowerCase().includes(searchTerm.toLowerCase());
      });
      
      // Filter by status
      if (statusFilter !== "all") {
        filtered = filtered.filter(payment => payment.status === statusFilter);
      }
      
      // Filter by tab
      const today = new Date();
      const sevenDaysFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      
      if (activeTab === "upcoming") {
        return filtered.filter(payment => 
          payment.status === "pending" && 
          new Date(payment.dueDate) >= today &&
          new Date(payment.dueDate) <= sevenDaysFromNow
        );
      } else if (activeTab === "overdue") {
        return filtered.filter(payment => 
          payment.status === "pending" && 
          new Date(payment.dueDate) < today
        );
      } else if (activeTab === "history") {
        return filtered.filter(payment => payment.status === "paid");
      }
      
      return filtered;
    }
  });
  
  // Get payment statistics
  const { data: allPayments } = useQuery<Payment[]>({
    queryKey: ["/api/payments"],
  });
  
  const stats = {
    total: allPayments?.length || 0,
    dueThisMonth: allPayments?.filter(p => {
      const dueDate = new Date(p.dueDate);
      const now = new Date();
      return dueDate.getMonth() === now.getMonth() && 
             dueDate.getFullYear() === now.getFullYear() &&
             p.status === "pending";
    }).reduce((sum, p) => sum + parseFloat(p.amount), 0) || 0,
    collected: allPayments?.filter(p => p.status === "paid")
      .reduce((sum, p) => sum + parseFloat(p.amount), 0) || 0,
    overdue: allPayments?.filter(p => {
      return p.status === "pending" && new Date(p.dueDate) < new Date();
    }).reduce((sum, p) => sum + parseFloat(p.amount), 0) || 0,
  };
  
  // Send reminder mutation
  const sendReminderMutation = useMutation({
    mutationFn: async ({ paymentId, data }: { paymentId: number; data: z.infer<typeof reminderSchema> }) => {
      return await apiRequest(`/api/payments/${paymentId}/reminder`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      toast({ title: "Reminder sent successfully" });
    },
    onError: () => {
      toast({ title: "Failed to send reminder", variant: "destructive" });
    },
  });
  
  // Record payment mutation
  const recordPaymentMutation = useMutation({
    mutationFn: async ({ paymentId, data }: { paymentId: number; data: z.infer<typeof paymentSchema> }) => {
      return await apiRequest(`/api/payments/${paymentId}/record`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/payments"] });
      toast({ title: "Payment recorded successfully" });
    },
    onError: () => {
      toast({ title: "Failed to record payment", variant: "destructive" });
    },
  });
  
  const getStatusBadge = (status: string) => {
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
  
  const formatCurrency = (amount: number | string) => {
    return new Intl.NumberFormat('ms-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(parseFloat(amount.toString()));
  };
  
  // Calculate days remaining/overdue
  const getDaysRemaining = (dueDate: Date) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Due today";
    if (diffDays > 0) return `${diffDays} days remaining`;
    return `${Math.abs(diffDays)} days overdue`;
  };
  
  // Get payments for calendar view
  const getPaymentsForDate = (date: Date) => {
    if (!allPayments) return [];
    return allPayments.filter(payment => {
      const paymentDate = new Date(payment.dueDate);
      return paymentDate.toDateString() === date.toDateString();
    });
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Loan Servicing</h1>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Track payments, send reminders, and manage loan operations
            </p>
          </div>
          <div className="mt-4 md:mt-0 w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search payments..." 
                className="pl-8 w-full" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
              <DialogTrigger asChild>
                <Button variant="default">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Calendar
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Payment Calendar</DialogTitle>
                  <DialogDescription>
                    View payment due dates and track collections in calendar format
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                      modifiers={{
                        hasPayments: (date) => getPaymentsForDate(date).length > 0,
                        hasOverdue: (date) => {
                          const payments = getPaymentsForDate(date);
                          return payments.some(p => p.status === "pending" && new Date(p.dueDate) < new Date());
                        }
                      }}
                      modifiersStyles={{
                        hasPayments: { backgroundColor: "#fef3c7", color: "#92400e" },
                        hasOverdue: { backgroundColor: "#fee2e2", color: "#dc2626" }
                      }}
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">
                        {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
                      </h3>
                      <div className="space-y-2">
                        {selectedDate && getPaymentsForDate(selectedDate).length > 0 ? (
                          getPaymentsForDate(selectedDate).map((payment) => (
                            <Card key={payment.id} className="p-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="text-sm font-medium">GF-{payment.loanId * 1000 + 342}</p>
                                  <p className="text-xs text-muted-foreground">Client {payment.loanId}</p>
                                  <p className="text-sm font-medium text-primary">{formatCurrency(payment.amount)}</p>
                                </div>
                                {getStatusBadge(payment.status)}
                              </div>
                            </Card>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No payments scheduled for this date</p>
                        )}
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-200 rounded"></div>
                        <span className="text-xs">Has Payments</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-200 rounded"></div>
                        <span className="text-xs">Overdue Payments</span>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Payments</p>
                  <h3 className="text-2xl font-bold mt-2">{stats.total}</h3>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <Banknote className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Due This Month</p>
                  <h3 className="text-2xl font-bold mt-2">{formatCurrency(stats.dueThisMonth)}</h3>
                </div>
                <div className="bg-yellow-500/10 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Collected</p>
                  <h3 className="text-2xl font-bold mt-2">{formatCurrency(stats.collected)}</h3>
                </div>
                <div className="bg-green-500/10 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                  <h3 className="text-2xl font-bold mt-2">{formatCurrency(stats.overdue)}</h3>
                </div>
                <div className="bg-red-500/10 p-2 rounded-full">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="px-6 py-4 border-b border-border">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <CardTitle>Payment Management</CardTitle>
                <CardDescription>
                  Track, remind, and process loan payments
                </CardDescription>
              </div>
              <Tabs defaultValue="upcoming" className="mt-4 md:mt-0" onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="overdue">Overdue</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contract #</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10">
                      Loading payments...
                    </TableCell>
                  </TableRow>
                ) : !payments || payments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10">
                      No payments found
                    </TableCell>
                  </TableRow>
                ) : (
                  payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>GF-{payment.loanId * 1000 + 342}</TableCell>
                      <TableCell>Client {payment.loanId}</TableCell>
                      <TableCell>{formatCurrency(payment.amount)}</TableCell>
                      <TableCell>{new Date(payment.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell className={`${
                        payment.status === "overdue" ? "text-red-500" : 
                        new Date(payment.dueDate).getTime() - new Date().getTime() < 3 * 24 * 60 * 60 * 1000 ? "text-yellow-500" : "text-muted-foreground"
                      }`}>
                        {getDaysRemaining(new Date(payment.dueDate))}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm">
                          Send Reminder
                        </Button>
                        <Button variant="default" size="sm">
                          Record Payment
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
              Showing {payments?.length || 0} payments
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
