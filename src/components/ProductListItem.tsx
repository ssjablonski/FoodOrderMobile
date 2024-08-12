import Colors from '@/src/constants/Colors';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Href, Link, useSegments } from 'expo-router';
import { Tables } from '../types';
import RemoteImage from './RemoteImage';

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

type ProductListItemProps = {
    product: Tables<'products'>;
}

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/menu/${product.id}` as Href<`/menu/${number}`>} asChild>
        <Pressable style={styles.container}>
            <RemoteImage path={product.image} fallback={defaultPizzaImage} style={styles.image} />
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
        </Pressable>
    </Link>
  );
}

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: '50%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10
  }
});
