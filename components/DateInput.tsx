// components/DateInput.tsx
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors, Typography } from "@/constants/theme";

type Props = {
  value: string;
  onChange: (date: string) => void;
};

export const DateInput = ({ value, onChange }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Text style={styles.label}>ADD TRANSACTION DATE</Text>

      <TouchableOpacity style={styles.input} onPress={() => setShow(true)}>
        <Feather name="calendar" size={20} color="#1A3A8F" />
        <Text style={{ padding: 12, flex: 1 }}>{value || "Select date"}</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          value={new Date()}
          onChange={(event, selectedDate) => {
            setShow(false);

            if (selectedDate) {
              const formatted = selectedDate.toLocaleDateString();
              onChange(formatted);
            }
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: Typography.semibold,
    color: Colors.textSecondary,
    marginBottom: 5,
    marginTop: 18,
  },
  input: {
    backgroundColor: Colors.inputBg,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});
