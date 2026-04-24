import { categories } from "@/constants/categories";
import { Colors, Radii, Typography } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export const CategoryScroll = () => (
  <View style={styles.scrollContainer}>
    <Text style={styles.header}>CATEGORY</Text>

    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((item, i) => {
        const isActive = i === 0;
        const isNew = item.name === "New";

        if (isNew) {
          return (
            <Pressable key={i} style={styles.newCat}>
              <Ionicons name="add" size={28} color={Colors.textBlack} />
              <Text style={styles.newText}>New</Text>
            </Pressable>
          );
        }

        return (
          <View key={i} style={[styles.catItem, isActive && styles.activeCat]}>
            <Ionicons
              name={item.icon}
              size={28}
              color={isActive ? Colors.navy : Colors.textBlack}
            />
            <Text
              style={[
                styles.catText,
                isActive && { color: Colors.navy, fontWeight: "600" },
              ]}
            >
              {item.name}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: Radii.xl,
  },

  header: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: 16,
  },

  catItem: {
    paddingVertical: 24,
    paddingHorizontal: 34,
    borderRadius: 16,
    backgroundColor: "#EDEFF5",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  catText: {
    color: Colors.textBlack,
  },

  activeCat: {
    borderWidth: 1,
    borderColor: "#C7D7F5",
  },

  newCat: {
    paddingVertical: 24,
    paddingHorizontal: 34,
    borderRadius: 16,
    backgroundColor: "#B7C3D9",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  newText: {
    color: Colors.textBlack,
    fontWeight: Typography.bold,
  },
});
