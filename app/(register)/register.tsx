import React, { useState } from 'react';
import { StyleSheet, View, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { register } from "@/services/userService";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ThemedView style={styles.innerContainer}>
                <ThemedText type="title" style={styles.title}>Create Account</ThemedText>

                <View style={styles.formContainer}>
                    {/* Full Name Input */}
                    <View style={styles.inputContainer}>
                        <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            placeholderTextColor="#666"
                            value={fullName}
                            onChangeText={setFullName}
                        />
                    </View>

                    {/* Email Input */}
                    <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#666"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#666"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    {error && (
                        <View style={styles.errorContainer}>
                            <ThemedText style={styles.errorText}>{error}</ThemedText>
                        </View>
                    )}

                    <Pressable
                        style={({ pressed }) => [
                            styles.button,
                            pressed && styles.buttonPressed
                        ]}
                        onPress={handleRegister}
                    >
                        <LinearGradient
                            colors={['#667eea', '#764ba2']}
                            style={styles.gradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <ThemedText style={styles.buttonText}>Register Now</ThemedText>
                        </LinearGradient>
                    </Pressable>
                </View>

                <View style={styles.loginContainer}>
                    <ThemedText>Already have an account? </ThemedText>
                    <Pressable>
                        <ThemedText style={styles.loginLink}>Sign In</ThemedText>
                    </Pressable>
                </View>

                <ThemedView style={styles.terms}>
                    <ThemedText style={styles.termsText}>
                        By registering, you agree to our{' '}
                        <ThemedText style={styles.termsLink}>Terms of Service</ThemedText> and{' '}
                        <ThemedText style={styles.termsLink}>Privacy Policy</ThemedText>
                    </ThemedText>
                </ThemedView>
            </ThemedView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        marginBottom: 40,
        textAlign: 'center',
        color: '#2d3748',
    },
    formContainer: {
        marginBottom: 20,
        gap: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 56,
        fontSize: 16,
        color: '#2d3748',
    },
    button: {
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 10,
        shadowColor: '#764ba2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    gradient: {
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonPressed: {
        opacity: 0.9,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    errorContainer: {
        backgroundColor: '#fee2e2',
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
    },
    errorText: {
        color: '#dc2626',
        textAlign: 'center',
        fontSize: 14,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    loginLink: {
        color: '#667eea',
        fontWeight: '600',
    },
    terms: {
        marginTop: 30,
        padding: 15,
        borderRadius: 12,
        backgroundColor: '#e9ecef',
    },
    termsText: {
        textAlign: 'center',
        fontSize: 12,
        lineHeight: 18,
        color: '#4a5568',
    },
    termsLink: {
        color: '#667eea',
        fontWeight: '600',
    },
});