import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import {setUserRole} from "@/services/userService";

const ChooseRole: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    const handleRoleSelection = async (role: string) => {
        setLoading(true);
        setSelectedRole(role);

        try {
            // Call the setUserRole API
            const message = await setUserRole(role);
            Alert.alert('Success', message);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred. Please try again.';
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

            <View style={styles.header}>
                <Text style={styles.title}>Welcome to RideShare</Text>
                <Text style={styles.subtitle}>Choose your role to continue</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.driverButton]}
                    onPress={() => handleRoleSelection('driver')}
                    disabled={loading}
                >
                    {loading && selectedRole === 'driver' ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <>
                            <Text style={styles.emoji}>🚗</Text>
                            <Text style={styles.buttonText}>Driver</Text>
                            <Text style={styles.buttonSubtext}>Earn money by giving rides</Text>
                        </>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.passengerButton]}
                    onPress={() => handleRoleSelection('passenger')}
                    disabled={loading}
                >
                    {loading && selectedRole === 'passenger' ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <>
                            <Text style={styles.emoji}>👤</Text>
                            <Text style={styles.buttonText}>Passenger</Text>
                            <Text style={styles.buttonSubtext}>Request a ride anywhere</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>

            <Text style={styles.footerText}>You can change this later in settings</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        paddingBottom: 40,
    },
    header: {
        marginTop: 60,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2d3436',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#636e72',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        padding: 24,
        borderRadius: 20,
        marginVertical: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    driverButton: {
        backgroundColor: '#0984e3',
    },
    passengerButton: {
        backgroundColor: '#00b894',
    },
    emoji: {
        fontSize: 40,
        marginBottom: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 4,
    },
    buttonSubtext: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
    },
    footerText: {
        textAlign: 'center',
        color: '#636e72',
        fontSize: 14,
    },
});

export default ChooseRole;