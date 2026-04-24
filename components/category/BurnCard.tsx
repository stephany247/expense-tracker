import { Colors, Radii, Typography } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

export const BurnCard = () => (
  <View style={styles.burnCard}>
    <View style={styles.rowBetween}>
      <Text style={styles.small}>MONTHLY BURN</Text>
      <Text style={styles.badge}>ON TRACK</Text>
    </View>

    <Text style={styles.bigAmount}>$4,280.00</Text>

    <View style={styles.progressBar}>
      <View style={[styles.progressFill, { width: "62%" }]} />
    </View>

    <View style={styles.rowBetween}>
      <Text style={styles.sub}>62% of $6,850 limit</Text>
      <Text style={styles.sub}>$2,570 left</Text>
    </View>
  </View>
);

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
    marginBottom: 20
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
    backgroundColor: Colors.success,
    color: Colors.textWhite,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radii.full,
    fontSize: Typography.xs,
  },
});
