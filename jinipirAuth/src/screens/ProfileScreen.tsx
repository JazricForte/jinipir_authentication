import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type Props = {
    route: ProfileScreenRouteProp;  
};

const ProfileScreen: React.FC<Props> = ({ route }) => {
    const { userId } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Profile</Text>
            <Text style={styles.text}>User ID: {userId}</Text>
            <Text style={styles.text}>This is your profile screen</Text>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00380f',
    },
    header: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    text: {
        fontSize: 24,
        color: '#ffffff',
    },
});

export default ProfileScreen;