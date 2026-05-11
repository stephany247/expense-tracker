
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@/utils/auth-store";
import { Colors } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UpdatePasswordScreen() {
  const user = useAuthStore((s) => s.user);
  const updatePassword = useAuthStore(
    (s) => s.updatePassword,
  );

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleUpdate = () => {
    if (currentPassword !== user?.password) {
      Alert.alert("Error", "Current password is wrong");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    updatePassword(newPassword);

    Alert.alert("Success", "Password updated");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons
            name="lock-closed-outline"
            size={34}
            color={Colors.navy}
          />
        </View>

        <Text style={styles.title}>Change Password</Text>

        <Text style={styles.subtitle}>
          Update your credentials to maintain account
          security.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>
            Current Password
          </Text>

          <TextInput
            placeholder="Enter current password"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
            style={styles.input}
          />

          <View style={styles.divider} />

          <Text style={styles.label}>New Password</Text>

          <TextInput
            placeholder="Enter new password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            style={styles.input}
          />

          <Text style={styles.label}>
            Confirm New Password
          </Text>

          <TextInput
            placeholder="Confirm new password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
          />

          <Pressable
            style={styles.button}
            onPress={handleUpdate}
          >
            <Text style={styles.buttonText}>
              Update Password
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },

  content: {
    padding: 24,
    marginTop: 40,
  },

  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 100,
    backgroundColor: "#DCE8FF",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 24,
  },

  title: {
    fontSize: 42,
    fontWeight: "700",
    textAlign: "center",
    color: "#0F172A",
    marginBottom: 12,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 28,
    color: "#555",
    marginBottom: 34,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#111827",
  },

  input: {
    height: 58,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    paddingHorizontal: 16,
    backgroundColor: "#F9FAFB",
    marginBottom: 22,
    fontSize: 16,
  },

  divider: {
    height: 1,
    backgroundColor: "#EAECF0",
    marginBottom: 22,
  },

  button: {
    height: 58,
    backgroundColor: "#1457D9",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});