
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Send, User, Bot, Clock, History, Info, Bookmark, Lightbulb } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

const AIAdvisor = () => {
  const [messages, setMessages] = useState<any[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI financial advisor. How can I assist you with your financial questions today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [simplifiedMode, setSimplifiedMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Sample suggestions for the user
  const suggestions = [
    "How much should I save for retirement?",
    "What is dollar-cost averaging?",
    "Should I pay off debt or invest?",
    "How do I start investing with limited funds?",
    "What's the difference between a Roth IRA and a traditional IRA?",
  ];
  
  // Sample pre-programmed responses for the demo
  const getAIResponse = (question: string) => {
    const responses: Record<string, { normal: string; simplified: string }> = {
      "How much should I save for retirement?": {
        normal: "The general guideline is to save 15-20% of your annual income for retirement. However, the specific amount depends on several factors including your current age, desired retirement age, expected lifestyle, and other sources of retirement income. A common approach is to use the '4% rule' which suggests you'll need approximately 25 times your annual expenses in retirement savings. I'd recommend using our Retirement Planner tool for a personalized calculation based on your specific situation.",
        simplified: "Try to save 15-20% of what you earn each year. The earlier you start, the better! Think about how much money you'll need each year when you stop working, then multiply that by 25. That's a good savings target."
      },
      "What is dollar-cost averaging?": {
        normal: "Dollar-cost averaging is an investment strategy where you invest a fixed amount of money at regular intervals, regardless of the asset's price. This approach reduces the impact of volatility on your investments. By consistently investing the same amount, you automatically purchase more shares when prices are low and fewer shares when prices are high, potentially lowering the average cost per share over time. This strategy is particularly beneficial in volatile markets and helps investors avoid the pitfalls of trying to time the market.",
        simplified: "Dollar-cost averaging means investing the same amount of money regularly (like every month), no matter if prices are high or low. When prices drop, your money buys more shares. When prices rise, you buy fewer shares. This helps you pay a better average price over time and avoid the stress of trying to guess the best time to invest."
      },
      "Should I pay off debt or invest?": {
        normal: "This depends on several factors, particularly the interest rates on your debt compared to potential investment returns. Generally, it's advisable to first pay off high-interest debt (typically above 6-8%, such as credit card debt) before focusing on investments, as the interest saved is effectively a guaranteed return. Low-interest debt (like some mortgages or student loans) might be acceptable to maintain while investing, especially if your expected investment returns exceed the debt's interest rate. Always prioritize creating an emergency fund and capturing any employer 401(k) match before accelerating debt payments or additional investments.",
        simplified: "Look at the interest rate on your debt. If it's high (like credit cards), pay that off first because it costs you more than you'd likely make investing. If the interest is low (like some student loans), you might do both: make minimum debt payments while starting to invest. Always have some emergency savings first, and don't miss out on any free money from employer 401(k) matches."
      },
      "How do I start investing with limited funds?": {
        normal: "Start by establishing an emergency fund of 3-6 months of expenses. Then consider low-cost index funds or ETFs through a brokerage offering fractional shares with no minimums. Robo-advisors like Betterment or Wealthfront offer portfolio management with low entry points. Maximize tax-advantaged accounts like 401(k)s (especially with employer matches) and IRAs. Consider micro-investing apps for spare change investments. Focus on consistency and time in the market rather than initial investment amount.",
        simplified: "First, save some money for emergencies. Then look for companies that let you buy parts of investment funds with small amounts of money. Apps like Robinhood or Acorns let you start with just a few dollars. If your job offers a 401(k) with matching money, try to use that first—it's free money! Remember: starting small but regularly is better than not starting at all."
      },
      "What's the difference between a Roth IRA and a traditional IRA?": {
        normal: "The key difference is tax treatment. Traditional IRAs offer tax-deductible contributions but withdrawals in retirement are taxed as ordinary income. Roth IRAs are funded with after-tax dollars, but qualified withdrawals are completely tax-free. Traditional IRAs have required minimum distributions (RMDs) starting at age 73, while Roth IRAs don't. Income limits may restrict direct Roth IRA contributions for high earners. The optimal choice depends on your current tax bracket versus expected retirement tax bracket, age, and retirement timeline.",
        simplified: "With a Traditional IRA, you don't pay taxes on the money now when you put it in, but you'll pay taxes later when you take it out in retirement. With a Roth IRA, you pay taxes on the money now before putting it in, but when you take it out in retirement, it's all tax-free. If you think your taxes will be higher when you retire, a Roth might be better. If you think they'll be lower, a Traditional might work better."
      }
    };
    
    // Check for exact matches first
    for (const key in responses) {
      if (question.toLowerCase().includes(key.toLowerCase())) {
        return simplifiedMode ? responses[key].simplified : responses[key].normal;
      }
    }
    
    // Default response if no match
    return simplifiedMode ? 
      "I don't have a simple answer for that question yet. Would you like to try another question or switch to advanced mode for a more detailed response?" : 
      "I don't have specific information on that topic. Could you try rephrasing your question or ask about another financial topic? I'm here to help with investment strategies, retirement planning, budgeting, and general financial advice.";
  };
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI thinking and response
    setTimeout(() => {
      const aiResponse = {
        role: "assistant",
        content: getAIResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    // Add user message
    const userMessage = {
      role: "user",
      content: suggestion,
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setIsLoading(true);
    
    // Simulate AI thinking and response
    setTimeout(() => {
      const aiResponse = {
        role: "assistant",
        content: getAIResponse(suggestion),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };
  
  useEffect(() => {
    // Scroll to bottom of messages when they change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleToggleSimplifiedMode = () => {
    setSimplifiedMode(!simplifiedMode);
    toast(
      simplifiedMode ? "Advanced explanation mode activated" : "Explain Like I'm 5 mode activated",
      {
        description: simplifiedMode ? "Showing detailed financial explanations" : "Showing simplified explanations",
      }
    );
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Investment Advisor</h1>
        <p className="text-gray-600 dark:text-gray-400">Get personalized financial advice and answers to your questions.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <Card className="glass-card lg:col-span-3 flex flex-col h-[calc(80vh-120px)]">
          <CardHeader className="border-b flex flex-row justify-between items-center py-3">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Finlytics AI</CardTitle>
                <p className="text-xs text-green-600 dark:text-green-400">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="simplified-mode"
                  checked={simplifiedMode}
                  onCheckedChange={handleToggleSimplifiedMode}
                />
                <Label htmlFor="simplified-mode" className="text-sm">Explain Like I'm 5</Label>
              </div>
              <Button size="sm" variant="outline" className="gap-2">
                <History className="h-4 w-4" /> Chat History
              </Button>
            </div>
          </CardHeader>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/40 dark:bg-secondary/20"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.role === "assistant" && (
                        <Bot className="h-5 w-5 text-primary mt-1" />
                      )}
                      <div className="space-y-1">
                        <p>{message.content}</p>
                        <p className="text-xs opacity-70 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    {/* Action buttons for AI messages */}
                    {message.role === "assistant" && message.content.length > 50 && (
                      <div className="flex gap-1 mt-2 -mb-1 justify-end">
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-black/10">
                          <Bookmark className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-black/10">
                          <Info className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-secondary/40 dark:bg-secondary/20">
                    <div className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-primary" />
                      <div className="space-y-1">
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="h-2 w-2 rounded-full bg-primary animate-bounce"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <Input
                placeholder="Ask a financial question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()} className="bg-primary">
                <Send className="h-4 w-4" />
              </Button>
            </form>
            
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestions.slice(0, 3).map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleSuggestionClick(suggestion)}
                  disabled={isLoading}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </Card>
        
        {/* Side Panel */}
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-accent" />
                Investment Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Risk Management</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Diversify your portfolio across different asset classes to reduce overall risk.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Tax Efficiency</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Utilize tax-advantaged accounts like IRAs and 401(k)s to optimize your after-tax returns.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Long-term Perspective</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Market timing is difficult; consistent investments over time often outperform trying to predict market movements.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Popular Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  Retirement Planning
                </Badge>
                <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                  Stock Investing
                </Badge>
                <Badge variant="outline" className="bg-accent/10 text-accent-600 dark:text-accent border-accent/20">
                  Tax Strategies
                </Badge>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  Debt Management
                </Badge>
                <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                  Real Estate
                </Badge>
                <Badge variant="outline" className="bg-accent/10 text-accent-600 dark:text-accent border-accent/20">
                  Cryptocurrency
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAdvisor;
