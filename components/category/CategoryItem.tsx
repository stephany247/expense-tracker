// components/CategoryItem.tsx
import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts, Typography } from "@/constants/theme";
import { ComponentProps } from "react";

type IconName = ComponentProps<typeof Ionicons>["name"];

type Props = {
  name: string;
  icon: IconName;
  isActive?: boolean;
  onPress: () => void;
  variant?: "scroll" | "grid";
};

export const CategoryItem = ({
  name,
  icon,
  isActive,
  onPress,
  variant,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.catItem,
        variant === "grid" ? styles.gridItem : styles.scrollItem,
        isActive && styles.activeCat,
      ]}
    >
      <Ionicons
        name={icon}
        size={28}
        color={isActive ? Colors.navy : Colors.textBlack}
      />

      <Text
        style={[
          styles.catText,

          isActive && {
            color: Colors.navy,
            fontFamily: Fonts.inter.bold,
          },
        ]}
      >
        {name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  catItem: {
    borderRadius: 16,
    backgroundColor: "#EDEFF5",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  scrollItem: {
    paddingVertical: 24,
    paddingHorizontal: 34,
    marginRight: 10,
  },

  gridItem: {
    width: "30%",
    paddingVertical: 20,
  },

  activeCat: {
    borderWidth: 1,
    borderColor: "#C7D7F5",
    backgroundColor: "#EEF2FF",
  },

  catText: {
    color: Colors.textBlack,
    fontFamily: Fonts.inter.medium,
  },
});
