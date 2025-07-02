import { ReactNode } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface MetricsCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  footerLink?: string;
  footerText?: string;
  iconBgColor?: string;
  borderColor?: string;
  footerContent?: ReactNode;
}

export function MetricsCard({
  title,
  value,
  icon,
  footerLink,
  footerText,
  iconBgColor = "bg-primary-light",
  borderColor = "border-primary",
  footerContent
}: MetricsCardProps) {
  return (
    <Card className={cn("overflow-hidden shadow rounded-lg islamic-border", borderColor)}>
      <CardContent className="p-5">
        <div className="flex items-center">
          <div className={cn("flex-shrink-0 rounded-md p-3", iconBgColor)}>
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-400 truncate">{title}</dt>
              <dd>
                <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted px-5 py-3">
        <div className="text-sm w-full">
          {footerLink && footerText ? (
            <a href={footerLink} className="font-medium text-primary hover:text-primary/80">
              {footerText}
            </a>
          ) : (
            footerContent
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

export default MetricsCard;
