import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';
import { View } from 'react-native';


export default function MenuScreen() {
  return (
    <View>
      {products.map((product, index) => (
        <ProductListItem key={product.id} product={products[index]} />
      ))}
    </View>
  )
}