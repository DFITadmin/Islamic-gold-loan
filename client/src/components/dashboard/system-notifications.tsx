import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";

interface Notification {
  id: number;
  type: 'warning' | 'error' | 'info';
  title: string;
  message: string;
  actions?: {
    primary?: string;
    secondary?: string;
  };
}

export function SystemNotifications() {
  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'error',
      title: 'Contract Review Required',
      message: 'Contract for Mahmoud Abadi (GLD-2338) requires immediate Shariah compliance review before disbursement.',
      actions: {
        primary: 'Review Now',
        secondary: 'Assign to Shariah Board'
      }
    },
    {
      id: 2,
      type: 'warning',
      title: 'Gold Price Update Alert',
      message: 'Gold price increased by 1.2% in the last 24 hours. Consider updating valuation for recent applications.',
      actions: {
        primary: 'View Affected Applications'
      }
    },
    {
      id: 3,
      type: 'info',
      title: 'System Maintenance Notice',
      message: 'Planned system maintenance scheduled for April 22nd, 02:00 - 04:00 AM (GMT+3). Some features may be unavailable.',
      actions: {
        primary: 'View Details'
      }
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-400" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-400" />;
      default:
        return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  const getNotificationClass = (type: string) => {
    switch(type) {
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400';
    }
  };
  
  const getNotificationTitleClass = (type: string) => {
    switch(type) {
      case 'error':
        return 'text-red-800 dark:text-red-200';
      case 'warning':
        return 'text-yellow-800 dark:text-yellow-200';
      case 'info':
        return 'text-blue-800 dark:text-blue-200';
      default:
        return 'text-blue-800 dark:text-blue-200';
    }
  };
  
  const getNotificationTextClass = (type: string) => {
    switch(type) {
      case 'error':
        return 'text-red-700 dark:text-red-300';
      case 'warning':
        return 'text-yellow-700 dark:text-yellow-300';
      case 'info':
        return 'text-blue-700 dark:text-blue-300';
      default:
        return 'text-blue-700 dark:text-blue-300';
    }
  };
  
  const getNotificationButtonClass = (type: string) => {
    switch(type) {
      case 'error':
        return 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-900/50';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 hover:bg-yellow-100 dark:hover:bg-yellow-900/50';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-900/50';
      default:
        return 'bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-900/50';
    }
  };

  return (
    <Card className="islamic-border border-neutral-300">
      <CardHeader className="px-6 py-5 border-b border-border flex justify-between items-center">
        <div>
          <CardTitle className="text-lg font-medium leading-6">
            System Notifications
          </CardTitle>
          <CardDescription>Recent alerts and updates.</CardDescription>
        </div>
        <Badge variant="destructive">{notifications.length} New</Badge>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className={`p-4 flex ${getNotificationClass(notification.type)} ${notification.id === 1 ? 'pulse-animation' : ''}`}>
              <div className="flex-shrink-0">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="ml-3">
                <h3 className={`text-sm font-medium ${getNotificationTitleClass(notification.type)}`}>
                  {notification.title}
                </h3>
                <div className={`mt-2 text-sm ${getNotificationTextClass(notification.type)}`}>
                  <p>{notification.message}</p>
                </div>
                {notification.actions && (
                  <div className="mt-4">
                    <div className="-mx-2 -my-1.5 flex">
                      {notification.actions.primary && (
                        <Button 
                          type="button" 
                          className={`px-2 py-1.5 rounded-md text-sm font-medium ${getNotificationButtonClass(notification.type)}`}
                          variant="ghost"
                        >
                          {notification.actions.primary}
                        </Button>
                      )}
                      {notification.actions.secondary && (
                        <Button 
                          type="button" 
                          className={`ml-3 px-2 py-1.5 rounded-md text-sm font-medium ${getNotificationButtonClass(notification.type)}`}
                          variant="ghost"
                        >
                          {notification.actions.secondary}
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default SystemNotifications;
