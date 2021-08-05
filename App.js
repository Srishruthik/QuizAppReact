import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './screens/Signup';
import Home from "./screens/Home"
const Stack = createStackNavigator();
import Login from "./screens/Login"
import Quiz from "./screens/quiz"
export default function App() {
  return (
   <NavigationContainer>
    <Stack.Navigator screenOptions={{gestureEnabled: false}}>
       <Stack.Screen name="Login" options={{headerShown:false,}} component={Login} /> 
      <Stack.Screen name="Signup" options={{headerShown:false,gestureEnabled:true}} component={Signup} />
      <Stack.Screen name="Home" options={{headerShown:false}} component={Home} />
      <Stack.Screen name="Quiz" options={{headerShown:false,}} component={Quiz} />
    </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
