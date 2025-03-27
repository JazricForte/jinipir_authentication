import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Alert, ActivityIndicator } from 'react-native';
import { Button, Input, ListItem, Icon } from 'react-native-elements';
import { supabase } from './supabase';

export default function TodoList({ user }) {
  const [Todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    setLoading(true);
    const { data, error } = await supabase
      .from('Todos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching todos:', error);
      Alert.alert('Error fetching todos');
    } else {
      setTodos(data || []);
    }
    setLoading(false);
    return { data, error };
  }

  // async function addTodoGlobal()
 
// async function addTodoGlobal() 

// Removed duplicate toggleComplete function


  async function addTodo() {
    if (newTask.trim().length === 0) {
      Alert.alert('Please enter a task');
      return { error: 'Empty task' };
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('Todos')
      .insert([{ task: newTask, user_id: user.id }])
      .select();

    if (error) {
      console.error('Error adding todo:', error);
      Alert.alert('Error adding todo');
    } else {
      setTodos([...data, ...Todos]);
      setNewTask('');
    }
    setLoading(false);
    return { data, error };
  }

  async function toggleComplete(id, is_completed) {
    setLoading(true);
    const { data, error } = await supabase
      .from('Todos')
      .update({ is_completed: !is_completed })
      .match({ id })
      .select();

    if (error) {
      console.error('Error updating todo:', error);
      Alert.alert('Error updating todo');
    } else {
      setTodos(
        Todos.map((Todo) =>
          Todo.id === id ? { ...Todo, is_completed: !Todo.is_completed } : Todo
        )
      );
    }
    setLoading(false);
    return { data, error };
  }

  async function deleteTodo(id) {
    setLoading(true);
    const { data, error } = await supabase
      .from('Todos')
      .delete()
      .match({ id })
      .select();

    if (error) {
      console.error('Error deleting todo:', error);
      Alert.alert('Error deleting todo');
    } else {
      setTodos(Todos.filter((Todo) => Todo.id !== id));
    }
    setLoading(false);
    return { data, error };
  }

  async function signOut() {
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
        <Button title="Sign Out" onPress={signOut} type="clear" />
      </View>
      
      <View style={styles.inputContainer}>
        <Input
          placeholder="Add a new task"
          value={newTask}
          onChangeText={setNewTask}
          rightIcon={
            <Icon
              name="add"
              type="material"
              onPress={addTodo}
              disabled={loading}
            />
          }
          onSubmitEditing={addTodo}
        />
      </View>

      <View>
        <Button title="Choices" onPress={navigator} disabled={loading} />
      </View>
      
      {loading && <ActivityIndicator size="large" />}
      
      <FlatList
        data={Todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem.Swipeable
            rightContent={
              <Button
                title="Delete"
                icon={{ name: 'delete', color: 'white' }}
                buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                onPress={() => deleteTodo(item.id)}
              />
            }
          >
        <ListItem.CheckBox
          onPress={() => toggleComplete(item.id, item.is_completed)}
        />
            <ListItem.Content>
              <ListItem.Title
                style={
                  item.is_completed ? styles.completedTask : styles.task
                }
              >
                {item.task}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem.Swipeable>
        )}
      />
    </View>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  task: {
    fontSize: 16,
  },
  completedTask: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export const addLeoncioNuggets = async () => {
  if (!task || task.trim().length === 0) {
    Alert.alert('Please provide a valid task');
    return { error: 'Invalid task' };
  }

  const { data, error } = await supabase
    .from('Todos')
    .insert('Leoncio Nuggets')
    .select();

  if (error) {
    console.error('Error adding todo:', error);
    Alert.alert('Error adding todo');
  } else {
    Alert.alert('Task added successfully!');
  }

  return { data, error };
};

export const addCaviteLoveJuice = async (task) => {
  if (!task || task.trim().length === 0) {
    Alert.alert('Please provide a valid task');
    return { error: 'Invalid task' };
  }

  const { data, error } = await supabase
    .from('Todos')
    .insert('Cavite Love Juice')
    .select();

  if (error) {
    console.error('Error adding todo:', error);
    Alert.alert('Error adding todo');
  } else {
    Alert.alert('Task added successfully!');
  }

  return { data, error };
};

export const addMejaroFries = async (task) => {
  if (!task || task.trim().length === 0) {
    Alert.alert('Please provide a valid task');
    return { error: 'Invalid task' };
  }

  const { data, error } = await supabase
    .from('Todos')
    .insert('Mejaro Fries')
    .select();

  if (error) {
    console.error('Error adding todo:', error);
    Alert.alert('Error adding todo');
  } else {
    Alert.alert('Task added successfully!');
  }

  return { data, error };
};

export const addSirJuice = async (task) => {
  if (!task || task.trim().length === 0) {
    Alert.alert('Please provide a valid task');
    return { error: 'Invalid task' };
  }

  const { data, error } = await supabase
    .from('Todos')
    .insert('Sir Juice')
    .select();

  if (error) {
    console.error('Error adding todo:', error);
    Alert.alert('Error adding todo');
  } else {
    Alert.alert('Task added successfully!');
  }

  return { data, error };
};