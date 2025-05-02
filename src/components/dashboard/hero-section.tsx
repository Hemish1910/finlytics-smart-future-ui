
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-xl mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-secondary/90 to-accent/90 animate-gradient-animation"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAwIDEwMFYwaC0uNUE1MCA1MCAwIDAgMCAwIDUwdjUwaDEwMHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] bg-[length:24px_24px]"></div>
      <div className="relative backdrop-blur-sm bg-white/5 dark:bg-black/5 p-8 md:p-12 rounded-xl">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <span className="bg-white/15 rounded-full p-2 backdrop-blur-sm">
              <Sparkles className="h-6 w-6 text-white" />
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-4 animate-fade-in">
            Smart Finance, <span className="text-accent">Smarter Future</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 text-center mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Take control of your financial journey with our AI-powered insights 
            and personalized advice tailored just for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-medium shadow-lg hover:shadow-xl transition-all group"
              asChild
            >
              <Link to="/risk-assessment" className="flex items-center gap-2">
                Get Started
                <TrendingUp className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 font-medium shadow-lg hover:shadow-xl transition-all"
              asChild
            >
              <Link to="/ai-advisor" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Ask AI Advisor
              </Link>
            </Button>
          </div>
          
          {/* Animated floating cards for visual interest */}
          <div className="absolute -right-12 top-1/4 transform rotate-12 opacity-30 floating-slow hidden md:block">
            <div className="h-28 w-40 bg-white/20 backdrop-blur-md rounded-xl"></div>
          </div>
          <div className="absolute -left-10 bottom-1/4 transform -rotate-12 opacity-20 floating hidden md:block">
            <div className="h-20 w-32 bg-white/20 backdrop-blur-md rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
