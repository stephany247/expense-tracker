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
  timeframe: "daily" | "weekly" | "monthly";
  isRecurring: boolean;
  lastRun?: number;
  thresholdEnabled: boolean;
  threshold?: number;
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

const processRecurringAllocations = (
  allocations: Allocation[],
  transactions: Transaction[],
): Transaction[] => {
  const now = Date.now();

  const newTxs: Transaction[] = [];

  allocations.forEach((a) => {
    if (!a.isRecurring) return;

    const diff = now - (a.lastRun || a.id);

    const shouldRun =
      (a.timeframe === "daily" && diff >= 86400000) ||
      (a.timeframe === "weekly" && diff >= 604800000) ||
      (a.timeframe === "monthly" && diff >= 2628000000);

    if (!shouldRun) return;

    newTxs.push({
      id: Date.now(),
      name: a.category,
      amount: a.amount,
      category: a.category,
      date: new Date().toLocaleDateString(),
      type: "expense",
    });

    a.lastRun = now;
  });

  return [...newTxs, ...transactions];
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
    //manage recurring
    let parsedTx = t ? JSON.parse(t) : [];
    let parsedAlloc = a ? JSON.parse(a) : [];

    parsedTx = processRecurringAllocations(parsedAlloc, parsedTx);
    const updatedAlloc = parsedAlloc;

    set({
      transactions: parsedTx,
      allocations: updatedAlloc,
      categories,
    });
    console.log("TRANSACTIONS RAW:", t);
    console.log("ALLOCATIONS RAW:", a);
    console.log("CATEGORIES RAW:", c);

    await AsyncStorage.setItem("transactions", JSON.stringify(parsedTx));
    await AsyncStorage.setItem("allocations", JSON.stringify(updatedAlloc));
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
