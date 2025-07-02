import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { 
  BarChart, 
  LineChart,
  Download, 
  FileText, 
  BarChart2, 
  PieChart, 
  TrendingUp,
  Calendar,
  Printer,
  FileDown
} from "lucide-react";

// Sample placeholder component for the charts
function ChartPlaceholder({ type, title }: { type: string, title: string }) {
  const Icon = type === 'bar' ? BarChart2 : type === 'line' ? LineChart : PieChart;
  
  return (
    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
      <Icon className="h-12 w-12 mr-3" />
      <div>
        <p>{title}</p>
        <p className="text-sm">Chart visualization would appear here</p>
      </div>
    </div>
  );
}

export default function Reports() {
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Reports</h1>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Generate and analyze financial reports
            </p>
          </div>
          <div className="mt-4 md:mt-0 w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            <Button variant="default">
              <FileDown className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="performance">
          <TabsList className="mb-6 w-full md:w-auto">
            <TabsTrigger value="performance" className="flex items-center">
              <BarChart className="mr-2 h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center">
              <PieChart className="mr-2 h-4 w-4" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center">
              <TrendingUp className="mr-2 h-4 w-4" />
              Market Trends
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Compliance
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Loans</p>
                      <h3 className="text-2xl font-bold mt-2">182</h3>
                    </div>
                    <div className="bg-primary/10 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                      <h3 className="text-2xl font-bold mt-2">$245,389</h3>
                    </div>
                    <div className="bg-secondary/10 p-2 rounded-full">
                      <BarChart2 className="h-5 w-5 text-secondary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Gold Value</p>
                      <h3 className="text-2xl font-bold mt-2">$4.2M</h3>
                    </div>
                    <div className="bg-accent/10 p-2 rounded-full">
                      <TrendingUp className="h-5 w-5 text-accent" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
                      <h3 className="text-2xl font-bold mt-2">$87,291</h3>
                    </div>
                    <div className="bg-green-500/10 p-2 rounded-full">
                      <BarChart className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 gap-6 mb-6">
              <Card>
                <CardHeader className="px-6 py-4 border-b border-border">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Monthly Performance</CardTitle>
                      <CardDescription>Loans issued and profit over time</CardDescription>
                    </div>
                    <div className="flex">
                      <Button variant="outline" size="sm" className="mr-2">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Select defaultValue="3months">
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1month">Last Month</SelectItem>
                          <SelectItem value="3months">Last 3 Months</SelectItem>
                          <SelectItem value="6months">Last 6 Months</SelectItem>
                          <SelectItem value="1year">Last Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <ChartPlaceholder type="bar" title="Monthly Loan Performance" />
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="px-6 py-4 border-b border-border">
                  <CardTitle>Financing by Gold Type</CardTitle>
                  <CardDescription>Breakdown of loans by gold category</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ChartPlaceholder type="pie" title="Gold Type Distribution" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="px-6 py-4 border-b border-border">
                  <CardTitle>Loan Status</CardTitle>
                  <CardDescription>Current status of all loans</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ChartPlaceholder type="pie" title="Loan Status Distribution" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="portfolio">
            <Card>
              <CardHeader className="px-6 py-4 border-b border-border">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Portfolio Overview</CardTitle>
                    <CardDescription>Gold financing portfolio composition</CardDescription>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      <Printer className="h-4 w-4 mr-2" />
                      Print Report
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader className="px-6 py-4 border-b border-border">
                      <CardTitle>Portfolio by Gold Type</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ChartPlaceholder type="pie" title="Gold Type Distribution" />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="px-6 py-4 border-b border-border">
                      <CardTitle>Portfolio by Client Type</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ChartPlaceholder type="pie" title="Client Distribution" />
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader className="px-6 py-4 border-b border-border">
                    <CardTitle>Portfolio Valuation Over Time</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ChartPlaceholder type="line" title="Portfolio Value Trend" />
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends">
            <Card>
              <CardHeader className="px-6 py-4 border-b border-border">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gold Market Analysis</CardTitle>
                    <CardDescription>Gold price trends and market analysis</CardDescription>
                  </div>
                  <div>
                    <Select defaultValue="1year">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1month">Last Month</SelectItem>
                        <SelectItem value="3months">Last 3 Months</SelectItem>
                        <SelectItem value="6months">Last 6 Months</SelectItem>
                        <SelectItem value="1year">Last Year</SelectItem>
                        <SelectItem value="5years">Last 5 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6">
                  <Card>
                    <CardHeader className="px-6 py-4 border-b border-border">
                      <CardTitle>Gold Price Trend</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ChartPlaceholder type="line" title="Gold Price History" />
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="px-6 py-4 border-b border-border">
                      <CardTitle>Price Volatility</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ChartPlaceholder type="bar" title="Price Volatility Chart" />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="px-6 py-4 border-b border-border">
                      <CardTitle>Market Correlation</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ChartPlaceholder type="line" title="Market Correlation Chart" />
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="compliance">
            <Card>
              <CardHeader className="px-6 py-4 border-b border-border">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Shariah Compliance Reports</CardTitle>
                    <CardDescription>Documentation and compliance tracking</CardDescription>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Report
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Compliance Score</p>
                          <h3 className="text-2xl font-bold mt-2">98%</h3>
                        </div>
                        <div className="bg-green-500/10 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-green-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                          <h3 className="text-2xl font-bold mt-2">12</h3>
                        </div>
                        <div className="bg-yellow-500/10 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-yellow-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Contract Issues</p>
                          <h3 className="text-2xl font-bold mt-2">3</h3>
                        </div>
                        <div className="bg-red-500/10 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-red-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader className="px-6 py-4 border-b border-border">
                    <CardTitle>Compliance Audit History</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <table className="min-w-full divide-y divide-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Audit Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Score</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Issues Found</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Auditor</th>
                        </tr>
                      </thead>
                      <tbody className="bg-card divide-y divide-border">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">2023-04-15</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">Quarterly Shariah Review</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">98%</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">2</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                              Approved
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">Sheikh Ahmed Al-Azhari</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">2023-01-10</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">Annual Compliance Audit</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">96%</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">5</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                              Approved
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">Shariah Board Committee</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">2022-10-22</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">Quarterly Shariah Review</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">93%</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">8</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                              Conditional
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">Sheikh Mohammed Al-Farsi</td>
                        </tr>
                      </tbody>
                    </table>
                  </CardContent>
                  <CardFooter className="px-6 py-4 border-t border-border">
                    <Button variant="link" className="ml-auto">View All Audit Reports</Button>
                  </CardFooter>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
