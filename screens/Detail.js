import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native'; // Importando useRoute

const Detail = () => {
  const route = useRoute(); // Usando el hook useRoute para acceder a los parámetros de la ruta
  const { code } = route.params; // Extrayendo 'code' de los parámetros de la ruta

  const [respuesta, setRespuesta] = useState([]);

  useEffect(() => {
    const realizarSolicitudPost = () => {
      const data = {
        codigo: code, // Usando 'code' en la solicitud
      };

      axios.post('http://192.168.3.120:80/apiMachine/index.php', data)
        .then(response => {
          setRespuesta(response.data);
        })
        .catch(error => {
          console.error('Error en la solicitud:', error);
        });
    };

    if (code) {
      realizarSolicitudPost();
    }
  }, [code]); 

  const renderizarDatos = () => {
    return respuesta.map((elemento, index) => (
      <View key={index} style={styles.card}>
        <Text>Código: {elemento.codigo}</Text>
        <Text>Precio por día: {elemento.precioDia}</Text>
        {elemento.imagen && (
          <Image source={{ uri: elemento.imagen }} style={styles.image} />
        )}
        <Text>Modelos: {elemento.modelos}</Text>
        <Text>Marca: {elemento.marca}</Text>
        <Text>Descripción: {elemento.descripcion}</Text>
        <Text>Año: {elemento.anio}</Text>
        <Text>Capacidad: {elemento.capacidad}</Text>
        <Text>Categoría: {elemento.categoria}</Text>
        <Text>Límite: {elemento.limite}</Text>
      </View>
    ));
  };

  return <View style={styles.container}>{respuesta && renderizarDatos()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});

export default Detail;
