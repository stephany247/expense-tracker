import { Colors, Typography } from "@/constants/theme";
import { Pressable, StyleSheet, Text } from "react-native";

export const AddCategoryButton = () => (
  <Pressable style={styles.addBtn}>
    <Text style={styles.btnText}>+ Add New Category</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: Colors.navyMid,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginVertical: 16,
  },
  btnText: {
    fontWeight: Typography.medium,
    fontSize: Typography.xl,
    color: Colors.textWhite,
  },
});
