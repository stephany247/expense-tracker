import { Colors, Radii, Typography } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const CTA = () => {
  const router = useRouter();

  return (
    <View style={styles.cta}>
      <View style={styles.cardIconBox}>
        <MaterialCommunityIcons
          name="credit-card-plus-outline"
          size={28}
          color={Colors.navy}
        />
      </View>
      <Text style={styles.ctaTitle}>New Allocation</Text>
      <Text style={styles.ctaSub}>Record a new Allocation</Text>

      <Pressable
        style={styles.button}
        onPress={() => router.navigate("/add-transaction")}
      >
        <Text style={styles.buttonText}>Quick Add</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cta: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 32,
  },

  ctaTitle: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    marginTop: 10,
  },

  ctaSub: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    marginBottom: 20,
  },

  cardIconBox: {
    padding: 20,
    backgroundColor: Colors.blueLight,
    borderRadius: Radii.xl,
    marginBottom: 16,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
  },

  button: {
    backgroundColor: Colors.navyMid,
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
});
