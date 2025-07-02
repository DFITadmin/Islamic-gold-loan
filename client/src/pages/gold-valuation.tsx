import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  Calculator, 
  ArrowUp, 
  ArrowDown, 
  Coins, 
  TrendingUp, 
  LineChart,
  Scale,
  History
} from "lucide-react";
import { GoldPriceHistory } from "@shared/schema";

const goldCalculatorSchema = z.object({
  weight: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Weight must be a positive number",
  }),
  purity: z.string().min(1, "Please select purity"),
  financingRatio: z.string().min(1, "Please select financing ratio"),
});

type GoldCalculatorValues = z.infer<typeof goldCalculatorSchema>;

export default function GoldValuation() {
  const { data: goldPrice, isLoading } = useQuery<GoldPriceHistory>({
    queryKey: ["/api/gold-price"],
  });
  
  const { data: priceHistory } = useQuery<GoldPriceHistory[]>({
    queryKey: ["/api/gold-price/history"],
  });
  
  const [goldValue, setGoldValue] = useState<number>(0);
  const [financingAmount, setFinancingAmount] = useState<number>(0);
  
  const form = useForm<GoldCalculatorValues>({
    resolver: zodResolver(goldCalculatorSchema),
    defaultValues: {
      weight: "100",
      purity: "24",
      financingRatio: "0.65",
    },
  });
  
  const ozToGram = 0.03215; // Conversion factor from grams to troy ounces
  
  useEffect(() => {
    if (goldPrice) {
      calculateValues(form.getValues());
    }
  }, [goldPrice, form]);
  
  const calculateValues = (values: GoldCalculatorValues) => {
    if (!goldPrice) return;
    
    const goldPricePerOz = parseFloat(goldPrice.pricePerOz.toString());
    const weightNum = parseFloat(values.weight) || 0;
    const purityRatio = parseInt(values.purity) / 24;
    const financingRatioNum = parseFloat(values.financingRatio);
    
    // Calculate gold value
    const value = weightNum * ozToGram * goldPricePerOz * purityRatio;
    const financing = value * financingRatioNum;
    
    setGoldValue(value);
    setFinancingAmount(financing);
  };
  
  function onSubmit(values: GoldCalculatorValues) {
    calculateValues(values);
  }
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ms-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  // Calculate price change
  const getPriceChange = () => {
    if (!priceHistory || priceHistory.length < 2) return { value: 0, percentage: 0, isUp: true };
    
    const latestPrice = parseFloat(priceHistory[priceHistory.length - 1].pricePerOz.toString());
    const previousPrice = parseFloat(priceHistory[priceHistory.length - 2].pricePerOz.toString());
    const change = latestPrice - previousPrice;
    const percentage = (change / previousPrice) * 100;
    
    return {
      value: Math.abs(change),
      percentage: Math.abs(percentage),
      isUp: change >= 0
    };
  };
  
  const priceChange = getPriceChange();

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Gold Valuation</h1>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Calculate gold values based on current market prices
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-gradient-to-br from-accent to-accent/80 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-white/70">Current Gold Price (24K)</p>
                  <h2 className="text-3xl font-bold mt-1">
                    {isLoading ? "Loading..." : `$${parseFloat(goldPrice?.pricePerOz.toString() || "0").toFixed(2)}/oz`}
                  </h2>
                  <div className="flex items-center mt-2">
                    {priceChange.isUp ? (
                      <ArrowUp className="h-4 w-4 mr-1 text-green-300" />
                    ) : (
                      <ArrowDown className="h-4 w-4 mr-1 text-red-300" />
                    )}
                    <span className={`text-sm ${priceChange.isUp ? "text-green-300" : "text-red-300"}`}>
                      {formatCurrency(priceChange.value)}/{priceChange.percentage.toFixed(2)}%
                    </span>
                  </div>
                </div>
                <div className="bg-white p-2 rounded-full">
                  <Coins className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">30-Day Trend</p>
                  <h3 className="text-2xl font-bold mt-2">
                    {priceChange.isUp ? "Bullish" : "Bearish"}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {priceChange.isUp ? "Upward trend" : "Downward trend"} over past 30 days
                  </p>
                </div>
                <div className={`${priceChange.isUp ? "bg-green-500/10" : "bg-red-500/10"} p-2 rounded-full`}>
                  <TrendingUp className={`h-5 w-5 ${priceChange.isUp ? "text-green-500" : "text-red-500"}`} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Zakat Value</p>
                  <h3 className="text-2xl font-bold mt-2">85g Gold</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    ≈ {formatCurrency(parseFloat(goldPrice?.pricePerOz.toString() || "0") * ozToGram * 85)}
                  </p>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <Scale className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="px-6 py-4 border-b border-border">
                <CardTitle>Gold Price History</CardTitle>
                <CardDescription>30-day trend of gold prices</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[300px] flex items-center justify-center">
                  {isLoading ? (
                    <p>Loading chart data...</p>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <LineChart className="h-12 w-12 mr-3" />
                      <div>
                        <p>Chart visualization would appear here</p>
                        <p className="text-sm">Showing 30-day gold price history</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="px-6 py-4 border-t border-border flex justify-between">
                <div className="text-sm text-muted-foreground flex items-center">
                  <History className="h-4 w-4 mr-2" />
                  Last updated: {new Date().toLocaleString()}
                </div>
                <Button variant="outline" size="sm">
                  View Full History
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div>
            <Card className="islamic-border border-accent">
              <CardHeader className="px-6 py-4 border-b border-border">
                <div className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-accent" />
                  <div>
                    <CardTitle>Gold Calculator</CardTitle>
                    <CardDescription>Calculate gold valuation and financing</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gold Weight (grams)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={(e) => {
                                field.onChange(e);
                                calculateValues({
                                  ...form.getValues(),
                                  weight: e.target.value
                                });
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="purity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Purity</FormLabel>
                          <Select 
                            value={field.value} 
                            onValueChange={(value) => {
                              field.onChange(value);
                              calculateValues({
                                ...form.getValues(),
                                purity: value
                              });
                            }}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select purity" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="24">24K (99.9%)</SelectItem>
                              <SelectItem value="22">22K (91.6%)</SelectItem>
                              <SelectItem value="18">18K (75.0%)</SelectItem>
                              <SelectItem value="14">14K (58.5%)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="financingRatio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Financing Ratio: {parseInt(field.value) * 100}%</FormLabel>
                          <FormControl>
                            <Slider
                              value={[parseFloat(field.value) * 100]}
                              min={50}
                              max={80}
                              step={5}
                              onValueChange={(values) => {
                                const value = (values[0] / 100).toString();
                                field.onChange(value);
                                calculateValues({
                                  ...form.getValues(),
                                  financingRatio: value
                                });
                              }}
                              className="py-4"
                            />
                          </FormControl>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>50%</span>
                            <span>65%</span>
                            <span>80%</span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Separator className="my-4" />
                    
                    <div>
                      <FormLabel>Estimated Value</FormLabel>
                      <div className="mt-1 flex items-center">
                        <div className="shadow-sm block w-full px-3 py-2 sm:text-sm rounded-md bg-muted border border-border font-mono">
                          {formatCurrency(goldValue)}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <FormLabel>Available Financing</FormLabel>
                      <div className="mt-1 flex items-center">
                        <div className="shadow-sm block w-full px-3 py-2 sm:text-sm rounded-md bg-muted border border-border font-mono font-medium text-primary">
                          {formatCurrency(financingAmount)}
                        </div>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      <Calculator className="mr-2 h-4 w-4" />
                      Calculate
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
