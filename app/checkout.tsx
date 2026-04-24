import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCartStore } from '@/store/cart-store';

type PaymentMethod = 'card' | 'cash' | 'wallet';

export default function CheckoutScreen() {
  const { items, getTotal, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getTotal();
  const deliveryFee = subtotal > 25 ? 0 : 4.99;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      Alert.alert(
        'Order Placed!',
        'Your order has been placed successfully. You will receive a confirmation shortly.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/'),
          },
        ]
      );
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Delivery Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <TouchableOpacity>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.addressCard}>
            <View style={styles.addressIcon}>
              <Feather name="map-pin" size={20} color="#10B981" />
            </View>
            <View style={styles.addressInfo}>
              <Text style={styles.addressLabel}>Home</Text>
              <Text style={styles.addressText}>
                123 Main Street, Apt 4B{'\n'}New York, NY 10001
              </Text>
            </View>
            <View style={styles.addressCheck}>
              <Feather name="check-circle" size={20} color="#10B981" />
            </View>
          </View>
        </View>

        {/* Delivery Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Time</Text>
          <View style={styles.timeOptions}>
            <TouchableOpacity style={[styles.timeOption, styles.timeOptionActive]}>
              <Feather name="zap" size={18} color="#10B981" />
              <Text style={styles.timeOptionTextActive}>Express</Text>
              <Text style={styles.timeOptionSub}>30-45 min</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.timeOption}>
              <Feather name="clock" size={18} color="#6B7280" />
              <Text style={styles.timeOptionText}>Standard</Text>
              <Text style={styles.timeOptionSub}>1-2 hours</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.timeOption}>
              <Feather name="calendar" size={18} color="#6B7280" />
              <Text style={styles.timeOptionText}>Schedule</Text>
              <Text style={styles.timeOptionSub}>Pick time</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'card' && styles.paymentOptionActive,
            ]}
            onPress={() => setPaymentMethod('card')}
          >
            <View style={styles.paymentLeft}>
              <View
                style={[
                  styles.paymentIcon,
                  paymentMethod === 'card' && styles.paymentIconActive,
                ]}
              >
                <Feather
                  name="credit-card"
                  size={20}
                  color={paymentMethod === 'card' ? '#10B981' : '#6B7280'}
                />
              </View>
              <View>
                <Text style={styles.paymentTitle}>Credit Card</Text>
                <Text style={styles.paymentSubtitle}>**** **** **** 4242</Text>
              </View>
            </View>
            <View
              style={[
                styles.radioOuter,
                paymentMethod === 'card' && styles.radioOuterActive,
              ]}
            >
              {paymentMethod === 'card' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'wallet' && styles.paymentOptionActive,
            ]}
            onPress={() => setPaymentMethod('wallet')}
          >
            <View style={styles.paymentLeft}>
              <View
                style={[
                  styles.paymentIcon,
                  paymentMethod === 'wallet' && styles.paymentIconActive,
                ]}
              >
                <Feather
                  name="smartphone"
                  size={20}
                  color={paymentMethod === 'wallet' ? '#10B981' : '#6B7280'}
                />
              </View>
              <View>
                <Text style={styles.paymentTitle}>Digital Wallet</Text>
                <Text style={styles.paymentSubtitle}>Apple Pay, Google Pay</Text>
              </View>
            </View>
            <View
              style={[
                styles.radioOuter,
                paymentMethod === 'wallet' && styles.radioOuterActive,
              ]}
            >
              {paymentMethod === 'wallet' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'cash' && styles.paymentOptionActive,
            ]}
            onPress={() => setPaymentMethod('cash')}
          >
            <View style={styles.paymentLeft}>
              <View
                style={[
                  styles.paymentIcon,
                  paymentMethod === 'cash' && styles.paymentIconActive,
                ]}
              >
                <Feather
                  name="dollar-sign"
                  size={20}
                  color={paymentMethod === 'cash' ? '#10B981' : '#6B7280'}
                />
              </View>
              <View>
                <Text style={styles.paymentTitle}>Cash on Delivery</Text>
                <Text style={styles.paymentSubtitle}>Pay when you receive</Text>
              </View>
            </View>
            <View
              style={[
                styles.radioOuter,
                paymentMethod === 'cash' && styles.radioOuterActive,
              ]}
            >
              {paymentMethod === 'cash' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Items ({items.length})
              </Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text
                style={[
                  styles.summaryValue,
                  deliveryFee === 0 && styles.freeDelivery,
                ]}
              >
                {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Special Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Instructions</Text>
          <TextInput
            style={styles.instructionsInput}
            placeholder="Add any special delivery instructions..."
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Place Order Button */}
      <View style={styles.checkoutContainer}>
        <TouchableOpacity
          style={[
            styles.placeOrderButton,
            isProcessing && styles.placeOrderButtonDisabled,
          ]}
          onPress={handlePlaceOrder}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <Text style={styles.placeOrderText}>Processing...</Text>
          ) : (
            <>
              <Text style={styles.placeOrderText}>
                Place Order - ${total.toFixed(2)}
              </Text>
              <Feather name="check" size={20} color="#FFFFFF" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#10B981',
  },
  addressIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressInfo: {
    flex: 1,
    marginLeft: 12,
  },
  addressLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  addressCheck: {
    marginLeft: 12,
  },
  timeOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  timeOption: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  timeOptionActive: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  timeOptionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 8,
  },
  timeOptionTextActive: {
    fontSize: 13,
    fontWeight: '600',
    color: '#10B981',
    marginTop: 8,
  },
  timeOptionSub: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  paymentOptionActive: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentIconActive: {
    backgroundColor: '#ECFDF5',
  },
  paymentTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  paymentSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterActive: {
    borderColor: '#10B981',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  freeDelivery: {
    color: '#10B981',
    fontWeight: '600',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10B981',
  },
  instructionsInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 80,
  },
  bottomPadding: {
    height: 40,
  },
  checkoutContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  placeOrderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  placeOrderButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  placeOrderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
