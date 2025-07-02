import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  Calendar, 
  Globe,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Building
} from "lucide-react";

interface MalaysianHoliday {
  date: string;
  name: string;
  type: "national" | "state" | "religious" | "islamic";
  states?: string[];
  description: string;
  bankingImpact: boolean;
}

export function MalaysiaTimezoneHolidayManagement() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const malaysianHolidays: MalaysianHoliday[] = [
    {
      date: "2025-01-01",
      name: "New Year's Day",
      type: "national",
      description: "National public holiday",
      bankingImpact: true
    },
    {
      date: "2025-01-29",
      name: "Chinese New Year",
      type: "national",
      description: "Chinese New Year celebration",
      bankingImpact: true
    },
    {
      date: "2025-01-30",
      name: "Chinese New Year (Second Day)",
      type: "national",
      description: "Second day of Chinese New Year",
      bankingImpact: true
    },
    {
      date: "2025-03-31",
      name: "Hari Raya Puasa (Eid al-Fitr)",
      type: "islamic",
      description: "End of Ramadan celebration",
      bankingImpact: true
    },
    {
      date: "2025-04-01",
      name: "Hari Raya Puasa (Second Day)",
      type: "islamic",
      description: "Second day of Eid al-Fitr",
      bankingImpact: true
    },
    {
      date: "2025-05-01",
      name: "Labour Day",
      type: "national",
      description: "International Workers' Day",
      bankingImpact: true
    },
    {
      date: "2025-05-12",
      name: "Wesak Day",
      type: "national",
      description: "Buddha's Birthday",
      bankingImpact: true
    },
    {
      date: "2025-06-02",
      name: "Yang di-Pertuan Agong's Birthday",
      type: "national",
      description: "King's official birthday",
      bankingImpact: true
    },
    {
      date: "2025-06-07",
      name: "Hari Raya Haji (Eid al-Adha)",
      type: "islamic",
      description: "Festival of Sacrifice",
      bankingImpact: true
    },
    {
      date: "2025-08-31",
      name: "Merdeka Day",
      type: "national",
      description: "Independence Day",
      bankingImpact: true
    },
    {
      date: "2025-09-16",
      name: "Malaysia Day",
      type: "national",
      description: "Formation of Malaysia",
      bankingImpact: true
    },
    {
      date: "2025-10-20",
      name: "Deepavali",
      type: "national",
      description: "Festival of Lights",
      bankingImpact: true
    },
    {
      date: "2025-12-25",
      name: "Christmas Day",
      type: "national",
      description: "Christian celebration",
      bankingImpact: true
    }
  ];

  const formatMalaysianTime = (date: Date) => {
    return date.toLocaleString('ms-MY', {
      timeZone: 'Asia/Kuala_Lumpur',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const isBusinessDay = (date: Date) => {
    const day = date.getDay();
    const dateString = date.toISOString().split('T')[0];
    const isWeekend = day === 0 || day === 6; // Sunday or Saturday
    const isHoliday = malaysianHolidays.some(holiday => holiday.date === dateString);
    return !isWeekend && !isHoliday;
  };

  const getNextBusinessDay = () => {
    let nextDay = new Date(currentTime);
    nextDay.setDate(nextDay.getDate() + 1);
    
    while (!isBusinessDay(nextDay)) {
      nextDay.setDate(nextDay.getDate() + 1);
    }
    
    return nextDay;
  };

  const getUpcomingHolidays = () => {
    const today = new Date();
    return malaysianHolidays
      .filter(holiday => new Date(holiday.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  };

  const getBankingHours = () => {
    const now = new Date();
    const hour = now.getHours();
    const isWeekday = now.getDay() >= 1 && now.getDay() <= 5;
    const isSaturday = now.getDay() === 6;
    
    if (!isBusinessDay(now)) {
      return { isOpen: false, status: "Closed - Public Holiday", nextOpen: getNextBusinessDay() };
    }
    
    if (isWeekday && hour >= 9 && hour < 16) {
      return { isOpen: true, status: "Open - Banking Hours", nextOpen: null };
    }
    
    if (isSaturday && hour >= 9 && hour < 12) {
      return { isOpen: true, status: "Open - Saturday Hours", nextOpen: null };
    }
    
    return { isOpen: false, status: "Closed - Outside Banking Hours", nextOpen: getNextBusinessDay() };
  };

  const bankingStatus = getBankingHours();

  return (
    <div className="space-y-6">
      <Card className="border-primary">
        <CardHeader className="bg-blue-50 dark:bg-blue-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <CardTitle className="text-lg text-blue-700 dark:text-blue-300">Malaysian Time Zone Management</CardTitle>
            </div>
            <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-800">
              GMT+8
            </Badge>
          </div>
          <CardDescription>
            Malaysian Standard Time (MST) for Islamic finance operations
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 border rounded-md bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                <h3 className="font-medium mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Current Malaysian Time
                </h3>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {formatMalaysianTime(currentTime)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Asia/Kuala_Lumpur (UTC+8)
                </p>
              </div>

              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2 flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  Banking Hours Status
                </h3>
                <div className="flex items-center space-x-2">
                  {bankingStatus.isOpen ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`font-medium ${bankingStatus.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                    {bankingStatus.status}
                  </span>
                </div>
                {bankingStatus.nextOpen && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Next business day: {bankingStatus.nextOpen.toLocaleDateString('ms-MY')}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Malaysian Banking Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 border rounded">
                  <span>Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between p-2 border rounded">
                  <span>Saturday</span>
                  <span className="font-medium">9:00 AM - 12:00 PM</span>
                </div>
                <div className="flex justify-between p-2 border rounded">
                  <span>Sunday & Public Holidays</span>
                  <span className="font-medium text-red-600">Closed</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="bg-amber-50/30 dark:bg-amber-950/10 p-4 rounded-md border border-amber-200 dark:border-amber-800">
            <div className="flex items-start space-x-2">
              <Globe className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium">Islamic Finance Timing Requirements</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  All Islamic gold financing transactions must be completed during Malaysian banking hours
                  in compliance with Bank Negara Malaysia regulations. Contract execution (Aqad) times are
                  recorded in Malaysian Standard Time for regulatory reporting.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary">
        <CardHeader className="bg-green-50 dark:bg-green-950/20">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
            <CardTitle className="text-lg text-green-700 dark:text-green-300">Malaysian Public Holidays 2025</CardTitle>
          </div>
          <CardDescription>
            Official public holidays affecting Islamic finance operations
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="font-medium">Upcoming Holidays</h3>
            <div className="space-y-3">
              {getUpcomingHolidays().map((holiday, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h4 className="font-medium">{holiday.name}</h4>
                    <p className="text-sm text-muted-foreground">{holiday.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          holiday.type === 'islamic' 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : holiday.type === 'national'
                            ? 'bg-blue-100 text-blue-800 border-blue-200'
                            : 'bg-purple-100 text-purple-800 border-purple-200'
                        }`}
                      >
                        {holiday.type === 'islamic' ? 'Islamic Holiday' : 
                         holiday.type === 'national' ? 'National Holiday' : 'Religious Holiday'}
                      </Badge>
                      {holiday.bankingImpact && (
                        <Badge variant="outline" className="text-xs bg-red-100 text-red-800 border-red-200">
                          Banking Closed
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{new Date(holiday.date).toLocaleDateString('ms-MY')}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(holiday.date).toLocaleDateString('en-US', { weekday: 'long' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          <div className="bg-blue-50/30 dark:bg-blue-950/10 p-4 rounded-md border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium mb-2">Holiday Impact on Islamic Finance</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• No new loan applications or approvals processed on public holidays</li>
              <li>• Payment due dates falling on holidays are automatically extended to next business day</li>
              <li>• Islamic calendar holidays (Hari Raya) have special significance for Muslim clients</li>
              <li>• All contract execution (Aqad) ceremonies respect Malaysian cultural and religious holidays</li>
              <li>• Gold valuation services suspended during public holidays</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}