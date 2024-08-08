import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import orders from '@/assets/data/orders'
import OrderListItem from '@/src/components/OrderListItem'
import OrderItemListItem from '@/src/components/OrderItemListItem'


const OrderDetailScreen = () => {
  const { id } = useLocalSearchParams()
  const order = orders.find(order => order.id.toString() === id)

  if (!order) {
    return <Text>Order not found</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgray',
    flex: 1,
    padding: 10,
    gap: 10,
  },
})

export default OrderDetailScreen