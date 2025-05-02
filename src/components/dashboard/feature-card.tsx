
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  className?: string;
  color?: "primary" | "secondary" | "accent" | "default";
}

export function FeatureCard({
  title,
  description,
  icon,
  href,
  className,
  color = "default",
}: FeatureCardProps) {
  const colorStyles = {
    primary: "border-primary-300 dark:border-primary-800",
    secondary: "border-secondary-300 dark:border-secondary-800",
    accent: "border-accent-300 dark:border-accent-800",
    default: "",
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all hover-scale glass-card h-full",
      colorStyles[color],
      className
    )}>
      <CardHeader>
        <div className={cn(
          "w-12 h-12 flex items-center justify-center rounded-full mb-4",
          color === "primary" && "bg-primary/10 text-primary",
          color === "secondary" && "bg-secondary/10 text-secondary",
          color === "accent" && "bg-accent/10 text-accent",
          color === "default" && "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
        )}>
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="hover:text-primary">
          <Link to={href}>
            Explore <span className="ml-2">→</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
