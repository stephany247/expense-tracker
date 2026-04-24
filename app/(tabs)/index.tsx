import { Text, StyleSheet, Pressable, View, ScrollView } from "react-native";
import { Colors } from "@/constants/theme";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { getTransactions } from "@/utils/storage";
import PortfolioCard from "@/components/PortfolioCard";
import Allocations from "@/components/Allocations";
import RecentLedger from "@/components/RecentLedger";
import Fab from "@/components/Fab";

type Transaction = {
  id: number;
  name: string;
  date: string;
  category: string;
  amount: number;
  note: string;
  type: "expense" | "income";
};

export default function HomeScreen() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const data = await getTransactions();
        setTransactions(data);
      };
      load();
    }, []),
  );

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
