import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Loan } from "@shared/schema";

export function RecentApplications() {
  const { data: loans, isLoading } = useQuery<Loan[]>({
    queryKey: ["/api/loans?status=pending"],
  });

  // Map status to appropriate badge styling
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "status-badge status-badge-pending";
      case "verification":
        return "status-badge status-badge-verification";
      case "approved":
        return "status-badge status-badge-approved";
      case "documentation":
        return "status-badge status-badge-documentation";
      default:
        return "status-badge status-badge-pending";
    }
  };

  // Format status for display
  const formatStatus = (status: string) => {
    if (status === "pending") return "Pending Verification";
    if (status === "documentation") return "Documentation Needed";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Get initials from a name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Get a background color based on a string
  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-primary",
      "bg-secondary",
      "bg-accent",
      "bg-neutral-600",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const renderTable = () => {
    if (isLoading) {
      return (
        <div className="space-y-4 p-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="ml-auto h-4 w-20" />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
              >
                Client
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
              >
                Gold Weight
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
              >
                Financing Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
              >
                Date
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-background divide-y divide-border">
            {/* If no data, show empty state */}
            {!loans || loans.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-neutral-500 dark:text-neutral-400">
                  No recent applications found
                </td>
              </tr>
            ) : (
              loans.map((loan) => (
                <tr key={loan.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarFallback className={getAvatarColor(`Client ${loan.id}`)}>
                          {`C${loan.id}`}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          {`Client ${loan.id}`}
                        </div>
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                          ID: {loan.contractNumber}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-900 dark:text-neutral-100 font-mono">
                      {`${Math.floor(Math.random() * 250) + 50}g (24K)`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 font-mono">
                      ${loan.financingAmount.toString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadgeClass(loan.status)}>
                      {formatStatus(loan.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                    {new Date(loan.createdAt).toISOString().split("T")[0]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-primary hover:text-primary/80">
                      {loan.status === "pending"
                        ? "Review"
                        : loan.status === "verification"
                        ? "Verify"
                        : loan.status === "approved"
                        ? "View"
                        : "Contact"}
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <Card className="islamic-border border-neutral-300">
      <CardHeader className="px-6 py-5 border-b border-border">
        <CardTitle className="text-lg font-medium leading-6">
          Recent Applications
        </CardTitle>
        <CardDescription>
          Applications awaiting review or action.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">{renderTable()}</CardContent>
      <CardFooter className="bg-muted px-6 py-4 border-t border-border">
        <a href="#" className="text-sm font-medium text-primary hover:text-primary/80">
          View all applications
        </a>
      </CardFooter>
    </Card>
  );
}

export default RecentApplications;
