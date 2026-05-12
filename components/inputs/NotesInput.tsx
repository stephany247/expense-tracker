import { View, Text, TextInput, StyleSheet } from "react-native";
import { Colors, Fonts, Radii, Typography } from "@/constants/theme";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export const NotesInput = ({ value, onChange }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={[styles.label, { paddingLeft: 8 }]}>NOTES</Text>
      <TextInput
        placeholder="What was this for?"
        placeholderTextColor={Colors.gray500}
        value={value}
        onChangeText={onChange}
        style={[styles.input, { height: 100 }]}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    paddingVertical: 20,
    borderRadius: Radii["2xl"],
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontFamily: Fonts.inter.semibold,
    color: Colors.textSecondary,
    marginBottom: 5,
  },
  input: {
    backgroundColor: Colors.inputBg,
    borderRadius: 8,
    padding: 12,
    height: 100,
    textAlignVertical: "top",
    fontFamily: Fonts.inter.medium,
  },
});
