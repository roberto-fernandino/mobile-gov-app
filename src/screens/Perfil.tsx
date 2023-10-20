import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function ProfileApp({route}) {
  const {usuario_data} = route.params;
  console.log('usuario_data: ', usuario_data);
  return (
    <View style={styles.informationContainer}>
      <View style={styles.informationCards}>
        <Text style={styles.cardHeader}>Informação Pessoal</Text>
        <Text style={styles.cardInfo}>{usuario_data.nome}</Text>
        <Text style={styles.cardInfo}>{usuario_data.cpf}</Text>
        <Text style={styles.cardInfo}>{usuario_data.email}</Text>
      </View>
      <View style={styles.informationCards}>
        <Text style={styles.cardHeader}>Endereço</Text>
        <Text style={styles.cardInfo}>a</Text>
        <Text style={styles.cardInfo}>b</Text>
        <Text style={styles.cardInfo}>c</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  informationContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  informationCards: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#6f7471d5',
    borderRadius: 10,
    marginTop: 15,
  },
  cardHeader: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#000',
  },
  cardInfo: {
    fontSize: 30,
    color: '#000',
    padding: 10,
  },
});
