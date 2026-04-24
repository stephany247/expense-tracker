import { Colors, Spacing, Typography } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

function Allocations() {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>ALLOCATIONS</Text>
      <Text style={styles.link}>VIEW ALL</Text>
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
