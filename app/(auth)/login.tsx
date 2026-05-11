
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/utils/auth-store";
import { Colors } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const success = login(email, password);

    if (!success) {
      Alert.alert("Error", "Invalid credentials");
      return;
    }

    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>

        <Text style={styles.subtitle}>
          Login to continue managing your finances.
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>

          <View style={styles.inputWrapper}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#8A8A8A"
            />

            <TextInput
              placeholder="john@company.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>

          <View style={styles.inputWrapper}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#8A8A8A"
            />

            <TextInput
              placeholder="••••••••"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
          </View>
        </View>

        <Pressable
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Log In →</Text>
        </Pressable>

        <Pressable onPress={() => router.push("/signup")}>
          <Text style={styles.footerText}>
            Don’t have an account?{" "}
            <Text style={styles.link}>Sign Up</Text>
          </Text>
        </Pressable>
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
    marginTop: 140,
  },

  title: {
    fontSize: 42,
    fontWeight: "700",
    textAlign: "center",
    color: "#0F172A",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#5B5B5B",
    marginBottom: 50,
  },

  inputGroup: {
    marginBottom: 28,
  },

  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#1F2937",
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F4F7",
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 64,
    gap: 12,
  },

  input: {
    flex: 1,
    fontSize: 18,
  },

  button: {
    height: 62,
    backgroundColor: "#1457D9",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
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