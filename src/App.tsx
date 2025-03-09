
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import Index from "./pages/Index";
import TripDetails from "./pages/TripDetails";
import Favorites from "./pages/Favorites";
import MyTrips from "./pages/MyTrips";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  
  const toggleSideMenu = () => {
    setIsSideMenuOpen(prev => !prev);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <FavoritesProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex">
              <SideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />
              <div className="flex-1 md:ml-64">
                <Header toggleSideMenu={toggleSideMenu} />
                <main className="pt-16">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/trip/:id" element={<TripDetails />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/my-trips" element={<MyTrips />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </BrowserRouter>
        </FavoritesProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
