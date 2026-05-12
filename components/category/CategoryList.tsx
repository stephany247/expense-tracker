import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";

import { useRouter } from "expo-router";

import { Colors, Fonts, Typography } from "@/constants/theme";

import { useAppStore } from "@/utils/storage";

import { normalizeCat } from "@/utils/format";
import { CategoryCard } from "./CategoryCard";

export const CategoryList = () => {
  const router = useRouter();

  const { categories, allocations, transactions } = useAppStore();

  const data = categories
    .map((cat) => {
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
        progress >= 90
          ? Colors.danger
          : progress >= 70
            ? "#F59E0B"
            : Colors.navy;

      return {
        ...cat,
        allocated,
        spent,
        remaining,
        progress,
        progressColor,
      };
    })
    .sort((a, b) => b.spent - a.spent)
    .slice(0, 8);

  return (
    <View>
      <View style={styles.rowBetween}>
        <Text style={styles.sectionTitle}>Categories</Text>

        <Pressable onPress={() => router.push("/all-categories")}>
          <Text style={styles.link}>VIEW ALL</Text>
        </Pressable>
      </View>

      {data.map((item) => (
        <CategoryCard key={item.id} item={item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  sectionTitle: {
    fontFamily: Fonts.manrope.bold,
    fontSize: Typography.lg,
    color: Colors.textBlack,
  },

  link: {
    color: Colors.navy,
    fontSize: Typography.xs,
    fontFamily: Fonts.inter.bold,
  },
});
