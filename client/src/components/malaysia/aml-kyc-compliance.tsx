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
  Shield, 
  UserCheck, 
  AlertTriangle,
  FileSearch,
  Eye,
  Flag,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";

interface CustomerDueDiligence {
  clientId: string;
  riskLevel: "low" | "medium" | "high";
  kycStatus: "pending" | "completed" | "rejected" | "expired";
  lastReview: string;
  nextReview: string;
  documents: string[];
  sanctions: boolean;
  pep: boolean; // Politically Exposed Person
  source: string;
}

interface SuspiciousActivity {
  id: string;
  clientId: string;
  type: "unusual_transaction" | "source_of_funds" | "behavioral_change" | "sanctions_match";
  description: string;
  riskScore: number;
  status: "open" | "investigating" | "closed" | "reported";
  createdDate: string;
  assignedTo: string;
}

export function MalaysiaAMLKYCCompliance() {
  const [activeTab, setActiveTab] = useState("kyc");

  const customerDueDiligence: CustomerDueDiligence[] = [
    {
      clientId: "CL-001",
      riskLevel: "low",
      kycStatus: "completed",
      lastReview: "2025-01-15",
      nextReview: "2026-01-15",
      documents: ["IC", "Bank Statement", "Salary Slip"],
      sanctions: false,
      pep: false,
      source: "Employment"
    },
    {
      clientId: "CL-002",
      riskLevel: "medium",
      kycStatus: "pending",
      lastReview: "2024-12-01",
      nextReview: "2025-06-01",
      documents: ["Passport", "Business Registration"],
      sanctions: false,
      pep: false,
      source: "Business"
    },
    {
      clientId: "CL-003",
      riskLevel: "high",
      kycStatus: "completed",
      lastReview: "2025-03-10",
      nextReview: "2025-09-10",
      documents: ["IC", "Asset Declaration", "Source of Wealth"],
      sanctions: false,
      pep: true,
      source: "Investment"
    }
  ];

  const suspiciousActivities: SuspiciousActivity[] = [
    {
      id: "SAR-001",
      clientId: "CL-004",
      type: "unusual_transaction",
      description: "Multiple large gold transactions within short period",
      riskScore: 75,
      status: "investigating",
      createdDate: "2025-05-20",
      assignedTo: "Compliance Officer A"
    },
    {
      id: "SAR-002",
      clientId: "CL-005",
      type: "source_of_funds",
      description: "Unable to verify source of large cash deposit",
      riskScore: 85,
      status: "open",
      createdDate: "2025-05-18",
      assignedTo: "Compliance Officer B"
    }
  ];

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Low Risk</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium Risk</Badge>;
      case "high":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">High Risk</Badge>;
      default:
        return <Badge variant="outline">{risk}</Badge>;
    }
  };

  const getKYCStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      case "expired":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getSARStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Open</Badge>;
      case "investigating":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Investigating</Badge>;
      case "closed":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Closed</Badge>;
      case "reported":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Reported</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ms-MY');
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary">
        <CardHeader className="bg-red-50 dark:bg-red-950/20">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
            <CardTitle className="text-lg text-red-700 dark:text-red-300">Malaysian AML/CFT & KYC Compliance</CardTitle>
          </div>
          <CardDescription>
            Anti-Money Laundering, Counter Financing of Terrorism & Know Your Customer compliance management
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="kyc">KYC Management</TabsTrigger>
              <TabsTrigger value="monitoring">Transaction Monitoring</TabsTrigger>
              <TabsTrigger value="reporting">SAR Reporting</TabsTrigger>
              <TabsTrigger value="sanctions">Sanctions Screening</TabsTrigger>
            </TabsList>

            <TabsContent value="kyc" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Customer Due Diligence (CDD)</h3>
                <Button>
                  <UserCheck className="h-4 w-4 mr-2" />
                  New KYC Review
                </Button>
              </div>

              <div className="space-y-4">
                {customerDueDiligence.map((customer) => (
                  <Card key={customer.clientId} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium">Client {customer.clientId}</h4>
                          {getRiskBadge(customer.riskLevel)}
                          {getKYCStatusBadge(customer.kycStatus)}
                          {customer.pep && (
                            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                              PEP
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Last Review:</span>
                            <p className="font-medium">{formatDate(customer.lastReview)}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Next Review:</span>
                            <p className="font-medium">{formatDate(customer.nextReview)}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Source of Funds:</span>
                            <p className="font-medium">{customer.source}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Documents:</span>
                            <p className="font-medium">{customer.documents.length} files</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileSearch className="h-4 w-4 mr-1" />
                          Documents
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Separator />

              <div className="bg-blue-50/30 dark:bg-blue-950/10 p-4 rounded-md border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium mb-2">Malaysian KYC Requirements</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Customer identification verification</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Source of funds verification</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Beneficial ownership identification</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Risk assessment and profiling</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>PEP and sanctions screening</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Ongoing monitoring and review</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="monitoring" className="space-y-4">
              <h3 className="text-lg font-medium">Transaction Monitoring</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">124</div>
                  <p className="text-sm text-muted-foreground">Transactions Monitored Today</p>
                </Card>
                
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">8</div>
                  <p className="text-sm text-muted-foreground">Alerts Generated</p>
                </Card>
                
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">2</div>
                  <p className="text-sm text-muted-foreground">High-Risk Transactions</p>
                </Card>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Monitoring Rules</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h5 className="font-medium mb-2">Large Transaction Threshold</h5>
                    <p className="text-sm text-muted-foreground mb-2">
                      Transactions exceeding RM50,000 require enhanced due diligence
                    </p>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                      Active
                    </Badge>
                  </Card>
                  
                  <Card className="p-4">
                    <h5 className="font-medium mb-2">Velocity Monitoring</h5>
                    <p className="text-sm text-muted-foreground mb-2">
                      Multiple transactions within 24 hours exceeding normal patterns
                    </p>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                      Active
                    </Badge>
                  </Card>
                  
                  <Card className="p-4">
                    <h5 className="font-medium mb-2">Cash Transaction Reporting</h5>
                    <p className="text-sm text-muted-foreground mb-2">
                      Cash transactions exceeding RM25,000 require CTR filing
                    </p>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      Mandatory
                    </Badge>
                  </Card>
                  
                  <Card className="p-4">
                    <h5 className="font-medium mb-2">Cross-Border Monitoring</h5>
                    <p className="text-sm text-muted-foreground mb-2">
                      International transactions require additional screening
                    </p>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      Enhanced
                    </Badge>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reporting" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Suspicious Activity Reports (SAR)</h3>
                <Button>
                  <Flag className="h-4 w-4 mr-2" />
                  File New SAR
                </Button>
              </div>

              <div className="space-y-4">
                {suspiciousActivities.map((sar) => (
                  <Card key={sar.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium">SAR {sar.id}</h4>
                          {getSARStatusBadge(sar.status)}
                          <Badge variant="outline" className={`${
                            sar.riskScore >= 80 ? 'bg-red-100 text-red-800 border-red-200' :
                            sar.riskScore >= 60 ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                            'bg-green-100 text-green-800 border-green-200'
                          }`}>
                            Risk: {sar.riskScore}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">{sar.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-muted-foreground">
                          <span>Client: {sar.clientId}</span>
                          <span>Type: {sar.type.replace('_', ' ')}</span>
                          <span>Created: {formatDate(sar.createdDate)}</span>
                          <span>Assigned: {sar.assignedTo}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Investigate
                        </Button>
                        {sar.status === "investigating" && (
                          <Button size="sm">
                            <Flag className="h-4 w-4 mr-1" />
                            Report
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Separator />

              <div className="bg-amber-50/30 dark:bg-amber-950/10 p-4 rounded-md border border-amber-200 dark:border-amber-800">
                <h4 className="font-medium mb-2">SAR Filing Requirements</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• File SAR within 15 days of discovery of suspicious activity</li>
                  <li>• Include all relevant transaction details and supporting documents</li>
                  <li>• Submit to Financial Intelligence Unit (FIU) of Bank Negara Malaysia</li>
                  <li>• Maintain confidentiality - do not disclose to customer</li>
                  <li>• Keep records for minimum 6 years after filing</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="sanctions" className="space-y-4">
              <h3 className="text-lg font-medium">Sanctions Screening</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Screening Lists</h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <span className="font-medium">UN Security Council</span>
                        <p className="text-xs text-muted-foreground">Global sanctions list</p>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Updated
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <span className="font-medium">Malaysia National List</span>
                        <p className="text-xs text-muted-foreground">BNM sanctioned entities</p>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Updated
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <span className="font-medium">OFAC List</span>
                        <p className="text-xs text-muted-foreground">US Treasury sanctions</p>
                      </div>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                        Pending
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Screening Results</h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <span className="text-sm">Customers Screened Today</span>
                      <span className="font-bold">47</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <span className="text-sm">Potential Matches</span>
                      <span className="font-bold text-yellow-600">3</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <span className="text-sm">Confirmed Matches</span>
                      <span className="font-bold text-red-600">0</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <span className="text-sm">False Positives</span>
                      <span className="font-bold text-green-600">3</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="bg-red-50/30 dark:bg-red-950/10 p-4 rounded-md border border-red-200 dark:border-red-800">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Critical Compliance Notice</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      All customers must be screened against sanctions lists before account opening and 
                      ongoing basis. Any matches must be immediately escalated to compliance team and 
                      reported to authorities within 24 hours as per Malaysian AML/CFT regulations.
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