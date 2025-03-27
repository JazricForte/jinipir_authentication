import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { supabase } from './supabase';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
    return { data, error };
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    else Alert.alert('Check your email for the login link!');
    setLoading(false);
    return { data, error };
  }

  return (
    <View style={styles.container}>
      <Input
        label="Email"
        leftIcon={{ type: 'material', name: 'email' }}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="email@address.com"
        autoCapitalize="none"
      />
      <Input
        label="Password"
        leftIcon={{ type: 'material', name: 'lock' }}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        autoCapitalize="none"
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Sign In"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Sign Up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
