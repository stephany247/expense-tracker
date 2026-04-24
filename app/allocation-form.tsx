import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
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

export default function AllocationScreen() {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Food");
  const [timeframe, setTimeframe] = useState("Weekly");

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
          {["Daily", "Weekly", "Monthly"].map((t) => {
            const isActive = timeframe === t;

            return (
              <TouchableOpacity
                key={t}
                onPress={() => setTimeframe(t)}
                style={[styles.segmentItem, isActive && styles.activeSegment]}
              >
                <Text
                  style={
                    isActive ? styles.activeSegmentText : styles.segmentText
                  }
                >
                  {t}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Date */}
        <DateInput value={date} onChange={setDate} />

        {/* Toggle */}
        <View style={styles.toggleRow}>
          <Text style={styles.toggleText}>Recurring Transaction</Text>
          <Switch />
        </View>

        {/* Threshold */}
        <Text style={styles.title}>Threshold Alert</Text>

        <View style={styles.alertRow}>
          <Ionicons name="notifications-outline" size={20} />
          <View>
            <Text style={styles.alertTitle}>Notify at 80%</Text>
            <Text style={styles.alertSub}>SPENDING LIMIT</Text>
          </View>
          <Switch />
        </View>
      </View>

      {/* Notes */}
      <View style={styles.noteCard}>
        <NotesInput value={note} onChange={setNote} />
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button}>
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

  amountRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  dollar: {
    fontSize: 24,
    color: Colors.textTertiary,
  },

  amount: {
    fontSize: 48,
    fontWeight: Typography.bold,
    color: Colors.navy,
  },

  badge: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: Colors.navy,
    padding: 10,
    borderTopRightRadius: Radii["2xl"],
    borderBottomLeftRadius: Radii["2xl"],
  },

  badgeText: { color: "#fff" },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  catItem: {
    width: "30%",
    backgroundColor: "#EDEFF5",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
  },

  activeCat: {
    backgroundColor: "#DCE6FF",
  },

  catText: {
    marginTop: 5,
    fontSize: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: Typography.bold,
    marginBottom: 10,
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

  segmentText: { color: "#666" },
  activeSegmentText: { color: Colors.navy },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },

  dateText: {
    fontWeight: "600",
  },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  toggleText: { fontWeight: "500" },

  toggle: {
    width: 40,
    height: 20,
    backgroundColor: "#ccc",
    borderRadius: 10,
  },

  alertRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  alertTitle: { fontWeight: "600" },
  alertSub: { fontSize: 10, color: "#888" },

  toggleActive: {
    width: 40,
    height: 20,
    backgroundColor: Colors.navy,
    borderRadius: 10,
  },

  placeholder: {
    color: "#888",
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
