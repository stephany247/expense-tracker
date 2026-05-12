import { View, Text, TextInput, StyleSheet } from "react-native";
import { Colors, Radii, Typography } from "@/constants/theme";

type Props = {
  value: string;
  onChange: (val: string) => void;
  onBlur?: () => void;
};

export const AmountInput = ({ value, onChange, onBlur }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>AMOUNT</Text>

      <View style={{ position: "relative" }}>
        <Text style={styles.dollar}>$</Text>

        <TextInput
          placeholder="0.00"
          placeholderTextColor={Colors.navy}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          style={styles.input}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>USD</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: Radii["2xl"],
    marginBottom: 20,
  },
  label: { fontSize: 12, color: "#888" },
  dollar: {
    position: "absolute",
    left: 4,
    bottom: 12,
    fontSize: Typography["6xl"],
    color: Colors.textTertiary,
  },
  input: {
    paddingTop: 12,
    paddingLeft: 30,
    fontSize: 72,
    fontWeight: Typography.bold,
    color: Colors.navy,
  },
  badge: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: Colors.navy,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopRightRadius: Radii["2xl"],
    borderBottomLeftRadius: Radii["2xl"],
  },
  badgeText: { color: "#fff" },
});
