import { Colors, Fonts, Radii, Typography } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  route?: string;
};

export const CTA = ({
  title = "New Allocation",
  subtitle = "Record a new Allocation",
  buttonText = "Quick Add",
  route = "/allocation-form",
}: Props) => {
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

      <Text style={styles.ctaTitle}>{title}</Text>
      <Text style={styles.ctaSub}>{subtitle}</Text>

      <Pressable
        style={styles.button}
        onPress={() => router.navigate(route as any)}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
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
    fontFamily: Fonts.manrope.bold,
    marginTop: 10,
  },

  ctaSub: {
    fontSize: Typography.base,
    fontFamily: Fonts.inter.bold,
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
    fontFamily: Fonts.manrope.bold,
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
