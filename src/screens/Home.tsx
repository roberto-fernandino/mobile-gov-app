import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import RNFetchBlob, {RNFetchBlobStat} from 'rn-fetch-blob';

const HomeApp = ({navigation, route}) => {
  const {usuario_data: data} = route.params;
  const [loading, setLoading] = useState(false);

  const goProfile = () => {
    navigation.navigate('Profile', {usuario_data: data});
  };

  async function requestArmazenamentoPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permissão de Armazenamento',
          message:
            'Este aplicativo precisa de acesso ao seu armazenamento para baixar PDFs.',
          buttonNeutral: 'Perguntar-me depois',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permissão de armazenamento garantida!');
        return granted;
      } else {
        console.log('Permissão de armazenameto negada!');
        return PermissionsAndroid.RESULTS.DENIED;
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const hasArmazenamentoPermission = () => {
    const hasPermission = PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    return hasPermission;
  };

  async function downloadPDF() {
    const storagePermissionGranted = await hasArmazenamentoPermission();
    if (!storagePermissionGranted) {
      const granted = await requestArmazenamentoPermission();
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permissões negadas novamente.');
        return;
      }
    }
    setLoading(true);
    const {dirs} = RNFetchBlob.fs;
    const filePath = `${dirs.DownloadDir}`;
    const url = `http://10.0.2.2:8000/api/generate-pdf/${data.usuario.id}}`;
    RNFetchBlob.config({
      fileCache: true,
      path: filePath,
    })
      .fetch('GET', url)
      .then(res => {
        if (Platform.OS === 'android') {
          RNFetchBlob.android.actionViewIntent(res.path(), 'application/pdf');
        }
      })
      .catch(error => {
        console.error('Error: ', error);
      });
  }

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>Bem vindo de volta {data.usuario.nome}!</Text>
      <Button title="Perfil" onPress={goProfile} />
      {loading ? (
        <ActivityIndicator size="large" color={'#2532e7'} />
      ) : (
        <Button title="Download pdf from gov" onPress={downloadPDF} />
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
