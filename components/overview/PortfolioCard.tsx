import { Colors, Radii, Spacing, Typography } from "@/constants/theme";
import { formatCurrency } from "@/utils/format";
import { useAppStore } from "@/utils/storage";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

function PortfolioCard() {
  const { transactions } = useAppStore();

  const balance = transactions.reduce((sum, t) => {
    return t.type === "income" ? sum + t.amount : sum - t.amount;
  }, 0);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const change = income ? ((income - expense) / income) * 100 : 0;

  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <Text style={styles.small}>LIQUID WEALTH PORTFOLIO</Text>
        <Text
          style={[styles.badge, { color: change >= 0 ? "#16A34A" : "#DC2626" }]}
        >
          {change >= 0 ? "+" : ""}
          {change.toFixed(1)}%
        </Text>
      </View>
      <Text style={styles.balance}>{formatCurrency(balance)}</Text>
      <Text style={styles.sub}>Market valuation as of today</Text>

      <View style={styles.row}>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>DEPOSIT</Text>
        </Pressable>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>WITHDRAW</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default PortfolioCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0D47A1",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  small: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: Colors.textWhite,
  },

  badge: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: Colors.successBright,
    backgroundColor: "rgba(78, 222, 163, 0.2)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: Radii.full,
  },

  balance: {
    fontSize: Typography["5xl"],
    color: Colors.textWhite,
    fontWeight: Typography.extrabold,
    marginTop: 12,
  },

  sub: {
    color: Colors.textTertiary,
    fontStyle: "italic",
    marginTop: 2,
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    gap: Spacing.md,
    marginTop: 15,
  },

  btn: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 12,
    borderRadius: Radii.lg,
    alignItems: "center",
  },
  btnText: {
    fontSize: Typography.xl,
    color: Colors.textWhite,
    fontWeight: Typography.bold,
  },
});
