import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

import { useAuth } from '../components/AuthProvider';
import { useCart } from "../context/CartContext";



const AddReserva = () => {

  //contenido del carro
  const { cart } = useCart();

  //id cliente
  const { nn, idCl } = useAuth(); 
  const cliente = idCl;

  const [nombre, setNombre] = useState('');
  const [apPat, setApPat] = useState('');
  const [apMat, setApMat] = useState('');
  const [numTel, setNumTel] = useState('');
  const [colonia, setColonia] = useState('');
  const [calle, setCalle] = useState('');
  const [numero, setNumero] = useState('');
  const [cp, setCp] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [errors, setErrors] = useState({});

  // Validador de fechas
  const obtenerFechaMinima = () => {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + 2);
    return fecha.toISOString().split('T')[0];
  };

  const obtenerFechaMaxima = () => {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + 2);
    fecha.setMonth(fecha.getMonth() + 6);
    return fecha.toISOString().split('T')[0];
  };

  const [fechaInicio, setFechaInicio] = useState(obtenerFechaMinima());
  const [fechaFinal, setFechaFinal] = useState(obtenerFechaMinima());
  const fechaMin = obtenerFechaMinima();
  const fechaMax = obtenerFechaMaxima();

  // Validación de campos
  const validarCampos = () => {
    let isValid = true;
    let newErrors = {};

    // Validaciones aquí...

    setErrors(newErrors);
    return isValid;
  };

  // Manejadores de texto
  const handleTextChange = (text, type) => {
    if (/^[a-zA-Z\s]*$/.test(text)) {
      switch (type) {
        case 'nombre':
          setNombre(text);
          break;
        case 'apPat':
          setApPat(text);
          break;
        case 'apMat':
          setApMat(text);
          break;
        default:
          break;
      }
      setErrors(prev => ({ ...prev, [type]: '' }));
    }
  };

  const handleNumTelChange = (text) => {
    if (/^\d{0,10}$/.test(text)) {
      setNumTel(text);
      setErrors(prev => ({ ...prev, numTel: '' }));
    }
  };

  const handleCpChange = (text) => {
    if (/^\d{0,5}$/.test(text)) {
      setCp(text);
      setErrors(prev => ({ ...prev, cp: '' }));
    }
  };

  // Enviar datos
  const enviarDatos = () => {
    if (!validarCampos()) return;

    const dataToSend = {
      cliente,
      nombre,
      apPat,
      apMat,
      numTel,
      colonia,
      calle,
      num: numero,
      cp,
      descripcion,
      fechaInicial: fechaInicio,
      fechaFinal: fechaFinal,
      maquinarias: cart 
    };
    //console.log(dataToSend);
    axios.post('https://tu-dominio.com/tu-ruta-api', dataToSend)
      .then(response => {
        Alert.alert("Éxito", "La reserva se ha confirmado con éxito.");
        // Limpiar formulario
        setNombre('');
        setApPat('');
        setApMat('');
        setNumTel('');
        setColonia('');
        setCalle('');
        setNumero('');
        setCp('');
        setDescripcion('');
        setFechaInicio(obtenerFechaMinima());
        setFechaFinal(obtenerFechaMinima());
      })
      .catch(error => {
        console.log(error);
        Alert.alert("Error", "Hubo un problema al enviar tu reserva. Inténtalo de nuevo.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Receptor</Text>
      <TextInput style={styles.input} onChangeText={(text) => handleTextChange(text, 'nombre')} value={nombre} placeholder="Nombre" />
      {errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}
      <TextInput style={styles.input} onChangeText={(text) => handleTextChange(text, 'apPat')} value={apPat} placeholder="Apellido Paterno" />
      {errors.apPat && <Text style={styles.errorText}>{errors.apPat}</Text>}
      <TextInput style={styles.input} onChangeText={(text) => handleTextChange(text, 'apMat')} value={apMat} placeholder="Apellido Materno" />
      {errors.apMat && <Text style={styles.errorText}>{errors.apMat}</Text>}
      <TextInput style={styles.input} onChangeText={handleNumTelChange} value={numTel} placeholder="Numero de Telefono" />
      {errors.numTel && <Text style={styles.errorText}>{errors.numTel}</Text>}
      <Text style={styles.headerText}>Direccion</Text>
      <TextInput style={styles.input} onChangeText={(text) => setColonia(text)} value={colonia} placeholder="Colonia" />
      <TextInput style={styles.input} onChangeText={(text) => setCalle(text)} value={calle} placeholder="Calle" />
      <TextInput style={styles.input} onChangeText={(text) => setNumero(text)} value={numero} placeholder="Numero" />
      <TextInput style={styles.input} onChangeText={handleCpChange} value={cp} placeholder="Codigo Postal" />
      <TextInput style={styles.input} onChangeText={(text) => setDescripcion(text)} value={descripcion} placeholder="Descripcion de la reserva" />
      <TouchableOpacity
          onPress={enviarDatos}
          style={styles.Button}
        >
          <Text style={styles.ButtonText}>
            Realizar registro
          </Text>
        </TouchableOpacity>

      
    </View>
    
  );
};


const styles = StyleSheet.create({
  mainContainer: {
      flex: 1,
      backgroundColor: '#f1f1f1',
      //alignItems: 'center',

  },
  userSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  svgContainer: {
      alignItems: 'center',
      marginTop: 50,
  },
  container: {
    marginTop: 40,
    alignItems: 'center',
  },
  input: {
      width: '80%',
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 25,
      padding: 15,
      marginBottom: 20,
      fontSize: 16,
  },
  Button: {
      width: '80%',
      height: 50,
      backgroundColor: '#FFCD11',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
  },
  ButtonText: {
      color: '#000000',
      fontSize: 18,
  },
  emailText: {
      marginTop: 20,
      color: 'grey',
  },
  textAddUser: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      color: 'blue',
      textDecorationLine: 'underline',
  },
  text: {
      fontSize: 18,
      //fontWeight: 'bold',
      color: '#333',
  },
  containerRegister: {
      padding: 20,
      alignItems: 'center',

  },
  
  headerText: {
    fontSize: 30, 
    fontWeight: 'bold', 
    marginBottom: 10, 
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  }
});

export default AddReserva;
