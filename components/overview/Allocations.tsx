import { Colors, Spacing, Typography } from "@/constants/theme";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

function Allocations() {
  const router = useRouter();
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>ALLOCATIONS</Text>
      <Pressable onPress={() => router.navigate("/allocation-form")}>
        <Text style={styles.link}>VIEW ALL</Text>
      </Pressable>
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
