import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Importa tus componentes de pantalla
import LoginScreen from './screens/LoginScreen'; // Asegúrate de que esta pantalla exista en tu directorio
import HomeScreen from "./screens/HomeScreen"; 
import SettingScreen from "./screens/SettingScreen";
import StackScreen from './screens/StackScreen'; 

import Detail from './screens/Detail';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Navegación de pila para la pestaña Home
function MyStack() {
    return (
        <Stack.Navigator initialRouteName='HomeScreen'>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='StackScreen' component={StackScreen} />
        </Stack.Navigator>
    );
}

// Navegación de pestañas con Ionicons
function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'purple',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen 
                name="Home" 
                component={MyStack}
                options={{ tabBarLabel: "Feed", headerShown: false }}
            />
            <Tab.Screen 
                name="Settings" 
                component={SettingScreen}
            />
        </Tab.Navigator>
    );
}

// Contenedor principal de navegación
export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Main" component={MyTabs} />
                <Stack.Screen name="Detail" component={Detail} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
