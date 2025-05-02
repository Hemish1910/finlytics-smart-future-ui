
import { Header } from "@/components/header";
import { SidebarNav } from "@/components/sidebar-nav";
import { useIsMobile } from "@/hooks/use-mobile";
import { CircleNotch, CircleDashed, Sparkles } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col dark:bg-dark relative overflow-hidden">
      {/* Decorative elements - visible but subtle */}
      <div className="absolute top-20 -right-16 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />
      <div className="absolute top-1/4 left-1/3 w-6 h-6 text-primary/20 floating">
        <CircleNotch />
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
