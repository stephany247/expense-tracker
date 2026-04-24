import { defaultCategories } from "@/constants/categories";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "categories";

export const initCategories = async () => {
  const data = await AsyncStorage.getItem(KEY);

  if (!data) {
    await AsyncStorage.setItem(KEY, JSON.stringify(defaultCategories));
  }
};

export const saveCategory = async (category: any) => {
  const existing = await AsyncStorage.getItem(KEY);
  const parsed = existing ? JSON.parse(existing) : [];

  //no duplicatesz
  const exists = parsed.some(
    (c: any) => c.name.toLowerCase() === category.name.toLowerCase(),
  );

  if (exists) return;

  const updated = [category, ...parsed];
  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
};
export const getCategories = async () => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};
