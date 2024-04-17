import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Button } from 'react-native';
import MachineList from '../components/MachineList';
import { BsSearch } from "react-icons/bs"
import { apiURL } from '../api/apiGlobal';


const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([])
  const [clickCount, setClickCount] = useState(0)
  const inputSearch = useRef(null)
  const [isWrong, setIsWrong] = useState(false)
  const [filterOpt, setFilterOpt] = useState("marca")

  useEffect(() => {
    const obtenerDatos = async () => {
      if(searchQuery == " ") {
        try {
          console.log(filterOpt, "jeej")
          const res = await fetch(`${apiURL}/apiFiltradoMaquinas/index.php`);
          const apiData = await res.json();
          setData(apiData)
          setIsWrong(false)
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          //console.log(filterOpt, "waja")
          const res = await fetch(`${apiURL}/apiFiltradoMaquinas/index.php?${filterOpt}=${searchQuery.replace(/\s+/g, '')}`);
          const apiData = await res.json();
          if (apiData.error) {
            setIsWrong(true)
          } else {
            setIsWrong(false)
            setData(apiData)
          }
        } catch (error) {
          console.log(error)
        }
      }
    };

    obtenerDatos();

  }, [clickCount]);

  function handleClick(){
    setClickCount(p => p + 1)
  }

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
          placeholder="Buscar por marca"
          placeholderTextColor={"gray"}
          ref = {inputSearch}
        />

        <Button color= "#efd316" title =  "butonjaja" onPress={handleClick}/>

        
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
            {['Marca', 'Modelo', 'Categoria', 'Menor Capacidad', 'Mayor Capacidad', 'Menor Precio', 'Mayor Precio'].map((filterOption, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalItem}
                onPress={() => {
                  console.log(`Filtering by: ${filterOption}`);

                  switch (filterOption) {
                    case 'Marca':
                      setFilterOpt("marca")
                      inputSearch.current.placeholder = "Buscar por marca"
                      setSearchQuery("")
                      break;

                    case 'Modelo':
                      setFilterOpt("modelo")
                      inputSearch.current.placeholder = "Buscar por modelo"
                      setSearchQuery("")
                      break;

                    case 'Categoria':
                      setFilterOpt("categoria")
                      inputSearch.current.placeholder = "Buscar por categoria"
                      setSearchQuery("")
                      break;

                    case 'Menor Capacidad':
                      setFilterOpt("menorCapacidad")
                      inputSearch.current.placeholder = "Busqueda por menor capacidad"
                      setSearchQuery("")
                      setClickCount(p => p+1 )
                      break;

                    case 'Mayor Capacidad':
                      setFilterOpt("mayorCapacidad")
                      inputSearch.current.placeholder = "Busqueda por mayor capacidad"
                      setSearchQuery("")
                      setClickCount(p => p+1 )
                      break;
                      
                    case 'Menor Precio':
                      setFilterOpt("menorPrecio")
                      inputSearch.current.placeholder = "Busqueda por menor precio"
                      setSearchQuery("")
                      setClickCount(p => p+1 )
                      break;

                    case 'Mayor Precio':
                      setFilterOpt("mayorPrecio")
                      inputSearch.current.placeholder = "Busqueda por mayor precio"
                      setSearchQuery("")
                      setClickCount(p => p+1 )
                      break;

                    default:
                      setFilterOpt("marca")
                      break;
                  }
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.modalText}>{filterOption}</Text>
              </TouchableOpacity>
            ))}
            
          </View>
          
        </View>
      </Modal>

      {
        isWrong?
        <Text
            style = {{
              color: "white",
              textAlign: "center",
              backgroundColor: "#ee6e73",
              padding: "1rem"
            }}
          >No se encontraron resultados.</Text>:
            <MachineList data = {data}/>

      }

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
    borderColor: '#000000',
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
