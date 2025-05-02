
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ChartCard } from "@/components/dashboard/chart-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, CalendarClock } from "lucide-react";

const Retirement = () => {
  const [formData, setFormData] = useState({
    currentAge: 30,
    retirementAge: 65,
    currentSavings: 50000,
    monthlyContribution: 1000,
    annualReturn: 7,
    annualInflation: 2.5,
    withdrawalRate: 4,
  });
  
  const [projections, setProjections] = useState<any>(null);
  
  const handleChange = (name: string, value: number) => {
    setFormData({ ...formData, [name]: value });
  };
  
  const calculateProjections = () => {
    const {
      currentAge,
      retirementAge,
      currentSavings,
      monthlyContribution,
      annualReturn,
      annualInflation,
      withdrawalRate,
    } = formData;
    
    const years = retirementAge - currentAge;
    let balance = currentSavings;
    const yearlyData: any[] = [];
    const monthlyWithdrawal = [];
    
    // Calculate retirement savings growth
    for (let i = 0; i <= years; i++) {
      yearlyData.push({
        name: `${currentAge + i}`,
        value: Math.round(balance),
      });
      
      // Grow the balance for another year
      balance = balance * (1 + annualReturn / 100) + monthlyContribution * 12;
    }
    
    // Calculate estimated monthly income during retirement (adjust for inflation)
    const finalBalance = yearlyData[yearlyData.length - 1].value;
    const inflationAdjustedWithdrawalRate = withdrawalRate - annualInflation / 2;
    const monthlyIncome = (finalBalance * (inflationAdjustedWithdrawalRate / 100)) / 12;
    
    // Calculate different withdrawal scenarios
    const withdrawalScenarios = [3, 4, 5].map(rate => {
      return {
        rate,
        monthlyIncome: (finalBalance * (rate / 100)) / 12,
        yearsLasting: Math.round(100 / rate),
      };
    });

    setProjections({
      yearlyData,
      finalBalance,
      monthlyIncome,
      withdrawalScenarios,
    });
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Retirement Planner</h1>
        <p className="text-gray-600 dark:text-gray-400">Plan your future with our interactive retirement calculator.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarClock className="h-5 w-5" />
                Retirement Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="currentAge">Current Age</Label>
                    <span className="text-sm text-primary font-medium">{formData.currentAge}</span>
                  </div>
                  <Slider
                    id="currentAge"
                    min={18}
                    max={80}
                    step={1}
                    value={[formData.currentAge]}
                    onValueChange={(value) => handleChange("currentAge", value[0])}
                  />
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="retirementAge">Retirement Age</Label>
                    <span className="text-sm text-primary font-medium">{formData.retirementAge}</span>
                  </div>
                  <Slider
                    id="retirementAge"
                    min={formData.currentAge + 1}
                    max={90}
                    step={1}
                    value={[formData.retirementAge]}
                    onValueChange={(value) => handleChange("retirementAge", value[0])}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="currentSavings">Current Savings ($)</Label>
                  <Input
                    id="currentSavings"
                    type="number"
                    value={formData.currentSavings}
                    onChange={(e) => handleChange("currentSavings", parseFloat(e.target.value) || 0)}
                    min={0}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
                  <Input
                    id="monthlyContribution"
                    type="number"
                    value={formData.monthlyContribution}
                    onChange={(e) => handleChange("monthlyContribution", parseFloat(e.target.value) || 0)}
                    min={0}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="annualReturn">Expected Annual Return (%)</Label>
                    <span className="text-sm text-primary font-medium">{formData.annualReturn}%</span>
                  </div>
                  <Slider
                    id="annualReturn"
                    min={1}
                    max={12}
                    step={0.1}
                    value={[formData.annualReturn]}
                    onValueChange={(value) => handleChange("annualReturn", value[0])}
                  />
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="annualInflation">Expected Inflation (%)</Label>
                    <span className="text-sm text-primary font-medium">{formData.annualInflation}%</span>
                  </div>
                  <Slider
                    id="annualInflation"
                    min={0}
                    max={8}
                    step={0.1}
                    value={[formData.annualInflation]}
                    onValueChange={(value) => handleChange("annualInflation", value[0])}
                  />
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="withdrawalRate">Withdrawal Rate (%)</Label>
                    <span className="text-sm text-primary font-medium">{formData.withdrawalRate}%</span>
                  </div>
                  <Slider
                    id="withdrawalRate"
                    min={2}
                    max={10}
                    step={0.1}
                    value={[formData.withdrawalRate]}
                    onValueChange={(value) => handleChange("withdrawalRate", value[0])}
                  />
                </div>
              </div>
              
              <Button className="w-full" onClick={calculateProjections}>Calculate Projections</Button>
            </CardContent>
          </Card>
          
          <div className="p-4 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/10 flex items-start gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <p className="font-medium mb-1">Investment returns vary over time</p>
              <p>This calculator uses a constant rate of return. Actual returns will fluctuate with market conditions.</p>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          {projections ? (
            <>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Retirement Savings Projection</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartCard
                    title=""
                    type="area"
                    data={projections.yearlyData}
                    height={300}
                  />
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Retirement Income Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="summary" className="space-y-4">
                    <TabsList>
                      <TabsTrigger value="summary">Summary</TabsTrigger>
                      <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
                    </TabsList>
                    <TabsContent value="summary" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg bg-primary/10 dark:bg-primary/20 text-center">
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Years Until Retirement</p>
                          <p className="text-3xl font-bold text-primary mt-1">{formData.retirementAge - formData.currentAge}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-secondary/10 dark:bg-secondary/20 text-center">
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Estimated Final Balance</p>
                          <p className="text-3xl font-bold text-secondary mt-1">
                            ${projections.finalBalance.toLocaleString()}
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-accent/10 dark:bg-accent/20 text-center">
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Income</p>
                          <p className="text-3xl font-bold text-accent-600 dark:text-accent mt-1">
                            ${Math.round(projections.monthlyIncome).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="p-5 rounded-lg border border-gray-200 dark:border-gray-800">
                        <h3 className="font-semibold mb-4">Key Insights</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex gap-2">
                            <span className="h-5 w-5 rounded-full bg-primary/20 dark:bg-primary/30 flex-shrink-0 flex items-center justify-center text-primary">1</span>
                            <span>Your retirement savings could grow to <strong>${projections.finalBalance.toLocaleString()}</strong> by age {formData.retirementAge}.</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="h-5 w-5 rounded-full bg-secondary/20 dark:bg-secondary/30 flex-shrink-0 flex items-center justify-center text-secondary">2</span>
                            <span>Monthly income during retirement is estimated at <strong>${Math.round(projections.monthlyIncome).toLocaleString()}</strong> using a {formData.withdrawalRate}% withdrawal rate.</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="h-5 w-5 rounded-full bg-accent/20 dark:bg-accent/30 flex-shrink-0 flex items-center justify-center text-accent-600 dark:text-accent">3</span>
                            <span>Increasing your monthly contribution by just $200 could significantly boost your retirement savings.</span>
                          </li>
                        </ul>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="scenarios" className="space-y-4">
                      <div className="grid gap-4">
                        {projections.withdrawalScenarios.map((scenario: any, index: number) => (
                          <div key={index} className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg flex justify-between items-center">
                            <div>
                              <p className="font-medium">{scenario.rate}% Withdrawal Rate</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Portfolio may last ~{scenario.yearsLasting} years</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold">${Math.round(scenario.monthlyIncome).toLocaleString()}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Income</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-4 bg-secondary/5 dark:bg-secondary/10 rounded-lg border border-secondary/10 text-sm">
                        <p className="font-medium mb-1">What is a safe withdrawal rate?</p>
                        <p>The "4% rule" is a common guideline for retirement withdrawals, suggesting that you withdraw 4% of your savings in the first year of retirement, then adjust for inflation each year after.</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center p-8">
                <h3 className="text-xl font-semibold mb-2">Plan Your Financial Future</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Complete the form and calculate your retirement projections to see your financial future.
                </p>
                <div className="w-24 h-24 rounded-full bg-primary/10 dark:bg-primary/20 mx-auto flex items-center justify-center">
                  <CalendarClock className="h-12 w-12 text-primary/60" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Retirement;
