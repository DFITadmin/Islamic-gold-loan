import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout/layout";
import Dashboard from "@/pages/dashboard";
import LoanOrigination from "@/pages/loan-origination";
import LoanManagement from "@/pages/loan-management";
import LoanServicing from "@/pages/loan-servicing";
import GoldValuation from "@/pages/gold-valuation";
import Contracts from "@/pages/contracts";
import Reports from "@/pages/reports";
import UserManagement from "@/pages/user-management";
import NewApplication from "@/pages/new-application";
import MalaysiaCompliance from "@/pages/malaysia-compliance";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/loan-origination" component={LoanOrigination} />
        <Route path="/loan-management" component={LoanManagement} />
        <Route path="/loan-servicing" component={LoanServicing} />
        <Route path="/gold-valuation" component={GoldValuation} />
        <Route path="/contracts" component={Contracts} />
        <Route path="/reports" component={Reports} />
        <Route path="/user-management" component={UserManagement} />
        <Route path="/new-application" component={NewApplication} />
        <Route path="/malaysia-compliance" component={MalaysiaCompliance} />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
