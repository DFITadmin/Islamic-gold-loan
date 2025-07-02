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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Calculator, 
  FileText, 
  Download,
  Info,
  AlertTriangle,
  Receipt,
  TrendingUp
} from "lucide-react";

interface TaxCalculation {
  financingAmount: number;
  profitAmount: number;
  serviceTaxRate: number;
  serviceTax: number;
  stampDuty: number;
  totalTax: number;
}

export function MalaysiaTaxCompliance() {
  const [calculation, setCalculation] = useState<TaxCalculation>({
    financingAmount: 0,
    profitAmount: 0,
    serviceTaxRate: 6, // Malaysian SST rate
    serviceTax: 0,
    stampDuty: 0,
    totalTax: 0
  });

  const calculateTaxes = (financingAmount: number, profitAmount: number) => {
    // Service Tax (SST) calculation for Islamic finance services
    const serviceTax = profitAmount * (calculation.serviceTaxRate / 100);
    
    // Stamp duty calculation based on Malaysian Stamp Act
    let stampDuty = 0;
    if (financingAmount <= 100000) {
      stampDuty = Math.max(10, financingAmount * 0.005); // 0.5% or minimum RM10
    } else if (financingAmount <= 500000) {
      stampDuty = 500 + ((financingAmount - 100000) * 0.01); // Additional 1%
    } else {
      stampDuty = 4500 + ((financingAmount - 500000) * 0.015); // Additional 1.5%
    }
    
    const totalTax = serviceTax + stampDuty;
    
    setCalculation({
      ...calculation,
      financingAmount,
      profitAmount,
      serviceTax,
      stampDuty,
      totalTax
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ms-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary">
        <CardHeader className="bg-orange-50 dark:bg-orange-950/20">
          <div className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            <CardTitle className="text-lg text-orange-700 dark:text-orange-300">Malaysian Tax Compliance Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate Service Tax (SST) and Stamp Duty for Islamic gold financing
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">Input Values</h3>
              
              <div className="space-y-2">
                <Label htmlFor="financing-amount">Financing Amount (MYR)</Label>
                <Input
                  id="financing-amount"
                  type="number"
                  placeholder="Enter financing amount"
                  onChange={(e) => {
                    const amount = parseFloat(e.target.value) || 0;
                    calculateTaxes(amount, calculation.profitAmount);
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profit-amount">Profit Amount (MYR)</Label>
                <Input
                  id="profit-amount"
                  type="number"
                  placeholder="Enter profit amount"
                  onChange={(e) => {
                    const profit = parseFloat(e.target.value) || 0;
                    calculateTaxes(calculation.financingAmount, profit);
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sst-rate">Service Tax Rate (%)</Label>
                <Input
                  id="sst-rate"
                  type="number"
                  value={calculation.serviceTaxRate}
                  onChange={(e) => {
                    const rate = parseFloat(e.target.value) || 6;
                    setCalculation({...calculation, serviceTaxRate: rate});
                    calculateTaxes(calculation.financingAmount, calculation.profitAmount);
                  }}
                />
                <p className="text-xs text-muted-foreground">Standard Malaysian SST rate is 6%</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Tax Calculation Results</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between p-3 border rounded-md">
                  <span className="text-sm font-medium">Service Tax (SST)</span>
                  <span className="font-bold text-orange-600">{formatCurrency(calculation.serviceTax)}</span>
                </div>
                
                <div className="flex justify-between p-3 border rounded-md">
                  <span className="text-sm font-medium">Stamp Duty</span>
                  <span className="font-bold text-blue-600">{formatCurrency(calculation.stampDuty)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between p-3 border rounded-md bg-muted">
                  <span className="text-sm font-bold">Total Tax</span>
                  <span className="font-bold text-lg">{formatCurrency(calculation.totalTax)}</span>
                </div>

                <div className="flex justify-between p-3 border rounded-md bg-green-50 dark:bg-green-950/10">
                  <span className="text-sm font-medium">Net Amount to Client</span>
                  <span className="font-bold text-green-600">
                    {formatCurrency(calculation.financingAmount - calculation.totalTax)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="bg-blue-50/30 dark:bg-blue-950/10 p-4 rounded-md border border-blue-200 dark:border-blue-800">
            <div className="flex items-start space-x-2">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium">Malaysian Tax Compliance Notes</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Service Tax (SST) applies to Islamic finance services at 6% rate</li>
                  <li>• Stamp duty is calculated based on Malaysian Stamp Act 1949</li>
                  <li>• All taxes must be paid within 30 days of contract execution</li>
                  <li>• Tax receipts must be retained for audit purposes</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary">
        <CardHeader className="bg-purple-50 dark:bg-purple-950/20">
          <div className="flex items-center space-x-2">
            <Receipt className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <CardTitle className="text-lg text-purple-700 dark:text-purple-300">Tax Documentation Requirements</CardTitle>
          </div>
          <CardDescription>
            Required documents for Malaysian tax compliance
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">Service Tax (SST) Documents</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 p-2 border rounded">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm">SST Registration Certificate</span>
                  <Badge variant="outline" className="ml-auto bg-green-100 text-green-800 border-green-200">
                    Required
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 p-2 border rounded">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm">Monthly SST Returns</span>
                  <Badge variant="outline" className="ml-auto bg-blue-100 text-blue-800 border-blue-200">
                    Monthly
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 p-2 border rounded">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm">Tax Invoices</span>
                  <Badge variant="outline" className="ml-auto bg-yellow-100 text-yellow-800 border-yellow-200">
                    Per Transaction
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Stamp Duty Documents</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 p-2 border rounded">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm">Stamped Contract Documents</span>
                  <Badge variant="outline" className="ml-auto bg-green-100 text-green-800 border-green-200">
                    Required
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 p-2 border rounded">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm">Stamp Duty Payment Receipts</span>
                  <Badge variant="outline" className="ml-auto bg-blue-100 text-blue-800 border-blue-200">
                    Mandatory
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 p-2 border rounded">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm">Adjudication Forms</span>
                  <Badge variant="outline" className="ml-auto bg-purple-100 text-purple-800 border-purple-200">
                    If Applicable
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h3 className="font-medium">Tax Reporting Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <h4 className="font-medium">Monthly</h4>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• SST Return (Form SST-02A)</li>
                  <li>• Payment of SST due</li>
                  <li>• Submission deadline: Last day of following month</li>
                </ul>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <h4 className="font-medium">Quarterly</h4>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Stamp duty reconciliation</li>
                  <li>• Compliance review</li>
                  <li>• Document audit</li>
                </ul>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <h4 className="font-medium">Annual</h4>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Tax position review</li>
                  <li>• Transfer pricing documentation</li>
                  <li>• Annual tax compliance certificate</li>
                </ul>
              </Card>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="bg-amber-50/30 dark:bg-amber-950/10 p-4 rounded-md border border-amber-200 dark:border-amber-800">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium">Important Tax Compliance Reminders</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Late payment penalty: 10% per annum on outstanding tax</li>
                  <li>• Incorrect stamping penalty: Up to 10 times the deficient stamp duty</li>
                  <li>• SST non-compliance penalty: Up to RM50,000 or imprisonment</li>
                  <li>• Keep all tax documents for 7 years as per Malaysian requirements</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex space-x-2 mt-6">
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download Tax Report
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Generate Invoice
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}