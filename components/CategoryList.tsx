import { View, StyleSheet, Text} from "react-native";

export const CategoryList = () => {
  const data = [
    { name: "Utilities", amount: 150, left: 100, color: "#E53935" },
    { name: "Health & Fitness", amount: 120, left: 30, color: "#1A3A8F" },
    { name: "Clothing", amount: 180, left: 60, color: "#1A3A8F" },
  ];

  return (
    <View>
      <View style={styles.rowBetween}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <Text style={styles.link}>VIEW ALL</Text>
      </View>

      {data.map((item, i) => (
        <View key={i} style={styles.categoryCard}>
          <Text>{item.name}</Text>

          <View style={styles.progressBarLight}>
            <View
              style={[
                styles.progressFill,
                { width: "70%", backgroundColor: item.color },
              ]}
            />
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.amount}>${item.amount}</Text>
            <Text style={{ color: item.color }}>${item.left} LEFT</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontWeight: "600",
    fontSize: 16,
  },

  categoryCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },

  progressBarLight: {
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginVertical: 10,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
  },

  link: {
    color: "#1A3A8F",
    fontSize: 12,
  },

  amount: {
    fontWeight: "600",
  },
});
