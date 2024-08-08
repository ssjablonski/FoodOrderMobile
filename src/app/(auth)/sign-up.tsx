import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import Button from '@/src/components/Button'
import { Link } from 'expo-router'
import Colors from '@/src/constants/Colors'
import * as Yup from 'yup'

const SignUp = () => {

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters")
    })

    const onSubmit = () => {
        console.log('Sign in')
    }

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        placeholder='jan@gmail.com'
                        style={styles.input}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                    />
                    {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        placeholder='Password'
                        style={styles.input}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry
                    />
                    {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
                    <Button text='Create account' onPress={() => console.log('aka')} />
                    <Text style={styles.textButton}>
                        <Link href={'/sign-in'}>Sign in</Link>
                    </Text>
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
        padding: 15
    },
    textButton: {
        color: Colors.light.tint,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 10
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 10,
    },
    label : {
        color: 'gray',
        fontSize: 16,

    },
    error: {
        color: 'red',
        fontSize: 16,
        marginBottom: 10
    }
})

export default SignUp