import { FlatList, StyleSheet, Text, View } from "react-native";

import { Colors, Spacing, Typography } from "@/constants/theme";

import { useAppStore } from "@/utils/storage";

import { normalizeCat } from "@/utils/format";
import { SafeAreaView } from "react-native-safe-area-context";
import { CategoryCard } from "@/components/category/CategoryCard";

export default function AllCategoriesScreen() {
  const { categories, allocations, transactions } = useAppStore();

  const data = categories.map((cat) => {
    const allocation = allocations.find(
      (a) => normalizeCat(a.category) === normalizeCat(cat.name),
    );

    const allocated = allocation?.amount || 0;

    const spent = transactions
      .filter(
        (t) =>
          normalizeCat(t.category) === normalizeCat(cat.name) &&
          t.type === "expense",
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const remaining = Math.max(allocated - spent, 0);

    const progress = allocated ? Math.min((spent / allocated) * 100, 100) : 0;

    const progressColor =
      progress >= 90 ? Colors.danger : progress >= 70 ? "#F59E0B" : Colors.navy;

    return {
      ...cat,
      allocated,
      spent,
      remaining,
      progress,
      progressColor,
    };
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CategoryCard item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueBg,
  },

  content: {
    padding: Spacing.xl,
    paddingBottom: 120,
  },

  header: {
    marginBottom: 28,
  },

  title: {
    fontSize: Typography["4xl"],
    fontWeight: Typography.bold,
    color: Colors.textBlack,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: Typography.base,
    color: Colors.textPrimary,
    lineHeight: 22,
  },
});
