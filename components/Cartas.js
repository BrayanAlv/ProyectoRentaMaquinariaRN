//components/Cartas.js
import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { useCart } from '../context/CartContext'; // Importamos el contexto del carrito

const Cartas = ({ marca, modelo, precioPorDia, imageFileName, capacidad, code }) => {
  const navigation = useNavigation();
  const { dispatch } = useCart(); // Usamos el contexto del carrito

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { id: code, marca, modelo, precioPorDia } });
  };

  return (
    <Card>
      <TouchableOpacity onPress={() => navigation.navigate('Detail', { code })}>
        <Card.Cover style={styles.img} source={{ uri: imageFileName }} />
      </TouchableOpacity>
      

      <Card.Content>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Marca: {marca}</Text>
            <Text style={styles.subtitle}>Modelo: {modelo}</Text>
            <Text style={styles.subtitle}>Capacidad de carga: {capacidad} kg</Text>
            <Text style={styles.subtitle}>Precio por dia: {precioPorDia}</Text>
          </View>
          <Button
          icon="plus"
          mode="contained"
          onPress={addToCart}
          style={styles.button}
          labelStyle={{ color: '#000000' }} // Cambiar el color del texto a negro
        >
          Agregar al carrito
        </Button>

                </View>
              </Card.Content>
            </Card>
          );
        };

export default Cartas;

const styles = StyleSheet.create({
  img: {
    paddingBottom: 6
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
  },
  button: {
    borderRadius: 20,
    marginLeft: 10, 
    backgroundColor: '#FFCD11',
    color: '#000000', 
    minWidth: 100, 
    height: 40, 
  },
});
