
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 dark:bg-primary/20 mx-auto flex items-center justify-center">
            <span className="text-4xl font-bold text-primary">404</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Sorry, we couldn't find the page you're looking for. The page might have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default">
            <Link to="/">Return to Dashboard</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/knowledge">Browse Knowledge Center</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
