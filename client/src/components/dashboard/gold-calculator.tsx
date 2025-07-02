import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { GoldPriceHistory } from "@shared/schema";

export function GoldCalculator() {
  const { data: goldPrice, isLoading } = useQuery<GoldPriceHistory>({
    queryKey: ["/api/gold-price"],
  });

  const [weight, setWeight] = useState<number>(100);
  const [purity, setPurity] = useState<string>("24");
  const [financingRatio, setFinancingRatio] = useState<string>("0.65");
  const [goldValue, setGoldValue] = useState<number>(0);
  const [financingAmount, setFinancingAmount] = useState<number>(0);

  const ozToGram = 0.03215; // Conversion factor from grams to troy ounces

  useEffect(() => {
    if (goldPrice) {
      calculateValues();
    }
  }, [weight, purity, financingRatio, goldPrice]);

  const calculateValues = () => {
    if (!goldPrice) return;
    
    const goldPricePerOz = parseFloat(goldPrice.pricePerOz.toString());
    const weightNum = weight || 0;
    const purityRatio = parseInt(purity) / 24;
    const financingRatioNum = parseFloat(financingRatio);
    
    // Calculate gold value
    const value = weightNum * ozToGram * goldPricePerOz * purityRatio;
    const financing = value * financingRatioNum;
    
    setGoldValue(value);
    setFinancingAmount(financing);
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  };

  if (isLoading) {
    return (
      <Card className="islamic-border border-accent">
        <CardHeader className="px-6 py-5 border-b border-border">
          <CardTitle className="text-lg font-medium leading-6">
            Gold Calculator
          </CardTitle>
          <CardDescription>Quick valuation tool.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4 animate-pulse">
            <div className="h-10 bg-muted rounded-md"></div>
            <div className="h-10 bg-muted rounded-md"></div>
            <div className="h-10 bg-muted rounded-md"></div>
            <div className="h-10 bg-muted rounded-md"></div>
            <div className="h-10 bg-muted rounded-md"></div>
            <div className="h-10 bg-muted rounded-md"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="islamic-border border-accent">
      <CardHeader className="px-6 py-5 border-b border-border">
        <CardTitle className="text-lg font-medium leading-6">
          Gold Calculator
        </CardTitle>
        <CardDescription>Quick valuation tool.</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form className="space-y-4">
          <div>
            <Label htmlFor="gold-weight">Gold Weight (grams)</Label>
            <Input
              type="number"
              id="gold-weight"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="gold-purity">Purity</Label>
            <Select
              value={purity}
              onValueChange={(value) => setPurity(value)}
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select purity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24">24K (99.9%)</SelectItem>
                <SelectItem value="22">22K (91.6%)</SelectItem>
                <SelectItem value="18">18K (75.0%)</SelectItem>
                <SelectItem value="14">14K (58.5%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="financing-ratio">Financing Ratio</Label>
            <Select
              value={financingRatio}
              onValueChange={(value) => setFinancingRatio(value)}
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select financing ratio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.65">65% (Standard)</SelectItem>
                <SelectItem value="0.70">70% (Preferred)</SelectItem>
                <SelectItem value="0.75">75% (Premium)</SelectItem>
                <SelectItem value="0.80">80% (Elite)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="calculated-value">Estimated Value</Label>
            <div className="mt-1 flex items-center">
              <div className="shadow-sm block w-full px-3 py-2 sm:text-sm rounded-md bg-muted border border-border font-mono">
                {formatCurrency(goldValue)}
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="financing-amount">Available Financing</Label>
            <div className="mt-1 flex items-center">
              <div className="shadow-sm block w-full px-3 py-2 sm:text-sm rounded-md bg-muted border border-border font-mono font-medium">
                {formatCurrency(financingAmount)}
              </div>
            </div>
          </div>
          
          <Link href="/new-application">
            <Button 
              type="button" 
              className="w-full"
              variant="default"
            >
              <CreditCard className="-ml-1 mr-2 h-5 w-5" />
              Start New Application
            </Button>
          </Link>
        </form>
      </CardContent>
    </Card>
  );
}

export default GoldCalculator;
