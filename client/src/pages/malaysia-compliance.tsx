import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MalaysiaRegulatoryCompliance } from "@/components/malaysia/regulatory-compliance";
import { MalaysiaGoldCertification } from "@/components/malaysia/gold-certification";
import { 
  Shield, 
  BookOpen, 
  CheckCircle, 
  FileText, 
  BadgeCheck,
  AlertTriangle,
  Building2,
  Scale,
  Info
} from "lucide-react";

export default function MalaysiaCompliance() {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <Layout>
      <div className="flex flex-col space-y-8 p-8">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Malaysia Regulatory Compliance</h2>
          <p className="text-muted-foreground">
            Bank Negara Malaysia (BNM) and Shariah Advisory Council standards for Islamic gold financing
          </p>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="regulatory">BNM Requirements</TabsTrigger>
            <TabsTrigger value="shariah">Shariah Compliance</TabsTrigger>
            <TabsTrigger value="gold">Gold Standards</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader className="bg-amber-50 dark:bg-amber-950/20">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  <CardTitle>Malaysia L2 Regulatory Framework</CardTitle>
                </div>
                <CardDescription>
                  Bank Negara Malaysia's comprehensive regulatory framework for Islamic gold financing
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm font-medium flex items-center">
                        <Building2 className="h-4 w-4 mr-2 text-primary" />
                        BNM Compliance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-sm">
                      <p>Bank Negara Malaysia regulations for Islamic financial institutions offering gold financing</p>
                      <Badge variant="outline" className="mt-2 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                        Level 2 Compliance
                      </Badge>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm font-medium flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-primary" />
                        Shariah Standards
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-sm">
                      <p>All gold financing follows Shariah Advisory Council of BNM approved structures</p>
                      <Badge variant="outline" className="mt-2 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800">
                        Fully Compliant
                      </Badge>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm font-medium flex items-center">
                        <BadgeCheck className="h-4 w-4 mr-2 text-primary" />
                        Malaysian Gold Standards
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-sm">
                      <p>All gold collateral certified to Malaysian Standards (MS) requirements</p>
                      <Badge variant="outline" className="mt-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800">
                        MS Certified
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="p-4 border rounded-md">
                  <div className="flex items-start space-x-2">
                    <Info className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">About Malaysia Regulatory Compliance</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        AR-Rahanu operates under the Islamic Financial Services Act (IFSA) 2013 and is regulated 
                        by Bank Negara Malaysia. All gold financing products are structured according to Shariah principles
                        and are approved by our Shariah Committee in accordance with Shariah Advisory Council of BNM standards.
                        Gold items used as collateral meet Malaysian gold standards (MS 2574, MS 2382, MS 2596) and undergo 
                        stringent verification by authorized Malaysian gold assessors.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <MalaysiaRegulatoryCompliance />
          </TabsContent>
          
          <TabsContent value="regulatory" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <CardTitle>Bank Negara Malaysia Requirements</CardTitle>
                </div>
                <CardDescription>
                  Regulatory requirements for Islamic gold financing in Malaysia
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Regulatory Framework</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium">Islamic Financial Services Act (IFSA) 2013</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        All gold financing products comply with IFSA 2013 requirements including 
                        disclosure, contracts, and documentation requirements.
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium">BNM Shariah Standards</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Compliance with BNM Shariah standard on Ar-Rahnu (Islamic pawn broking), 
                        Murabahah (cost-plus financing), and Qard (interest-free loans).
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium">Policy Document on Ar-Rahnu</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Our gold financing follows BNM's Policy Document on Ar-Rahnu to ensure 
                        fair valuation, safekeeping, and proper documentation.
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium">Financial Consumer Protection</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Adherence to BNM's Financial Consumer Protection regulations including 
                        fair treatment, transparency, and responsible financing requirements.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Documentation Requirements</h3>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-start space-x-2 p-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">BNM-approved Contract Documents</h4>
                        <p className="text-sm text-muted-foreground">
                          All financing agreements use BNM-approved Shariah contract templates
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2 p-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Product Disclosure Sheet (PDS)</h4>
                        <p className="text-sm text-muted-foreground">
                          Standardized Product Disclosure Sheet as required by BNM
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2 p-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Certificate of Authentication</h4>
                        <p className="text-sm text-muted-foreground">
                          Malaysia Gold Standard certification for all gold items
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2 p-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Regulatory Filings</h4>
                        <p className="text-sm text-muted-foreground">
                          Compliance with all BNM reporting and disclosure requirements
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="shariah" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Scale className="h-5 w-5 text-primary" />
                  <CardTitle>Shariah Compliance Standards</CardTitle>
                </div>
                <CardDescription>
                  Islamic finance principles governing gold financing in Malaysia
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Shariah Structures for Gold Financing</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-md font-medium">Ar-Rahnu</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">
                          Islamic pawn broking that uses gold as collateral for a Qard (interest-free loan).
                          The gold is held as security and the customer pays a safekeeping fee.
                        </p>
                        <Badge className="mt-2 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                          Primary Structure
                        </Badge>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-md font-medium">Murabahah</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">
                          Cost-plus financing where the institution buys the gold from the customer and resells
                          it back at an agreed higher price with deferred payment.
                        </p>
                        <Badge className="mt-2 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                          Alternative Structure
                        </Badge>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-md font-medium">Wadiah Yad Amanah</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">
                          Safe custody arrangement where the customer entrusts the gold to the institution
                          for safekeeping during the financing period.
                        </p>
                        <Badge className="mt-2 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                          Complementary Structure
                        </Badge>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-md font-medium">Ujrah</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">
                          Fee-based structure used in conjunction with Ar-Rahnu to charge for the safekeeping
                          and management of the gold collateral.
                        </p>
                        <Badge className="mt-2 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                          Fee Structure
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <Separator />
                
                <div className="p-4 border rounded-md bg-amber-50/30 dark:bg-amber-950/10">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Shariah Governance</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        All gold financing products are reviewed and approved by our Shariah Committee,
                        which is registered with and approved by the Shariah Advisory Council of Bank Negara
                        Malaysia. The committee ensures:
                      </p>
                      <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground">
                        <li>Gold transactions comply with the principles of Shariah</li>
                        <li>Documentation is free from prohibited elements like interest (riba)</li>
                        <li>All charges and fees are transparent and Shariah-compliant</li>
                        <li>Gold valuation and assessment follow Islamic principles</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="gold" className="space-y-4">
            <MalaysiaGoldCertification />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}