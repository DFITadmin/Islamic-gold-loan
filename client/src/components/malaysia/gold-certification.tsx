import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableRow, TableHeader, TableHead, TableCell, TableBody, Table } from "@/components/ui/table";
import { 
  ShieldCheck, 
  BadgeCheck, 
  Scale, 
  FileText, 
  CreditCard, 
  Award, 
  AlertTriangle,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function MalaysiaGoldCertification() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("certification");
  const [assessorId, setAssessorId] = useState("");
  const [certificationNumber, setCertificationNumber] = useState("");
  const [goldStandard, setGoldStandard] = useState("");
  
  const handleCertify = () => {
    if (!assessorId || !certificationNumber || !goldStandard) {
      toast({
        title: "Missing information",
        description: "Please fill in all required certification fields",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Gold certification completed",
      description: "Malaysian gold certification has been recorded successfully",
    });
  };

  return (
    <Card className="islamic-border border-primary">
      <CardHeader className="bg-amber-50 dark:bg-amber-950/20 space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BadgeCheck className="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400" />
            <CardTitle className="text-lg text-amber-700 dark:text-amber-300">Malaysia Gold Certification</CardTitle>
          </div>
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800">
            Malaysia Standard
          </Badge>
        </div>
        <CardDescription>
          Gold certification according to Malaysian gold standards and halal requirements
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <Tabs defaultValue="certification" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="certification">Certification</TabsTrigger>
            <TabsTrigger value="standards">Malaysia Standards</TabsTrigger>
            <TabsTrigger value="halal">Halal Verification</TabsTrigger>
          </TabsList>
          
          <TabsContent value="certification" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 text-primary" />
                Gold Certification Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assessor-id">Malaysian Authorized Assessor ID</Label>
                  <Input 
                    id="assessor-id" 
                    placeholder="MA-12345" 
                    value={assessorId}
                    onChange={(e) => setAssessorId(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Enter the ID of the authorized gold assessor in Malaysia</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="certification-number">Certification Number</Label>
                  <Input 
                    id="certification-number" 
                    placeholder="MYS-GOLD-2025-12345" 
                    value={certificationNumber}
                    onChange={(e) => setCertificationNumber(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Enter the unique Malaysian gold certification number</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gold-standard">Malaysian Gold Standard</Label>
                <Select 
                  value={goldStandard}
                  onValueChange={setGoldStandard}
                >
                  <SelectTrigger id="gold-standard">
                    <SelectValue placeholder="Select gold standard" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ms-2574">MS 2574:2014 - Gold Minting</SelectItem>
                    <SelectItem value="ms-2382">MS 2382:2019 - Gold Jewelry</SelectItem>
                    <SelectItem value="ms-2596">MS 2596:2015 - Investment Gold</SelectItem>
                    <SelectItem value="ms-2470">MS 2470:2013 - Purity Testing</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Select the applicable Malaysian Standard (MS) for gold certification</p>
              </div>
            </div>
            
            <div className="p-4 border rounded-md space-y-3">
              <div className="flex items-start">
                <Info className="h-5 w-5 mr-2 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Malaysian Certification Requirements</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Malaysia requires all gold used as collateral in Islamic financing to be certified by an authorized
                    gold assessor and comply with Malaysian gold standards. This certification ensures the gold 
                    meets both quality and Shariah compliance requirements.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="standards" className="space-y-6">
            <div className="flex items-center mb-4">
              <Award className="h-5 w-5 mr-2 text-primary" />
              <h3 className="text-lg font-medium">Malaysian Gold Standards</h3>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Standard Code</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Application</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">MS 2574:2014</TableCell>
                  <TableCell>Gold bullion coins — Specification</TableCell>
                  <TableCell>Gold coins and minting standards</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">MS 2382:2019</TableCell>
                  <TableCell>Jewellery — Fineness of precious metal alloys</TableCell>
                  <TableCell>Gold jewelry and ornaments</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">MS 2596:2015</TableCell>
                  <TableCell>Investment gold — Requirements and test methods</TableCell>
                  <TableCell>Investment gold bars and coins</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">MS 2470:2013</TableCell>
                  <TableCell>Methods for analysis of gold — Cupellation</TableCell>
                  <TableCell>Gold purity testing procedures</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            
            <div className="p-4 border rounded-md bg-muted/30">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 mr-2 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Important Notice</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    All gold items used as collateral must comply with the relevant Malaysian Standard (MS).
                    Non-compliant gold may be rejected or valued at a lower rate.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="halal" className="space-y-6">
            <div className="flex items-center mb-4">
              <FileText className="h-5 w-5 mr-2 text-primary" />
              <h3 className="text-lg font-medium">Halal Gold Verification</h3>
            </div>
            
            <div className="p-4 border rounded-md space-y-3">
              <div className="flex items-start">
                <Scale className="h-5 w-5 mr-2 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Shariah Requirements for Gold</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    In Islamic finance, gold must meet specific Shariah requirements to be considered halal:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
                    <li>Gold must be physically possessed before being sold (qabd)</li>
                    <li>Gold can only be exchanged for its full value in a spot transaction</li>
                    <li>When exchanging gold for currency, the transaction must be completed in a single session</li>
                    <li>Gold cannot be sold for future payment (must be paid in full at transaction time)</li>
                  </ul>
                </div>
              </div>
              
              <Separator className="my-3" />
              
              <div className="flex items-start">
                <CreditCard className="h-5 w-5 mr-2 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Malaysian Shariah Gold Standards</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    The Malaysian Islamic Banking and Finance Institute (IBFIM) and Shariah Advisory Council of Bank Negara Malaysia
                    have established specific gold standards that comply with both technical and Shariah requirements.
                    All gold financing provided by AR-Rahanu adheres to these standards.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {activeTab === "certification" && (
        <CardFooter className="bg-muted/30 flex justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Info className="h-4 w-4 mr-1 text-blue-600" />
            Required for Malaysian compliance
          </div>
          
          <Button onClick={handleCertify}>
            Certify Gold
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}