import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Order } from '../types';
import { Href, Link, useSegments } from 'expo-router';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(relativeTime);

type OrderListItemProps = {
    order: Order;
}

const OrderListItem = ({order}: OrderListItemProps ) => {
  const segments = useSegments();
    return (

        <Link href={`/${segments[0]}/orders/${order.id}` as Href<`${string}/orders/${number}`>} asChild>
            <Pressable style={styles.container}>
                <View>
                    <Text style={styles.order}>Order #{order.id}</Text>
                    <Text style={styles.date}>{dayjs(order.created_at).fromNow()}</Text>
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
    date: {
        color: 'gray',
        paddingTop: 2
    }
})