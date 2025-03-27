import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert, ActivityIndicator } from "react-native";
import {Button, Input, ListItem, Icon} from "react-native-elements";
import { supabase } from "../config/supabase";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

interface TodoListProps {
    user: { id: string };
    navigation: any;
}

export default function TodoList({ user }: TodoListProps) {
    const [Todos, setTodos] = useState<{ id: string; task: string; is_completed: boolean }[]>([]);
    const [newTask, setNewTask] = useState<string>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTodos();
    }, []);

    async function fetchTodos() {
        setLoading(true);
        const { data, error } = await supabase
            .from("Todos")
            .select("*")
            .eq("user_id", user.id)
            .order('created_at', {ascending: false});

        if (error) {
            console.error('Error fetching todos:', error);
            Alert.alert('Error fetching todos');
        }
        else {
            setTodos(data || []);
        }
        setLoading(false);
        return { data, error };
    }

    async function addTodo() {
        if (newTask.trim().length === 0) {
            Alert.alert('Please enter a task');
            return { error: 'Empty task' };
        }

        setLoading(true);
        const { data, error } = await supabase
            .from("Todos")
            .insert([{ task: newTask, user_id: user.id }])
            .select();

            if (error) {
                console.error('Error adding todo', error);
                Alert.alert('Error adding todo');
            }
            else {
                setTodos([...data, ...Todos]);
                setNewTask('');
            }
            setLoading(false);
            return { data, error };
    }


async function toggleComplete(id: string, isCompleted: boolean) {
    setLoading(true);
    const { data, error } = await supabase
        .from("Todos")
        .update({ is_completed: !isCompleted })
        .match({ id })
        .select();

    if (error) {
        console.error('Error updating todo:', error);
        Alert.alert('Error updating todo');
    }
    else {
        Todos.map((todo => todo.id === id ? { ...todo, is_completed: !todo.is_completed } : todo));
    }
    setLoading(false);
    return { data, error };
}

async function deleteTodo(id: string) {
    setLoading(true);
    const { data, error } = await supabase
        .from("Todos")
        .delete()
        .match({ id })
        .select();

    if (error) {
        console.error('Error deleting todo:', error);
        Alert.alert('Error deleting todo');
    }
    else {
        setTodos(Todos.filter((todo) => todo.id !== id));
    }
    setLoading(false);
    return { data, error };
}

async function signOut() {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Error signing out:', error);
        Alert.alert('Error signing out');
    }
    return { error };
}

return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Button title="Sign out" onPress={signOut} type="clear"/>
    </View>

    <View style={styles.inputContainer}>
        <Input
            placeholder='Add a task'
            value={newTask}
            onChangeText={setNewTask}
            rightIcon={
                <Icon
                    name='add'
                    type="material"
                    onPress={addTodo}
                    disabled={loading}
                />
            }
            onSubmitEditing={addTodo}
        />
    </View>

    {loading && <ActivityIndicator size='large' />}

    <FlatList
        data={Todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <ListItem.Swipeable
                rightContent={
                    <Button
                        title='Delete'
                        icon={{ name: 'delete', color: 'white' }}
                        buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                        onPress={() => deleteTodo(item.id)}
                    />
                }
            >
                <ListItem.CheckBox
                    checked={item.is_completed}
                    onPress={() => toggleComplete(item.id, item.is_completed)}
                    />
                    <ListItem.Content>
                        <ListItem.Title style={item.is_completed ? styles.completedTask : styles.task}
                        >
                            {item.task}
                    </ListItem.Title>
                </ListItem.Content>
            </ListItem.Swipeable >
          )}
        />
    </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
        width: '100%', 
    },
    task: {
        fontSize: 16,
    },
    completedTask: {
        fontSize: 16,
        textDecorationLine: 'line-through',
        color: 'grey',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 10,
        backgroundColor: '#ffffff'
    },
});
