import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { X, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loan, GoldItem } from "@shared/schema";

const verificationSchema = z.object({
  clientVerified: z.boolean().refine((val) => val === true, {
    message: "Client verification is required",
  }),
  identificationNumber: z.string().min(5, "ID number must be at least 5 characters"),
  goldItemVerified: z.boolean().refine((val) => val === true, {
    message: "Gold verification is required",
  }),
  goldWeight: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Weight must be a positive number",
  }),
  goldPurity: z.string().min(1, "Please select purity"),
  goldEstimatedValue: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Value must be a positive number",
  }),
  verificationNotes: z.string().optional(),
  verificationResult: z.string().min(1, "Please select verification result"),
});

type VerificationFormValues = z.infer<typeof verificationSchema>;

interface VerificationFormProps {
  loanId: number;
  onClose: () => void;
}

export function VerificationForm({ loanId, onClose }: VerificationFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: loan, isLoading } = useQuery<Loan>({
    queryKey: [`/api/loans/${loanId}`],
  });

  const goldItemIds = loan?.goldItemIds.split(",").map(id => parseInt(id.trim()));
  
  const { data: goldItems } = useQuery<GoldItem[]>({
    queryKey: [`/api/gold-items`],
    enabled: !!goldItemIds && goldItemIds.length > 0,
  });

  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      clientVerified: false,
      identificationNumber: "",
      goldItemVerified: false,
      goldWeight: "",
      goldPurity: "",
      goldEstimatedValue: "",
      verificationNotes: "",
      verificationResult: "",
    },
  });

  // Set initial values when data is loaded
  React.useEffect(() => {
    if (loan && goldItems && goldItems.length > 0) {
      const goldItem = goldItems[0]; // Use first gold item for simplicity
      form.reset({
        clientVerified: false,
        identificationNumber: `${loan.clientId}-ID`,
        goldItemVerified: false,
        goldWeight: goldItem.weight.toString(),
        goldPurity: goldItem.purity.toString(),
        goldEstimatedValue: goldItem.estimatedValue.toString(),
        verificationNotes: "",
        verificationResult: "",
      });
    }
  }, [loan, goldItems, form]);

  const updateLoanMutation = useMutation({
    mutationFn: async (status: string) => {
      const response = await apiRequest("PATCH", `/api/loans/${loanId}/status`, { status });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/loans"] });
      queryClient.invalidateQueries({ queryKey: [`/api/loans/${loanId}`] });
      toast({
        title: "Verification completed",
        description: "The loan has been successfully verified and updated.",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Verification failed",
        description: error.message || "There was a problem updating the loan status.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  function onSubmit(data: VerificationFormValues) {
    setIsSubmitting(true);
    
    // Determine the new status based on verification result
    let newStatus = "pending";
    if (data.verificationResult === "approved") {
      newStatus = "approved";
    } else if (data.verificationResult === "rejected") {
      newStatus = "rejected";
    } else if (data.verificationResult === "documentation") {
      newStatus = "documentation";
    }
    
    updateLoanMutation.mutate(newStatus);
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loan Verification</CardTitle>
          <CardDescription>Loading loan details...</CardDescription>
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
          <CardTitle>Loan Verification</CardTitle>
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
          <CardTitle className="text-xl">Loan Verification</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          Verify client identity and gold collateral details for loan {loan.contractNumber}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Client Information</h3>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800">
                  Pending Verification
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Client ID</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{loan.clientId}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Contract Number</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{loan.contractNumber}</p>
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="identificationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identification Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Verify this matches the client's identification document
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="clientVerified"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I confirm the client's identity has been verified
                      </FormLabel>
                      <FormDescription>
                        Client's photo ID has been checked and matches their appearance
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Gold Verification</h3>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800">
                  Pending Assessment
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="goldWeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verified Weight (grams)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="goldPurity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verified Purity</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select purity" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="24">24K (99.9%)</SelectItem>
                          <SelectItem value="22">22K (91.6%)</SelectItem>
                          <SelectItem value="18">18K (75.0%)</SelectItem>
                          <SelectItem value="14">14K (58.5%)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="goldEstimatedValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verified Value ($)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="goldItemVerified"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I confirm the gold item(s) have been physically verified
                      </FormLabel>
                      <FormDescription>
                        The gold has been tested for authenticity, purity, and weight
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Verification Result</h3>
              
              <FormField
                control={form.control}
                name="verificationNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any additional notes or comments about the verification process"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="verificationResult"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Decision</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select verification result" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="approved">
                          <div className="flex items-center">
                            <CheckCircle className="mr-2 h-4 w-4 text-success" />
                            Approved - Ready for Final Approval
                          </div>
                        </SelectItem>
                        <SelectItem value="documentation">
                          <div className="flex items-center">
                            <AlertCircle className="mr-2 h-4 w-4 text-warning" />
                            Additional Documentation Needed
                          </div>
                        </SelectItem>
                        <SelectItem value="rejected">
                          <div className="flex items-center">
                            <X className="mr-2 h-4 w-4 text-destructive" />
                            Rejected - Does Not Meet Requirements
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <CardFooter className="flex justify-between px-0 pb-0">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Complete Verification"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default VerificationForm;
