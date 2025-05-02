
import React from 'react';
import { HeroSection } from "@/components/dashboard/hero-section";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ChartCard } from "@/components/dashboard/chart-card";
import { FeatureCard } from "@/components/dashboard/feature-card";
import { ArrowUpRight, PiggyBank, Wallet, LineChart, ShieldCheck, ArrowUp, ArrowDown, ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Sample data
  const portfolioValue = 125876.43;
  const portfolioChange = 2.4;
  const savingsRate = 28.6;
  const monthlySpending = 3245.78;

  // Sample chart data
  const netWorthData = [
    { name: "Jan", value: 98500 },
    { name: "Feb", value: 102000 },
    { name: "Mar", value: 101200 },
    { name: "Apr", value: 104800 },
    { name: "May", value: 110500 },
    { name: "Jun", value: 112000 },
    { name: "Jul", value: 116500 },
    { name: "Aug", value: 119200 },
    { name: "Sep", value: 122500 },
    { name: "Oct", value: 125876 },
  ];

  const spendingData = [
    { name: "Housing", value: 1520 },
    { name: "Food", value: 680 },
    { name: "Transport", value: 420 },
    { name: "Utilities", value: 320 },
    { name: "Entertainment", value: 240 },
    { name: "Other", value: 65.78 },
  ];

  const riskData = {
    score: 65,
    profile: "Growth",
    assets: [
      { name: "Stocks", value: 65 },
      { name: "Bonds", value: 20 },
      { name: "Cash", value: 5 },
      { name: "Alternative", value: 10 },
    ]
  };

  // Show welcome toast on first load
  React.useEffect(() => {
    toast("Welcome to Finlytics!", {
      description: "Your daily financial update is ready.",
      action: {
        label: "View",
        onClick: () => {},
      },
    });
  }, []);

  return (
    <div className="space-y-6 pb-8">
      <HeroSection />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Portfolio Value"
          value={`$${portfolioValue.toLocaleString("en-US", { maximumFractionDigits: 2 })}`}
          trend={{ value: portfolioChange, isPositive: portfolioChange > 0 }}
          icon={<Wallet className="h-5 w-5" />}
        />
        <StatsCard
          title="Monthly Spending"
          value={`$${monthlySpending.toLocaleString("en-US", { maximumFractionDigits: 2 })}`}
          trend={{ value: 1.2, isPositive: false }}
          icon={<LineChart className="h-5 w-5" />}
        />
        <StatsCard
          title="Savings Rate"
          value={`${savingsRate}%`}
          trend={{ value: 3.5, isPositive: true }}
          icon={<PiggyBank className="h-5 w-5" />}
        />
        <StatsCard
          title="Risk Score"
          value={riskData.score}
          subtitle={riskData.profile}
          icon={<ShieldCheck className="h-5 w-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <Card className="col-span-1 lg:col-span-2 glass-card overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Net Worth Trend</CardTitle>
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                <span>Last 10 Months</span>
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
            <CardDescription>Your total assets over time</CardDescription>
          </CardHeader>
          <CardContent className="pb-0">
            <div className="h-[250px]">
              <ChartCard
                type="area"
                data={netWorthData}
                height={250}
              />
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="flex items-center justify-between w-full text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-green-600 font-medium">+27.8%</span>
                <span className="text-gray-500">YTD Growth</span>
              </div>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </CardFooter>
        </Card>

        <Card className="glass-card overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>Monthly Spending</CardTitle>
            <CardDescription>Where your money goes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[220px] mt-2">
              <ChartCard
                type="pie"
                data={spendingData}
                height={220}
              />
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full">
              <span>Budget Analysis</span>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <FeatureCard
          title="Risk Assessment"
          description="Analyze your risk tolerance and get a personalized investment strategy"
          icon={<ShieldCheck className="h-6 w-6" />}
          href="/risk-assessment"
        />
        <FeatureCard
          title="Retirement Planner"
          description="Plan your financial future with our interactive retirement calculator"
          icon={<PiggyBank className="h-6 w-6" />}
          href="/retirement"
        />
        <FeatureCard
          title="AI Investment Advisor"
          description="Get personalized investment advice powered by artificial intelligence"
          icon={<LineChart className="h-6 w-6" />}
          href="/ai-advisor"
        />
      </div>

      <Card className="glass-card overflow-hidden border border-accent/20 mt-6">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <ArrowUpRight className="h-5 w-5 text-accent" />
              <span>Investment Tip of the Day</span>
            </h3>
            <p className="mb-4">
              Market volatility is normal. Consistent investing through market ups and downs (dollar-cost averaging) 
              can help reduce the impact of volatility on your overall portfolio.
            </p>
            <Button variant="outline" size="sm">Learn More</Button>
          </div>
          <div className="flex-1 bg-gradient-to-br from-accent/10 to-accent/5 p-6 border-t md:border-t-0 md:border-l border-accent/20">
            <h3 className="text-lg font-semibold mb-2">Latest Market Update</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>S&P 500</span>
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUp className="h-3 w-3" />
                  <span>0.75%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Dow Jones</span>
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUp className="h-3 w-3" />
                  <span>0.38%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>NASDAQ</span>
                <div className="flex items-center gap-1 text-red-600">
                  <ArrowDown className="h-3 w-3" />
                  <span>0.23%</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/market" className="text-primary hover:underline inline-flex items-center gap-1 text-sm">
                <span>See Full Market Analysis</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
