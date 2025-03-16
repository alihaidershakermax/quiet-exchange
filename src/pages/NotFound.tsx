
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="text-center max-w-md animate-fade-in glass-card p-8 rounded-xl">
          <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-whisper-primary animate-pulse-soft" />
          <h1 className="text-5xl font-bold mb-4 gradient-text">{t.notFound}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{t.pageNotFound}</p>
          <Button asChild>
            <Link to="/" className="inline-flex items-center gap-2">
              {t.returnHome}
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
