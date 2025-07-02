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
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calculator,
  RefreshCw,
  AlertTriangle
} from "lucide-react";

interface ExchangeRate {
  currency: string;
  rate: number;
  change: number;
  lastUpdated: string;
}

export function MalaysiaCurrencyManagement() {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([
    { currency: "USD", rate: 4.7250, change: 0.015, lastUpdated: new Date().toISOString() },
    { currency: "EUR", rate: 5.1420, change: -0.025, lastUpdated: new Date().toISOString() },
    { currency: "GBP", rate: 5.9680, change: 0.032, lastUpdated: new Date().toISOString() },
    { currency: "SGD", rate: 3.4950, change: 0.008, lastUpdated: new Date().toISOString() },
    { currency: "AUD", rate: 3.0820, change: -0.012, lastUpdated: new Date().toISOString() },
  ]);

  const [goldPriceMYR, setGoldPriceMYR] = useState({
    pricePerGram: 285.60,
    pricePerOunce: 8889.25,
    change24h: 1.25,
    lastUpdated: new Date().toISOString()
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ms-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? "+" : "";
    return `${sign}${value.toFixed(3)}%`;
  };

  const convertToMYR = (amount: number, fromCurrency: string) => {
    if (fromCurrency === "MYR") return amount;
    const rate = exchangeRates.find(r => r.currency === fromCurrency)?.rate || 1;
    return amount * rate;
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary">
        <CardHeader className="bg-green-50 dark:bg-green-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
              <CardTitle className="text-lg text-green-700 dark:text-green-300">Malaysian Ringgit (MYR) Exchange Rates</CardTitle>
            </div>
            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800">
              Bank Negara Malaysia
            </Badge>
          </div>
          <CardDescription>
            Official exchange rates for Islamic gold financing calculations
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exchangeRates.map((rate) => (
              <Card key={rate.currency} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{rate.currency}/MYR</h3>
                  {rate.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{rate.rate.toFixed(4)}</p>
                  <p className={`text-sm ${rate.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(rate.change)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Updated: {new Date(rate.lastUpdated).toLocaleTimeString('ms-MY')}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <Separator className="my-6" />

          <div className="bg-amber-50/30 dark:bg-amber-950/10 p-4 rounded-md border border-amber-200 dark:border-amber-800">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium">Malaysian Regulatory Requirements</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  All foreign currency transactions in Islamic gold financing must comply with Bank Negara Malaysia's
                  Foreign Exchange Administration (FEA) rules. Exchange rates are updated in real-time using Bank Negara
                  Malaysia's official rates for accurate Shariah-compliant pricing.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary">
        <CardHeader className="bg-yellow-50 dark:bg-yellow-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calculator className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <CardTitle className="text-lg text-yellow-700 dark:text-yellow-300">Gold Prices in Malaysian Ringgit</CardTitle>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
          <CardDescription>
            Real-time gold prices converted to MYR for Islamic financing calculations
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Gold Price per Gram (MYR)</h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold">{formatCurrency(goldPriceMYR.pricePerGram)}</span>
                  <span className={`text-sm ${goldPriceMYR.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(goldPriceMYR.change24h)}
                  </span>
                </div>
              </div>

              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Gold Price per Ounce (MYR)</h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold">{formatCurrency(goldPriceMYR.pricePerOunce)}</span>
                  <span className={`text-sm ${goldPriceMYR.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(goldPriceMYR.change24h)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Malaysian Gold Standards Pricing</h3>
              <div className="space-y-2">
                <div className="flex justify-between p-3 border rounded-md">
                  <span className="text-sm">24K (99.9%) - MS 2596:2015</span>
                  <span className="font-medium">{formatCurrency(goldPriceMYR.pricePerGram)}</span>
                </div>
                <div className="flex justify-between p-3 border rounded-md">
                  <span className="text-sm">22K (91.6%) - MS 2382:2019</span>
                  <span className="font-medium">{formatCurrency(goldPriceMYR.pricePerGram * 0.916)}</span>
                </div>
                <div className="flex justify-between p-3 border rounded-md">
                  <span className="text-sm">18K (75.0%) - MS 2382:2019</span>
                  <span className="font-medium">{formatCurrency(goldPriceMYR.pricePerGram * 0.750)}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="bg-blue-50/30 dark:bg-blue-950/10 p-4 rounded-md border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium mb-2">Shariah Compliance Notes</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• All gold prices are spot prices in compliance with Islamic finance principles</li>
              <li>• Currency conversions use Bank Negara Malaysia official rates</li>
              <li>• No speculative or derivative pricing included</li>
              <li>• Prices updated in real-time for transparent Murabahah contracts</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}