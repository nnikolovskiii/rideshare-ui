import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MapboxComponent } from '@/components/Map';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function MapboxScreen() {
    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">Explore the Map</ThemedText>
            <ThemedText type="subtitle">
                Interact with the map to discover the power of Mapbox in your application!
            </ThemedText>
            <View style={styles.mapContainer}>
                <MapboxComponent center={[-74.5, 40]} zoom={9} />
            </View>
            <ThemedView style={styles.instructions}>
                <ThemedText type="subtitle">How to Use:</ThemedText>
                <ThemedText>
                    - Zoom in and out to explore different areas.
                    {'\n'}- Pan around to navigate the map.
                </ThemedText>
                <ThemedText>
                    Edit <ThemedText type="defaultSemiBold">components/MapboxComponent.tsx</ThemedText> to
                    customize the map further.
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
    mapContainer: {
        height: 300,
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 16,
        marginBottom: 16,
    },
    instructions: {
        marginTop: 16,
        gap: 8,
    },
});
