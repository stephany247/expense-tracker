import { Colors, Typography } from "@/constants/theme";
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
      <Text style={styles.btnText}>+ Add New Category</Text>
    </Pressable>
  );
};

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
