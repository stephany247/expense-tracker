import { Colors, Spacing, Typography } from "@/constants/theme";
import { useAppStore } from "@/utils/storage";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AllocationCard } from "./AllocationCard";
import { normalizeCat } from "@/utils/format";

function Allocations() {
  const router = useRouter();
  const { categories, allocations, transactions } = useAppStore();

  const data = categories.map((cat) => {
    const allocation = allocations.find(
      (a) => normalizeCat(a.category) === normalizeCat(cat.name),
    );

    const allocated = allocation?.amount || 0;

    const spent = transactions
      .filter((t) => t.category === cat.name)
      .reduce((sum, t) => sum + t.amount, 0);

    const remaining = Math.max(allocated - spent, 0);

    return {
      ...cat,
      allocated,
      spent,
      remaining,
      progress: allocated ? spent / allocated : 0,
    };
  });
  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Allocations</Text>
        <Pressable onPress={() => router.navigate("/allocation-form")}>
          <Text style={styles.link}>VIEW ALL</Text>
        </Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item) => (
          <AllocationCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}

export default Allocations;

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },

  sectionTitle: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    color: Colors.textBlack,
  },

  link: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.navy,
  },
});
