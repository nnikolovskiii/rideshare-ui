import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

// Define your navigation stack parameters
type RootStackParamList = {
    role: undefined; // No params for this screen
    map: undefined; // Assuming the next screen is 'Map'
};

type ChooseRoleNavigationProp = NativeStackNavigationProp<RootStackParamList, 'role'>;

interface ChooseRoleProps {
    navigation: ChooseRoleNavigationProp;
}

const ChooseRole: React.FC<ChooseRoleProps> = ({ navigation }) => {
    const handleRoleSelection = async (role: string) => {
        try {
            // Send the role to the backend
            const response = await fetch('http://API/set_role', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role }),
            });

            const result = await response.json();

            if (response.ok) {
                // Handle success (e.g., navigate to the next screen)
                Alert.alert('Success', `You are now a ${role}`);
                navigation.navigate('map'); // Replace 'Map' with your desired screen
            } else {
                // Handle errors from the backend
                Alert.alert('Error', result.message || 'Failed to choose role');
            }
        } catch (error) {
            // Handle network errors
            Alert.alert('Error', 'An error occurred. Please try again.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Choose Your Role</Text>
            <Button title="Driver" onPress={() => handleRoleSelection('driver')} />
            <Button title="Passenger" onPress={() => handleRoleSelection('passenger')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default ChooseRole;
