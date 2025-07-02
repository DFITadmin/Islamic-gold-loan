import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Payment } from "@shared/schema";

export function UpcomingPayments() {
  const { data: payments, isLoading } = useQuery<Payment[]>({
    queryKey: ["/api/payments/upcoming"],
  });

  // Get relative time for displaying due dates
  const getRelativeTime = (date: Date) => {
    const today = new Date();
    const dueDate = new Date(date);
    const diffDays = Math.round((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays > 1) return `In ${diffDays} days`;
    return new Date(date).toLocaleDateString();
  };
  
  // Format currency amount
  const formatCurrency = (amount: number | string) => {
    return `$${parseFloat(amount.toString()).toFixed(2)}`;
  };

  const renderPayments = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-16" />
              </div>
              <div className="mt-2 flex justify-between items-center">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (!payments || payments.length === 0) {
      return (
        <div className="text-center p-6 text-neutral-500 dark:text-neutral-400">
          No upcoming payments found
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {payments.map((payment) => (
          <div key={payment.id} className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  Client #{payment.loanId}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Contract #{payment.loanId * 1000 + 342}
                </p>
              </div>
              <span 
                className={`text-xs font-medium px-2 py-1 rounded ${
                  new Date(payment.dueDate).getTime() <= new Date().getTime() 
                    ? "bg-primary text-primary-foreground"
                    : "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                }`}
              >
                {getRelativeTime(new Date(payment.dueDate))}
              </span>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {formatCurrency(payment.amount)}
              </span>
              <Button variant="link" className="text-xs p-0 h-auto">
                Send Reminder
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="islamic-border border-neutral-300">
      <CardHeader className="px-6 py-5 border-b border-border">
        <CardTitle className="text-lg font-medium leading-6">
          Upcoming Payments
        </CardTitle>
        <CardDescription>Due in the next 7 days.</CardDescription>
      </CardHeader>
      <CardContent className="p-6">{renderPayments()}</CardContent>
      <CardFooter className="bg-muted px-6 py-4 border-t border-border">
        <a href="#" className="text-sm font-medium text-primary hover:text-primary/80">
          View payment calendar
        </a>
      </CardFooter>
    </Card>
  );
}

export default UpcomingPayments;
