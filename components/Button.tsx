import { Pressable, StyleSheet, Text, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors, Radii, Typography } from "@/constants/theme";

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: boolean;
};

export function Button({
  title,
  onPress,
  loading = false,
  disabled = false,
  icon = true,
}: Props) {
  return (
    <Pressable
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={Colors.textWhite} />
      ) : (
        <>
          <Text style={styles.buttonText}>{title}</Text>

          {icon && (
            <Feather name="arrow-right" size={16} color={Colors.textWhite} />
          )}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    backgroundColor: Colors.blue,
    borderRadius: Radii.xl,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },

  disabledButton: {
    opacity: 0.6,
  },

  buttonText: {
    color: Colors.textWhite,
    fontSize: Typography.md,
    fontWeight: Typography.bold,
  },
});
