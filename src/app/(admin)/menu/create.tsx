import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import Button from '@/src/components/Button'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import Colors from '@/src/constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router'

const CreateProductScreen = () => {
    const [image, setImage] = useState<string | null>(null)

    const { id } = useLocalSearchParams()
    const isUpdating = !!id

    const validationSchema = Yup.object().shape({
        name: Yup.string().required().min(3).max(100),
        price: Yup.number().required().min(0.1),
    });

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
        setImage(result.assets[0].uri);
        }
    };

    const onSubmit = () => {
        if (isUpdating) {
            // update product
            console.log('update product')
        } else {
            // create product
            console.log('create product')
        }
    }

    const onDelete = () => {
        console.log('delete product')
    }

    const confirmDelete = () => {
        Alert.alert("Delete Product", "Are you sure you want to delete this product?", [
            {
                text: "Cancel",
            },
            {
                text: "Delete",
                onPress: onDelete,
                style: "destructive"
            }
        ])
    }


  return (
    <View style={styles.container}>
        <Stack.Screen options={{title: isUpdating ? "Update Product" : "Create Product"}} />
        <Image source={{uri: image || defaultPizzaImage}} style={styles.image} />
        <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>
        <Formik
            initialValues={{ name: '', price: 0 }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View >
                <Text style={styles.label}>Name</Text>

                <TextInput
                placeholder="Name"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                style={styles.input}
                />
                {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

                <Text style={styles.label}>Price ($)</Text>
                <TextInput
                placeholder="Price"
                onChangeText={handleChange('price')}
                onBlur={handleBlur('price')}
                value={values.price.toString()}
                keyboardType='numeric'
                style={styles.input}
                />
                {touched.price && errors.price && <Text style={styles.error}>{errors.price}</Text>}

                <Button onPress={() => handleSubmit()} text={isUpdating ? "Update" : "Create"} />
                {isUpdating && <Text onPress={confirmDelete} style={styles.textButton}>Delete</Text>}
            </View>
            )}
        </Formik>
    </View>

    
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,        
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20
    },
    label : {
        color: 'gray',
        fontSize: 16,

    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
    },
    error: {
        color: 'red',
        fontSize: 16,
    }
})

export default CreateProductScreen