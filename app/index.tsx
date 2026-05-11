import { Redirect } from "expo-router";
import { useAuthStore } from "@/utils/auth-store";

export default function Index() {
  const isLoggedIn = useAuthStore(
    (s) => s.isLoggedIn,
  );

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/login" />;
}