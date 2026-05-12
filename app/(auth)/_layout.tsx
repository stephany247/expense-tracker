import { Colors } from "@/constants/theme";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="update-password"
        options={{
          headerShown: true,
          title: "Change Password",
          headerShadowVisible: false,
          headerTitleStyle: {
            fontWeight: "700",
            color: Colors.navy,
          },
          headerTintColor: Colors.navy,
          headerStyle: {
            backgroundColor: Colors.blueGhost,
          },
        }}
      />
    </Stack>
  );
}
