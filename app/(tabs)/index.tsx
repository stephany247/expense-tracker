import { Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Radii } from "@/constants/theme";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>Overview</Text>

      <Pressable
        style={styles.fab}
        onPress={() => router.navigate("/add-transaction")}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </Pressable>
    </SafeAreaView>
  );
}

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
