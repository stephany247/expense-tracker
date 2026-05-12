import { Colors, Fonts, Radii, Typography } from "@/constants/theme";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <FontAwesome name="user-circle" size={32} color={Colors.navy} />
        <Text style={styles.title}>Sovereign Ledger</Text>
      </View>
      <Ionicons
        style={styles.headerIcon}
        name="notifications-outline"
        size={22}
      />
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  container: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  title: {
    fontSize: Typography.xl,
    fontFamily: Fonts.manrope.extrabold,
    color: Colors.navy,
  },
  headerIcon: {
    padding: 8,
    borderRadius: Radii.lg,
    backgroundColor: Colors.inputBg,
  },
});
