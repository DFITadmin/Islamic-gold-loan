import { useState } from "react";
import { Bell, Search, Menu, Sun, Moon, Computer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/lib/theme-provider";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { theme, setTheme } = useTheme();
  const [notificationCount] = useState(3);

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-background shadow">
      <Button
        variant="ghost"
        className="md:hidden px-4 text-neutral-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
        onClick={onMenuClick}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" />
      </Button>
      
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex items-center">
          <div className="max-w-2xl w-full">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <Input
                id="search"
                className="pl-10 pr-3 bg-muted"
                placeholder="Search by client name, ID or contract number"
                type="search"
              />
            </div>
          </div>
        </div>
        
        <div className="ml-4 flex items-center md:ml-6 space-x-3">
          {/* Theme toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {theme === "light" ? (
                  <Sun className="h-5 w-5" />
                ) : theme === "dark" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Computer className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                <span>Dark</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Computer className="mr-2 h-4 w-4" />
                <span>System</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Notifications dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-4 w-4 rounded-full bg-destructive text-xs font-bold text-destructive-foreground">
                    {notificationCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-auto">
                <DropdownMenuItem className="py-3 cursor-pointer flex flex-col items-start">
                  <div className="font-medium text-sm">Contract Review Required</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Contract for Mahmoud Abadi (GLD-2338) requires immediate Shariah compliance review.
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-3 cursor-pointer flex flex-col items-start">
                  <div className="font-medium text-sm">Gold Price Update Alert</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Gold price increased by 1.2% in the last 24 hours.
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-3 cursor-pointer flex flex-col items-start">
                  <div className="font-medium text-sm">System Maintenance Notice</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Planned system maintenance scheduled for April 22nd.
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-primary cursor-pointer justify-center">
                View All Notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Settings dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    AM
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
