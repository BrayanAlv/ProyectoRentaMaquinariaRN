import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";

import { useCart } from "../context/CartContext";
import { useAuth } from '../components/AuthProvider';

import DateTimePicker from '@react-native-community/datetimepicker';

const ShoppingCartScreen = ({ navigation }) => {
  const { cart, removeItemFromCart } = useCart();
  const cartIsEmpty = cart.length === 0;

  const obtenerFechaMinima = () => {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + 2);
    return fecha;
  };

  const obtenerFechaMaxima = () => {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + 2);
    fecha.setMonth(fecha.getMonth() + 6);
    return fecha;
  };

  const [fechaInicio, setFechaInicio] = useState(obtenerFechaMinima());
  const [fechaFinal, setFechaFinal] = useState(obtenerFechaMinima());
  const fechaMin = obtenerFechaMinima();
  const fechaMax = obtenerFechaMaxima();

  const [showInicioPicker, setShowInicioPicker] = useState(false);
  const [showFinalPicker, setShowFinalPicker] = useState(false);

  const [total, setTotal] = useState(0);
  const [diasReserva, setDiasReserva] = useState(0);

  useEffect(() => {
    if (!cartIsEmpty && fechaFinal >= fechaInicio) {
      const msPerDay = 24 * 60 * 60 * 1000;
      const duration = Math.round((fechaFinal - fechaInicio) / msPerDay) + 1; // Include both start and end days
      setDiasReserva(duration);
      const newTotal = cart.reduce((acc, item) => acc + (item.precioPorDia * duration), 0);
      setTotal(newTotal);
    }
  }, [fechaInicio, fechaFinal, cart]);

  const handleInitializeReservation = () => {
    navigation.navigate('FormReserva', { diasReserva, fechaFinal, fechaInicio });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista del carrito</Text>
      {cartIsEmpty ? (
        <Text style={styles.emptyMessage}>No hay nada en el carrito...</Text>
      ) : (
        cart.map((item, index) => (
          <View key={item.id || index} style={styles.item}>
            <View style={styles.itemContent}>
              <Text>{item.marca} - {item.modelo}</Text>
              <Text>Precio por dia: {item.precioPorDia}</Text>
            </View>
            <TouchableOpacity
              onPress={() => removeItemFromCart(item.id)}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
      {!cartIsEmpty && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${total}</Text>
          <View style={styles.formularioFechas}>
            <View style={styles.formGroup}>
              <Button title="Seleccionar Fecha de Inicio" onPress={() => setShowInicioPicker(true)} />
              {showInicioPicker && (
                <DateTimePicker
                  value={fechaInicio}
                  mode="date"
                  display="default"
                  minimumDate={fechaMin}
                  maximumDate={fechaMax}
                  onChange={(event, selectedDate) => {
                    setShowInicioPicker(false);
                    setFechaInicio(selectedDate || fechaInicio);
                  }}
                />
              )}
            </View>
            <View style={styles.formGroup}>
              <Button title="Seleccionar Fecha Final" onPress={() => setShowFinalPicker(true)} />
              {showFinalPicker && (
                <DateTimePicker
                  value={fechaFinal}
                  mode="date"
                  display="default"
                  minimumDate={fechaInicio}
                  maximumDate={fechaMax}
                  onChange={(event, selectedDate) => {
                    setShowFinalPicker(false);
                    setFechaFinal(selectedDate || fechaFinal);
                  }}
                />
              )}
            </View>
          </View>
          <TouchableOpacity
            onPress={handleInitializeReservation}
            style={styles.removeButton}
          >
            <Text style={styles.removeButtonText}>
              Inicializar Reserva
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  emptyMessage: {
    fontSize: 18,
    color: "grey",
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
  },
  itemContent: {
    flexDirection: 'row', // Cambiado para alinear el contenido
    justifyContent: 'space-between', // Espacia el contenido entre sí
    alignItems: 'center', // Centra los elementos verticalmente
  },
  totalContainer: {
    marginTop: 20,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: '#FFCD11',
    padding: 10,
  },
  removeButtonText: {
    color: '#000000',
  },
});

export default ShoppingCartScreen;
