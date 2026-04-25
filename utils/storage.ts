import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultCategories } from "@/constants/categories";

export type Transaction = {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
  note?: string;
  type: "expense" | "income";
};

export type Allocation = {
  id: number;
  amount: number;
  category: string;
  date: string;
  note?: string;
  timeframe: string;
  isRecurring: boolean;
  thresholdEnabled: boolean;
};

export type Category = {
  id: number;
  name: string;
  icon: string;
  budget?: number;
};

type AppState = {
  transactions: Transaction[];
  allocations: Allocation[];
  categories: Category[];

  init: () => Promise<void>;

  addTransaction: (t: Transaction) => Promise<void>;
  addAllocation: (a: Allocation) => Promise<void>;
  addCategory: (c: Category) => Promise<void>;
};

export const useAppStore = create<AppState>((set, get) => ({
  transactions: [],
  allocations: [],
  categories: [],

  // INIT (load from storage once)

  init: async () => {
    const t = await AsyncStorage.getItem("transactions");
    const a = await AsyncStorage.getItem("allocations");
    const c = await AsyncStorage.getItem("categories");

    let categories = c ? JSON.parse(c) : null;

    //  if empty
    if (!categories || categories.length === 0) {
      categories = defaultCategories;

      await AsyncStorage.setItem(
        "categories",
        JSON.stringify(defaultCategories),
      );
    }

    set({
      transactions: t ? JSON.parse(t) : [],
      allocations: a ? JSON.parse(a) : [],
      categories,
    });
    console.log("TRANSACTIONS RAW:", t);
    console.log("ALLOCATIONS RAW:", a);
    console.log("CATEGORIES RAW:", c);
  },

  // TRANSACTIONS
  addTransaction: async (transaction: Transaction) => {
    const updated = [transaction, ...get().transactions];

    set({ transactions: updated });
    await AsyncStorage.setItem("transactions", JSON.stringify(updated));
  },

  // ALLOCATIONS
  addAllocation: async (allocation: Allocation) => {
    const updated = [...get().allocations, allocation];

    set({ allocations: updated });
    await AsyncStorage.setItem("allocations", JSON.stringify(updated));
  },

  // CATEGORIES
  addCategory: async (category: Category) => {
    const exists = get().categories.some(
      (c) => c.name.toLowerCase() === category.name.toLowerCase(),
    );

    if (exists) return;

    const updated = [category, ...get().categories];

    set({ categories: updated });
    await AsyncStorage.setItem("categories", JSON.stringify(updated));
  },
}));
