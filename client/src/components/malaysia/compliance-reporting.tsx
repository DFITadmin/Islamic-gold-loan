import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  Send,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Building2,
  Shield,
  BookOpen
} from "lucide-react";

interface ComplianceReport {
  id: string;
  title: string;
  type: "monthly" | "quarterly" | "annual" | "adhoc";
  status: "pending" | "submitted" | "approved" | "overdue";
  dueDate: string;
  submittedDate?: string;
  description: string;
  regulatoryBody: string;
}

export function MalaysiaComplianceReporting() {
  const [activeTab, setActiveTab] = useState("reports");

  const complianceReports: ComplianceReport[] = [
    {
      id: "BNM-001",
      title: "Islamic Banking Statistics",
      type: "monthly",
      status: "submitted",
      dueDate: "2025-06-15",
      submittedDate: "2025-06-10",
      description: "Monthly statistical returns for Islamic banking operations",
      regulatoryBody: "Bank Negara Malaysia"
    },
    {
      id: "BNM-002",
      title: "Shariah Compliance Report",
      type: "quarterly",
      status: "pending",
      dueDate: "2025-07-30",
      description: "Quarterly Shariah compliance assessment and review",
      regulatoryBody: "Bank Negara Malaysia"
    },
    {
      id: "BNM-003",
      title: "Customer Complaints Report",
      type: "quarterly",
      status: "approved",
      dueDate: "2025-04-30",
      submittedDate: "2025-04-25",
      description: "Quarterly customer complaints and resolution report",
      regulatoryBody: "Bank Negara Malaysia"
    },
    {
      id: "SC-001",
      title: "Securities Commission Notification",
      type: "adhoc",
      status: "pending",
      dueDate: "2025-06-20",
      description: "Notification of new Islamic finance products",
      regulatoryBody: "Securities Commission Malaysia"
    },
    {
      id: "LOFSA-001",
      title: "Labuan Offshore Financial Services Report",
      type: "annual",
      status: "overdue",
      dueDate: "2025-05-31",
      description: "Annual compliance report for offshore operations",
      regulatoryBody: "Labuan FSA"
    }
  ];

  const getStatusBadge = (status: ComplianceReport['status']) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case "submitted":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Submitted</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Approved</Badge>;
      case "overdue":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: ComplianceReport['type']) => {
    switch (type) {
      case "monthly":
        return <Badge variant="secondary">Monthly</Badge>;
      case "quarterly":
        return <Badge variant="secondary">Quarterly</Badge>;
      case "annual":
        return <Badge variant="secondary">Annual</Badge>;
      case "adhoc":
        return <Badge variant="secondary">Ad-hoc</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ms-MY', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary">
        <CardHeader className="bg-blue-50 dark:bg-blue-950/20">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-lg text-blue-700 dark:text-blue-300">Malaysian Regulatory Compliance & Reporting</CardTitle>
          </div>
          <CardDescription>
            Comprehensive compliance management for Malaysian Islamic finance regulations
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="regulations">Regulations</TabsTrigger>
              <TabsTrigger value="documentation">Documentation</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            </TabsList>

            <TabsContent value="reports" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Compliance Reports</h3>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>

              <div className="space-y-4">
                {complianceReports.map((report) => (
                  <Card key={report.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium">{report.title}</h4>
                          {getStatusBadge(report.status)}
                          {getTypeBadge(report.type)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>ID: {report.id}</span>
                          <span>Regulator: {report.regulatoryBody}</span>
                          <span>Due: {formatDate(report.dueDate)}</span>
                          {report.submittedDate && (
                            <span>Submitted: {formatDate(report.submittedDate)}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        {report.status === "pending" && (
                          <Button size="sm">
                            <Send className="h-4 w-4 mr-1" />
                            Submit
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="regulations" className="space-y-4">
              <h3 className="text-lg font-medium">Key Malaysian Regulations</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="flex items-start space-x-2">
                    <Building2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Islamic Financial Services Act 2013</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Comprehensive legislation governing Islamic financial institutions in Malaysia.
                        Covers licensing, governance, and operational requirements.
                      </p>
                      <Badge variant="outline" className="mt-2 bg-blue-100 text-blue-800 border-blue-200">
                        Primary Legislation
                      </Badge>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-start space-x-2">
                    <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Shariah Governance Framework</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        BNM's framework for Shariah governance in Islamic financial institutions.
                        Mandatory for all Islamic finance operations.
                      </p>
                      <Badge variant="outline" className="mt-2 bg-green-100 text-green-800 border-green-200">
                        Shariah Compliance
                      </Badge>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-start space-x-2">
                    <Shield className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Financial Consumer Protection Framework</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Regulations ensuring fair treatment of financial consumers.
                        Includes disclosure requirements and complaint handling.
                      </p>
                      <Badge variant="outline" className="mt-2 bg-purple-100 text-purple-800 border-purple-200">
                        Consumer Protection
                      </Badge>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-start space-x-2">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Anti-Money Laundering Guidelines</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        AML/CFT requirements for Islamic financial institutions.
                        Includes customer due diligence and reporting obligations.
                      </p>
                      <Badge variant="outline" className="mt-2 bg-red-100 text-red-800 border-red-200">
                        AML/CFT
                      </Badge>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="documentation" className="space-y-4">
              <h3 className="text-lg font-medium">Required Documentation</h3>
              
              <div className="space-y-4">
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Shariah Compliance Documentation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Shariah Committee Resolutions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Product Shariah Approval Letters</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Shariah Audit Reports</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Shariah Risk Management Framework</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2">Operational Documentation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Standard Operating Procedures</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Product Disclosure Sheets</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Customer Agreement Templates</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Risk Management Policies</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2">Regulatory Filing Documents</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span>Monthly Statistical Returns</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span>Quarterly Compliance Reports</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span>Annual Regulatory Returns</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span>Incident Reporting Forms</span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="monitoring" className="space-y-4">
              <h3 className="text-lg font-medium">Compliance Monitoring Dashboard</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">98.5%</div>
                  <p className="text-sm text-muted-foreground">Shariah Compliance Rate</p>
                  <Badge variant="outline" className="mt-2 bg-green-100 text-green-800 border-green-200">
                    Excellent
                  </Badge>
                </Card>

                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">15</div>
                  <p className="text-sm text-muted-foreground">Reports Submitted This Quarter</p>
                  <Badge variant="outline" className="mt-2 bg-blue-100 text-blue-800 border-blue-200">
                    On Track
                  </Badge>
                </Card>

                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">2</div>
                  <p className="text-sm text-muted-foreground">Pending Actions</p>
                  <Badge variant="outline" className="mt-2 bg-red-100 text-red-800 border-red-200">
                    Requires Attention
                  </Badge>
                </Card>
              </div>

              <Separator />

              <div className="bg-amber-50/30 dark:bg-amber-950/10 p-4 rounded-md border border-amber-200 dark:border-amber-800">
                <h4 className="font-medium mb-2">Regulatory Updates</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p>
                      <span className="font-medium">New BNM Circular:</span> Updated Shariah governance requirements 
                      effective 1 July 2025. Review and update internal policies accordingly.
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p>
                      <span className="font-medium">Reminder:</span> Quarterly customer complaints report 
                      due 30 July 2025. Ensure all customer feedback is properly documented.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}