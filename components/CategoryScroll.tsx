import { Colors, Radii, Typography } from "@/constants/theme";
import { getCategories } from "@/utils/category-storage";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ComponentProps } from "react";
type IconName = ComponentProps<typeof Ionicons>["name"];

type Category = {
  id: number;
  name: string;
  icon: string;
  budget?: number;
};

export const CategoryScroll = () => {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const data = await getCategories();
        setCategories(data);

        if (data.length > 0) {
          setSelectedCategory(data[0]);
        }
      };
      load();
    }, []),
  );
  return (
    <View style={styles.scrollContainer}>
      <Text style={styles.header}>CATEGORY</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((item: Category, i) => {
          const isActive = selectedCategory?.id === item.id;
          const isNew = item.name === "New";

          if (isNew) {
            return (
              <Pressable
                key={i}
                style={styles.newCat}
                onPress={() => router.push("/add-category")}
              >
                <Ionicons name="add" size={28} color={Colors.textBlack} />
                <Text style={styles.newText}>New</Text>
              </Pressable>
            );
          }

          return (
            <Pressable
              key={item.name}
              onPress={() => {
                setSelectedCategory(item);
                console.log(item);
                router.push({
                  pathname: "/add-transaction",
                  params: {
                    categoryId: item.id.toString(),
                    categoryName: item.name,
                  },
                });
              }}
              style={[styles.catItem, isActive && styles.activeCat]}
            >
              <Ionicons
                name={item.icon as any}
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
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

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
