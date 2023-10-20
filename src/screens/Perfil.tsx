import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function ProfileApp({route}) {
  const {user_data} = route.params;
  return (
    <View style={styles.informationContainer}>
      <View style={styles.informationCards}>
        <Text style={styles.cardHeader}>Informação Pessoal</Text>
        <Text style={styles.cardInfo}>{user_data.nome}</Text>
        <Text style={styles.cardInfo}>{user_data.cpf}</Text>
        <Text style={styles.cardInfo}>{user_data.email}</Text>
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
    backgroundColor: '#grey',
  },
  cardHeader: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '##000000',
  },
  cardInfo: {
    fontSize: 30,
    color: '##000000',
  },
});
