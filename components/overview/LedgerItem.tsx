import { Colors, Radii } from "@/constants/theme";
import { Transaction } from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { IconName } from "./AllocationCard";
import { formatTime } from "@/utils/format";

type LedgerItemProps = {
  item: Transaction;
  icon: IconName;
};

export const LedgerItem = ({ item, icon }: LedgerItemProps) => {
  const isExpense = item.type === "expense";

  return (
    <View style={styles.ledgerItem}>
      {/* Icon */}
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={18} color={Colors.navy} />
      </View>

      {/* Left text */}
      <View style={styles.textContainer}>
        <Text style={styles.itemTitle}>{item.name}</Text>

        <Text style={styles.subtitle}>
          {item.category} • {formatTime(item.id)}
        </Text>
      </View>

      {/* Right side */}
      <View style={styles.priceContainer}>
        <Text
          style={[
            styles.amount,
            item.type === "expense" ? styles.expense : styles.income,
          ]}
        >
          {item.type === "expense" ? "-" : "+"}${item.amount.toFixed(2)}
        </Text>
        <Text style={styles.subtitle}>{item.date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ledgerItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.blueLight,
    padding: 14,
    borderRadius: Radii.xl,
    marginBottom: 14,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },

  itemTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.textBlack,
  },

  subtitle: {
    fontSize: 11,
    color: Colors.textPrimary,
    marginTop: 4,
    textTransform: "uppercase",
  },

  priceContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 4,
  },

  amount: {
    fontSize: 15,
    fontWeight: "600",
  },

  expense: {
    color: Colors.danger,
  },

  income: {
    color: Colors.success,
  },
});
