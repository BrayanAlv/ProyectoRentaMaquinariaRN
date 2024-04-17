import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';
import { useAuth } from '../components/AuthProvider';

const SettingScreen = ({ navigation }) => {
  const { logout, nn , idCl} = useAuth(); // Usando useAuth para acceder a logout y nn (nickname)

  function usuarioAvatar(str) {
    if (!str) return ""; 
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userSection}>
        <Image
          style={styles.avatar}
          source={require('../assets/images/icons/avatar.png')}
        />
        <Text style={styles.username}>{"Bienvenido(a) " + usuarioAvatar(nn)}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('seguimiento', { nickname: nn })}>
        <Text style={styles.buttonText}>Historial</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  userSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 118,
    borderRadius: 25,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#FFCD11',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingScreen;
