import { ApplicationForm } from "@/components/loans/application-form";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, FileText, FileDown, CheckCircle2, Shield } from "lucide-react";

export default function NewApplication() {
  return (
    <div className="py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">New Gold Financing Application</h1>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            Create a new Shariah-compliant gold financing request
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <FileText className="h-10 w-10 mb-3" />
                <h3 className="text-lg font-medium">Step 1</h3>
                <p className="text-sm mt-1 text-primary-foreground/80">
                  Complete application details
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-muted">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <CheckCircle2 className="h-10 w-10 mb-3 text-muted-foreground" />
                <h3 className="text-lg font-medium">Step 2</h3>
                <p className="text-sm mt-1 text-muted-foreground">
                  Verification and valuation
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-muted">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <FileDown className="h-10 w-10 mb-3 text-muted-foreground" />
                <h3 className="text-lg font-medium">Step 3</h3>
                <p className="text-sm mt-1 text-muted-foreground">
                  Contract generation
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="bg-muted">
            <CardTitle className="flex items-center text-amber-600 dark:text-amber-400">
              <AlertCircle className="h-5 w-5 mr-2" />
              Important Information
            </CardTitle>
            <CardDescription>
              Please note the following before proceeding with your application
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-2">
                <Shield className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Malaysian Regulatory Compliance</h4>
                  <p className="text-muted-foreground mt-1">
                    Our gold financing complies with Bank Negara Malaysia (BNM) regulations and Shariah Advisory 
                    Council requirements. All gold items must meet Malaysian gold standards (MS 2574, MS 2382, MS 2596)
                    and will be assessed by authorized Malaysian gold assessors.
                  </p>
                  <Badge variant="outline" className="mt-2 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800">
                    Malaysia L2 Compliant
                  </Badge>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium">Islamic Financing Principles</h4>
                <p className="text-muted-foreground mt-1">
                  All gold financing contracts adhere to Shariah principles and are free from interest (riba).
                  Our contracts use Islamic financing structures such as Murabaha (cost-plus financing) and
                  Qard Hassan (interest-free loans) according to Malaysian Islamic finance standards.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium">Required Documentation</h4>
                <p className="text-muted-foreground mt-1">
                  You'll need to provide a valid Malaysian ID, proof of gold ownership, and
                  gold items for physical verification according to Malaysian Standards. Your gold will be securely stored during
                  the financing period in accordance with Islamic principles and BNM regulations.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium">Terms and Valuation</h4>
                <p className="text-muted-foreground mt-1">
                  Financing amounts are typically 65-80% of assessed gold value per BNM guidelines. The gold valuation
                  is based on current market prices and Malaysian gold standards. Profit rates and terms vary
                  based on financing amount and duration, within BNM-approved limits.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <ApplicationForm />
      </div>
    </div>
  );
}
