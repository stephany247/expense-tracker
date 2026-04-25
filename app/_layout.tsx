import { Colors } from "@/constants/theme";
import { useAppStore } from "@/utils/storage";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const init = useAppStore((s) => s.init);

  useEffect(() => {
    init();
    console.log("default Categories saved");
  }, []);

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
        <Stack.Screen
          name="add-category"
          options={{
            title: "New Category",
            headerBackButtonDisplayMode: "minimal",
            headerStyle: {
              backgroundColor: Colors.blueGhost,
            },
          }}
        />
        <Stack.Screen
          name="allocation-form"
          options={{
            title: "Allocation",
            headerBackButtonDisplayMode: "minimal",
            headerStyle: {
              backgroundColor: Colors.blueGhost,
            },
          }}
        />
        <Stack.Screen
          name="all-allocations"
          options={{
            title: "Allocation",
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
