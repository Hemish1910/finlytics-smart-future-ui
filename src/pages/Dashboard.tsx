
import { HeroSection } from "@/components/dashboard/hero-section";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ChartCard } from "@/components/dashboard/chart-card";
import { FeatureCard } from "@/components/dashboard/feature-card";
import { Wallet, TrendingUp, PiggyBank, ShieldCheck, BookOpen, MessageSquare } from "lucide-react";

const Dashboard = () => {
  // Sample data for charts
  const monthlyExpensesData = [
    { name: "Housing", value: 1200 },
    { name: "Food", value: 500 },
    { name: "Transport", value: 300 },
    { name: "Entertainment", value: 200 },
    { name: "Others", value: 400 },
  ];

  const savingsData = [
    { name: "Jan", value: 5000 },
    { name: "Feb", value: 5200 },
    { name: "Mar", value: 5600 },
    { name: "Apr", value: 5900 },
    { name: "May", value: 6100 },
    { name: "Jun", value: 6500 },
    { name: "Jul", value: 6800 },
    { name: "Aug", value: 7200 },
  ];

  const investmentsData = [
    { name: "Stocks", value: 45 },
    { name: "Bonds", value: 25 },
    { name: "Real Estate", value: 20 },
    { name: "Crypto", value: 10 },
  ];

  return (
    <div className="space-y-6">
      <HeroSection />
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Net Worth" 
          value="$127,382" 
          trend={{ value: 5.2, isPositive: true }} 
          icon={<Wallet />} 
          color="primary"
        />
        <StatsCard 
          title="Monthly Income" 
          value="$8,250" 
          icon={<TrendingUp />} 
          color="secondary"
        />
        <StatsCard 
          title="Monthly Expenses" 
          value="$2,680" 
          trend={{ value: 2.1, isPositive: false }} 
          icon={<Wallet />} 
          color="accent"
        />
        <StatsCard 
          title="Savings Rate" 
          value="32.4%" 
          trend={{ value: 3.8, isPositive: true }} 
          icon={<PiggyBank />}
          color="primary"
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard 
          title="Monthly Spending" 
          type="pie" 
          data={monthlyExpensesData} 
        />
        <ChartCard 
          title="Savings Growth" 
          type="area" 
          data={savingsData} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ChartCard 
          title="Investment Allocation" 
          type="pie" 
          data={investmentsData} 
        />
        <ChartCard 
          title="Monthly Budget" 
          type="bar" 
          data={monthlyExpensesData} 
        />
        <ChartCard 
          title="Income Trend" 
          type="line" 
          data={[
            { name: "Jan", value: 7800 },
            { name: "Feb", value: 7900 },
            { name: "Mar", value: 8000 },
            { name: "Apr", value: 7850 },
            { name: "May", value: 8100 },
            { name: "Jun", value: 8200 },
            { name: "Jul", value: 8250 },
            { name: "Aug", value: 8250 },
          ]} 
        />
      </div>
      
      {/* Features */}
      <h2 className="text-2xl font-bold mt-10 mb-6">Explore Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard 
          title="Risk Assessment" 
          description="Discover your risk tolerance and get personalized investment strategy recommendations." 
          icon={<ShieldCheck className="h-6 w-6" />} 
          href="/risk-assessment"
          color="primary"
        />
        <FeatureCard 
          title="Retirement Planner" 
          description="Plan your retirement with interactive tools and projections based on your goals." 
          icon={<PiggyBank className="h-6 w-6" />} 
          href="/retirement"
          color="secondary"
        />
        <FeatureCard 
          title="Market Analysis" 
          description="Stay updated with market trends, stock performance, and economic indicators." 
          icon={<TrendingUp className="h-6 w-6" />} 
          href="/market"
          color="accent"
        />
        <FeatureCard 
          title="Knowledge Center" 
          description="Access a library of financial articles, videos, and resources to improve your financial literacy." 
          icon={<BookOpen className="h-6 w-6" />} 
          href="/knowledge"
          color="primary"
        />
        <FeatureCard 
          title="AI Advisor" 
          description="Get personalized financial advice and answers to your questions from our AI assistant." 
          icon={<MessageSquare className="h-6 w-6" />} 
          href="/ai-advisor"
          color="secondary"
        />
        <FeatureCard 
          title="Budget Tracker" 
          description="Track your spending, set budgets, and receive alerts to stay within your financial goals." 
          icon={<Wallet className="h-6 w-6" />} 
          href="#"
          color="accent"
        />
      </div>
    </div>
  );
};

export default Dashboard;
