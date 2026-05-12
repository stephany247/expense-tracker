import "react-native-worklets-core";
import { Colors, Fonts } from "@/constants/theme";
import { useAppStore } from "@/utils/storage";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useFonts } from "expo-font";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";

export default function RootLayout() {
  const init = useAppStore((s) => s.init);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,

    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  useEffect(() => {
    init();
    console.log("default Categories saved");
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />

      <Stack
        screenOptions={{
          headerBackButtonDisplayMode: "minimal",
          headerStyle: {
            backgroundColor: Colors.blueGhost,
          },
          headerTitleStyle: {
            color: Colors.navy,
            fontFamily: Fonts.inter.bold,
            fontSize: 18,
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
            title: "New Allocation",
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
