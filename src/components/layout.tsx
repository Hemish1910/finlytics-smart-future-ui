
import { Header } from "@/components/header";
import { SidebarNav } from "@/components/sidebar-nav";
import { useIsMobile } from "@/hooks/use-mobile";

export function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col dark:bg-dark">
      <Header />
      <div className="flex-1 flex">
        {!isMobile && (
          <div className="w-64 border-r border-gray-200 dark:border-gray-800 p-4 hidden md:block">
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
