import React from 'react';
import styles from './styles';
import { View, Text, StyleSheet } from 'react-native';

export default function QuestionsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo à tela de perguntas!</Text>
    </View>
  );
}