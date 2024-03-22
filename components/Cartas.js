import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Cartas = ({ marca, modelo, precioPorDia, imageFileName, capacidad, code }) => {
  const navigation = useNavigation();

  return (
    <Card>
      <Card.Cover style={styles.img} source={{ uri: imageFileName }} />

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
            onPress={() => navigation.navigate('Detail', { code })}
            style={styles.button}>
            Ver
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
    backgroundColor: '#ee6e73', 
    minWidth: 100, //texto space
    height: 40, 
  },
});


