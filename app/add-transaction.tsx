import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddTransaction() {
  const [activeTab, setActiveTab] = useState("manual");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  type TabProps = {
  label: string;
  value: string;
};

  const handleSave = () => {
    const data = {
      name,
      date,
      category,
      amount: Number(amount),
      note,
      type: "expense",
    };

    console.log(data);
  };

  const Tab = ({ label, value }: TabProps) => (
    <TouchableOpacity
      onPress={() => setActiveTab(value)}
      style={[styles.tab, activeTab === value && styles.activeTab]}
    >
      <Text style={styles.tabText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Add Transaction</Text>

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
              <Text style={styles.label}>ADD TRANSACTION</Text>
              <TextInput
                placeholder="John Doe"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />

              <Text style={styles.label}>ADD TRANSACTION</Text>
              <TextInput
                placeholder="11/24/2023"
                value={date}
                onChangeText={setDate}
                style={styles.input}
              />

              <Text style={styles.label}>ADD ALLOCATION</Text>
              <TextInput
                placeholder="Category"
                value={category}
                onChangeText={setCategory}
                style={styles.input}
              />
            </View>

            {/* Amount */}
            <View style={styles.amountCard}>
              <Text style={styles.amountLabel}>AMOUNT</Text>
              <Text style={styles.amount}>${amount || "0.00"}</Text>
            </View>

            {/* Notes */}
            <View style={styles.card}>
              <Text style={styles.label}>NOTES</Text>
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
    </SafeAreaView>
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
    backgroundColor: "#F5F6FA",
    padding: 20,
  },

  header: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#EDEFF5",
    borderRadius: 10,
    marginBottom: 20,
  },

  tab: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#fff",
    borderRadius: 10,
  },

  tabText: {
    fontSize: 14,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },

  label: {
    fontSize: 12,
    color: "#888",
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#F1F3F8",
    padding: 12,
    borderRadius: 8,
  },

  amountCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
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
