import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  getDownloadPermissionAndroid,
  downloadFile,
} from '../components/Download';
import RNFetchBlob from 'rn-fetch-blob';

const HomeApp = ({navigation, route}) => {
  const {usuario_data: data} = route.params;
  const [loading, setLoading] = useState(false);

  const goProfile = () => {
    navigation.navigate('Profile', {usuario_data: data});
  };

  async function downloadPDF() {
    setLoading(true);
    const url = `http://10.0.2.2:8000/api/generate-pdf/${data.usuario.id}`;

    if (Platform.OS === 'android') {
      try {
        downloadFile(url);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error('Error: ', err);
      }
    } else {
      downloadFile(url)
        .then(response => {
          RNFetchBlob.ios.previewDocument(response.path());
          setLoading(false);
        })
        .catch(err => {
          console.error('Error:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>Bem vindo de volta {data.usuario.nome}!</Text>
      <Button title="Perfil" onPress={goProfile} />
      {loading ? (
        <ActivityIndicator size="large" color={'#2532e7'} />
      ) : (
        <Button
          title="Baixar pdf com seus dados certificado pelo GOV."
          onPress={downloadPDF}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
// const styles = StyleSheet.create({});
export default HomeApp;
