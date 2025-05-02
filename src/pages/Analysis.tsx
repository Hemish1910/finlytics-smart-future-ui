
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChartCard } from "@/components/dashboard/chart-card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { PieChart, BarChart, TrendingUp, AlertTriangle, Info, Check, LineChart } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Analysis = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [retirementData, setRetirementData] = useState<any>(null);
  const [riskData, setRiskData] = useState<any>(null);

  // Format INR currency
  const formatINR = (value: number) => {
    return value.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    });
  };

  // Simulate loading data that would normally be stored in context or a state management solution
  useEffect(() => {
    // In a real app, this would come from user input in the retirement and risk pages
    const mockRetirementData = {
      currentAge: 35,
      retirementAge: 65,
      currentSavings: 6250000, // ~75,000 USD to INR
      monthlyContribution: 100000, // ~1,200 USD to INR
      annualReturn: 8.5, // Higher returns in Indian market context
      annualInflation: 5.8, // Higher inflation in Indian context
      withdrawalRate: 4.2,
      finalBalance: 137500000, // ~1,650,000 USD to INR
      monthlyIncome: 480000, // ~5,775 USD to INR
      projections: [
        { name: "35", value: 6250000 }, // ~75,000 USD to INR
        { name: "40", value: 18300000 }, // ~220,000 USD to INR
        { name: "45", value: 35000000 }, // ~420,000 USD to INR
        { name: "50", value: 58300000 }, // ~700,000 USD to INR
        { name: "55", value: 87500000 }, // ~1,050,000 USD to INR
        { name: "60", value: 112500000 }, // ~1,350,000 USD to INR
        { name: "65", value: 137500000 }, // ~1,650,000 USD to INR
      ],
    };
    
    const mockRiskData = {
      riskTolerance: 70, // 0-100 scale
      investmentTimeHorizon: 30,
      emergencyFund: "6-12 months",
      incomeStability: "Stable",
      debtToIncomeRatio: 25,
      majorFinancialGoals: ["Retirement", "Home Purchase", "Education"],
      existingInvestments: {
        stocks: 55,
        bonds: 25,
        cash: 15,
        alternatives: 5,
      }
    };
    
    setRetirementData(mockRetirementData);
    setRiskData(mockRiskData);
  }, []);

  const runAnalysis = () => {
    if (!retirementData || !riskData) {
      toast.error("Missing required data. Please complete both retirement and risk assessments.");
      return;
    }
    
    setIsAnalyzing(true);
    toast.info("AI analyzing your financial data...");
    
    // Simulate AI analysis process
    setTimeout(() => {
      // In a real app, this would be an API call to an AI service
      const mockAnalysisResult = generateMockAnalysis(retirementData, riskData);
      setAnalysis(mockAnalysisResult);
      setIsAnalyzing(false);
      toast.success("Analysis complete!");
    }, 3000);
  };

  const generateMockAnalysis = (retirementData: any, riskData: any) => {
    // This would be actual AI analysis logic in a real app
    
    // Calculate suggested portfolio based on risk profile
    const portfolioAllocations = {
      conservative: { stocks: 40, bonds: 40, cash: 15, alternatives: 5 },
      moderate: { stocks: 60, bonds: 30, cash: 5, alternatives: 5 },
      aggressive: { stocks: 80, bonds: 15, cash: 0, alternatives: 5 }
    };
    
    // Determine risk profile
    let riskProfile;
    if (riskData.riskTolerance < 40) riskProfile = "conservative";
    else if (riskData.riskTolerance < 70) riskProfile = "moderate";
    else riskProfile = "aggressive";
    
    // Calculate retirement readiness score (0-100)
    const yearsUntilRetirement = retirementData.retirementAge - retirementData.currentAge;
    const savingsRate = (retirementData.monthlyContribution * 12) / (6600000 * 0.15); // Assuming average income of 6.6M INR
    const retirementReadinessScore = Math.min(100, Math.round(
      (retirementData.currentSavings / 8500000) * 20 + 
      (yearsUntilRetirement > 20 ? 30 : yearsUntilRetirement / 20 * 30) + 
      savingsRate * 50
    ));
    
    // Generate projections with two scenarios
    const defaultProjections = [...retirementData.projections];
    const improvedProjections = retirementData.projections.map((p: any) => ({
      name: p.name,
      value: Math.round(p.value * 1.15) // 15% better performance with optimized strategy
    }));
    
    // Generate action steps
    const actionSteps = [];
    
    if (retirementData.monthlyContribution / 400000 < 0.2) {
      actionSteps.push("Increase retirement contributions to at least 15% of income");
    }
    
    if (riskData.emergencyFund !== "6-12 months") {
      actionSteps.push("Build emergency fund to cover 6-12 months of expenses");
    }
    
    if (riskData.debtToIncomeRatio > 30) {
      actionSteps.push("Prioritize paying down high-interest debt to reduce debt-to-income ratio");
    }
    
    if (Math.abs(riskData.existingInvestments.stocks - portfolioAllocations[riskProfile].stocks) > 15) {
      actionSteps.push("Rebalance portfolio to align with your risk profile");
    }
    
    // Market trend insights (Indian context)
    const marketTrends = [
      "RBI policy suggests interest rates will remain elevated through Q2 2025",
      "IT sector showing strong growth potential for the next 3-5 years",
      "Real estate market stabilizing after recent volatility",
      "International diversification, particularly US equity allocation, presents opportunities",
      "ESG investments continuing to gain momentum with regulatory support"
    ];
    
    return {
      riskProfile,
      retirementReadinessScore,
      suggestedPortfolio: portfolioAllocations[riskProfile],
      projections: {
        default: defaultProjections,
        improved: improvedProjections
      },
      actionSteps,
      marketTrends,
      insights: {
        retirement: {
          onTrack: retirementReadinessScore > 65,
          estimatedShortfall: retirementReadinessScore < 70 ? "₹25,00,000" : "₹0",
          suggestedWithdrawalRate: riskData.riskTolerance > 60 ? 4.5 : 3.8,
          suggestedDelayYears: retirementReadinessScore < 50 ? 3 : 0
        },
        risk: {
          portfolioVolatility: riskProfile === "aggressive" ? "High" : (riskProfile === "moderate" ? "Medium" : "Low"),
          downsideProtection: riskProfile === "conservative" ? "Strong" : (riskProfile === "moderate" ? "Adequate" : "Limited"),
          expectedReturn: riskProfile === "aggressive" ? 12.5 : (riskProfile === "moderate" ? 10.2 : 8.0)
        }
      }
    };
  };

  if (!retirementData || !riskData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="text-center space-y-4 max-w-md p-8">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto" />
          <h2 className="text-2xl font-bold">Missing Data</h2>
          <p className="text-muted-foreground">
            To generate an AI analysis, please complete both the retirement planner and risk assessment.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button onClick={() => navigate('/retirement')}>Retirement Planner</Button>
            <Button onClick={() => navigate('/risk-assessment')} variant="outline">Risk Assessment</Button>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Financial AI Analysis</h1>
            <p className="text-muted-foreground">Get personalized AI-powered insights based on your financial data</p>
          </div>
          <Button 
            onClick={runAnalysis} 
            disabled={isAnalyzing}
            size="lg"
          >
            {isAnalyzing ? (
              <>Analyzing... <span className="ml-2 animate-spin">⚙️</span></>
            ) : (
              <>Run AI Analysis</>
            )}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-primary" />
                Retirement Data Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Current Age</p>
                  <p className="font-medium">{retirementData.currentAge}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Retirement Age</p>
                  <p className="font-medium">{retirementData.retirementAge}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Current Savings</p>
                  <p className="font-medium">{formatINR(retirementData.currentSavings)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Monthly Contribution</p>
                  <p className="font-medium">{formatINR(retirementData.monthlyContribution)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Expected Return</p>
                  <p className="font-medium">{retirementData.annualReturn}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Inflation Rate</p>
                  <p className="font-medium">{retirementData.annualInflation}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-secondary" />
                Risk Assessment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Risk Tolerance</p>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      riskData.riskTolerance > 70 ? "bg-red-500" : 
                      riskData.riskTolerance > 40 ? "bg-yellow-500" : "bg-green-500"
                    }`}
                    style={{ width: `${riskData.riskTolerance}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Conservative</span>
                  <span>Moderate</span>
                  <span>Aggressive</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Investment Horizon</p>
                  <p className="font-medium">{riskData.investmentTimeHorizon} years</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Emergency Fund</p>
                  <p className="font-medium">{riskData.emergencyFund}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Income Stability</p>
                  <p className="font-medium">{riskData.incomeStability}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Debt-to-Income</p>
                  <p className="font-medium">{riskData.debtToIncomeRatio}%</p>
                </div>
              </div>
              
              <div className="space-y-1 mt-2">
                <p className="text-sm text-muted-foreground">Current Allocation</p>
                <div className="flex items-center gap-2">
                  <div className="h-3 bg-blue-500 rounded" style={{ width: `${riskData.existingInvestments.stocks}%` }} />
                  <div className="h-3 bg-green-500 rounded" style={{ width: `${riskData.existingInvestments.bonds}%` }} />
                  <div className="h-3 bg-yellow-500 rounded" style={{ width: `${riskData.existingInvestments.cash}%` }} />
                  <div className="h-3 bg-purple-500 rounded" style={{ width: `${riskData.existingInvestments.alternatives}%` }} />
                </div>
                <div className="flex text-xs gap-4 mt-1">
                  <span className="flex items-center"><span className="h-2 w-2 bg-blue-500 rounded-full mr-1"></span>Stocks</span>
                  <span className="flex items-center"><span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>Bonds</span>
                  <span className="flex items-center"><span className="h-2 w-2 bg-yellow-500 rounded-full mr-1"></span>Cash</span>
                  <span className="flex items-center"><span className="h-2 w-2 bg-purple-500 rounded-full mr-1"></span>Alt</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold">AI Financial Analysis</h1>
          <Badge variant="outline" className="bg-primary/10 text-primary">Personalized</Badge>
        </div>
        <p className="text-muted-foreground">AI-powered insights based on your retirement and risk assessment data</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Retirement Readiness"
          value={`${analysis.retirementReadinessScore}/100`}
          trend={{
            value: 12,
            isPositive: true
          }}
          color="primary"
        />
        <StatsCard
          title="Risk Profile"
          value={analysis.riskProfile.charAt(0).toUpperCase() + analysis.riskProfile.slice(1)}
          subtitle="Based on your risk tolerance and goals"
          color="secondary"
        />
        <StatsCard
          title="Expected Return"
          value={`${analysis.insights.risk.expectedReturn}%`}
          subtitle="Annual average based on your profile"
          color="accent"
        />
      </div>
      
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="retirement">Retirement</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="actions">Action Plan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Health Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Retirement Outlook</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">On Track?</span>
                      <span className={`flex items-center ${analysis.insights.retirement.onTrack ? "text-green-500" : "text-yellow-500"}`}>
                        {analysis.insights.retirement.onTrack ? (
                          <><Check className="h-4 w-4 mr-1" /> Yes</>
                        ) : (
                          <><AlertTriangle className="h-4 w-4 mr-1" /> Needs Attention</>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Projected Shortfall</span>
                      <span>{analysis.insights.retirement.estimatedShortfall}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Suggested Withdrawal Rate</span>
                      <span>{analysis.insights.retirement.suggestedWithdrawalRate}%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Risk Assessment</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Portfolio Volatility</span>
                      <span>{analysis.insights.risk.portfolioVolatility}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Downside Protection</span>
                      <span>{analysis.insights.risk.downsideProtection}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Expected Annual Return</span>
                      <span>{analysis.insights.risk.expectedReturn}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Market Trend Analysis</h3>
                <ul className="space-y-2">
                  {analysis.marketTrends.map((trend: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{trend}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartCard
              title="Retirement Projection"
              type="area"
              data={analysis.projections.default}
              height={300}
            />
            
            <ChartCard
              title="Suggested Portfolio Allocation"
              type="pie"
              data={[
                { name: "Stocks", value: analysis.suggestedPortfolio.stocks },
                { name: "Bonds", value: analysis.suggestedPortfolio.bonds },
                { name: "Cash", value: analysis.suggestedPortfolio.cash },
                { name: "Alternatives", value: analysis.suggestedPortfolio.alternatives },
              ]}
              height={300}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="retirement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Retirement Strategy Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <ChartCard
                  title="Optimized vs Current Strategy"
                  type="area"
                  data={[
                    ...analysis.projections.default.map((d: any) => ({ ...d, category: "Current" })),
                    ...analysis.projections.improved.map((d: any) => ({ ...d, category: "Optimized" })),
                  ]}
                  height={350}
                  showLegend
                />
                
                <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/10">
                  <h3 className="text-lg font-semibold mb-2">AI Recommendations</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Contribution Strategy</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Increasing your monthly contribution by 15% and optimizing asset allocation could 
                        improve your final retirement balance by approximately ${Math.round((analysis.projections.improved[analysis.projections.improved.length-1].value - analysis.projections.default[analysis.projections.default.length-1].value)/1000) * 1000}.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Tax Optimization</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Based on your profile, consider maximizing tax-advantaged accounts first: 401(k) up to employer match, 
                        then HSA (if eligible), followed by Roth IRA or traditional IRA depending on your tax bracket.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Withdrawal Strategy</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        The analysis suggests a {analysis.insights.retirement.suggestedWithdrawalRate}% withdrawal rate would be 
                        sustainable based on your risk profile and projected portfolio composition.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="investments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current vs Recommended Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Current Allocation</h3>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center"><span className="h-3 w-3 bg-blue-500 rounded-full mr-2"></span>Stocks</span>
                        <span className="font-medium">{riskData.existingInvestments.stocks}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center"><span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>Bonds</span>
                        <span className="font-medium">{riskData.existingInvestments.bonds}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center"><span className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></span>Cash</span>
                        <span className="font-medium">{riskData.existingInvestments.cash}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center"><span className="h-3 w-3 bg-purple-500 rounded-full mr-2"></span>Alternatives</span>
                        <span className="font-medium">{riskData.existingInvestments.alternatives}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Recommended Allocation</h3>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center"><span className="h-3 w-3 bg-blue-500 rounded-full mr-2"></span>Stocks</span>
                        <span className="font-medium">{analysis.suggestedPortfolio.stocks}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center"><span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>Bonds</span>
                        <span className="font-medium">{analysis.suggestedPortfolio.bonds}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center"><span className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></span>Cash</span>
                        <span className="font-medium">{analysis.suggestedPortfolio.cash}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center"><span className="h-3 w-3 bg-purple-500 rounded-full mr-2"></span>Alternatives</span>
                        <span className="font-medium">{analysis.suggestedPortfolio.alternatives}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Investment Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Diversification Analysis</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your current portfolio {
                      Math.abs(riskData.existingInvestments.stocks - analysis.suggestedPortfolio.stocks) > 15 
                      ? "has a significant deviation from the recommended allocation." 
                      : "is relatively well-aligned with your risk profile."
                    } {
                      analysis.riskProfile === "aggressive" 
                      ? "Given your aggressive risk profile, increasing equity exposure is appropriate." 
                      : analysis.riskProfile === "conservative"
                      ? "Your conservative risk profile suggests a higher allocation to bonds and cash equivalents."
                      : "Your moderate risk profile suggests a balanced approach to stocks and bonds."
                    }
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Market Opportunity</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Based on current market conditions and your risk profile, consider {
                      analysis.riskProfile === "aggressive" 
                      ? "allocating a portion of your portfolio to emerging market equities and selected growth stocks." 
                      : analysis.riskProfile === "conservative"
                      ? "investment-grade corporate bonds and dividend aristocrats for income and stability."
                      : "a mix of growth and value stocks, alongside quality bonds for diversification."
                    }
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Rebalancing Strategy</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Implement a quarterly rebalancing schedule to maintain your target allocation and 
                    potentially capture additional returns through disciplined buying and selling.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Economic Outlook & Market Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The AI analysis considers these key market trends when formulating investment recommendations:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {analysis.marketTrends.map((trend: string, idx: number) => (
                    <div key={idx} className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <TrendingUp className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <p className="text-sm">{trend}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="actions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Action Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Based on the comprehensive analysis of your financial situation, here are the recommended 
                  steps you should take to optimize your financial health and achieve your goals:
                </p>
                
                <div className="space-y-4">
                  {analysis.actionSteps.map((step: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-3 border border-primary/10 rounded-lg bg-primary/5">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-primary">{idx + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{step}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/10">
                <h3 className="font-semibold mb-2">Next Steps</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  To implement these recommendations, consider the following actions:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="w-full">Schedule Advisor Consultation</Button>
                  <Button variant="outline" className="w-full">Download Full Analysis Report</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analysis;
