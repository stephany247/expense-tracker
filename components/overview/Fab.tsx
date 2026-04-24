import { Radii } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

function Fab() {
  const router = useRouter();

  return (
    <Pressable
      style={styles.fab}
      onPress={() => router.navigate("/add-transaction")}
    >
      <Ionicons name="add" size={24} color="#fff" />
    </Pressable>
  );
}

export default Fab;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 10,
    right: 20,

    backgroundColor: "#0047AB",
    width: 50,
    height: 50,
    borderRadius: Radii.lg,

    justifyContent: "center",
    alignItems: "center",

    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});
