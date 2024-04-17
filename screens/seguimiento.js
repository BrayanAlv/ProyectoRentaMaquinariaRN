import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { apiURL } from '../api/apiGlobal';

const Seguimiento = ({ route }) => {
  const { nickname } = route.params;
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      const response = await fetch(`${apiURL}/loginExample/seguimiento.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname: nickname })
      });
      const data = await response.json();
      setReservas(data);
    };

    fetchReservas();
  }, [nickname]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Historial de reservas</Text>
      {reservas.length > 0 ? reservas.map((reserva, index) => (
        <View key={index} style={styles.reserva}>
          <Text style={styles.label}>Pedido:</Text>
          <Text style={styles.value}>{reserva['Numero del pedido']}</Text>
          <Text style={styles.label}>Fecha:</Text>
          <Text style={styles.value}>{reserva['Fecha de reserva']}</Text>
          <Text style={styles.label}>Subtotal:</Text>
          <Text style={styles.value}>{reserva['Subtotal']} USD</Text>
          <Text style={styles.label}>IVA:</Text>
          <Text style={styles.value}>{reserva['IVA']} USD</Text>
          <Text style={styles.label}>Costo transporte:</Text>
          <Text style={styles.value}>{reserva['Costo de transporte']} USD</Text>
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.value}>{reserva['Total de la reserva']} USD</Text>
        </View>
      )) : <Text style={styles.title}>No hay reservas para mostrar.</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  reserva: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  value: {
    fontSize: 16,
    marginTop: 1,
  }
});

export default Seguimiento;
