import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignupScreen from "./SignupScreen";
import HomeScreen from "./HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChatScreen from "./ChatScreen";

const Stack = createNativeStackNavigator();

export default function Screens() {
  useEffect(() => {}, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          // options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          // options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          // options={{ headerShown: false }}
          name="Chat"
          options={({ route }) => ({
            title: route.params.chatUser.name,
            user: route.params.user,
          })}
          component={ChatScreen}
        />

        <Stack.Screen
          name="signup"
          // options={({ route }) => ({ title: route.params.title })}
          component={SignupScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
