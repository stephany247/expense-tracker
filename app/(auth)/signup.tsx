import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/utils/auth-store";
import { Colors, Spacing, Typography, Radii } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/Button";

export default function SignupScreen() {
  const router = useRouter();
  const signup = useAuthStore((s) => s.signup);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    if (!fullName.trim()) {
      Alert.alert("Missing Name", "Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Missing Email", "Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email.");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Missing Password", "Please enter a password.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters.");
      return;
    }

    signup({
      fullName,
      email,
      password,
    });

    Alert.alert(
      "Account Created",
      "Your account has been created successfully.",
    );

    router.push("/(auth)/identity-verification");
  };
  return (
    <SafeAreaView style={styles.container}>
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
            marginTop: 60,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Create an Account</Text>

          <Text style={styles.subtitle}>Secure your financial data today.</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="person-outline"
                size={20}
                color={Colors.textPrimary}
              />

              <TextInput
                placeholder="John Doe"
                value={fullName}
                onChangeText={setFullName}
                style={styles.input}
                placeholderTextColor={Colors.textTertiary}
                cursorColor={Colors.navy}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={Colors.textPrimary}
              />

              <TextInput
                placeholder="john@company.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholderTextColor={Colors.textTertiary}
                cursorColor={Colors.navy}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={Colors.textPrimary}
              />

              <TextInput
                placeholder="••••••••"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                placeholderTextColor={Colors.textTertiary}
                cursorColor={Colors.navy}
              />

              <Pressable onPress={() => setShowPassword((prev) => !prev)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={Colors.textPrimary}
                />
              </Pressable>
            </View>
          </View>

          <Button title="Sign Up" onPress={handleSignup} />

          <Pressable onPress={() => router.push("/login")}>
            <Text style={styles.footerText}>
              Already have an account? <Text style={styles.link}>Log In</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueBg,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 24,
    paddingVertical: 18,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: Typography["5xl"],
    fontWeight: Typography.bold,
    textAlign: "center",
    color: "#0F172A",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: Typography.lg,
    textAlign: "center",
    color: Colors.textPrimary,
    marginBottom: 50,
  },

  inputGroup: {
    marginBottom: 28,
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
    height: 50,
    gap: 12,
  },

  input: {
    flex: 1,
    fontSize: 18,
    color: Colors.textBlack,
  },

  footerText: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 16,
    color: "#555",
  },

  link: {
    color: "#1457D9",
    fontWeight: "700",
  },
});
