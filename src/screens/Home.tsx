import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
const HomeApp = ({route}) => {
  const {usuario_data} = route.params;
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>Bem vindo de volta {usuario_data.nome}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
// const styles = StyleSheet.create({});
export default HomeApp;
