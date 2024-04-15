//LoginScreen.js
import React, { useState } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useAuth } from '../components/AuthProvider'; 

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            await login(username, password);
            navigation.navigate('Main');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const handleRegister = async () => {
        navigation.navigate('AddUser');
    }
    

    return (
        <View style={styles.mainContainer}>
            <StatusBar style="auto" />
            <View style={styles.svgContainer}>
                <Svg width="100%" height="150" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M50 0L61.8034 15H38.1966L50 0Z" fill="#F2F1F1" />
                </Svg>
            </View>
            <View style={styles.loginContainer}>
            <Text style={styles.headerText}>Renta de maquinaria pesada</Text>
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    onChangeText={setUsername}
                    value={username}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                />
                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Log In</Text>
                </TouchableOpacity>
                {/*email ? <Text style={styles.emailText}>Email del usuario: {email}</Text> : null*/}
                <View style = {styles.containerRegister}>
                    <Text style = {styles.text}>
                        Eres nuevo?
                    </Text>
                    <TouchableOpacity onPress={handleRegister}>
                        <Text style = {styles.textAddUser}>
                            Registrar
                        </Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f1f1f1',
    },
    userSection: {
      alignItems: 'center',
      marginBottom: 20,
    },
    svgContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    loginContainer: {
        marginTop: 50,
        alignItems: 'center',
    },
    input: {
        width: '80%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        padding: 15,
        marginBottom: 20,
        fontSize: 16,
    },
    loginButton: {
        width: '80%',
        height: 50,
        backgroundColor: '#FFCD11',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    loginButtonText: {
        color: '#000000',
        fontSize: 18,
    },
    emailText: {
        marginTop: 20,
        color: 'grey',
    },
    textAddUser: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        color: 'blue',
        textDecorationLine: 'underline',
    },
    text: {
        fontSize: 18,
        //fontWeight: 'bold',
        color: '#333',
    },
    containerRegister: {
        padding: 20,
        alignItems: 'center',

    },
    headerText: {
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 10, 
      },
});

export default LoginScreen;
