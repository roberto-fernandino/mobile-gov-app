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

const LoginApp = ({navigation}) => {
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
    const body = JSON.stringify({
      cpf: cpf,
      password: password,
    });
    const url = 'http://10.0.2.2:8000/api/login/';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })
      .then(response => {
        if (!response.ok) {
          console.log('HTTP ERORR! status: ', response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log('Data: ', data);
        console.log('detail: ', data.detail);
        if (data.detail === 'logado') {
          handleLogin(data.usuario);
        }
      })
      .catch(error => {
        console.error('Error: ', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleLogin = usuario_data => {
    navigation.navigate('Home', {usuario_data});
  };
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../img/gov.png')} />
      <View style={styles.formContainer}>
        <Text style={styles.inputLabel}>cpf</Text>
        <TextInput
          style={styles.input}
          placeholder="123.456.789-01"
          keyboardType="numeric"
          value={cpf}
          onChangeText={HandleCpfChange}
        />
        <Text style={styles.inputLabel}>senha</Text>
        <TextInput
          style={styles.input}
          placeholder="senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonSubmitContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={'#2532e7'} />
        ) : (
          <TouchableOpacity onPress={submitLogin} style={styles.submitButton}>
            <Text style={styles.submitText}> Login </Text>
          </TouchableOpacity>
        )}
      </View>
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
    borderRadius: 7,
    fontWeight: 'bold',
    fontSize: 18,
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
  inputLabel: {
    fontSize: 30,
    marginLeft: 15,
    color: '#000000',
    fontStyle: 'italic',
    fontWeight: '600',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonSubmitContainer: {
    alignItems: 'center',
  },
});

export default LoginApp;
