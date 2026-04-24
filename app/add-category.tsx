import { NotesInput } from "@/components/NotesInput";
import { Colors, Typography } from "@/constants/theme";
import { saveCategory } from "@/utils/category-storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

function AddCategory() {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");

  const router = useRouter();

  const handleSave = async () => {
    if (!name.trim()) {
      return Alert.alert("Error", "Category name required");
    }

    if (!amount || isNaN(Number(amount))) {
      return Alert.alert("Error", "Enter a valid budget");
    }

    const data = {
      id: Date.now(),
      name,
      note,
      budget: Number(amount),
      icon: "wallet-outline", // default for now
    };

    try {
      await saveCategory(data);
      Alert.alert("Success", "Category created");
      router.back();
    } catch {
      Alert.alert("Error", "Something went wrong");
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.label}>CATEGORY NAME</Text>

          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={18} color="#8A94A6" />
            <TextInput
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
          </View>

          <NotesInput value={note} onChange={setNote} />
        </View>
        <View style={styles.card}>
          <View style={styles.currencyBadge}>
            <Text style={{ color: "#fff" }}>USD</Text>
          </View>

          <Text style={styles.label}>CATEGORY BUDGET</Text>

          <View style={styles.amountRow}>
            <Text style={styles.dollar}>$</Text>
            <TextInput
              placeholder="0.00"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={styles.amountInput}
            />
          </View>
        </View>
      </ScrollView>

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Up!</Text>
      </Pressable>
    </View>
  );
}

export default AddCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8A94A6",
    marginBottom: 8,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.inputBg,
    borderRadius: 12,
    paddingHorizontal: 10,
  },

  input: {
    flex: 1,
    padding: 12,
  },

  notesBox: {
    marginTop: 16,
  },

  notesInput: {
    height: 100,
    textAlignVertical: "top",
  },

  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    position: "relative",
  },

  dollar: {
    position: "absolute",
    left: 4,
    bottom: 12,
    fontSize: Typography["6xl"],
    fontWeight: Typography.bold,
    color: Colors.textTertiary,
  },
  amountInput: {
    paddingTop: 12,
    paddingLeft: 30,
    paddingRight: 60,
    fontSize: 72,
    fontWeight: Typography.bold,
    color: Colors.navy,
  },

  currencyBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#0D47A1",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },

  button: {
    backgroundColor: "#0D47A1",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    margin: 16,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
