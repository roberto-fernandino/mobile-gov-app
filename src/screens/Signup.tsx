import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

const CadastroApp = () => {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState(new Date());

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

  const checkEmail = (inputEmail: string) => {
    var regex =
      /^[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?$/;
    return regex.test(inputEmail);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.img} source={require('../img/gov.png')} />
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Johh"
            keyboardType="default"
            value={nome}
            onChangeText={setNome}
          />
          <Text style={styles.inputLabel}>sobrenome</Text>
          <TextInput
            style={styles.input}
            placeholder="Lennon"
            keyboardType="default"
            value={sobrenome}
            onChangeText={setSobrenome}
          />
          <Text style={styles.inputLabel}>cpf</Text>
          <TextInput
            style={styles.input}
            placeholder="123.456.789-01"
            keyboardType="numeric"
            value={cpf}
            onChangeText={HandleCpfChange}
          />
          <Text style={styles.inputLabel}>email</Text>
          <TextInput
            style={styles.input}
            placeholder="johhlennonthebeatles@email.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.inputLabel}>data nascimento</Text>
          <DatePicker
            date={dataNascimento}
            onDateChange={setDataNascimento}
            mode="date"
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 15,
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

export default CadastroApp;
