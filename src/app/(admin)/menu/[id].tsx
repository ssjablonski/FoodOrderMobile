import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Href, Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import { useCart } from '@/src/providers/CartProvider'
import { PizzaSize } from '@/src/types'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/src/constants/Colors'
import { useProduct } from '@/src/api/products'
import RemoteImage from '@/src/components/RemoteImage'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailsScreen = () => {
  const {id: idString} = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])
  const {data: product, error, isLoading} = useProduct(id)
  
  const { addItem } = useCart()

  const router = useRouter()

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')

  const addToCart = () => {
    if (!product) return
    addItem(product, selectedSize)
    router.push('/cart')
  }

  if (isLoading) {
    return <ActivityIndicator />
  } 

  if (error) {
    return <Text>Failed to fetch products</Text>
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>

      <Stack.Screen options={{ title: 'Menu', headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}` as Href<`/(admin)/menu/create?id=${number}`>} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
        ), }} 
      />
       
      <Stack.Screen options={{ title: product.name }} />
      <RemoteImage path={product.image} fallback={defaultPizzaImage} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
    
  },
  image: {
    width: '100%',
    aspectRatio: 1
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
    
  },
  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500'
  },
  title: {
    fontSize:20,
    fontWeight: 'bold',
  }
})

export default ProductDetailsScreen;