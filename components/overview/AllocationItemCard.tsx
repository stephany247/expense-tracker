import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Typography } from "@/constants/theme";
import { AllocationItem, IconName } from "./AllocationCard";

type Props = {
  item: AllocationItem;
};

export const AllocationItemCard = ({ item }: Props) => {
  const percent = Math.floor(item.progress * 100);

  const status =
    percent >= 90
      ? { label: "AT LIMIT", bg: Colors.dangerLight, text: Colors.danger }
      : percent < 60
        ? { label: "HEALTHY", bg: Colors.successLight, text: Colors.success }
        : { label: "ON TRACK", bg: Colors.gray300, text: Colors.gray800 };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <Ionicons name={item.icon as IconName} size={20} />
        </View>

        <View style={[styles.badge, { backgroundColor: status.bg }]}>
          <Text style={styles.badgeText}>{status.label}</Text>
        </View>
      </View>

      <Text style={styles.title}>{item.name}</Text>

      <View style={styles.textRow}>
        <Text style={styles.amount}>${item.spent} </Text>
        <Text style={styles.gray}>/ ${item.allocated}</Text>
      </View>

      <View style={styles.usage}>
        <Text style={styles.usageText}>USED {percent}%</Text>

        <Text
          style={[
            styles.usageText,
            {
              color: status.text,
            },
          ]}
        >
          {item.remaining < 0
            ? `-$${Math.abs(item.remaining)} LEFT`
            : `+$${item.remaining} LEFT`}
        </Text>
      </View>
      <View style={styles.progressBg}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${percent}%`,
              backgroundColor: status.text,
            },
          ]}
        />
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
    alignItems: "center",
    marginBottom: 12,
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
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "600",
  },

  title: {
    fontSize: Typography["2xl"],
    fontWeight: "600",
    marginTop: 10,
  },

  textRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  amount: {
    fontSize: Typography["4xl"],
    fontWeight: "700",
    marginTop: 4,
  },

  gray: {
    color: Colors.textPrimary,
    fontWeight: "300",
  },

  progressBg: {
    height: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    marginTop: 10,
  },

  progressFill: {
    height: 10,
    borderRadius: 4,
  },

  usage: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  usageText: {
    fontWeight: Typography.bold,
    fontSize: Typography.sm,
  },
});
