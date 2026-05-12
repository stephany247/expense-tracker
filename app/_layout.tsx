import "react-native-worklets-core";
import { Colors } from "@/constants/theme";
import { useAppStore } from "@/utils/storage";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

export default function RootLayout() {
  const init = useAppStore((s) => s.init);

  useEffect(() => {
    init();
    console.log("default Categories saved");
  }, []);

  return (
    <>
      <StatusBar style="auto" />

      <Stack
        screenOptions={{
          headerBackButtonDisplayMode: "minimal",
          headerStyle: {
            backgroundColor: Colors.blueGhost,
          },
          headerTitleStyle: {
            color: Colors.navy,
          },
          headerTintColor: Colors.navy,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="(auth)" options={{ headerShown: false }} />

        <Stack.Screen
          name="add-transaction"
          options={{
            title: "Add Transaction",
          }}
        />

        <Stack.Screen
          name="add-category"
          options={{
            title: "New Category",
          }}
        />

        <Stack.Screen
          name="allocation-form"
          options={{
            title: "Allocation",
          }}
        />

        <Stack.Screen
          name="all-allocations"
          options={{
            title: "Allocation",
          }}
        />

        <Stack.Screen
          name="recent-ledgers"
          options={{
            title: "Recent Ledgers",
          }}
        />

        <Stack.Screen
          name="all-categories"
          options={{
            title: "Categories",
          }}
        />
      </Stack>
    </>
  );
}
