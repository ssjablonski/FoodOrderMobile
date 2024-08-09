import { FlatList } from 'react-native'
import React from 'react'
import OrderListItem from '@/src/components/OrderListItem'
import orders from '@/assets/data/orders'

const OrdersList = () => {
  return (
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{gap:10, padding:10}}
      />
  )
}

export default OrdersList

