import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SettingScreen = () => {
    return (
        <View style={styles.contenedor}>
            <View style={styles.contenedorOpciones}>
                <TouchableOpacity style={styles.botonOpcion}>
                    <Text style={styles.textoOpcion}>Historial</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botonOpcion}>
                    <Text style={styles.textoOpcion}>Adeudos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botonOpcion}>
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
        backgroundColor: '#6200ee', // Color primario para botones
        padding: 15, // Padding para hacer el botón más grande
        borderRadius: 5, // Bordes redondeados para el botón
        marginBottom: 10, // Margen para separar los botones
        alignItems: 'center', // Alineación del texto en el centro
    },
    textoOpcion: {
        color: '#fff', // Texto blanco para contrastar con el fondo del botón
        fontSize: 16, // Tamaño de fuente
        fontWeight: 'bold', // Negrita para el texto
    },
});

export default SettingScreen;
