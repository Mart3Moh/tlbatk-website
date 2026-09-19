import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Offer {
  id: string;
  title: string;
  description: string;
  discountType: "percentage" | "fixed"; // percentage (%) or fixed amount
  discount?: number; // percentage (0-100)
  fixedPrice?: number; // fixed amount in SAR
  code?: string;
  expiryDate: string; // YYYY-MM-DD
  active: boolean;
  image?: string; // base64 encoded image
  createdAt: string;
}

interface OffersContextType {
  offers: Offer[];
  addOffer: (offer: Omit<Offer, "id" | "createdAt">) => void;
  deleteOffer: (id: string) => void;
  updateOffer: (id: string, offer: Omit<Offer, "id" | "createdAt">) => void;
}

const OffersContext = createContext<OffersContextType | undefined>(undefined);

const DB_NAME = "tlbatk_db";
const STORE_NAME = "offers";
const STORAGE_KEY = "tlbatk_offers"; // Legacy localStorage key

// Initialize IndexedDB
const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
};

// Migrate data from localStorage to IndexedDB
const migrateFromLocalStorage = async (): Promise<void> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const offers = JSON.parse(stored);
      const db = await initDB();

      for (const offer of offers) {
        await new Promise<void>((resolve, reject) => {
          const transaction = db.transaction(STORE_NAME, "readwrite");
          const store = transaction.objectStore(STORE_NAME);
          const request = store.put(offer);

          request.onerror = () => reject(request.error);
          request.onsuccess = () => resolve();
        });
      }

      // Clear localStorage after migration
      localStorage.removeItem(STORAGE_KEY);
      console.log(`Migrated ${offers.length} offers to IndexedDB`);
    }
  } catch (e) {
    console.error("Migration failed:", e);
  }
};

// Load all offers from IndexedDB
const loadOffers = async (): Promise<Offer[]> => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve((request.result as Offer[]) || []);
    });
  } catch (e) {
    console.error("Failed to load offers:", e);
    return [];
  }
};

// Save offer to IndexedDB
const saveOffer = async (offer: Offer): Promise<void> => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(offer);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  } catch (e) {
    console.error("Failed to save offer:", e);
  }
};

// Delete offer from IndexedDB
const deleteOfferFromDB = async (id: string): Promise<void> => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  } catch (e) {
    console.error("Failed to delete offer:", e);
  }
};

export function OffersProvider({ children }: { children: ReactNode }) {
  const [offers, setOffers] = useState<Offer[]>([]);

  // Load from IndexedDB on mount (with migration from localStorage)
  useEffect(() => {
    const loadData = async () => {
      // First, try to migrate old data from localStorage
      await migrateFromLocalStorage();
      // Then load from IndexedDB
      const loadedOffers = await loadOffers();
      setOffers(loadedOffers);
    };
    loadData();
  }, []);

  // Save to IndexedDB whenever offers change
  useEffect(() => {
    offers.forEach((offer) => saveOffer(offer));
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
    deleteOfferFromDB(id);
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
