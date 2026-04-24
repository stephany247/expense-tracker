import { Colors, Radii, Typography } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export const VelocityCard = () => (
  <View style={styles.card}>
    <View style={styles.rowBetween}>
      <Text style={styles.cardTitle}>Spending Velocity</Text>
      <Text style={styles.badge}>↘ 12.4%</Text>
    </View>

    <Text style={styles.sub}>Trend relative to baseline</Text>

    {/* fake bars */}
    <View style={styles.chartRow}>
      {[40, 70, 50, 30, 80, 75, 78].map((h, i) => (
        <View key={i} style={styles.barContainer}>
          <View style={[styles.bar, { height: h }]} />
          <Text style={styles.dayText}>{days[i]}</Text>
        </View>
      ))}
    </View>

    <View style={styles.budgetBox}>
      <Text style={styles.budgetText}>Budget Remaining</Text>
      <Text style={styles.green}>$1,240.00</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.blueLight,
    borderRadius: Radii["2xl"],
    padding: 16,
    marginBottom: 16,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardTitle: {
    fontSize: Typography["2xl"],
    fontWeight: Typography.bold,
  },

  badge: {
    backgroundColor: Colors.gray300,
    color: Colors.textBlack,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radii.full,
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
  },

  sub: {
    fontSize: Typography.lg,
    fontWeight: Typography.medium,
  },

  chartRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    marginVertical: 32,
    marginHorizontal: "auto",
  },

  bar: {
    width: 30,
    backgroundColor: "#AAB6D6",
    borderRadius: 6,
  },

  barContainer: {
    alignItems: "center",
    gap: 6,
  },

  dayText: {
    fontSize: 10,
    color: "#8A94A6",
    marginTop: 4,
  },

  budgetBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.surface,
    padding: 12,
    borderRadius: Radii.xl,
  },

  budgetText: {
    fontSize: Typography.lg,
    fontWeight: Typography.medium,
  },

  green: {
    color: Colors.success,
    fontWeight: Typography.bold,
    fontSize: Typography["2xl"],
  },
});
