
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
    <nav className={cn("flex flex-col space-y-1.5", className)}>
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
            location.pathname === item.href
              ? "bg-primary text-white dark:bg-primary-700"
              : "text-primary-800 dark:text-light-teal hover:bg-primary-100 dark:hover:bg-dark/80"
          )}
        >
          <item.icon className="h-5 w-5" />
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
