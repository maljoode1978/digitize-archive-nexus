import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScanPage from "./pages/ScanPage";
import DataEntryPage from "./pages/DataEntryPage";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      {/* ←——  basename fixes the blank screen on GitHub Pages */}
      <BrowserRouter basename="/digitize-archive-nexus">
        <Routes>
          <Route path="/" element={<Navigate to="/scan" replace />} />
          <Route path="/" element={<Layout />}>
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/data-entry" element={<DataEntryPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;