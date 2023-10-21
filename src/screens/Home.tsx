import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

const HomeApp = ({navigation, route}) => {
  const {usuario_data: data} = route.params;
  const goProfile = () => {
    console.log('usuario_data: ', data);
    navigation.navigate('Profile', {usuario_data: data});
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>Bem vindo de volta {data.usuario.nome}!</Text>
      <Button title="Perfil" onPress={goProfile} />
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
