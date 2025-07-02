import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { MetricsCard } from "@/components/dashboard/metrics-card";
import { RecentApplications } from "@/components/dashboard/recent-applications";
import { UpcomingPayments } from "@/components/dashboard/upcoming-payments";
import { GoldCalculator } from "@/components/dashboard/gold-calculator";
// import { SystemNotifications } from "@/components/dashboard/system-notifications"; // Hidden as requested
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Plus, 
  Filter,
  ClipboardList,
  DollarSign,
  Coins,
  CreditCard
} from "lucide-react";
import { GoldPriceHistory } from "@shared/schema";

export default function Dashboard() {
  const { data: goldPrice, isLoading: isLoadingGoldPrice } = useQuery<GoldPriceHistory>({
    queryKey: ["/api/gold-price"],
  });

  return (
    <div className="py-6">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Dashboard</h1>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Welcome back, Ahmed. Here's an overview of your portfolio.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Link href="/new-application">
              <Button>
                <Plus className="-ml-1 mr-2 h-5 w-5" />
                New Application
              </Button>
            </Link>
            <Button variant="outline">
              <Filter className="-ml-1 mr-2 h-5 w-5" />
              Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Key metrics cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <MetricsCard
            title="Active Loans"
            value="182"
            icon={<FileText className="h-6 w-6 text-white" />}
            footerLink="#"
            footerText="View all"
            iconBgColor="bg-primary"
            borderColor="border-primary"
          />

          <MetricsCard
            title="New Applications"
            value="28"
            icon={<ClipboardList className="h-6 w-6 text-white" />}
            footerLink="#"
            footerText="View details"
            iconBgColor="bg-secondary"
            borderColor="border-secondary"
          />

          <MetricsCard
            title="Gold Price (24K)"
            value={isLoadingGoldPrice ? "Loading..." : `RM ${goldPrice?.pricePerOz.toString()}/oz`}
            icon={<Coins className="h-6 w-6 text-white" />}
            iconBgColor="bg-accent"
            borderColor="border-accent"
            footerContent={
              <div className="flex justify-between items-center w-full">
                <a href="#" className="font-medium text-accent hover:text-accent/80">
                  Gold calculator
                </a>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span className="text-xs font-medium text-success ml-1">+1.2%</span>
                </div>
              </div>
            }
          />

          <MetricsCard
            title="Funding Availability"
            value="RM 22.6M"
            icon={<CreditCard className="h-6 w-6 text-white" />}
            footerLink="#"
            footerText="Funding details"
            iconBgColor="bg-neutral-600 dark:bg-neutral-700"
            borderColor="border-neutral-300 dark:border-neutral-700"
          />
        </div>

        {/* Main content sections */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent applications */}
          <div className="lg:col-span-2">
            <RecentApplications />
          </div>

          {/* Upcoming payments & Gold calculator */}
          <div className="space-y-6">
            <UpcomingPayments />
            <GoldCalculator />
          </div>
        </div>

        {/* Notifications Section - Hidden as requested */}
        {/* <div className="mt-8">
          <SystemNotifications />
        </div> */}
      </div>
    </div>
  );
}
