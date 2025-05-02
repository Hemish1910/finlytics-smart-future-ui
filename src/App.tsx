
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Layout } from "@/components/layout";

// Pages
import Dashboard from "./pages/Dashboard";
import RiskAssessment from "./pages/RiskAssessment";
import Retirement from "./pages/Retirement";
import Market from "./pages/Market";
import Knowledge from "./pages/Knowledge";
import AIAdvisor from "./pages/AIAdvisor";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Analysis from "./pages/Analysis";

const queryClient = new QueryClient();

const App = () => {
  // In a real app, you would check for authentication status here
  const isAuthenticated = true; // This would be managed by your authentication logic
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Layout><Dashboard /></Layout>} />
              <Route path="/risk-assessment" element={<Layout><RiskAssessment /></Layout>} />
              <Route path="/retirement" element={<Layout><Retirement /></Layout>} />
              <Route path="/market" element={<Layout><Market /></Layout>} />
              <Route path="/knowledge" element={<Layout><Knowledge /></Layout>} />
              <Route path="/ai-advisor" element={<Layout><AIAdvisor /></Layout>} />
              <Route path="/analysis" element={<Layout><Analysis /></Layout>} />
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
