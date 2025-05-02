
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Menu, X, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

// Create a simple wallet icon component
const Wallet = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 6.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1.5" />
    <path d="M16 12h4a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4v12" />
  </svg>
);

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 dark:bg-dark/90 border-b border-gray-200 dark:border-gray-800">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          )}
          <Link to="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <Wallet className="h-4 w-4 text-white" />
            </span>
            <span className="font-poppins font-bold text-xl text-primary-500 dark:text-white">
              Finlytics
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <ThemeSwitcher />
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Profile">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobile && (
        <div
          className={cn(
            "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden transition-opacity",
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <div
            className={cn(
              "fixed inset-y-0 left-0 z-50 w-3/4 bg-white dark:bg-dark p-6 shadow-lg transition-transform duration-300 ease-in-out",
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <Wallet className="h-4 w-4 text-white" />
                  </span>
                  <span className="font-poppins font-bold text-xl text-primary-500 dark:text-white">
                    Finlytics
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X />
                </Button>
              </div>
              {/* Mobile navigation items */}
              <nav className="flex flex-col space-y-4">
                {[
                  { name: "Dashboard", href: "/" },
                  { name: "Risk Assessment", href: "/risk-assessment" },
                  { name: "Retirement Planner", href: "/retirement" },
                  { name: "Market Analysis", href: "/market" },
                  { name: "Knowledge Center", href: "/knowledge" },
                  { name: "AI Advisor", href: "/ai-advisor" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-primary-800 dark:text-light-teal hover:text-primary-600 px-2 py-1.5 text-lg font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
