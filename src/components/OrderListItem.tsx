import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Order } from '../types';
import { Link, useSegments } from 'expo-router';

type OrderListItemProps = {
    order: Order;
}

const OrderListItem = ({order}: OrderListItemProps ) => {
  const segments = useSegments();
    return (

        <Link href={`${segments[0]}/orders/${order.id}`} asChild>
            <Pressable style={styles.container}>
                <View>
                    <Text style={styles.order}>Order #{order.id}</Text>
                    <Text>{new Date(order.created_at).toLocaleDateString()}</Text>
                </View>
                <Text style={styles.order}>{order.status}</Text>
            </Pressable>
        </Link>
    )
}

export default OrderListItem

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    order: {
        fontWeight: 'bold',
    },
})