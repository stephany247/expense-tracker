import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "transactions";

export const saveTransaction = async (transaction: any) => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = existing ? JSON.parse(existing) : [];

    const updated = [transaction, ...parsed];

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    throw error;
  }
};

export const getTransactions = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    throw error;
  }
};

//allocation store
export const saveAllocation = async (allocation: any) => {
  const existing = await AsyncStorage.getItem("allocations");
  const parsed = existing ? JSON.parse(existing) : [];

  parsed.push(allocation);

  await AsyncStorage.setItem("allocations", JSON.stringify(parsed));
};
