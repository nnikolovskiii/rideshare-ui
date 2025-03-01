import React, { useState } from 'react';
import { StyleSheet, View, Pressable, TextInput } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import {register} from "@/services/userService";

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        setError('');
        try {
            if (!email || !password || !fullName) {
                throw new Error('All fields are required');
            }

            await register(email, password, fullName);
            console.log('Registration successful');
            // Clear form after successful registration
            setEmail('');
            setPassword('');
            setFullName('');
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                console.error('Registration error:', error.message);
            }
        }
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">Create Account</ThemedText>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    value={fullName}
                    onChangeText={setFullName}
                    placeholderTextColor="#666"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholderTextColor="#666"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#666"
                />

                {error ? (
                    <ThemedText style={styles.errorText}>{error}</ThemedText>
                ) : null}

                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        { opacity: pressed ? 0.8 : 1 }
                    ]}
                    onPress={handleRegister}
                >
                    <ThemedText style={styles.buttonText}>Register</ThemedText>
                </Pressable>
            </View>

            <ThemedView style={styles.terms}>
                <ThemedText>
                    By registering, you agree to our{' '}
                    <ThemedText type="defaultSemiBold">Terms of Service</ThemedText>
                </ThemedText>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    formContainer: {
        marginTop: 24,
        gap: 16,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    errorText: {
        color: 'red',
        marginTop: 8,
        textAlign: 'center',
    },
    terms: {
        marginTop: 24,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
    },
});