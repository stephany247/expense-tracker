import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Radii, Typography } from "@/constants/theme";
import { useAppStore } from "@/utils/storage";
import { defaultCategories } from "@/constants/categories";
import { ComponentProps } from "react";
import { LedgerItem } from "@/components/overview/LedgerItem";
import { CTA } from "@/components/overview/CTA";

type IconName = ComponentProps<typeof Ionicons>["name"];

export default function RecentLedgersScreen() {
  const transactions = useAppStore((s) => s.transactions);

  const categoryMap = Object.fromEntries(
    defaultCategories.map((c) => [c.name.toLowerCase(), c.icon]),
  );

  const getIcon = (name: string) =>
    categoryMap[name.toLowerCase()] || "wallet-outline";

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <LedgerItem item={item} icon={getIcon(item.category) as IconName} />
        )}
        ListFooterComponent={<CTA />}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
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
