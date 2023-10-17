import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

const LoginApp = () => {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const formatCpf = (inputCpf: string) => {
    const numbers = inputCpf.replace(/\D/g, '');
    const matches = numbers.match(/^(\d{0,3})(\d{0,3})?(\d{0,3})?(\d{0,2})?/);
    if (matches) {
      const mask = `${matches[1] || ''}${matches[2] ? '.' : ''}${
        matches[2] || ''
      }${matches[3] ? '.' : ''}${matches[3] || ''}${matches[4] ? '-' : ''}${
        matches[4] || ''
      }`;
      return mask;
    }
    return '';
  };

  const HandleCpfChange = (text: string) => {
    const formattedCpf = formatCpf(text);
    setCpf(formattedCpf);
  };
  const submitLogin = () => {
    setLoading(true);
    fetch('http://10.0.2.2:8000/usuarios/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cpf,
        password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error: ', error);
      });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('./img/gov.png')} />
      <TextInput
        style={styles.input}
        placeholder="123.456.789-01"
        keyboardType="numeric"
        value={cpf}
        onChangeText={HandleCpfChange}
      />
      <TextInput
        style={styles.input}
        placeholder="senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      {loading ? (
        <ActivityIndicator size="large" color={'#ffffff'} />
      ) : (
        <TouchableOpacity onPress={submitLogin} style={styles.submitButton}>
          <Text style={styles.submitText}> Login </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3 * (921 / 2560),
  },
  input: {
    padding: 10,
    height: 42,
    width: 320,
    borderWidth: 1,
    margin: 12,
  },
  submitButton: {
    width: 220,
    backgroundColor: '#48ad44',
    height: 42,
    alignItems: 'center',
    borderRadius: 10,
  },
  submitText: {
    fontSize: 30,
    color: '#ffff',
  },
});

export default LoginApp;
