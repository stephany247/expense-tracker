import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Radii, Spacing, Typography } from "@/constants/theme";
import { defaultCategories } from "@/constants/categories";
import { ComponentProps } from "react";
import { Transaction } from "@/utils/storage";
type IconName = ComponentProps<typeof Ionicons>["name"];

type Props = {
  transactions: Transaction[];
};

function RecentLedger({ transactions }: Props) {
  const categoryMap = Object.fromEntries(
    defaultCategories.map((c) => [c.name.toLowerCase(), c.icon]),
  );

  const getCategoryIcon = (name: string) =>
    categoryMap[name.toLowerCase()] || "wallet-outline";

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Ledger</Text>
        <Text style={styles.link}>VIEW ALL</Text>
      </View>

      {/* Items */}
      {transactions.map((item) => (
        <View key={item.id} style={styles.ledgerItem}>
          <View style={styles.iconBox}>
            <Ionicons
              name={getCategoryIcon(item.category) as IconName}
              size={18}
              color="#1A3A8F"
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.subtitle}>{item.category}</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text
              style={[
                styles.amount,
                item.type === "expense" ? styles.expense : styles.income,
              ]}
            >
              {item.type === "expense" ? "-" : "+"}${item.amount.toFixed(2)}
            </Text>
            <Text style={styles.subtitle}>{item.date}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

export default RecentLedger;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

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

  ledgerItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#edf0f2",
    padding: 14,
    borderRadius: Radii.xl,
    marginBottom: Spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
    gap: 8,
  },

  priceContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: 8,
  },

  itemTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textBlack,
  },

  subtitle: {
    fontSize: 11,
    color: Colors.textPrimary,
    marginTop: 2,
    textTransform: "uppercase",
  },

  amount: {
    fontSize: 14,
    fontWeight: "600",
  },

  expense: {
    color: Colors.danger,
  },

  income: {
    color: "#2E7D32",
  },
});
