import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Check, ChevronRight, AlertTriangle, Info } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const RiskAssessment = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [riskProfile, setRiskProfile] = useState<string | null>(null);
  
  const totalSteps = 5;
  
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Calculate risk score based on answers
      calculateRiskProfile();
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleAnswerChange = (question: string, value: any) => {
    setAnswers({
      ...answers,
      [question]: value,
    });
  };
  
  const calculateRiskProfile = () => {
    // Simple calculation for demo purposes
    const timeHorizonScore = answers.timeHorizon ? parseInt(answers.timeHorizon) * 5 : 0;
    const riskToleranceScore = answers.riskTolerance ? answers.riskTolerance : 0;
    const investmentGoalsScore = {
      "growth": 20,
      "balanced": 10,
      "income": 5,
    }[answers.investmentGoals || "balanced"] || 10;
    const marketDownturnScore = {
      "buy_more": 20,
      "hold": 10,
      "sell_some": 5,
      "sell_all": 0,
    }[answers.marketDownturn || "hold"] || 10;
    const financialKnowledgeScore = answers.financialKnowledge ? parseInt(answers.financialKnowledge) * 4 : 0;
    
    const totalScore = timeHorizonScore + riskToleranceScore + investmentGoalsScore + marketDownturnScore + financialKnowledgeScore;
    setRiskScore(totalScore);
    
    // Determine risk profile
    if (totalScore < 30) {
      setRiskProfile("Conservative");
    } else if (totalScore < 60) {
      setRiskProfile("Moderate");
    } else if (totalScore < 80) {
      setRiskProfile("Growth");
    } else {
      setRiskProfile("Aggressive");
    }
  };
  
  const renderQuestion = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl">Investment Time Horizon</CardTitle>
              <CardDescription>How long do you plan to invest before you need the money?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={answers.timeHorizon} onValueChange={(value) => handleAnswerChange("timeHorizon", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="time-1" />
                  <Label htmlFor="time-1">Less than 1 year</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="time-2" />
                  <Label htmlFor="time-2">1-3 years</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="time-3" />
                  <Label htmlFor="time-3">3-5 years</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4" id="time-4" />
                  <Label htmlFor="time-4">5-10 years</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5" id="time-5" />
                  <Label htmlFor="time-5">More than 10 years</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </>
        );
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl">Risk Tolerance</CardTitle>
              <CardDescription>How comfortable are you with investment risk and volatility?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Low Risk</span>
                  <span>High Risk</span>
                </div>
                <Slider
                  value={answers.riskTolerance ? [answers.riskTolerance] : [10]}
                  min={0}
                  max={20}
                  step={1}
                  onValueChange={(value) => handleAnswerChange("riskTolerance", value[0])}
                />
                <div className="mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {answers.riskTolerance < 5 && "You prefer very stable investments with lower returns."}
                    {answers.riskTolerance >= 5 && answers.riskTolerance < 10 && "You can tolerate some fluctuations for moderate returns."}
                    {answers.riskTolerance >= 10 && answers.riskTolerance < 15 && "You're comfortable with market volatility for potentially higher returns."}
                    {answers.riskTolerance >= 15 && "You're willing to accept significant volatility for maximum growth potential."}
                  </p>
                </div>
              </div>
            </CardContent>
          </>
        );
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl">Investment Goals</CardTitle>
              <CardDescription>What are your primary investment objectives?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={answers.investmentGoals} onValueChange={(value) => handleAnswerChange("investmentGoals", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="income" id="goal-1" />
                  <Label htmlFor="goal-1">Income and Capital Preservation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="balanced" id="goal-2" />
                  <Label htmlFor="goal-2">Balanced Growth and Income</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="growth" id="goal-3" />
                  <Label htmlFor="goal-3">Long-term Growth</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </>
        );
      case 4:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl">Market Downturn</CardTitle>
              <CardDescription>If your investments dropped 20% in value, what would you do?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={answers.marketDownturn} onValueChange={(value) => handleAnswerChange("marketDownturn", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sell_all" id="downturn-1" />
                  <Label htmlFor="downturn-1">Sell all investments immediately</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sell_some" id="downturn-2" />
                  <Label htmlFor="downturn-2">Sell some investments to reduce risk</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hold" id="downturn-3" />
                  <Label htmlFor="downturn-3">Hold on and wait for recovery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="buy_more" id="downturn-4" />
                  <Label htmlFor="downturn-4">Buy more at lower prices</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </>
        );
      case 5:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl">Investment Knowledge</CardTitle>
              <CardDescription>How would you rate your financial and investment knowledge?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={answers.financialKnowledge} onValueChange={(value) => handleAnswerChange("financialKnowledge", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="knowledge-1" />
                  <Label htmlFor="knowledge-1">Beginner: I'm new to investing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="knowledge-2" />
                  <Label htmlFor="knowledge-2">Basic: I understand some investment concepts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="knowledge-3" />
                  <Label htmlFor="knowledge-3">Intermediate: I'm familiar with different asset classes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4" id="knowledge-4" />
                  <Label htmlFor="knowledge-4">Advanced: I actively manage my investments</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5" id="knowledge-5" />
                  <Label htmlFor="knowledge-5">Expert: I have professional investment experience</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </>
        );
      default:
        return null;
    }
  };
  
  const renderResults = () => {
    if (!riskScore || !riskProfile) return null;
    
    const riskProfileData = {
      "Conservative": {
        description: "You prefer stability and are most comfortable with investments that have lower risk. Capital preservation is a priority.",
        allocation: [
          { name: "Stocks", value: 20 },
          { name: "Bonds", value: 60 },
          { name: "Cash", value: 15 },
          { name: "Alternative", value: 5 },
        ],
        tips: [
          "Focus on high-quality bonds and dividend stocks",
          "Keep emergency funds in high-yield savings accounts",
          "Consider inflation-protected securities",
          "Maintain a conservative withdrawal rate in retirement",
        ]
      },
      "Moderate": {
        description: "You're willing to accept some market fluctuations for better returns. You balance growth with income generation.",
        allocation: [
          { name: "Stocks", value: 40 },
          { name: "Bonds", value: 40 },
          { name: "Cash", value: 10 },
          { name: "Alternative", value: 10 },
        ],
        tips: [
          "Diversify across both growth and value stocks",
          "Consider a mix of government and corporate bonds",
          "Rebalance your portfolio annually",
          "Gradually increase bond allocation as you near goals",
        ]
      },
      "Growth": {
        description: "You're focused on long-term growth and can tolerate market volatility. You have a longer time horizon for your investments.",
        allocation: [
          { name: "Stocks", value: 65 },
          { name: "Bonds", value: 20 },
          { name: "Cash", value: 5 },
          { name: "Alternative", value: 10 },
        ],
        tips: [
          "Focus on a globally diversified equity portfolio",
          "Consider small and mid-cap stocks for growth",
          "Maintain a small bond position for stability",
          "Explore sector-specific ETFs for targeted exposure",
        ]
      },
      "Aggressive": {
        description: "You're seeking maximum growth and can withstand significant market volatility. You have a very long investment time horizon.",
        allocation: [
          { name: "Stocks", value: 80 },
          { name: "Bonds", value: 5 },
          { name: "Cash", value: 5 },
          { name: "Alternative", value: 10 },
        ],
        tips: [
          "Focus on growth-oriented equities including international markets",
          "Consider higher allocations to emerging markets",
          "Explore alternative investments like REITs or commodities",
          "Maintain discipline during market downturns to avoid panic selling",
        ]
      }
    };
    
    const profileData = riskProfileData[riskProfile as keyof typeof riskProfileData];
    
    return (
      <>
        <CardHeader>
          <CardTitle className="text-2xl">Your Risk Profile: {riskProfile}</CardTitle>
          <CardDescription>{profileData.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Risk Score</h3>
              <span className="text-sm text-gray-600 dark:text-gray-400">{riskScore}/100</span>
            </div>
            <div className="relative pt-4 pb-2">
              <Progress value={riskScore} max={100} className="h-3" />
              <div className="absolute flex justify-between w-full mt-2 text-xs text-gray-500">
                <span>Conservative</span>
                <span>Moderate</span>
                <span>Growth</span>
                <span>Aggressive</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Recommended Asset Allocation</h3>
            <div className="h-64">
              <ChartCard title="" type="pie" data={profileData.allocation} height={250} />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Info className="h-4 w-4" />
              AI-Generated Investment Tips
            </h3>
            <ul className="space-y-2">
              {profileData.tips.map((tip, index) => (
                <li key={index} className="flex gap-2">
                  <Check className="h-5 w-5 text-green-600 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/20 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium mb-1">Important Note</h4>
              <p className="text-sm">This assessment is for informational purposes only. Please consult with a financial advisor before making investment decisions.</p>
            </div>
          </div>
        </CardContent>
      </>
    );
  };

  // Component import for the chart in results
  const ChartCard = ({ title, type, data, height = 250 }: { title: string; type: string; data: any[]; height?: number; }) => {
    // This is a simplified version just for the risk assessment results page
    const COLORS = ['#2E3A8C', '#00B4D8', '#FFD700', '#E83A59'];
    
    return (
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: any) => `${value}%`}
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
              borderRadius: '8px', 
              border: '1px solid rgba(0, 0, 0, 0.1)' 
            }} 
          />
        </PieChart>
      </ResponsiveContainer>
    );
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Risk Assessment</h1>
        <p className="text-gray-600 dark:text-gray-400">Discover your investment risk profile and get personalized recommendations.</p>
      </div>
      
      {riskProfile ? null : (
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Step {step} of {totalSteps}</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">{Math.round((step / totalSteps) * 100)}% Complete</span>
          </div>
          <Progress value={(step / totalSteps) * 100} className="h-2" />
        </div>
      )}
      
      <Card className="glass-card">
        {riskProfile ? renderResults() : renderQuestion()}
        
        <CardFooter className="flex justify-between border-t pt-6">
          {riskProfile ? (
            <Button variant="outline" onClick={() => {
              setStep(1);
              setRiskProfile(null);
              setRiskScore(null);
            }}>
              Retake Assessment
            </Button>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={handleBack} 
                disabled={step === 1}
              >
                Back
              </Button>
              <Button 
                onClick={handleNext} 
                disabled={!answers[step === 1 ? "timeHorizon" : 
                          step === 2 ? "riskTolerance" : 
                          step === 3 ? "investmentGoals" : 
                          step === 4 ? "marketDownturn" : "financialKnowledge"]}
                className="gap-2"
              >
                {step < totalSteps ? (
                  <>Next <ChevronRight className="h-4 w-4" /></>
                ) : (
                  "Get Results"
                )}
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default RiskAssessment;
