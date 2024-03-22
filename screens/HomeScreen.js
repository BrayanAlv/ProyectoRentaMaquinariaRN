import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import MachineList from '../components/MachineList';
const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
  
      <View style={styles.topBar}>

        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
          <Text style={styles.buttonIcon}>☰</Text>
        </TouchableOpacity>


        <TextInput
          style={styles.searchBox}
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholder="Search..."
        />
        
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            {['Mayor peso', 'Menor peso', 'Marca', 'Otra opción'].map((filterOption, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalItem}
                onPress={() => {
                  console.log(`Filtering by: ${filterOption}`);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.modalText}>{filterOption}</Text>
              </TouchableOpacity>
            ))}
            
          </View>
          
        </View>
      </Modal>
      <MachineList/>
    </View>
    
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8, 
    backgroundColor: '#f8f8f8', 
  },
  button: {
    marginRight: 10, 
  },
  buttonIcon: {
    fontSize: 24, 
  },
  searchBox: {
    flex: 1,
    height: 35, 
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    fontSize: 16, 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalItem: {
    padding: 10,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomeScreen;