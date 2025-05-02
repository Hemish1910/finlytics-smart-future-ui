
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Wallet, PiggyBank, LineChart, BookOpen, MessageSquare, ShieldCheck, Home } from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    name: "Risk Assessment",
    href: "/risk-assessment",
    icon: ShieldCheck,
  },
  {
    name: "Retirement Planner",
    href: "/retirement",
    icon: PiggyBank,
  },
  {
    name: "Market Analysis",
    href: "/market",
    icon: LineChart,
  },
  {
    name: "Knowledge Center",
    href: "/knowledge",
    icon: BookOpen,
  },
  {
    name: "AI Advisor",
    href: "/ai-advisor",
    icon: MessageSquare,
  },
];

export function SidebarNav({ className }: { className?: string }) {
  const location = useLocation();

  return (
    <div className="flex flex-col space-y-6">
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-4 mb-4">
        <h3 className="text-sm font-medium text-primary-600 dark:text-light-teal mb-1">Current Portfolio Value</h3>
        <div className="text-2xl font-bold">$125,876.43</div>
        <div className="flex items-center mt-1 text-sm text-green-600">
          <span className="inline-block mr-1">↑</span> 
          <span>2.4% today</span>
        </div>
      </div>
      
      <nav className={cn("flex flex-col space-y-1", className)}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all relative group",
                isActive 
                  ? "bg-gradient-to-r from-primary to-primary/80 text-white dark:from-primary-600 dark:to-primary-700" 
                  : "text-primary-800 dark:text-light-teal hover:bg-primary-100 dark:hover:bg-dark/80"
              )}
            >
              <div className={cn(
                "h-8 w-8 rounded-lg flex items-center justify-center",
                isActive 
                  ? "bg-white/20" 
                  : "bg-primary/10 dark:bg-white/10"
              )}>
                <item.icon className="h-4 w-4" />
              </div>
              {item.name}
              {isActive && (
                <span className="absolute inset-y-0 right-0 w-1 bg-white rounded-l-full" />
              )}
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto">
        <div className="bg-gradient-to-br from-accent/10 to-accent/20 rounded-xl p-4 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 h-16 w-16 text-accent/20">
            <MessageSquare size={64} />
          </div>
          <h4 className="font-medium mb-1">Need help?</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Our AI assistant is ready to answer your financial questions.</p>
          <Link to="/ai-advisor" className="text-xs text-primary hover:underline font-medium">
            Ask AI Advisor
          </Link>
        </div>
      </div>
    </div>
  );
}
