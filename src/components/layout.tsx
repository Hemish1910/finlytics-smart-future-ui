
import { Header } from "@/components/header";
import { SidebarNav } from "@/components/sidebar-nav";
import { useIsMobile } from "@/hooks/use-mobile";
import { CircleDot, CircleDashed, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col dark:bg-dark relative overflow-hidden">
      {/* Decorative elements - visible but subtle */}
      <div className="absolute top-20 -right-16 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />
      <div className="absolute top-1/4 left-1/3 w-6 h-6 text-primary/20 floating">
        <CircleDot />
      </div>
      <div className="absolute bottom-1/4 right-1/3 w-4 h-4 text-secondary/20 floating-slow">
        <CircleDashed />
      </div>
      <div className="absolute top-1/3 right-1/4 w-5 h-5 text-accent/20 floating-fast">
        <Sparkles />
      </div>
      
      <Header />
      <div className="flex-1 flex">
        {!isMobile && (
          <div className="w-64 border-r border-gray-200 dark:border-gray-800 p-4 hidden md:block backdrop-blur-sm bg-white/30 dark:bg-dark/30">
            <SidebarNav />
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 px-2 mb-2">Account</h4>
                <Link
                  to="/analysis" 
                  className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Sparkles className="mr-3 h-4 w-4 text-primary" />
                  AI Analysis
                </Link>
                <Link
                  to="/login" 
                  className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <CircleDot className="mr-3 h-4 w-4 text-primary" />
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        )}
        <main className="flex-1 overflow-y-auto">
          <div className="container py-6 px-4 md:px-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
