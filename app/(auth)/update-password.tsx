import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@/utils/auth-store";
import { Colors, Typography } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/Button";
import { getPasswordStrength } from "@/utils/format";
import { router } from "expo-router";

export default function UpdatePasswordScreen() {
  const { user, updatePassword } = useAuthStore();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleUpdate = () => {
    if (!currentPassword.trim()) {
      Alert.alert("Missing Password", "Please enter your current password.");
      return;
    }

    if (currentPassword !== user?.password) {
      Alert.alert("Invalid Password", "Current password is incorrect.");
      return;
    }

    if (!newPassword.trim()) {
      Alert.alert("Missing Password", "Please enter a new password.");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

    updatePassword(newPassword);

    Alert.alert("Password Updated", "Your password was updated successfully.", [
      {
        text: "OK",
        onPress: () => router.back(),
      },
    ]);
  };

  const passwordStrength = getPasswordStrength(newPassword);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={20}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 40,
          padding: 24,
          marginTop: 20,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconCircle}>
          <Ionicons name="lock-closed-sharp" size={34} color={Colors.navy} />
        </View>

        <Text style={styles.title}>Change Password</Text>

        <Text style={styles.subtitle}>
          Update your credentials to maintain strict account security and data
          protection.
        </Text>

        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Password</Text>

            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Enter current password"
                secureTextEntry={!showCurrentPassword}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                style={styles.input}
                placeholderTextColor={Colors.textTertiary}
                cursorColor={Colors.navy}
              />

              <Pressable
                onPress={() => setShowCurrentPassword((prev) => !prev)}
              >
                <Ionicons
                  name={showCurrentPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color={Colors.textPrimary}
                />
              </Pressable>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.inputGroup}>
            <Text style={styles.label}>New Password</Text>

            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Enter new password"
                secureTextEntry={!showNewPassword}
                value={newPassword}
                onChangeText={setNewPassword}
                style={styles.input}
                placeholderTextColor={Colors.textTertiary}
                cursorColor={Colors.navy}
              />

              <Pressable onPress={() => setShowNewPassword((prev) => !prev)}>
                <Ionicons
                  name={showNewPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color={Colors.textPrimary}
                />
              </Pressable>
            </View>

            {/* strength bar */}
            <View style={styles.strengthWrapper}>
              <View style={styles.strengthTrack}>
                <View
                  style={[
                    styles.strengthFill,
                    {
                      width: passwordStrength.width,
                      backgroundColor: passwordStrength.color,
                    },
                  ]}
                />
              </View>

              <Text style={styles.strengthText}>
                Strength:{" "}
                <Text
                  style={{
                    color: passwordStrength.color,
                    fontWeight: "700",
                  }}
                >
                  {passwordStrength.label}
                </Text>
              </Text>
            </View>

            {/* requirements */}
            <View style={styles.requirementCard}>
              <Text style={styles.requirementTitle}>SECURITY REQUIREMENTS</Text>

              <View style={styles.requirementItem}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={18}
                  color="#1457D9"
                />

                <Text style={styles.requirementText}>
                  At least 8 characters long
                </Text>
              </View>

              <View style={styles.requirementItem}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={18}
                  color="#1457D9"
                />

                <Text style={styles.requirementText}>
                  Contains uppercase & lowercase
                </Text>
              </View>

              <View style={styles.requirementItem}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={18}
                  color="#1457D9"
                />

                <Text style={styles.requirementText}>
                  Contains numbers or symbols
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm New Password</Text>

            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Confirm new password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.input}
                placeholderTextColor={Colors.textTertiary}
                cursorColor={Colors.navy}
              />

              <Pressable
                onPress={() => setShowConfirmPassword((prev) => !prev)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color={Colors.textPrimary}
                />
              </Pressable>
            </View>
          </View>

          <Button title="Update Password" onPress={handleUpdate} icon={false} />

          <Pressable style={styles.cancelBtn} onPress={() => router.back()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FF",
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
    fontSize: Typography["5xl"],
    fontWeight: Typography.bold,
    textAlign: "center",
    color: Colors.textBlack,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: Typography.lg,
    textAlign: "center",
    color: Colors.textPrimary,
    marginBottom: 50,
    maxWidth: "90%",
    marginHorizontal: "auto",
  },

  inputGroup: {
    marginBottom: 24,
  },

  label: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
    marginBottom: 6,
    color: Colors.gray800,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F4F7",
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 18,
    paddingHorizontal: 16,
    gap: 12,
  },

  input: {
    flex: 1,
    fontSize: 18,
    color: Colors.textBlack,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 18,
    borderTopWidth: 4,
    borderTopColor: "#1457D9",
    marginBottom: 48,
  },

  divider: {
    height: 1,
    backgroundColor: "#EAECF0",
    marginBottom: 16,
  },

  strengthWrapper: {
    marginTop: 10,
  },

  strengthTrack: {
    height: 6,
    backgroundColor: "#DCE3F0",
    borderRadius: 100,
    overflow: "hidden",
    marginBottom: 8,
  },

  strengthFill: {
    height: "100%",
    borderRadius: 100,
  },

  strengthText: {
    fontSize: 14,
    color: Colors.textPrimary,
  },

  requirementCard: {
    backgroundColor: Colors.blueLight,
    borderRadius: 16,
    padding: 16,
    marginTop: 18,
  },

  requirementTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 14,
    letterSpacing: 1,
  },

  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },

  requirementText: {
    fontSize: 15,
    color: Colors.textPrimary,
    flex: 1,
  },

  cancelBtn: {
    marginTop: 10,
    padding: 14,
    borderRadius: 16,
    backgroundColor: Colors.blueLight,
    justifyContent: "center",
    alignItems: "center",
  },

  cancelText: {
    color: "#1457D9",
    fontSize: 17,
    fontWeight: "700",
  },
});
