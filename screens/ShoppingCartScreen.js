import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ShoppingCartScreen = () => {
  const cartIsEmpty = true; // Por ejemplo, esta variable podría depender del estado actual del carrito

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista del carrito</Text>
      {cartIsEmpty ? (
        <Text style={styles.emptyMessage}>No hay nada en el carrito...</Text>
      ) : (
        <Text style={styles.emptyMessage}>Articulos</Text>
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
});

export default ShoppingCartScreen;
