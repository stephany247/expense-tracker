import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Colors, Radii, Typography } from "@/constants/theme";
import { useState } from "react";
import {
  Allocation,
  Category,
  Transaction,
  useAppStore,
} from "@/utils/storage";
import { AllocationItemCard } from "@/components/overview/AllocationItemCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function AllocationsScreen() {
  const { categories, allocations, transactions } = useAppStore();
  const router = useRouter();

  const [active, setActive] = useState("All");

  const data = categories.map((cat) => {
    const allocation = allocations.find(
      (a: Allocation) => a.category === cat.name,
    );

    const allocated = allocation?.amount || 0;

    const spent = transactions
      .filter((t: Transaction) => t.category === cat.name)
      .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

    const remaining = allocated - spent;

    return {
      ...cat,
      allocated,
      spent,
      remaining,
      progress: allocated ? spent / allocated : 0,
    };
  });

  const filtered =
    active === "All" ? data : data.filter((d) => d.name === active);

  return (
    <ScrollView style={styles.container}>
      {/* Tabs */}
      <ScrollView
        style={styles.tabList}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {["All", ...categories.map((c: Category) => c.name)].map((tab) => {
          const isActive = active === tab;

          return (
            <Text
              key={tab}
              onPress={() => setActive(tab)}
              style={[styles.tab, isActive && styles.activeTab]}
            >
              {tab}
            </Text>
          );
        })}
      </ScrollView>

      {/* Cards */}
      {filtered.map((item) => (
        <AllocationItemCard key={item.id} item={item} />
      ))}

      {/* CTA */}
      <View style={styles.cta}>
        <View style={styles.cardIconBox}>
          <MaterialCommunityIcons
            name="credit-card-plus-outline"
            size={28}
            color={Colors.navy}
          />
        </View>
        <Text style={styles.ctaTitle}>New Allocation</Text>
        <Text style={styles.ctaSub}>Record a new Allocation</Text>

        <Pressable
          style={styles.button}
          onPress={() => router.navigate("/allocation-form")}
        >
          <Text style={styles.buttonText}>Quick Add</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueBg,
    padding: 16,
  },

  tabList: {
    backgroundColor: Colors.surface,
    padding: 4,
    borderRadius: Radii.sm,
  },

  tab: {
    padding: 10,
    marginRight: 8,
    borderRadius: 10,
    backgroundColor: Colors.surfaceSecondary,
    fontWeight: Typography.medium,
  },

  activeTab: {
    backgroundColor: Colors.blueLight,
    color: Colors.navy,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 20,
    marginTop: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  progressBg: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    marginTop: 10,
  },

  progressFill: {
    height: 8,
    borderRadius: 4,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  cta: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 32,
  },

  ctaTitle: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    marginTop: 10,
  },

  ctaSub: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    marginBottom: 20,
  },

  cardIconBox: {
    padding: 20,
    backgroundColor: Colors.blueLight,
    borderRadius: Radii.xl,
    marginBottom: 16,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
  },

  button: {
    backgroundColor: Colors.navyMid,
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
});
