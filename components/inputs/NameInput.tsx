import { View, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Radii, Typography } from "@/constants/theme";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export const NameInput = ({ value, onChange }: Props) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>ADD TRANSACTION NAME</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#1A3A8F" />

        <TextInput
          placeholder="John Doe"
          placeholderTextColor={Colors.gray500}
          value={value}
          onChangeText={onChange}
          style={styles.input}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: Typography.semibold,
    color: Colors.textSecondary,
    marginBottom: 5,
  },
  inputContainer: {
    backgroundColor: Colors.inputBg,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Radii.sm,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 12,
  },
});
