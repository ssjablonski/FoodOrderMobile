import { ActivityIndicator, FlatList, Text } from 'react-native'
import React from 'react'
import OrderListItem from '@/src/components/OrderListItem'
import { useAdminOrderList } from '@/src/api/orders'

const OrdersList = () => {

  const {data: orders, isLoading, error} = useAdminOrderList({archived: false})

  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error) {
    return <Text>Failed to fetch</Text>
  }
  return (
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{gap:10, padding:10}}
      />
  )
}

export default OrdersList

