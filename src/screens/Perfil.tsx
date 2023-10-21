import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

export default function ProfileApp({route}) {
  const {usuario_data: data} = route.params;
  console.log('usuario_data: ', data);
  return (
    <View style={styles.informationContainer}>
      <ScrollView>
        <View style={styles.informationCards}>
          <Text style={styles.cardHeader}>Informação Pessoal</Text>
          <Text style={styles.cardInfo}>{data.usuario.nome}</Text>
          <Text style={styles.cardInfo}>{data.usuario.cpf}</Text>
          <Text style={styles.cardInfo}>{data.usuario.email}</Text>
        </View>
        <View style={styles.informationCards}>
          <Text style={styles.cardHeader}>Endereço</Text>
          <Text style={styles.cardInfo}>Cep: {data.endereco.cep}</Text>
          <Text style={styles.cardInfo}>Cidade: {data.endereco.cidade}</Text>
          <Text style={styles.cardInfo}>
            Logradouro: {data.endereco.logradouro}, {data.endereco.numero}
          </Text>
          <Text style={styles.cardInfo}>Bairro: {data.endereco.bairro}</Text>
        </View>
        <View style={styles.informationCards}>
          <Text style={styles.cardHeader}>Informaçõess</Text>
          <Text style={styles.cardInfo}>Renda: {data.informacoes.renda}</Text>
          <Text style={styles.cardInfo}>
            Despesas mensais: {data.informacoes.despesas_mensais}
          </Text>
          <Text style={styles.cardInfo}>
            Numero de familiares: {data.informacoes.numero_membros_familia}
          </Text>
          <Text style={styles.cardInfo}>
            Escolaridade: {data.informacoes.nivel_escolaridade}
          </Text>
        </View>
      </ScrollView>
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
