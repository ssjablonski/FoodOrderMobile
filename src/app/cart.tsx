import { View, Text, Platform, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useCart } from '../providers/CartProvider'
import CartListItem from '../components/CartListItem'
import Button from '../components/Button'

const CartScreen = () => {
    const { items, total, checkout } = useCart()
  return (
    <View>
        <FlatList 
            data={items} 
            renderItem={({item}) => <CartListItem cartItem={item} />} 
            contentContainerStyle={{padding: 10, gap: 10 }}
        />
        <Text style={{ marginTop: 10, fontSize: 20, fontWeight: '500'}}>Total: ${total.toFixed(2)}</Text>
        <Button text="Checkout" onPress={checkout} />
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default CartScreen