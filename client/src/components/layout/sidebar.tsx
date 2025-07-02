import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  Home,
  FileText,
  ClipboardList,
  DollarSign,
  Coins,
  File,
  BarChart2,
  Users,
  ChevronDown,
  ChevronUp,
  Menu,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();
  const [loanOrigExpanded, setLoanOrigExpanded] = useState(false);

  const toggleLoanOrigMenu = () => {
    setLoanOrigExpanded(!loanOrigExpanded);
  };

  const isActiveRoute = (route: string) => {
    if (route === "/" && location === "/") return true;
    if (route !== "/" && location.startsWith(route)) return true;
    return false;
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <Home className="mr-3 h-5 w-5" />,
      expanded: null,
    },
    {
      name: "Loan Origination",
      path: "/loan-origination",
      icon: <FileText className="mr-3 h-5 w-5" />,
      expanded: loanOrigExpanded,
      toggle: toggleLoanOrigMenu,
      children: [
        { name: "Applications", path: "/loan-origination/applications" },
        { name: "Verification", path: "/loan-origination/verification" },
        { name: "Approval", path: "/loan-origination/approval" },
      ],
    },
    {
      name: "Loan Management",
      path: "/loan-management",
      icon: <ClipboardList className="mr-3 h-5 w-5" />,
      expanded: null,
    },
    {
      name: "Loan Servicing",
      path: "/loan-servicing",
      icon: <DollarSign className="mr-3 h-5 w-5" />,
      expanded: null,
    },
    // Hidden navigation items
    // {
    //   name: "Gold Valuation",
    //   path: "/gold-valuation",
    //   icon: <Coins className="mr-3 h-5 w-5" />,
    //   expanded: null,
    // },
    // {
    //   name: "Contracts",
    //   path: "/contracts",
    //   icon: <File className="mr-3 h-5 w-5" />,
    //   expanded: null,
    // },
    // {
    //   name: "Reports",
    //   path: "/reports",
    //   icon: <BarChart2 className="mr-3 h-5 w-5" />,
    //   expanded: null,
    // },
    // {
    //   name: "User Management",
    //   path: "/user-management",
    //   icon: <Users className="mr-3 h-5 w-5" />,
    //   expanded: null,
    // },
    // {
    //   name: "Malaysia Compliance",
    //   path: "/malaysia-compliance",
    //   icon: <Shield className="mr-3 h-5 w-5" />,
    //   expanded: null,
    // },
  ];

  return (
    <aside
      className={cn(
        "md:flex md:flex-shrink-0 transition-all duration-300 fixed md:relative inset-0 z-20",
        isOpen ? "flex" : "hidden"
      )}
    >
      <div className="flex flex-col w-64 border-r border-border bg-background">
        <div className="flex items-center justify-between h-16 px-4 bg-primary shadow-sm">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <Coins className="h-5 w-5 text-white" />
            </div>
            <span className="text-primary-foreground font-semibold text-lg">AR-Rahanu</span>
          </div>
          <Button variant="ghost" className="md:hidden" size="icon" onClick={onClose}>
            <Menu className="h-5 w-5 text-primary-foreground" />
          </Button>
        </div>
        <div className="overflow-y-auto flex-grow pt-5 pb-4">
          <nav className="flex-1 px-2 space-y-1">
            {navItems.map((item) => (
              <div key={item.path} className="space-y-1">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={item.toggle}
                      className="flex items-center w-full px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 rounded-md hover:bg-muted group"
                    >
                      {item.icon}
                      <span className="flex-1">{item.name}</span>
                      {item.expanded ? (
                        <ChevronUp className="h-5 w-5 text-neutral-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-neutral-500" />
                      )}
                    </button>
                    {item.expanded && (
                      <div className="space-y-1 pl-12">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            href={child.path}
                            onClick={onClose}
                            className={cn(
                              "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                              isActiveRoute(child.path)
                                ? "bg-primary text-primary-foreground"
                                : "text-neutral-600 dark:text-neutral-400 hover:bg-muted"
                            )}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.path}
                    onClick={onClose}
                    className={cn(
                      "nav-link",
                      isActiveRoute(item.path) ? "nav-link-active" : "nav-link-inactive"
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-border p-4">
          <a href="#" className="flex-shrink-0 group block">
            <div className="flex items-center">
              <div>
                <div className="h-9 w-9 rounded-full bg-secondary text-white flex items-center justify-center">
                  <span className="text-sm font-medium">AM</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Ahmed Mahmoud</p>
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
                  Loan Officer
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
