import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";
import { AllocationItem, IconName } from "./AllocationCard";

type Props = {
  item: AllocationItem;
};

export const AllocationItemCard = ({ item }: Props) => {
  const percent = Math.floor(item.progress * 100);

  const status =
    percent >= 90
      ? { label: "AT LIMIT", color: "#FEE2E2" }
      : percent < 60
        ? { label: "HEALTHY", color: "#D1FAE5" }
        : { label: "ON TRACK", color: "#E5E7EB" };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <Ionicons name={item.icon as IconName} size={20} />
        </View>

        <View style={[styles.badge, { backgroundColor: status.color }]}>
          <Text style={styles.badgeText}>{status.label}</Text>
        </View>
      </View>

      <Text style={styles.title}>{item.name}</Text>

      <Text style={styles.amount}>
        ${item.spent} <Text style={styles.gray}>/ ${item.allocated}</Text>
      </Text>

      <View style={styles.progressBg}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${percent}%`,
              backgroundColor: percent >= 90 ? "#DC2626" : Colors.navy,
            },
          ]}
        />
      </View>

      <View style={styles.footer}>
        <Text>USED {percent}%</Text>

        <Text
          style={{
            color: item.remaining < 0 ? "#DC2626" : Colors.successBright,
          }}
        >
          {item.remaining < 0
            ? `-$${Math.abs(item.remaining)} LEFT`
            : `+$${item.remaining} LEFT`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 20,
    marginTop: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "600",
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },

  amount: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 4,
  },

  gray: {
    color: "#777",
  },

  progressBg: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    marginTop: 10,
  },

  progressFill: {
    height: 8,
    borderRadius: 4,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});
