import { Colors, Fonts, Typography } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export const AddCategoryButton = () => {
  const router = useRouter();

  return (
    <Pressable
      style={styles.addBtn}
      onPress={() => {
        router.push({
          pathname: "/add-category",
        });
      }}
    >
      <Ionicons name="add-outline" size={24} color={Colors.textWhite} />

      <Text style={styles.btnText}>Add New Category</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: Colors.navyMid,
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginVertical: 16,
  },
  btnText: {
    fontFamily: Fonts.manrope.bold,
    fontSize: Typography.xl,
    color: Colors.textWhite,
  },
});
