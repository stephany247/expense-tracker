import { Colors, Radii } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";

export type IconName = ComponentProps<typeof Ionicons>["name"];

export type AllocationItem = {
  id: number;
  name: string;
  icon: string;
  allocated: number;
  spent: number;
  remaining: number;
  progress: number;
};

type Props = {
  item: AllocationItem;
};

export const AllocationCard = ({ item }: Props) => {
  const isOver = item.remaining < 0;

  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name={item.icon as IconName} size={18} color={Colors.navy} />
      </View>

      <Text style={styles.name}>{item.name}</Text>

      <Text style={styles.amount}>${item.allocated}</Text>

      {/* progress */}
      <View style={styles.bar}>
        <View
          style={[
            styles.fill,
            {
              width: `${Math.min(item.progress * 100, 100)}%`,
              backgroundColor: isOver ? Colors.danger : Colors.navy,
            },
          ]}
        />
      </View>

      <Text style={[styles.left, isOver && { color: Colors.danger }]}>
        {isOver
          ? `$${Math.floor(Math.abs(item.remaining))} LEFT`
          : `$${Math.floor(item.remaining)} LEFT`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    backgroundColor: Colors.blueLight,
    padding: 12,
    borderRadius: 16,
    marginRight: 12,
  },

  iconBox: {
    width: 32,
    height: 32,
    borderRadius: Radii.full,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },

  name: {
    fontSize: 12,
    color: Colors.textSecondary,
  },

  amount: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.navy,
    marginVertical: 4,
  },

  bar: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    marginTop: 4,
  },

  fill: {
    height: 6,
    borderRadius: 3,
  },

  left: {
    fontSize: 10,
    marginTop: 4,
    color: Colors.textSecondary,
  },
});
