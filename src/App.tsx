import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { HelmetProvider } from "react-helmet-async";
import { I18nProvider } from "./i18n";
import WhatsApp from "./pages/WhatsApp";
import Festival from "./pages/Festival";
import Referral from "./pages/Referral";
import Loyalty from "./pages/Loyalty";
import SEO from "./pages/SEO";
import Social from "./pages/Social";
import Customers from "./pages/Customers";
import Suggestions from "./pages/Suggestions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <I18nProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/whatsapp" element={<WhatsApp />} />
              <Route path="/banners" element={<Festival />} />
              <Route path="/referral" element={<Referral />} />
              <Route path="/loyalty" element={<Loyalty />} />
              <Route path="/seo" element={<SEO />} />
              <Route path="/social" element={<Social />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/suggestions" element={<Suggestions />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </I18nProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
