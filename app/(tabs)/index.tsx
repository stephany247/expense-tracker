import { Text, StyleSheet, Pressable, View, ScrollView } from "react-native";
import { Colors } from "@/constants/theme";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { useAppStore } from "@/utils/storage";
import PortfolioCard from "@/components/overview/PortfolioCard";
import Allocations from "@/components/overview/Allocations";
import RecentLedger from "@/components/overview/RecentLedger";
import Fab from "@/components/overview/Fab";

export default function HomeScreen() {
  const router = useRouter();
  const { transactions } = useAppStore();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PortfolioCard />
        <Allocations />
        <RecentLedger transactions={transactions} />
      </ScrollView>

      <Fab />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueBg,
    padding: 16,
  },
});
