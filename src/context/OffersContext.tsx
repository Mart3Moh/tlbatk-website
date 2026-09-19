import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "../lib/supabase";

export interface Offer {
  id: string;
  title: string;
  description: string;
  discountType: "percentage" | "fixed";
  discount?: number;
  fixedPrice?: number;
  code?: string;
  expiryDate: string;
  active: boolean;
  image?: string;
  createdAt: string;
}

interface OffersContextType {
  offers: Offer[];
  addOffer: (offer: Omit<Offer, "id" | "createdAt">) => Promise<void>;
  deleteOffer: (id: string) => Promise<void>;
  updateOffer: (id: string, offer: Omit<Offer, "id" | "createdAt">) => Promise<void>;
  loading: boolean;
}

const OffersContext = createContext<OffersContextType | undefined>(undefined);

// Transform Supabase data to Offer interface
const transformOffer = (data: any): Offer => ({
  id: data.id.toString(),
  title: data.title,
  description: data.description,
  discountType: data.discount_type,
  discount: data.discount,
  fixedPrice: data.fixed_price,
  code: data.code,
  expiryDate: data.expiry_date,
  active: data.active,
  image: data.image,
  createdAt: data.created_at,
});

export function OffersProvider({ children }: { children: ReactNode }) {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  // Load offers from Supabase on mount
  useEffect(() => {
    const loadOffers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("offers")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Failed to load offers:", error);
          return;
        }

        const transformedOffers = (data || []).map(transformOffer);
        setOffers(transformedOffers);
      } catch (e) {
        console.error("Error loading offers:", e);
      } finally {
        setLoading(false);
      }
    };

    loadOffers();

    // Subscribe to real-time updates
    const subscription = supabase
      .from("offers")
      .on("*", (payload) => {
        // Reload offers when any change happens
        loadOffers();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const addOffer = async (offer: Omit<Offer, "id" | "createdAt">) => {
    try {
      const { data, error } = await supabase
        .from("offers")
        .insert([
          {
            title: offer.title,
            description: offer.description,
            discount_type: offer.discountType,
            discount: offer.discount,
            fixed_price: offer.fixedPrice,
            code: offer.code,
            expiry_date: offer.expiryDate,
            active: offer.active,
            image: offer.image,
          },
        ])
        .select();

      if (error) {
        console.error("Failed to add offer:", error);
        throw error;
      }

      const newOffer = transformOffer(data[0]);
      setOffers([newOffer, ...offers]);
    } catch (e) {
      console.error("Error adding offer:", e);
      throw e;
    }
  };

  const deleteOffer = async (id: string) => {
    try {
      const { error } = await supabase
        .from("offers")
        .delete()
        .eq("id", parseInt(id));

      if (error) {
        console.error("Failed to delete offer:", error);
        throw error;
      }

      setOffers(offers.filter((o) => o.id !== id));
    } catch (e) {
      console.error("Error deleting offer:", e);
      throw e;
    }
  };

  const updateOffer = async (id: string, offer: Omit<Offer, "id" | "createdAt">) => {
    try {
      const { data, error } = await supabase
        .from("offers")
        .update({
          title: offer.title,
          description: offer.description,
          discount_type: offer.discountType,
          discount: offer.discount,
          fixed_price: offer.fixedPrice,
          code: offer.code,
          expiry_date: offer.expiryDate,
          active: offer.active,
          image: offer.image,
        })
        .eq("id", parseInt(id))
        .select();

      if (error) {
        console.error("Failed to update offer:", error);
        throw error;
      }

      const updatedOffer = transformOffer(data[0]);
      setOffers(offers.map((o) => (o.id === id ? updatedOffer : o)));
    } catch (e) {
      console.error("Error updating offer:", e);
      throw e;
    }
  };

  return (
    <OffersContext.Provider value={{ offers, addOffer, deleteOffer, updateOffer, loading }}>
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
