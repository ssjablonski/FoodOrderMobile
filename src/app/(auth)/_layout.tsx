import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@/src/providers/AuthProvider'

export default function AuthLayout() {
    const {session} = useAuth()

    if (session) {
        return <Redirect href="/"/>
    }

    return (
        <Stack>
            <Stack.Screen name="sign-in" options={{ title: 'Sign in' }} />
            <Stack.Screen name="sign-up" options={{ title: 'Sign up' }} />
        </Stack>
    )
}

