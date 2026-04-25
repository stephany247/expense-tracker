import { CaptureBox } from "@/components/CaptureBox";
import { AmountInput } from "@/components/inputs/AmountInput";
import { DateInput } from "@/components/inputs/DateInput";
import { NameInput } from "@/components/inputs/NameInput";
import { NotesInput } from "@/components/inputs/NotesInput";
import { Colors, Radii, Typography } from "@/constants/theme";
import { formatAmount } from "@/utils/format";
import { Transaction, useAppStore } from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type TabProps = {
  label: string;
  value: string;
};

export default function AddTransaction() {
  const { categoryId, categoryName } = useLocalSearchParams();
  // const addTransaction = useAppStore((s) => s.addTransaction);
  const { addTransaction, categories } = useAppStore();

  const [activeTab, setActiveTab] = useState("manual");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState((categoryName as string) || "");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [type, setType] = useState<"expense" | "income" | "">("");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const router = useRouter();

  const handleSave = async () => {
    // Validation
    if (!name.trim()) {
      return Alert.alert("Error", "Name is required");
    }

    if (!date.trim()) {
      return Alert.alert("Error", "Date is required");
    }

    if (!category.trim()) {
      return Alert.alert("Error", "Category is required");
    }

    if (type !== "expense" && type !== "income") {
      return Alert.alert("Error", "Select transaction type");
    }

    if (!amount || isNaN(Number(amount))) {
      return Alert.alert("Error", "Enter a valid amount");
    }

    const data: Transaction = {
      id: Date.now(),
      name,
      date,
      category,
      amount: Number(amount),
      note,
      type: type as "expense" | "income",
    };

    try {
      addTransaction(data);
      Alert.alert("Success", "Transaction saved!");

      // reset form
      setName("");
      setDate("");
      setCategory("");
      setAmount("");
      setNote("");

      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  const Tab = ({ label, value }: TabProps) => (
    <TouchableOpacity
      onPress={() => setActiveTab(value)}
      style={[styles.tab, activeTab === value && styles.activeTab]}
    >
      <Text
        style={[styles.tabText, activeTab === value && styles.activeTabText]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView style={styles.container}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <Tab label="Manual" value="manual" />
          <Tab label="Capture" value="capture" />
          <Tab label="Upload Data" value="upload" />
        </View>

        {activeTab === "manual" && (
          <>
            {/* Form Card */}
            <View style={styles.card}>
              <NameInput value={name} onChange={setName} />

              <DateInput value={date} onChange={setDate} />

              <Text style={styles.label}>ADD ALLOCATION</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Category"
                  value={category}
                  editable={false}
                  style={styles.input}
                />

                <TouchableOpacity
                  onPress={() => setShowDropdown(!showDropdown)}
                >
                  <Ionicons
                    name="chevron-down"
                    size={20}
                    color={Colors.gray600}
                  />
                </TouchableOpacity>
              </View>
              {showDropdown && (
                <View style={styles.dropdown}>
                  {categories.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setCategory(item.name);
                        setShowDropdown(false);
                      }}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <Text style={styles.label}>TRANSACTION TYPE</Text>

              <View style={styles.inputContainer}>
                <View style={styles.iconBox}>
                  <Ionicons
                    name={type === "income" ? "arrow-down" : "arrow-up"}
                    size={18}
                    color={Colors.navy}
                  />
                </View>

                <TextInput
                  placeholder="Type"
                  value={
                    type
                      ? type === "income"
                        ? "Income"
                        : "Expense"
                      : "Select type"
                  }
                  editable={false}
                  style={styles.input}
                />

                <TouchableOpacity
                  onPress={() => setShowTypeDropdown(!showTypeDropdown)}
                >
                  <Ionicons
                    name="chevron-down"
                    size={20}
                    color={Colors.gray600}
                  />
                </TouchableOpacity>
              </View>

              {showTypeDropdown && (
                <View style={styles.dropdown}>
                  {["expense", "income"].map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setType(item as "income" | "expense");
                        setShowTypeDropdown(false);
                      }}
                    >
                      <Text style={{ textTransform: "capitalize" }}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Amount */}
            <AmountInput
              value={amount}
              onChange={setAmount}
              onBlur={() => setAmount(formatAmount(amount))}
            />

            {/* Notes */}
            <View style={styles.noteCard}>
              <NotesInput value={note} onChange={setNote} />
            </View>

            {/* Save Button */}
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save Up!</Text>
            </TouchableOpacity>
          </>
        )}

        {activeTab === "capture" && <CaptureBox />}
        {activeTab === "upload" && <CaptureBox />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.blueBg,
    padding: 20,
  },

  header: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    padding: 4,
  },

  tab: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: Colors.blueLight,

    borderRadius: 10,
  },
  activeTabText: {
    color: Colors.navy,
  },

  tabText: {
    fontSize: 14,
    fontWeight: Typography.medium,
    color: Colors.textPrimary,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: Radii["2xl"],
    marginBottom: 20,
  },
  noteCard: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    borderRadius: Radii["2xl"],
    marginBottom: 20,
  },

  label: {
    fontSize: 12,
    fontWeight: Typography.semibold,
    color: Colors.textSecondary,
    marginBottom: 5,
    marginTop: 18,
  },

  inputContainer: {
    backgroundColor: Colors.inputBg,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 10,
  },

  input: {
    flex: 1,
    padding: 12,
    borderRadius: Radii.sm,
  },

  dropdown: {
    borderRadius: 10,
    paddingVertical: 5,
    elevation: 3,
  },

  dropdownItem: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
    borderRadius: Radii.sm,
    backgroundColor: Colors.blueGhost,
    marginTop: 8,
  },

  amountContainer: {
    position: "relative",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: Radii["2xl"],
    marginBottom: 20,
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

  badge: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: Colors.navy,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopRightRadius: Radii["2xl"],
    borderBottomLeftRadius: Radii["2xl"],
  },

  badgeText: {
    fontSize: 12,
    color: "#fff",
  },

  amountLabel: {
    fontSize: 12,
    color: "#888",
  },

  amount: {
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 10,
  },

  button: {
    backgroundColor: "#0D47A1",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 40,
    marginTop: 80,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
  },

  iconBox: {
    backgroundColor: "#DDE6F8",
    borderRadius: Radii.xs,
    padding: 6,
    marginLeft: -6,
  },
});
