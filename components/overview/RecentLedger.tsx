import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Radii, Spacing, Typography } from "@/constants/theme";
import { defaultCategories } from "@/constants/categories";
import { ComponentProps } from "react";
import { Transaction } from "@/utils/storage";
import { LedgerItem } from "./LedgerItem";
import { useRouter } from "expo-router";
import { IconName } from "./AllocationCard";

type Props = {
  transactions: Transaction[];
};

function RecentLedger({ transactions }: Props) {
  const router = useRouter();

  const categoryMap = Object.fromEntries(
    defaultCategories.map((c) => [c.name.toLowerCase(), c.icon]),
  );

  const getIcon = (name: string) =>
    categoryMap[name.toLowerCase()] || "wallet-outline";

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Ledger</Text>

        {transactions.length > 0 && (
          <Pressable onPress={() => router.navigate("/recent-ledgers")}>
            <Text style={styles.link}>VIEW ALL</Text>
          </Pressable>
        )}
      </View>

      {transactions.length === 0 ? (
        <View style={styles.cta}>
          <View style={styles.ctaIcon}>
            <Ionicons name="receipt-outline" size={28} color={Colors.navy} />
          </View>

          <Text style={styles.ctaTitle}>No transactions yet</Text>

          <Text style={styles.ctaSub}>
            Your recent income and expenses will appear here.
          </Text>
        </View>
      ) : (
        transactions
          .slice(0, 8)
          .map((item) => (
            <LedgerItem
              key={item.id}
              item={item}
              icon={getIcon(item.category) as IconName}
            />
          ))
      )}
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
  cta: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: Radii["2xl"],
    alignItems: "center",
    marginBottom: 20,
  },

  ctaIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#E5EDFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  ctaTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  ctaSub: {
    fontSize: 12,
    color: "#666",
  },

  button: {
    backgroundColor: Colors.navy,
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
    width: "100%",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
