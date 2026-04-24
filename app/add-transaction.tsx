import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Radii, Typography } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveTransaction } from "@/utils/storage";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { getCategories } from "@/utils/category-storage";

type TabProps = {
  label: string;
  value: string;
};

export default function AddTransaction() {
  const { categoryId, categoryName } = useLocalSearchParams();

  const [activeTab, setActiveTab] = useState("manual");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState((categoryName as string) || "");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useFocusEffect(() => {
    const load = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    load();
  });

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

    if (!amount || isNaN(Number(amount))) {
      return Alert.alert("Error", "Enter a valid amount");
    }

    const data = {
      id: Date.now(),
      name,
      date,
      category,
      amount: Number(amount),
      note,
      type: "expense",
    };

    try {
      await saveTransaction(data);
      Alert.alert("Success", "Transaction saved!");

      // reset form
      setName("");
      setDate("");
      setCategory("");
      setAmount("");
      setNote("");
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  const formatAmount = (value: string) => {
    const num = Number(value);
    if (isNaN(num)) return "";
    return num.toFixed(2);
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
              <Text style={styles.label}>ADD TRANSACTION NAME</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#1A3A8F" />

                <TextInput
                  placeholder="John Doe"
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                />
              </View>

              <Text style={styles.label}>ADD TRANSACTION DATE</Text>
              <View style={styles.inputContainer}>
                <Feather name="calendar" size={20} color="#1A3A8F" />

                <TextInput
                  placeholder="11/24/2023"
                  value={date}
                  onChangeText={setDate}
                  style={styles.input}
                />
              </View>
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
            </View>

            {/* Amount */}
            <View style={styles.amountContainer}>
              <Text style={styles.label}>AMOUNT</Text>
              <View style={{ position: "relative" }}>
                <Text style={styles.dollar}>$</Text>

                <TextInput
                  placeholder="0.00"
                  value={amount}
                  onChangeText={setAmount}
                  onBlur={() => setAmount(formatAmount(amount))}
                  style={styles.amountInput}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>USD</Text>
              </View>
            </View>

            {/* Notes */}
            <View style={styles.card}>
              <Text style={[styles.label, { paddingLeft: 8 }]}>NOTES</Text>
              <TextInput
                placeholder="What was this for?"
                value={note}
                onChangeText={setNote}
                style={[styles.input, { height: 100 }]}
                multiline
              />
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

const CaptureBox = () => {
  return (
    <View style={styles.captureBox}>
      <View style={styles.iconBox}>
        <Text style={{ fontSize: 24 }}>＋</Text>
      </View>

      <Text style={styles.captureTitle}>Capture something</Text>
      <Text style={styles.captureSub}>Figure this one out!!!</Text>
    </View>
  );
};

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
    padding: 15,
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
  captureBox: {
    height: 300,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#AAB6D6",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  iconBox: {
    width: 60,
    height: 60,
    backgroundColor: "#DDE6F8",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  captureTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },

  captureSub: {
    color: "#777",
  },
});
