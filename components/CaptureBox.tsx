import { View, Text, StyleSheet } from "react-native";

export const CaptureBox = () => {
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
