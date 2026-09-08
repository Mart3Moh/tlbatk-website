import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppWidget from "./components/WhatsAppWidget";
import Home from "./pages/Home";
import Track from "./pages/Track";
import Policy from "./pages/Policy";
import Offers from "./pages/Offers";
import OffersAdmin from "./pages/OffersAdmin";
import { OffersProvider } from "./context/OffersContext";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <OffersProvider>
        <ScrollManager />
        <div className="min-h-screen font-body text-ink">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/track" element={<Track />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/admin/offers" element={<OffersAdmin />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
          <WhatsAppWidget />
        </div>
      </OffersProvider>
    </BrowserRouter>
  );
}
