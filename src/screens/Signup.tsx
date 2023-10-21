import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Dropdown} from 'react-native-element-dropdown';

const CadastroApp = ({navigation}) => {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState(new Date());
  const [emailValido, setEmailValido] = useState(false);
  const [cep, setCep] = useState('');
  const [cepValido, setCepValido] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [escolaridade, setEscolaridade] = useState('');
  const [familia, setFamilia] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const familiaChoices = [
    {value: 'Até 5 Membros', label: 'Até 5 Membros'},
    {value: 'Até 10 Membros', label: 'Até 10 Membros'},
    {value: 'Mais que 10', label: 'Mais que 10'},
  ];
  const dinheiroChoices = [
    {label: 'R$ 0.0 - R$ 1.000.00', value: 'R$ 0.0 - R$ 1.000.00'},
    {label: 'R$ 1.000.00 - R$ 5.000.00', value: 'R$ 1.000.00 - R$ 5.000.00'},
    {label: 'R$ 5.000.00 - R$ 15.000.00', value: 'R$ 5.000.00 - R$ 15.000.00'},
    {label: 'Maior que R$ 20.000.00', value: 'Maior que R$ 20.000.00'},
  ];
  const escolaridadeChoices = [
    {
      label: 'Ensino Fundamental Incompleto',
      value: 'Ensino Fundamental Incompleto',
    },
    {label: 'Ensino Médio Incompleto', value: 'Ensino Médio Incompleto'},
    {label: 'Ensino Médio Completo', value: 'Ensino Médio Completo'},
    {label: 'Cursando Faculdade', value: 'Cursando Faculdade'},
    {label: 'Curso Superior Completo', value: 'Curso Superior Completo'},
  ];
  const [rendaPessoal, setRendaPessoal] = useState('');
  const [gastoPessoal, setGastoPessoal] = useState('');

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

  const formatCep = (inputCep: string) => {
    const numbers = inputCep.replace(/\D/g, '');
    if (numbers.length === 8) {
      return `${numbers.slice(0, 5)}-${numbers.slice(5)}`;
    }
    return inputCep;
  };

  const handleCepChange = (text: string) => {
    const formattedCep = formatCep(text);
    setCep(formattedCep);
  };

  const handleCpfChange = (text: string) => {
    const formattedCpf = formatCpf(text);
    setCpf(formattedCpf);
  };

  const checkEmail = (inputEmail: string) => {
    setEmail(inputEmail);
    var regex =
      /^[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?$/;
    const test = regex.test(inputEmail);
    return test;
  };
  const handleEmail = (text: string) => {
    if (checkEmail(text)) {
      setEmailValido(true);
    } else {
      setEmailValido(false);
    }
  };
  const showAlert = () => {
    setModalVisible(true);
  };
  const hideAlert = () => {
    setModalVisible(false);
  };
  interface IData {
    cpf: string;
    nome: string;
    sobrenome: string;
    email: string;
    dataNascimento: Date;
    password: string;
    cep: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    renda: string;
    gasto: string;
    familia: string;
    escolaridade: string;
    complemento?: string; // O '?' torna a propriedade opcional
  }
  const submitSignup = () => {
    if (
      !nome ||
      !emailValido ||
      !cpf ||
      !sobrenome ||
      !dataNascimento ||
      !password ||
      !logradouro ||
      !bairro ||
      !cep ||
      !numero ||
      !cidade ||
      !rendaPessoal ||
      !gastoPessoal ||
      !escolaridade ||
      !familia
    ) {
      showAlert();
      setLoading(false);
      return;
    }
    setLoading(true);
    var data: IData = {
      cpf: cpf,
      nome: nome,
      sobrenome: sobrenome,
      email: email,
      dataNascimento: dataNascimento,
      password: password,
      cep: cep,
      logradouro: logradouro,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      renda: rendaPessoal,
      gasto: gastoPessoal,
      familia: familia,
      escolaridade: escolaridade,
    };
    if (complemento) {
      data.complemento = complemento;
    }
    const body = JSON.stringify(data);
    console.log('request body: ', body);
    fetch('http://10.0.2.2:8000/api/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })
      .then(response => {
        setLoading(false);
        if (response.status !== 201) {
          console.log(
            'Account não foi criada (status): ',
            response.status,
            'Error: ',
            response.statusText,
          );
        }
        if (response.status === 201) {
          navigation.navigate('Login');
        }
      })
      .catch(error => {
        console.log('Error: ', error);
        setLoading(false);
        Alert.alert(
          'Erro de conexão',
          'Não foi possivel conectar ao servidor. Por favor, tente novamente.',
          [{text: 'OK'}],
        );
      });
  };
  const checkCep = (cepInput: string) => {
    setCepLoading(true);
    const url = `https://viacep.com.br/ws/${cepInput}/json`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setCepLoading(false);
        if (!response.ok) {
          console.log(
            'HTTP ERROR:',
            response.status,
            ' Text: ',
            response.statusText,
          );
          setCepValido(false);
        }
        return response.json();
      })
      .then(data => {
        setCepValido(true);
        setLogradouro(data.logradouro);
        setBairro(data.bairro);
        setCidade(data.localidade);
      })
      .catch(error => {
        setCepValido(false);
        console.log('Error: ', error);
      });
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.img} source={require('../img/gov.png')} />
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={hideAlert} // Isso é chamado quando o usuário tenta fechar o modal pressionando o botão 'Voltar' no Android
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Todos os campos são obrigatórios!
              </Text>

              <TouchableOpacity style={styles.buttonClose} onPress={hideAlert}>
                <Text style={styles.textStyle}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.formContainer}>
          <Text style={styles.formInformation}>Informações pessoais</Text>
          <Text style={styles.inputLabel}>nome</Text>
          <TextInput
            style={styles.input}
            placeholder="John"
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
            onChangeText={handleCpfChange}
          />
          <Text style={styles.inputLabel}>
            {emailValido ? 'email ✅' : 'email'}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="johhlennonthebeatles@email.com"
            keyboardType="email-address"
            value={email}
            onChangeText={handleEmail}
          />
          <Text style={styles.inputLabel}>data nascimento</Text>
          <DatePicker
            date={dataNascimento}
            onDateChange={setDataNascimento}
            mode="date"
          />
          <Text style={styles.inputLabel}>Renda pessoal</Text>
          <Dropdown
            style={styles.dropdown}
            data={dinheiroChoices}
            search
            labelField="label"
            valueField="value"
            placeholder="Selecione sua renda"
            value={rendaPessoal}
            maxHeight={300}
            onChange={item => {
              setRendaPessoal(item.value);
            }}
            searchPlaceholder="Pesquisar"
          />
          <Text style={styles.inputLabel}>Gasto pessoal</Text>
          <Dropdown
            style={styles.dropdown}
            data={dinheiroChoices}
            search
            labelField="label"
            valueField="value"
            placeholder="Selecione seu gasto"
            value={gastoPessoal}
            maxHeight={300}
            onChange={item => {
              setGastoPessoal(item.value);
            }}
            searchPlaceholder="Pesquisar"
          />
          <Text style={styles.inputLabel}>Escolaridade</Text>
          <Dropdown
            style={styles.dropdown}
            data={escolaridadeChoices}
            search
            labelField="label"
            valueField="value"
            placeholder="Selecione sua escolaridade"
            value={escolaridade}
            maxHeight={300}
            onChange={item => {
              setEscolaridade(item.value);
            }}
            searchPlaceholder="Pesquisar"
          />
          <Text style={styles.inputLabel}>Numero de familiares</Text>
          <Dropdown
            style={styles.dropdown}
            data={familiaChoices}
            search
            labelField="label"
            valueField="value"
            placeholder="Selecione numero de familiares"
            value={familia}
            maxHeight={300}
            onChange={item => {
              setFamilia(item.value);
            }}
            searchPlaceholder="Pesquisar"
          />

          <Text style={styles.inputLabel}>senha</Text>
          <TextInput
            style={styles.input}
            placeholder="senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Text style={styles.formInformation}>Endereço</Text>
          <Text style={styles.inputLabel}>cep</Text>
          <View style={styles.cepConfirmationContainer}>
            <TextInput
              style={styles.inputCep}
              placeholder="000000-000"
              value={cep}
              maxLength={9}
              onChangeText={handleCepChange}
              keyboardType="numeric"
            />
            {cepLoading ? (
              <ActivityIndicator size="large" color={'#ffffff'} />
            ) : (
              <TouchableOpacity
                onPress={() => checkCep(cep)}
                style={styles.submitButtonCep}>
                <Text style={styles.submitText}>
                  {cepValido ? '✅' : 'confirmar cep'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.inputLabel}>Logradouro</Text>
          <TextInput
            style={styles.input}
            placeholder="Rua da Maçaneta"
            value={logradouro}
            onChangeText={setLogradouro}
          />
          <Text style={styles.inputLabel}>Numero</Text>
          <TextInput
            style={styles.input}
            value={numero}
            onChangeText={setNumero}
          />
          <Text style={styles.inputLabel}>Complemento</Text>
          <TextInput
            style={styles.input}
            value={complemento}
            onChangeText={setComplemento}
            placeholder="Bloco X Apto. 1901"
          />
          <Text style={styles.inputLabel}>Bairro</Text>
          <TextInput
            style={styles.input}
            placeholder="Chaves"
            value={bairro}
            onChangeText={setBairro}
          />
          <Text style={styles.inputLabel}>Cidade</Text>
          <TextInput
            style={styles.input}
            placeholder="Porta"
            value={cidade}
            onChangeText={setCidade}
          />
          <View style={styles.buttonSubmitContainer}>
            <View style={styles.submitContainerAdvice}>
              <Text>
                Caso a conta seja criada voce sera redirecionado pra tela de
                login automaticamente.
              </Text>
            </View>
            {loading ? (
              <ActivityIndicator size="large" color={'#2532e7'} />
            ) : (
              <TouchableOpacity
                onPress={submitSignup}
                style={styles.submitButton}>
                <Text style={styles.submitText}> Cadastrar </Text>
              </TouchableOpacity>
            )}
          </View>
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
  submitContainerAdvice: {
    width: 200,
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
    color: '#000000',
    fontStyle: 'italic',
    fontWeight: '300',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonSubmitContainer: {
    alignItems: 'center',
  },
  formInformation: {
    fontSize: 40,
    fontWeight: '400',
    color: '#2a2424',
    marginBottom: 40,
    marginTop: 40,
  },
  inputCep: {
    padding: 10,
    height: 42,
    width: 120,
    borderWidth: 1,
    margin: 12,
    borderRadius: 7,
    fontWeight: 'bold',
    fontSize: 18,
  },
  cepConfirmationContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  submitButtonCep: {
    width: 200,
    backgroundColor: '#494ecd',
    height: 42,
    alignItems: 'center',
    borderRadius: 18,
    marginTop: 10,
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    width: 320,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CadastroApp;
