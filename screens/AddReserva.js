import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import axios from 'axios';
import { useCart } from "../context/CartContext";
import { useAuth } from '../components/AuthProvider';
import { apiURL } from '../api/apiGlobal';

const Formulario = ({ route, navigation }) => {
  const { diasReserva, fechaInicio, fechaFinal } = route.params;
  const { cart } = useCart();
  const { nn, idCl } = useAuth();  

  const formatDate = date => new Date(date).toISOString().slice(0, 10);
  const inicioFormato = formatDate(fechaInicio);
  const finalFormato = formatDate(fechaFinal);
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

  const validarCampos = () => {
    let isValid = true;
    let newErrors = {};

    if (!nombre) {
      newErrors.nombre = 'El nombre es obligatorio';
      isValid = false;
    }
    if (!apPat) {
      newErrors.apPat = 'El apellido paterno es obligatorio';
      isValid = false;
    }
    if (!apMat) {
      newErrors.apMat = 'El apellido materno es obligatorio';
      isValid = false;
    }
    if (!numTel) {
      newErrors.numTel = 'El número de teléfono es obligatorio';
      isValid = false;
    } else if (numTel.length !== 10) {
      newErrors.numTel = 'El número de teléfono debe tener 10 dígitos';
      isValid = false;
    }
    if (!colonia) {
      newErrors.colonia = 'La colonia es obligatoria';
      isValid = false;
    }
    if (!calle) {
      newErrors.calle = 'La calle es obligatoria';
      isValid = false;
    }
    if (!numero) {
      newErrors.numero = 'El número es obligatorio';
      isValid = false;
    }
    if (!cp) {
      newErrors.cp = 'El código postal es obligatorio';
      isValid = false;
    } else if (cp.length !== 5) {
      newErrors.cp = 'El código postal debe tener 5 dígitos';
      isValid = false;
    }
    if (!descripcion) {
      newErrors.descripcion = 'La descripción es obligatoria';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

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
      setErrors(prev => ({...prev, [type]: ''}));
    }
  };

  const handleNumTelChange = (text) => {
    if (/^\d{0,10}$/.test(text)) {
      setNumTel(text);
      setErrors(prev => ({...prev, numTel: ''}));
    }
  };

  const handleCpChange = (text) => {
    if (/^\d{0,5}$/.test(text)) {
      setCp(text);
      setErrors(prev => ({...prev, cp: ''}));
    }
  };

  

  const enviarDatos = (data, onSuccess, onError) => {
  if (!validarCampos()) {
    if (onError) {
      onError('Validation failed');
    }
    return;
  }

  const _apiURL = `${apiURL}/loginExample/addReserve.php`;

  const payload = {
    nombre: nombre,
    apPat: apPat,
    apMat: apMat,
    colonia: colonia,
    calle: calle,
    num: numero,
    cp: cp,
    descripcion: descripcion,
    cliente: idCl,
    fechaInicial: inicioFormato,
    fechaFinal: finalFormato,
    fechaEntrega: inicioFormato,
    maquinarias: cart.map(item => ({ id: item.id, cantDias: diasReserva })),
};

  axios.post(_apiURL, payload)
    .then(response => {
      Alert.alert("Éxito", "La reserva se ha confirmado con éxito.");
      setNombre('');
      setApPat('');
      setApMat('');
      setNumTel('');
      setColonia('');
      setCalle('');
      setNumero('');
      setCp('');
      setDescripcion('');
      if (onSuccess) onSuccess(response.data);
    })
    .catch(error => {
      console.error('Error:', error);
      Alert.alert("Error", "Hubo un problema al enviar tu reserva. Inténtalo de nuevo.");
      if (onError) onError(error);
    });

  console.log(payload);
};




  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Receptor</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleTextChange(text, 'nombre')}
        value={nombre}
        placeholder="Nombre"
      />
      {errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleTextChange(text, 'apPat')}
        value={apPat}
        placeholder="Apellido Paterno"
      />
      {errors.apPat && <Text style={styles.errorText}>{errors.apPat}</Text>}
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleTextChange(text, 'apMat')}
        value={apMat}
        placeholder="Apellido Materno"
      />
      {errors.apMat && <Text style={styles.errorText}>{errors.apMat}</Text>}
      <TextInput
        style={styles.input}
        onChangeText={handleNumTelChange}
        value={numTel}
        placeholder="Número de Teléfono"
      />
      {errors.numTel && <Text style={styles.errorText}>{errors.numTel}</Text>}
      <Text style={styles.headerText}>Dirección</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setColonia(text)}
        value={colonia}
        placeholder="Colonia"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setCalle(text)}
        value={calle}
        placeholder="Calle"
      />
      {errors.numero && <Text style={styles.errorText}>{errors.numero}</Text>}

      <TextInput
        style={styles.input}
        onChangeText={(text) => setNumero(text)}
        value={numero}
        placeholder="Número"
      />
      {errors.cp && <Text style={styles.errorText}>{errors.cp}</Text>}
      <TextInput
        style={styles.input}
        onChangeText={handleCpChange}
        value={cp}
        placeholder="Código Postal"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setDescripcion(text)}
        value={descripcion}
        placeholder="Descripción de la reserva"
      />
      <Button
        title="Confirmar Reserva"
        onPress={enviarDatos}
      />
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

export default Formulario;
