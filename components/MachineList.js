import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Cartas from './Cartas'; 

const MachineList = () => {
  const [maquina, setMaquina] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await fetch("http://192.168.3.120:80/apiMachine/index.php");
        const data = await res.json();
        setMaquina(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    obtenerDatos();
  }, []);

  const renderItems = () => {
    return maquina.map((item, index) => (
      <View key={index} style={styles.cards}>
        <Cartas
          marca={item.marca}
          modelo={item.modelo}
          precioPorDia={item.precioDia}
          imageFileName={item.imagen}
          capacidad={item.capacidad}
          code={item.codigo}
        />
      </View>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {renderItems()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    alignItems: 'center',
    paddingTop: 20,
  },
  cards: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
  },
});

export default MachineList;