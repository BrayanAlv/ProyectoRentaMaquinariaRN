import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useCart } from "../context/CartContext";

const ShoppingCartScreen = ({ navigation }) => {
  const { cart, removeItemFromCart } = useCart();

  const cartIsEmpty = cart.length === 0;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista del carrito</Text>
      {cartIsEmpty ? (
        <Text style={styles.emptyMessage}>No hay nada en el carrito...</Text>
      ) : (
        cart.map((item, index) => (
          <View key={item.id || index} style={styles.item}>
            <View style={styles.itemContent}>
              <View>
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
          </View>
        ))
      )}
      {!cartIsEmpty && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>
            {/*Total: ${cart.reduce((acc, item) => acc + item.precioPorDia, 0)}*/}
            
          </Text>
          <TouchableOpacity
            onPress={() => removeItemFromCart(navigation.navigate('FormReserva'))}
            style={styles.removeButton}
          >
            <Text style={styles.removeButtonText}>
              Inicializar Reserva
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {console.log(cart)}
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
