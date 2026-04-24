import { Colors, Radii, Spacing, Typography } from "@/constants/theme";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

function PortfolioCard() {
  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <Text style={styles.small}>LIQUID WEALTH PORTFOLIO</Text>
        <Text style={styles.badge}>+12.5%</Text>
      </View>
      <Text style={styles.balance}>$42,950.40</Text>
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
