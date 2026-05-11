import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/utils/auth-store";
import { Colors, Spacing, Typography, Radii } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignupScreen() {
  const router = useRouter();
  const signup = useAuthStore((s) => s.signup);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    signup({
      fullName,
      email,
      password,
    });

    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
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
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              placeholderTextColor={Colors.textTertiary}
            />
          </View>
        </View>

        <Pressable style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
          <Feather name="arrow-right" size={16} color={Colors.textWhite} />
        </Pressable>

        <Pressable onPress={() => router.push("/login")}>
          <Text style={styles.footerText}>
            Already have an account? <Text style={styles.link}>Log In</Text>
          </Text>
        </Pressable>
      </ScrollView>
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

  logoText: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.navy,
  },

  content: {
    padding: 24,
    marginTop: 80,
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
  },

  button: {
    padding: 12,
    backgroundColor: "#1457D9",
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: Typography.lg,
    fontWeight: Typography.semibold,
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
