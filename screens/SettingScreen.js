/*
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';
import { useAuth } from '../components/AuthProvider';

const OptionButton = ({ onPress, title }) => (
  <TouchableOpacity style={styles.optionButton} onPress={onPress}>
    <Text style={styles.optionButtonText}>{title}</Text>
  </TouchableOpacity>
);

const SettingScreen = ({ navigation }) => {
  const { logout, nn, idCl } = useAuth(); // Usando useAuth para acceder a logout, nn, idCl
  var nick = nn;
  console.log(nn);

  function usuarioAvatar(str) {
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
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.userSection}>
            <Image
              style={styles.avatar}
              source={require('../assets/images/icons/avatar.png')}
            />
            
          </View>
          <View>
            <Text style={styles.username}>{"Bienvinido(a) " + usuarioAvatar(nn)}</Text>
          </View>
        </View>
        <View style={styles.optionContainer}>
          <OptionButton title="Historial" />
          <OptionButton title="Seguimiento" />
          <OptionButton title="Cerrar Sesión" onPress={handleLogout} />
        </View>
      </View>
    </View>
    
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  optionContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    justifyContent: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
  },
  optionButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    marginBottom: 20,
  },
  userSection: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',

  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default SettingScreen;


*/

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useAuth } from '../components/AuthProvider';


const SettingScreen = ({ navigation }) => {
  const { logout, nn, idCl } = useAuth(); // Usando useAuth para acceder a logout, nn, idCl
  var nick = nn;
  console.log(nn);

  function  usuarioAvatar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const handleLogout = async () => {
    try {
      navigation.navigate('Login');
      await logout(); 
    } catch (error) {
        Alert.alert('Error', error.message);
    }
};
    return (
        
        <View style={styles.contenedor}>
          <View style={styles.userSection}>
            <Image
              style={styles.avatar}
              source={require('../assets/images/icons/avatar.png')}
            />
            <Text style={styles.username}>{"Bienvinido(a) " + usuarioAvatar(nn)}</Text>
          </View>
          <View style={styles.contenedorOpciones}>
              <TouchableOpacity style={styles.botonOpcion}>
                  <Text style={styles.textoOpcion}>Historial</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botonOpcion}>
                  <Text style={styles.textoOpcion}>Seguimiento</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botonOpcion} onPress={handleLogout}>
                  <Text style={styles.textoOpcion}>Cerrar Sesión</Text>
              </TouchableOpacity>
          </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', // Un fondo suave
    },
    contenedorOpciones: {
        width: '80%', // Ocupa el 80% del ancho de la pantalla
        backgroundColor: '#fff', // Fondo blanco para el contenedor de botones
        borderRadius: 10, // Bordes redondeados
        shadowColor: "#000", // Sombra
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Elevación para Android
        padding: 20, // Espaciado interno
    },
    botonOpcion: {
        backgroundColor: '#FFCD11', // Color primario para botones
        padding: 15, // Padding para hacer el botón más grande
        borderRadius: 5, // Bordes redondeados para el botón
        marginBottom: 10, // Margen para separar los botones
        alignItems: 'center', // Alineación del texto en el centro
    },
    textoOpcion: {
        color: '#000000', // Texto blanco para contrastar con el fondo del botón
        fontSize: 16, // Tamaño de fuente
        fontWeight: 'bold', // Negrita para el texto
    },
    avatar: {
      width: 100,
      height: 118,
      borderRadius: 25,
      alignItems: 'center',
      marginBottom: 10,
    },
    userSection: {
      alignItems: 'center',
      marginBottom: 20,
    },
    username: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
});

export default SettingScreen;