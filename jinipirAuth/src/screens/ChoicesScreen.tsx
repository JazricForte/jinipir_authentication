import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as TodoActions from '../config/TodoList';

const ChoicesScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Choose your Food</Text>

            {/* Leoncio Nuggets */}
            <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                    try {
                        await TodoActions.addLeoncioNuggets();
                    } catch (error) {
                        console.error('Error adding Leoncio Nuggets:', error);
                    }
                }}
            >
                <Text style={styles.buttonText}>Leoncio Nuggets</Text>
            </TouchableOpacity>

            {/* Mejaro Fries */}
            <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                    try {
                        await TodoActions.addMejaroFries();
                    } catch (error) {
                        console.error('Error adding Mejaro Fries:', error);
                    }
                }}
            >
                <Text style={styles.buttonText}>Mejaro Fries</Text>
            </TouchableOpacity>

            {/* Sir Juice */}
            <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                    try {
                        await TodoActions.addSirJuice();
                    } catch (error) {
                        console.error('Error adding Sir Juice:', error);
                    }
                }}
            >
                <Text style={styles.buttonText}>Sir Juice</Text>
            </TouchableOpacity>

            {/* Cavite Love Drink */}
            <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                    try {
                        await TodoActions.addCaviteLoveJuice();
                    } catch (error) {
                        console.error('Error adding Cavite Love Drink:', error);
                    }
                }}
            >
                <Text style={styles.buttonText}>Cavite Love Drink</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        width: '100%',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007BFF',
        width: '80%',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ChoicesScreen;