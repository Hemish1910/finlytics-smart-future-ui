
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChartCard } from "@/components/dashboard/chart-card";
import { Search, Plus, TrendingUp, TrendingDown, Star, AlertTriangle, Clock, ExternalLink } from "lucide-react";

const Market = () => {
  const [activeTab, setActiveTab] = useState("markets");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample data for the market overview (Indian markets)
  const marketData = [
    {
      name: "Sensex",
      price: "79,520.12",
      change: "+1.23%",
      isPositive: true,
    },
    {
      name: "Nifty 50",
      price: "24,165.85",
      change: "+0.87%",
      isPositive: true,
    },
    {
      name: "Bank Nifty",
      price: "52,784.65",
      change: "+1.68%",
      isPositive: true,
    },
    {
      name: "Bitcoin",
      price: "₹55,92,142",
      change: "-2.34%",
      isPositive: false,
    },
    {
      name: "Gold (10g)",
      price: "₹74,850",
      change: "+0.42%",
      isPositive: true,
    },
    {
      name: "Govt Bond (10Y)",
      price: "6.92%",
      change: "-0.053",
      isPositive: true,
    },
  ];
  
  // Sample data for the watchlist (Indian stocks)
  const watchlistData = [
    {
      symbol: "RELIANCE",
      name: "Reliance Industries",
      price: "₹2,834.25",
      change: "+2.34%",
      isPositive: true,
    },
    {
      symbol: "INFY",
      name: "Infosys Ltd.",
      price: "₹1,685.40",
      change: "+1.23%",
      isPositive: true,
    },
    {
      symbol: "TCS",
      name: "Tata Consultancy Services",
      price: "₹3,742.65",
      change: "+0.89%",
      isPositive: true,
    },
    {
      symbol: "HDFCBANK",
      name: "HDFC Bank Ltd.",
      price: "₹1,724.30",
      change: "-0.42%",
      isPositive: false,
    },
    {
      symbol: "BHARTIARTL",
      name: "Bharti Airtel Ltd.",
      price: "₹1,156.75",
      change: "-1.82%",
      isPositive: false,
    },
    {
      symbol: "ITC",
      name: "ITC Ltd.",
      price: "₹462.80",
      change: "+3.21%",
      isPositive: true,
    },
  ];
  
  // Sample news data (Indian context)
  const newsData = [
    {
      title: "RBI Holds Key Interest Rate Steady Amid Cooling Inflation",
      source: "Economic Times",
      time: "2 hours ago",
      category: "Economy",
    },
    {
      title: "IT Stocks Rally as Q2 Earnings Exceed Expectations",
      source: "Business Standard",
      time: "4 hours ago",
      category: "Markets",
    },
    {
      title: "Property Market Showing Signs of Cooling After Record Highs",
      source: "Financial Express",
      time: "6 hours ago",
      category: "Real Estate",
    },
    {
      title: "Indian Rupee Under Pressure Amid Dollar Strength",
      source: "Mint",
      time: "8 hours ago",
      category: "Currency",
    },
    {
      title: "EV Demand Surges as Battery Costs Decline",
      source: "ET Auto",
      time: "10 hours ago",
      category: "Industry",
    },
  ];
  
  // Sample chart data (with INR values)
  const stockChartData = [
    { name: "Jan", value: 1650 },
    { name: "Feb", value: 1700 },
    { name: "Mar", value: 1680 },
    { name: "Apr", value: 1750 },
    { name: "May", value: 1820 },
    { name: "Jun", value: 1870 },
    { name: "Jul", value: 1790 },
    { name: "Aug", value: 1900 },
  ];
  
  const cryptoChartData = [
    { name: "Jan", value: 3750000 },
    { name: "Feb", value: 4000000 },
    { name: "Mar", value: 4330000 },
    { name: "Apr", value: 4830000 },
    { name: "May", value: 4500000 },
    { name: "Jun", value: 5160000 },
    { name: "Jul", value: 5420000 },
    { name: "Aug", value: 5580000 },
  ];
  
  const commoditiesChartData = [
    { name: "Jan", value: 61500 },
    { name: "Feb", value: 63600 },
    { name: "Mar", value: 65600 },
    { name: "Apr", value: 67900 },
    { name: "May", value: 70200 },
    { name: "Jun", value: 72200 },
    { name: "Jul", value: 74800 },
    { name: "Aug", value: 77400 },
  ];
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Market Analysis</h1>
        <p className="text-gray-600 dark:text-gray-400">Track markets, build watchlists, and stay informed with financial news.</p>
      </div>
      
      <div className="mb-6">
        <Tabs defaultValue="markets" className="space-y-4" onValueChange={setActiveTab}>
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="markets">Markets</TabsTrigger>
              <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
            </TabsList>
            
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                className="pl-9" 
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="markets" className="space-y-6">
            {/* Market Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketData.map((item, index) => (
                <Card key={index} className="glass-card hover-scale">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{item.name}</p>
                        <p className="text-2xl font-bold">{item.price}</p>
                      </div>
                      <Badge variant={item.isPositive ? "default" : "destructive"} className={`${item.isPositive ? "bg-green-500" : "bg-red-500"} flex gap-1 items-center`}>
                        {item.isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                        {item.change}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Market Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ChartCard 
                title="Reliance (₹)" 
                type="line" 
                data={stockChartData} 
              />
              <ChartCard 
                title="Bitcoin (₹)" 
                type="line" 
                data={cryptoChartData} 
              />
              <ChartCard 
                title="Gold Price (10g)" 
                type="line" 
                data={commoditiesChartData} 
              />
            </div>

            {/* Market Sectors */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Market Sectors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "IT", change: "+2.4%", isPositive: true },
                    { name: "Healthcare", change: "+1.2%", isPositive: true },
                    { name: "Financial Services", change: "+0.8%", isPositive: true },
                    { name: "Energy", change: "-0.5%", isPositive: false },
                    { name: "FMCG", change: "+0.3%", isPositive: true },
                    { name: "PSU Banks", change: "-0.7%", isPositive: false },
                  ].map((sector, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-800 rounded-md">
                      <span>{sector.name}</span>
                      <Badge variant={sector.isPositive ? "default" : "destructive"} className={`${sector.isPositive ? "bg-green-500" : "bg-red-500"}`}>
                        {sector.change}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="watchlist" className="space-y-4">
            <div className="flex justify-end">
              <Button variant="outline" size="sm" className="gap-1">
                <Plus className="h-4 w-4" /> Add Symbol
              </Button>
            </div>
            
            <Card className="glass-card">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="text-left p-4 font-medium">Symbol</th>
                        <th className="text-left p-4 font-medium">Name</th>
                        <th className="text-right p-4 font-medium">Price</th>
                        <th className="text-right p-4 font-medium">Change</th>
                        <th className="text-center p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {watchlistData.map((stock, index) => (
                        <tr 
                          key={index} 
                          className="border-b last:border-0 border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/20"
                        >
                          <td className="p-4 font-medium">{stock.symbol}</td>
                          <td className="p-4 text-gray-700 dark:text-gray-300">{stock.name}</td>
                          <td className="p-4 text-right">{stock.price}</td>
                          <td className={`p-4 text-right ${stock.isPositive ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"}`}>
                            {stock.change}
                          </td>
                          <td className="p-4 text-center">
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Star className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <ChartCard 
              title="Portfolio Performance" 
              type="area" 
              data={[
                { name: "Jan", value: 830000 },
                { name: "Feb", value: 865000 },
                { name: "Mar", value: 850000 },
                { name: "Apr", value: 900000 },
                { name: "May", value: 930000 },
                { name: "Jun", value: 965000 },
                { name: "Jul", value: 950000 },
                { name: "Aug", value: 1000000 },
              ]} 
            />
            
            <div className="p-4 bg-accent/5 dark:bg-accent/10 rounded-lg border border-accent/10 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Important Disclaimer</h4>
                <p className="text-sm">Past performance is not indicative of future results. Market data may be delayed. Always do your own research before making investment decisions.</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="news" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {newsData.map((news, index) => (
                <Card key={index} className="glass-card hover-scale">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex gap-2 items-center">
                          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                            {news.category}
                          </Badge>
                          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {news.time}
                          </span>
                        </div>
                        <h3 className="font-medium text-lg">{news.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Source: {news.source}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Market Sentiment</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartCard 
                    title="" 
                    type="pie" 
                    data={[
                      { name: "Bullish", value: 60 },
                      { name: "Neutral", value: 25 },
                      { name: "Bearish", value: 15 },
                    ]} 
                    height={200}
                  />
                </CardContent>
              </Card>
              <Card className="glass-card md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Economic Calendar</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <tbody>
                        {[
                          { event: "Fed Interest Rate Decision", date: "Sep 18", impact: "High" },
                          { event: "Non-Farm Payrolls", date: "Oct 7", impact: "High" },
                          { event: "CPI Data Release", date: "Sep 14", impact: "Medium" },
                          { event: "GDP Growth Rate", date: "Sep 28", impact: "Medium" },
                          { event: "Retail Sales", date: "Sep 17", impact: "Low" },
                        ].map((event, index) => (
                          <tr 
                            key={index} 
                            className="border-b last:border-0 border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/20"
                          >
                            <td className="p-3 font-medium">{event.event}</td>
                            <td className="p-3 text-gray-600 dark:text-gray-400">{event.date}</td>
                            <td className="p-3">
                              <Badge variant="outline" className={
                                event.impact === "High" ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/30" :
                                event.impact === "Medium" ? "bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800/30" :
                                "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/30"
                              }>
                                {event.impact} Impact
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Market;
