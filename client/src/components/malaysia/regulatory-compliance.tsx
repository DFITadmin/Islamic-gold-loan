import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, FileCheck, AlertCircle, CheckCircle, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RegulatoryComplianceProps {
  loanId?: number;
  isApplication?: boolean;
}

export function MalaysiaRegulatoryCompliance({ loanId, isApplication = false }: RegulatoryComplianceProps) {
  const { toast } = useToast();
  const [bnmConsentChecked, setBnmConsentChecked] = useState(false);
  const [sacConsentChecked, setSacConsentChecked] = useState(false);
  const [pdpaConsentChecked, setPdpaConsentChecked] = useState(false);
  const [malaysiaGoldStandardChecked, setMalaysiaGoldStandardChecked] = useState(false);
  
  const handleSubmitCompliance = () => {
    if (!bnmConsentChecked || !sacConsentChecked || !pdpaConsentChecked) {
      toast({
        title: "Required consents missing",
        description: "Please check all regulatory consent boxes to proceed.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Compliance verified",
      description: "Malaysian regulatory compliance has been recorded.",
    });
  };

  return (
    <Card className="islamic-border border-primary">
      <CardHeader className="bg-amber-50 dark:bg-amber-950/20 space-y-1">
        <div className="flex items-center">
          <Shield className="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400" />
          <CardTitle className="text-lg text-amber-700 dark:text-amber-300">Malaysian Regulatory Compliance</CardTitle>
        </div>
        <CardDescription>
          Ensure compliance with Bank Negara Malaysia (BNM) and Shariah requirements
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-6">
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-primary font-medium">
              Bank Negara Malaysia (BNM) Regulations
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="bg-muted/50 p-4 rounded-md">
                <div className="flex space-x-2 items-start">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">BNM Requirements</h4>
                    <p className="text-sm mt-1 text-muted-foreground">
                      This gold financing service is regulated by Bank Negara Malaysia under the Islamic Banking Act 1983
                      and must comply with all relevant BNM guidelines for Islamic financing.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="bnm-consent" 
                    checked={bnmConsentChecked}
                    onCheckedChange={(checked) => setBnmConsentChecked(checked === true)}
                  />
                  <div className="grid gap-1.5">
                    <Label htmlFor="bnm-consent" className="font-medium">
                      BNM Compliance Consent
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      I consent to AR-Rahanu sharing my financing information with Bank Negara Malaysia as required by regulations.
                    </p>
                  </div>
                </div>
                
                {isApplication && (
                  <div className="mt-4">
                    <Label htmlFor="bnm-reference">BNM Reference Number (if applicable)</Label>
                    <Input id="bnm-reference" placeholder="e.g., BNM-IFI-2025-00123" className="mt-1" />
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-primary font-medium">
              Shariah Advisory Council Requirements
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="bg-muted/50 p-4 rounded-md">
                <div className="flex space-x-2 items-start">
                  <BookOpen className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Shariah Compliance</h4>
                    <p className="text-sm mt-1 text-muted-foreground">
                      All financing contracts are structured according to Shariah principles and approved by our 
                      Shariah Advisory Council in compliance with Malaysian Islamic Finance standards.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="sac-consent" 
                  checked={sacConsentChecked}
                  onCheckedChange={(checked) => setSacConsentChecked(checked === true)}
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="sac-consent" className="font-medium">
                    SAC-BNM Compliance
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    I understand that this financing uses Islamic contracts approved by the Shariah Advisory Council of Bank Negara Malaysia.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-primary font-medium">
              Malaysian Gold Standards
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="bg-muted/50 p-4 rounded-md">
                <div className="flex space-x-2 items-start">
                  <FileCheck className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Malaysian Gold Standards Certification</h4>
                    <p className="text-sm mt-1 text-muted-foreground">
                      Gold items used as collateral must comply with Malaysian gold standards and be certified by authorized Malaysian gold assessors.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="gold-standard-consent" 
                  checked={malaysiaGoldStandardChecked}
                  onCheckedChange={(checked) => setMalaysiaGoldStandardChecked(checked === true)}
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="gold-standard-consent" className="font-medium">
                    Malaysian Gold Standard Verification
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    I confirm that the gold items provided as collateral will be verified according to Malaysian gold standards.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-primary font-medium">
              Personal Data Protection Act (PDPA)
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="bg-muted/50 p-4 rounded-md">
                <div className="flex space-x-2 items-start">
                  <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">PDPA Compliance</h4>
                    <p className="text-sm mt-1 text-muted-foreground">
                      Your personal data is protected under Malaysia's Personal Data Protection Act 2010. We only collect, use, and
                      store your data as permitted by law and with your consent.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="pdpa-consent" 
                  checked={pdpaConsentChecked}
                  onCheckedChange={(checked) => setPdpaConsentChecked(checked === true)}
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="pdpa-consent" className="font-medium">
                    PDPA Consent
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    I consent to AR-Rahanu collecting, using, and storing my personal data as described in the Privacy Notice
                    and in accordance with the Personal Data Protection Act 2010.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      
      <CardFooter className="bg-muted/30 flex justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
          Malaysia L2 Regulatory Compliance
        </div>
        
        <Button 
          onClick={handleSubmitCompliance}
          disabled={!bnmConsentChecked || !sacConsentChecked || !pdpaConsentChecked}
        >
          Confirm Compliance
        </Button>
      </CardFooter>
    </Card>
  );
}