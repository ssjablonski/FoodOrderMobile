import { ActivityIndicator, FlatList, Text } from 'react-native'
import React, { useEffect } from 'react'
import OrderListItem from '@/src/components/OrderListItem'
import { useAdminOrderList } from '@/src/api/orders'
import { supabase } from '@/src/lib/supabase'
import { useQueryClient } from '@tanstack/react-query'
import { useInsertOrderSubscription } from '@/src/api/orders/subscription'

const OrdersList = () => {

  const {data: orders, isLoading, error} = useAdminOrderList({archived: false})
  useInsertOrderSubscription()

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

