import React, { useEffect, useState } from 'react';
import { StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { getCurrentUser, logout, User } from '@/services/userService';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            setUser(null); // Clear user state after logout
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    };

    if (loading) {
        return (
            <ThemedView style={styles.container}>
                <ActivityIndicator size="large" color="#667eea" />
            </ThemedView>
        );
    }

    if (error) {
        return (
            <ThemedView style={styles.container}>
                <ThemedText style={styles.errorText}>Error: {error}</ThemedText>
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            {user ? (
                <>
                    <ThemedText type="title" style={styles.title}>Profile</ThemedText>
                    <ThemedView style={styles.profileInfo}>
                        <ThemedText style={styles.label}>Email:</ThemedText>
                        <ThemedText style={styles.email}>{user.email}</ThemedText>

                        <ThemedText style={styles.label}>Full Name:</ThemedText>
                        <ThemedText style={styles.name}>{user.full_name}</ThemedText>

                        <ThemedText style={styles.label}>Role:</ThemedText>
                        <ThemedText style={styles.email}>{user.role}</ThemedText>
                    </ThemedView>

                    <Pressable
                        style={({ pressed }) => [
                            styles.button,
                            pressed && styles.buttonPressed
                        ]}
                        onPress={handleLogout}
                    >
                        <LinearGradient
                            colors={['#667eea', '#764ba2']}
                            style={styles.gradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <ThemedText style={styles.buttonText}>Log Out</ThemedText>
                        </LinearGradient>
                    </Pressable>
                </>
            ) : (
                <ThemedText style={styles.notLoggedIn}>Not logged in</ThemedText>
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        marginBottom: 30,
        color: '#2d3748',
    },
    profileInfo: {
        width: '100%',
        marginBottom: 30,
        padding: 20,
        borderRadius: 12,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        color: '#718096',
        marginBottom: 5,
    },
    email: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2d3748',
        marginBottom: 20,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2d3748',
    },
    button: {
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 20,
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
    errorText: {
        color: '#dc2626',
        fontSize: 16,
        textAlign: 'center',
    },
    notLoggedIn: {
        fontSize: 18,
        color: '#4a5568',
    },
});