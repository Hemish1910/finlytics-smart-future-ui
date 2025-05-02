
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-xl mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-animation"></div>
      <div className="relative backdrop-blur-sm bg-white/10 dark:bg-black/10 p-8 md:p-12 rounded-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-in">
            Smart Finance, Smarter Future
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Take control of your financial journey with our AI-powered insights and personalized advice.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-medium"
              asChild
            >
              <Link to="/risk-assessment">Get Started</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 font-medium"
              asChild
            >
              <Link to="/ai-advisor">Ask AI Advisor</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
