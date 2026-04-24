import { AddCategoryButton } from "@/components/category/AddCategoryButton";
import { BurnCard } from "@/components/category/BurnCard";
import { CategoryList } from "@/components/category/CategoryList";
import { CategoryScroll } from "@/components/category/CategoryScroll";
import { VelocityCard } from "@/components/category/VelocityCard";
import { ScrollView, StyleSheet, Text, View } from "react-native";

function budgets() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BurnCard />
        <VelocityCard />
        <CategoryScroll />
        <AddCategoryButton />
        <CategoryList />
      </ScrollView>
    </View>
  );
}

export default budgets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    padding: 16,
  },
});
