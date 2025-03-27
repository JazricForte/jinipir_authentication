import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChoicesScreen from "../screens/ChoicesScreen";

export type RootStackParamList = {
  Home: undefined;
  Profile: { userId?: string };
  Choices: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    const addTodoGlobal = async (task: string) => {
        if (!task || task.trim().length === 0) {
            console.error('Invalid task');
            return { data: null, error: 'Invalid task' };
        }

        // Simulate adding a task (replace this with your actual logic)
        console.log(`Task added: ${task}`);
        return { data: { task }, error: null };
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{ title: 'Check Out' }} 
                />
                <Stack.Screen 
                    name="Profile" 
                    component={ProfileScreen} 
                    options={{ title: 'Profile' }} 
                />
                <Stack.Screen
                    name="Choices"
                    component={ChoicesScreen}
                    options={{ title: 'Choices' }}
                >
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;