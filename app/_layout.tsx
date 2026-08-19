import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '@/lib/auth';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(protected)" />
            <Stack.Screen
              name="product/[id]"
              options={{
                headerShown: true,
                headerTitle: 'Product Details',
                headerBackTitle: 'Back',
                headerStyle: { backgroundColor: '#FFFFFF' },
                headerTintColor: '#10B981',
              }}
            />
            <Stack.Screen
              name="category/[id]"
              options={{
                headerShown: true,
                headerBackTitle: 'Back',
                headerStyle: { backgroundColor: '#FFFFFF' },
                headerTintColor: '#10B981',
              }}
            />
          </Stack>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
