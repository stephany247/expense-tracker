import { Colors } from "@/constants/theme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="add-transaction"
          options={{
            title: "Add Transaction",
            headerBackButtonDisplayMode: "minimal",
            headerStyle: {
              backgroundColor: Colors.blueGhost,
            },
          }}
        />
      </Stack>
    </>
  );
}
