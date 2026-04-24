import { Tabs } from "expo-router";
import React from "react";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors, Radii } from "@/constants/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useColorScheme } from "react-native";
import Header from "@/components/Header";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.blue,
        tabBarStyle: {
          backgroundColor: "#F4F6FF", // blueGhost
          borderTopWidth: 0,
          paddingTop: 8,
        },
        headerTitle: () => <Header />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Overview",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-grid" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="budgets"
        options={{
          title: "Budgets",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="wallet-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="auto-graph" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
