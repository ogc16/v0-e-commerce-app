import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { categories, getProductsByCategory } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Feather } from '@expo/vector-icons';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const category = categories.find((c) => c.id === id);
  const products = getProductsByCategory(id);

  if (!category) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Category not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: category.name,
        }}
      />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Category Header */}
        <View
          style={[styles.categoryHeader, { backgroundColor: `${category.color}15` }]}
        >
          <View
            style={[styles.categoryIcon, { backgroundColor: category.color }]}
          >
            <Feather name={category.icon as any} size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.categoryTitle}>{category.name}</Text>
          <Text style={styles.categoryCount}>
            {products.length} product{products.length !== 1 ? 's' : ''} available
          </Text>
        </View>

        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    paddingBottom: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  errorText: {
    fontSize: 16,
    color: '#6B7280',
  },
  categoryHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    marginBottom: 16,
  },
  categoryIcon: {
    width: 72,
    height: 72,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  categoryCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
});
