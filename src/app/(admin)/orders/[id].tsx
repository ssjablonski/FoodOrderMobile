import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import orders from '@/assets/data/orders'
import OrderListItem from '@/src/components/OrderListItem'
import OrderItemListItem from '@/src/components/OrderItemListItem'
import Colors from '@/src/constants/Colors'
import { OrderStatusList } from '@/src/types'
import { useOrderDetails, useUpdateOrder } from '@/src/api/orders'


const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])
  const {data: order, isLoading, error} = useOrderDetails(id)
  const {mutate: updateOrder } = useUpdateOrder()

  if (!order) {
    return <Text>Order not found</Text>
  }
  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error) {
    return <Text>Failed to fetch</Text>
  }

  const updateStatus = (status: string) => {
    updateOrder({id: id, updatedFields: {status}})
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: 'bold' }}>Status</Text>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateStatus(status)}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : 'transparent',
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? 'white' : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>

        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
})

export default OrderDetailScreen