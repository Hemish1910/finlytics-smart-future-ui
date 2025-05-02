
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  color?: "primary" | "secondary" | "accent" | "default";
}

export function StatsCard({
  title,
  value,
  icon,
  trend,
  className,
  color = "default",
}: StatsCardProps) {
  const colorStyles = {
    primary: "border-primary-300 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/20",
    secondary: "border-secondary-300 dark:border-secondary-800 bg-secondary-50 dark:bg-secondary-900/20",
    accent: "border-accent-300 dark:border-accent-800 bg-accent-50 dark:bg-accent-900/20",
    default: "",
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all hover-scale glass-card",
      colorStyles[color],
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</CardTitle>
        {icon && <div className="h-5 w-5 text-gray-400 dark:text-gray-500">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className={cn(
            "text-xs font-medium mt-1",
            trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          )}>
            {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}% from last month
          </div>
        )}
      </CardContent>
    </Card>
  );
}
