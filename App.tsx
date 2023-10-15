import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';

const LoginApp = () => {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const submitLogin = () => {
    setLoading(true);
    fetch('https://minha-api.com/login', {
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
      .then(data => console.log(data))
      .catch(error => console.error('Error: ', error));
  };
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('./img/gov.png')} />
      <TextInput
        style={styles.input}
        placeholder="123.456.789-01"
        keyboardType="numeric"
        value={cpf}
        onChangeText={setCpf}
      />
      <TextInput
        style={styles.input}
        placeholder="senha"
        value={password}
        onChangeText={setPassword}
      />
      {loading ? (
        <ActivityIndicator size="large" color={'#ffffff'} />
      ) : (
        <Button title="Login" onPress={submitLogin} />
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
    borderWidth: 1,
    margin: 12,
  },
});

export default LoginApp;
