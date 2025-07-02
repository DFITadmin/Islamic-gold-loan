import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { insertLoanSchema } from "@shared/schema";
import { MalaysiaRegulatoryCompliance } from "@/components/malaysia/regulatory-compliance";
import { MalaysiaGoldCertification } from "@/components/malaysia/gold-certification";

// Extend the loan schema for the form
const loanFormSchema = z.object({
  clientFullName: z.string().min(3, "Full name must be at least 3 characters"),
  clientEmail: z.string().email("Invalid email address"),
  clientPhone: z.string().min(10, "Phone number must be at least 10 characters"),
  clientId: z.string().optional(),
  identificationNumber: z.string().min(5, "ID number must be at least 5 characters"),
  identificationType: z.string().min(1, "Please select an ID type"),
  nationality: z.string().default("Malaysian"),
  stateOfResidence: z.string().optional(),
  religion: z.string().optional(),
  race: z.string().optional(),
  bnmConsent: z.boolean().default(false),
  goldItemDescription: z.string().min(5, "Description must be at least 5 characters"),
  goldWeight: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Weight must be a positive number",
  }),
  purity: z.string().min(1, "Please select purity"),
  estimatedValue: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Value must be a positive number",
  }),
  financingAmount: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Financing amount must be a positive number",
  }),
  financingRatio: z.string().min(1, "Please select financing ratio"),
  term: z.string().min(1, "Please select loan term"),
  paymentFrequency: z.string().min(1, "Please select payment frequency"),
  profit: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
    message: "Profit rate must be a non-negative number",
  }),
});

type LoanFormValues = z.infer<typeof loanFormSchema>;

export function ApplicationForm() {
  const { toast } = useToast();
  
  const form = useForm<LoanFormValues>({
    resolver: zodResolver(loanFormSchema),
    defaultValues: {
      clientFullName: "",
      clientEmail: "",
      clientPhone: "",
      clientId: "",
      identificationNumber: "",
      identificationType: "",
      nationality: "Malaysian",
      stateOfResidence: "",
      religion: "",
      race: "",
      bnmConsent: false,
      goldItemDescription: "",
      goldWeight: "",
      purity: "",
      estimatedValue: "",
      financingAmount: "",
      financingRatio: "0.65",
      term: "",
      paymentFrequency: "monthly",
      profit: "5.0",
    },
  });
  
  const createLoanMutation = useMutation({
    mutationFn: async (formData: LoanFormValues) => {
      // In a real app, we would first create the client and gold item
      // Then use those IDs to create the loan
      
      const loanData = {
        clientId: 1, // Placeholder, would come from creating client
        contractNumber: `GF-${Math.floor(Math.random() * 10000)}`,
        goldItemIds: "1", // Placeholder, would come from creating gold items
        totalGoldValue: parseFloat(formData.estimatedValue),
        financingAmount: parseFloat(formData.financingAmount),
        financingRatio: parseFloat(formData.financingRatio),
        status: "pending",
        profit: parseFloat(formData.profit),
        term: parseInt(formData.term),
        paymentFrequency: formData.paymentFrequency,
        createdBy: 1, // Current user ID
      };
      
      const response = await apiRequest("POST", "/api/loans", loanData);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application submitted",
        description: "Your loan application has been submitted successfully.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Submission failed",
        description: error.message || "There was a problem submitting your application.",
        variant: "destructive",
      });
    },
  });
  
  function onSubmit(data: LoanFormValues) {
    createLoanMutation.mutate(data);
  }
  
  return (
    <Card className="islamic-border border-primary">
      <CardHeader>
        <CardTitle>New Loan Application</CardTitle>
        <CardDescription>Complete the form below to submit a new gold loan application</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Client Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="clientFullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="clientEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="clientPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="clientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client ID (if existing)</FormLabel>
                      <FormControl>
                        <Input placeholder="Client ID" {...field} />
                      </FormControl>
                      <FormDescription>Leave blank for new clients</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="identificationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select ID type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="national_id">National ID</SelectItem>
                          <SelectItem value="passport">Passport</SelectItem>
                          <SelectItem value="drivers_license">Driver's License</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="identificationNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID Number</FormLabel>
                      <FormControl>
                        <Input placeholder="ID number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 rounded-md bg-amber-50/30 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-800">
                <h4 className="text-md font-medium col-span-2 text-amber-800 dark:text-amber-300 flex items-center">
                  Malaysian Regulatory Requirements
                </h4>
                
                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nationality</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select nationality" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Malaysian">Malaysian</SelectItem>
                          <SelectItem value="Non-Malaysian">Non-Malaysian</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="stateOfResidence"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State of Residence</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Johor">Johor</SelectItem>
                          <SelectItem value="Kedah">Kedah</SelectItem>
                          <SelectItem value="Kelantan">Kelantan</SelectItem>
                          <SelectItem value="Melaka">Melaka</SelectItem>
                          <SelectItem value="Negeri Sembilan">Negeri Sembilan</SelectItem>
                          <SelectItem value="Pahang">Pahang</SelectItem>
                          <SelectItem value="Penang">Penang</SelectItem>
                          <SelectItem value="Perak">Perak</SelectItem>
                          <SelectItem value="Perlis">Perlis</SelectItem>
                          <SelectItem value="Sabah">Sabah</SelectItem>
                          <SelectItem value="Sarawak">Sarawak</SelectItem>
                          <SelectItem value="Selangor">Selangor</SelectItem>
                          <SelectItem value="Terengganu">Terengganu</SelectItem>
                          <SelectItem value="Kuala Lumpur">Kuala Lumpur</SelectItem>
                          <SelectItem value="Labuan">Labuan</SelectItem>
                          <SelectItem value="Putrajaya">Putrajaya</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="religion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Religion</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select religion" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Islam">Islam</SelectItem>
                          <SelectItem value="Buddhism">Buddhism</SelectItem>
                          <SelectItem value="Christianity">Christianity</SelectItem>
                          <SelectItem value="Hinduism">Hinduism</SelectItem>
                          <SelectItem value="Sikhism">Sikhism</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="race"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Race</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select race" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Malay">Malay</SelectItem>
                          <SelectItem value="Chinese">Chinese</SelectItem>
                          <SelectItem value="Indian">Indian</SelectItem>
                          <SelectItem value="Bumiputera">Other Bumiputera</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Separator className="my-4" />
              
              <h3 className="text-lg font-medium">Gold Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="goldItemDescription"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Gold Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe the gold items (type, quantity, etc.)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="goldWeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (grams)</FormLabel>
                      <FormControl>
                        <Input placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="purity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purity</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select purity" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="24">24K (99.9%) - MS 2596:2015</SelectItem>
                          <SelectItem value="22">22K (91.6%) - MS 2382:2019</SelectItem>
                          <SelectItem value="18">18K (75.0%) - MS 2382:2019</SelectItem>
                          <SelectItem value="14">14K (58.5%) - MS 2382:2019</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Malaysian gold standards apply based on purity
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="estimatedValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Value ($)</FormLabel>
                      <FormControl>
                        <Input placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Separator className="my-4" />
              
              <div className="mb-6">
                <MalaysiaGoldCertification />
              </div>
              
              <h3 className="text-lg font-medium">Financing Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="financingRatio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Financing Ratio</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select financing ratio" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0.65">65% (BNM Standard)</SelectItem>
                          <SelectItem value="0.70">70% (BNM Preferred)</SelectItem>
                          <SelectItem value="0.75">75% (Malaysia Premium)</SelectItem>
                          <SelectItem value="0.80">80% (Malaysia Elite)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="financingAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Financing Amount ($)</FormLabel>
                      <FormControl>
                        <Input placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="term"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Term (months)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select term" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="3">3 months</SelectItem>
                          <SelectItem value="6">6 months</SelectItem>
                          <SelectItem value="12">12 months</SelectItem>
                          <SelectItem value="24">24 months</SelectItem>
                          <SelectItem value="36">36 months</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="paymentFrequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Frequency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="biannually">Bi-annually</SelectItem>
                          <SelectItem value="annually">Annually</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="profit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profit Rate (%)</FormLabel>
                      <FormControl>
                        <Input placeholder="0.00" {...field} />
                      </FormControl>
                      <FormDescription>Islamic profit rate, not interest</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="my-6" />
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Malaysian Regulatory Compliance</h3>
                <MalaysiaRegulatoryCompliance isApplication={true} />
              </div>
            </div>
            
            <CardFooter className="px-0 pb-0">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={createLoanMutation.isPending}
              >
                {createLoanMutation.isPending ? "Submitting..." : "Submit Application"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default ApplicationForm;
