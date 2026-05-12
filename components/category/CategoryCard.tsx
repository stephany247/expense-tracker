/// components/CategoryCard.tsx

import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Colors, Radii, Typography } from "@/constants/theme";

import { formatCurrency } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import { IconName } from "../overview/AllocationCard";

type Props = {
  item: {
    id: number;
    name: string;
    icon: string;
    allocated: number;
    spent: number;
    remaining: number;
    progress: number;
    progressColor: string;
  };
};

export function CategoryCard({ item }: Props) {
  return (
    <View style={styles.categoryCard}>
      <View style={styles.iconBox}>
        <Ionicons name={item.icon as IconName} size={18} color={Colors.navy} />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>

      <View style={styles.progressBarLight}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${item.progress}%`,
              backgroundColor: item.progressColor,
            },
          ]}
        />
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.amount}>{formatCurrency(item.spent)}</Text>

        <Text
          style={[
            styles.leftText,
            {
              color: item.progressColor,
            },
          ]}
        >
          {formatCurrency(item.remaining)} LEFT
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryCard: {
    backgroundColor: Colors.blueLight,
    padding: 16,
    borderRadius: Radii.xl,
    marginBottom: 12,
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

  categoryName: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
    color: Colors.textBlack,
  },

  progressBarLight: {
    height: 6,
    backgroundColor: Colors.gray300,
    borderRadius: Radii.full,
    marginVertical: 10,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: Radii.full,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  amount: {
    fontWeight: Typography.bold,
    fontSize: Typography.xl,
    color: Colors.navy,
  },

  leftText: {
    fontWeight: Typography.semibold,
    fontSize: Typography.base,
  },
});
