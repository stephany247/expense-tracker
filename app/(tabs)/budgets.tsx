import { AddCategoryButton } from "@/components/AddCategoryButton";
import { BurnCard } from "@/components/BurnCard";
import { CategoryList } from "@/components/CategoryList";
import { CategoryScroll } from "@/components/CategoryScroll";
import { VelocityCard } from "@/components/VelocityCard";
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
