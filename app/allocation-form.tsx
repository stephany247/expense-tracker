import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { Colors, Radii, Typography } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { AmountInput } from "@/components/inputs/AmountInput";
import { formatAmount } from "@/utils/format";
import { defaultCategories } from "@/constants/categories";
import { DateInput } from "@/components/inputs/DateInput";
import { NotesInput } from "@/components/inputs/NotesInput";
import { CategoryItem } from "@/components/category/CategoryItem";
import { useAppStore } from "@/utils/storage";

export default function AllocationScreen() {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Food");
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly">(
    "weekly",
  );
  const [isRecurring, setIsRecurring] = useState(false);
  const [thresholdEnabled, setThresholdEnabled] = useState(false);

  const { addAllocation } = useAppStore();

  const handleSave = async () => {
    // validation
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return Alert.alert("Error", "Enter a valid amount");
    }

    if (!date) {
      return Alert.alert("Error", "Please select a date");
    }

    if (!selectedCategory) {
      return Alert.alert("Error", "Select a category");
    }

    const data = {
      id: Date.now(),
      amount: Number(amount),
      category: selectedCategory,
      date,
      note,
      timeframe,
      isRecurring,
      thresholdEnabled,
      threshold: 0.8,
    };

    try {
      addAllocation(data);
      Alert.alert("Success", "Allocation saved");

      // reset
      setAmount("");
      setDate("");
      setNote("");
      setSelectedCategory("Food");
      setTimeframe("weekly");
      setIsRecurring(false);
      setThresholdEnabled(false);
    } catch {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Amount */}
      <AmountInput
        value={amount}
        onChange={setAmount}
        onBlur={() => setAmount(formatAmount(amount))}
      />

      {/* Category */}
      <View style={styles.card}>
        <Text style={styles.label}>CATEGORY</Text>

        <View style={styles.grid}>
          {defaultCategories.map((item) => {
            const isActive = selectedCategory === item.name;

            return (
              <CategoryItem
                key={item.id}
                name={item.name}
                icon={item.icon as any}
                isActive={isActive}
                onPress={() => setSelectedCategory(item.name)}
                variant="grid"
              />
            );
          })}
        </View>
      </View>

      {/* Timeframe */}
      <View style={styles.card}>
        <Text style={styles.title}>Timeframe</Text>

        <View style={styles.segment}>
          {["daily", "weekly", "monthly"].map((t) => {
            const isActive = timeframe === t;
            const value = t.toLowerCase() as "daily" | "weekly" | "monthly";

            return (
              <TouchableOpacity
                key={t}
                onPress={() => setTimeframe(value)}
                style={[styles.segmentItem, isActive && styles.activeSegment]}
              >
                <Text
                  style={[
                    styles.segText,
                    isActive ? styles.activeSegmentText : styles.segmentText,
                  ]}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Date */}
        <DateInput value={date} onChange={setDate} label="ADD DATE" />

        {/* Toggle */}

        <View style={[styles.toggleRow, { marginVertical: 24 }]}>
          <Text style={styles.toggleText}>Recurring Transaction</Text>
          <Switch
            value={isRecurring}
            onValueChange={setIsRecurring}
            trackColor={{ false: "#ccc", true: Colors.navyMid }}
            thumbColor={isRecurring ? "#fff" : "#f4f3f4"}
          />
        </View>

        {/* Threshold */}
        <Text style={styles.title}>Threshold Alert</Text>

        <View style={styles.toggleRow}>
          <View style={styles.alertRow}>
            <View style={styles.iconBox}>
              <Ionicons name="notifications-outline" size={20} />
            </View>
            <View>
              <Text style={styles.alertTitle}>Notify at 80%</Text>
              <Text style={styles.alertSub}>SPENDING LIMIT</Text>
            </View>
          </View>
          <Switch
            value={thresholdEnabled}
            onValueChange={setThresholdEnabled}
            trackColor={{ false: "#ccc", true: Colors.navyMid }}
            thumbColor={thresholdEnabled ? "#fff" : "#f4f3f4"}
          />
        </View>
      </View>

      {/* Notes */}
      <View style={styles.noteCard}>
        <NotesInput value={note} onChange={setNote} />
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Up!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueBg,
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: Radii["2xl"],
    padding: 20,
    marginBottom: 20,
  },

  label: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 10,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  toggleText: {
    fontSize: Typography.lg,
    fontWeight: Typography.medium,
  },

  title: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    marginBottom: 10,
    color: Colors.navy,
  },

  segment: {
    flexDirection: "row",
    backgroundColor: "#F2F4F8",
    borderRadius: 10,
    padding: 4,
    marginBottom: 15,
  },

  segmentItem: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },

  activeSegment: {
    backgroundColor: "#DCE6FF",
    borderRadius: 8,
  },

  segText: { textTransform: "capitalize" },
  segmentText: { color: "#666" },
  activeSegmentText: {
    color: Colors.navy,
  },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.blueLight,
    padding: 12,
    borderRadius: Radii.xl,
  },

  alertRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  alertTitle: {
    fontWeight: Typography.bold,
    color: Colors.navy,
  },

  alertSub: {
    fontSize: 10,
    color: Colors.textPrimary,
    marginTop: 4,
  },

  noteCard: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    borderRadius: Radii["2xl"],
    marginBottom: 20,
  },

  button: {
    backgroundColor: Colors.navy,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 40,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
