import { Colors, Radii, Typography } from "@/constants/theme";
import { formatCurrency } from "@/utils/format";
import { useAppStore } from "@/utils/storage";
import { StyleSheet, Text, View } from "react-native";

export const BurnCard = () => {
  const { transactions, allocations } = useAppStore();

  const monthlyExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const allocationLimit = allocations.reduce(
    (sum, a) => sum + a.amount,
    0,
  );

  const progress = allocationLimit
    ? Math.min(
        (monthlyExpenses / allocationLimit) * 100,
        100,
      )
    : 0;

  const remaining = Math.max(
    allocationLimit - monthlyExpenses,
    0,
  );

  const status =
    progress < 70
      ? "ON TRACK"
      : progress < 90
        ? "CAUTION"
        : "HIGH";

  const statusColor =
    progress < 70
      ? Colors.success
      : progress < 90
        ? "#F59E0B"
        : Colors.danger;

  return (
    <View style={styles.burnCard}>
      <View style={styles.rowBetween}>
        <Text style={styles.small}>
          MONTHLY BURN
        </Text>

        <Text
          style={[
            styles.badge,
            {
              backgroundColor: statusColor,
            },
          ]}
        >
          {status}
        </Text>
      </View>

      <Text style={styles.bigAmount}>
        {formatCurrency(monthlyExpenses)}
      </Text>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progress}%`,
            },
          ]}
        />
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.sub}>
          {progress.toFixed(0)}% of{" "}
          {formatCurrency(allocationLimit)} limit
        </Text>

        <Text style={styles.sub}>
          {formatCurrency(remaining)} left
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  burnCard: {
    backgroundColor: Colors.navy,
    borderRadius: Radii["2xl"],
    padding: 20,
    marginBottom: 16,
  },

  bigAmount: {
    fontSize: Typography["5xl"],
    color: Colors.textWhite,
    fontWeight: Typography.extrabold,
    marginBottom: 12,
  },

  progressBar: {
    height: 10,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sub: {
    fontSize: 12,
    color: Colors.textTertiary,
  },

  small: {
    color: Colors.textTertiary,
    fontSize: Typography.sm,
  },

  badge: {
    color: Colors.textWhite,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radii.full,
    fontSize: Typography.xs,
    overflow: "hidden",
  },
});