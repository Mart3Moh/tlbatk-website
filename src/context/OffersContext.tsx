import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number; // percentage
  code?: string;
  expiryDate: string; // YYYY-MM-DD
  active: boolean;
  createdAt: string;
}

interface OffersContextType {
  offers: Offer[];
  addOffer: (offer: Omit<Offer, "id" | "createdAt">) => void;
  deleteOffer: (id: string) => void;
  updateOffer: (id: string, offer: Omit<Offer, "id" | "createdAt">) => void;
}

const OffersContext = createContext<OffersContextType | undefined>(undefined);

const STORAGE_KEY = "tlbatk_offers";

export function OffersProvider({ children }: { children: ReactNode }) {
  const [offers, setOffers] = useState<Offer[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setOffers(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load offers:", e);
      }
    }
  }, []);

  // Save to localStorage whenever offers change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(offers));
  }, [offers]);

  const addOffer = (offer: Omit<Offer, "id" | "createdAt">) => {
    const newOffer: Offer = {
      ...offer,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setOffers([newOffer, ...offers]);
  };

  const deleteOffer = (id: string) => {
    setOffers(offers.filter((o) => o.id !== id));
  };

  const updateOffer = (id: string, offer: Omit<Offer, "id" | "createdAt">) => {
    setOffers(
      offers.map((o) =>
        o.id === id
          ? { ...o, ...offer }
          : o
      )
    );
  };

  return (
    <OffersContext.Provider value={{ offers, addOffer, deleteOffer, updateOffer }}>
      {children}
    </OffersContext.Provider>
  );
}

export function useOffers() {
  const context = useContext(OffersContext);
  if (!context) {
    throw new Error("useOffers must be used within OffersProvider");
  }
  return context;
}
