import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import styles from './styles';
import { useRoute } from '@react-navigation/native'; 

export default function Pergunta() {
  // Estado para a pergunta principal
  const [pergunta, setPergunta] = useState('');
  const route = useRoute();
  const { temaId } = route.params; // Lê o parâmetro 'temaId'

  // Estado para as quatro alternativas. 'isCorrect' é booleano para a resposta correta.
  const [alternativas, setAlternativas] = useState([
    { id: 0, text: '', isCorrect: false },
    { id: 1, text: '', isCorrect: false },
    { id: 2, text: '', isCorrect: false },
    { id: 3, text: '', isCorrect: false },
  ]);

  // Função para atualizar o texto de uma alternativa
  const handleAlternativeChange = (text, id) => {
    const novasAlternativas = alternativas.map((alt) =>
      alt.id === id ? { ...alt, text: text } : alt
    );
    setAlternativas(novasAlternativas);
  };

  // Função para selecionar a alternativa correta
  const handleCorrectAlternative = (id) => {
    const novasAlternativas = alternativas.map((alt) =>
      alt.id === id
        ? { ...alt, isCorrect: true } // Marca esta como correta
        : { ...alt, isCorrect: false } // Desmarca as outras
    );
    setAlternativas(novasAlternativas);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Input para a pergunta */}
      <Text style={styles.label}>Escreva a pergunta:</Text>
      <TextInput
        style={styles.input}
        multiline
        value={pergunta}
        onChangeText={setPergunta}
        placeholder="Digite a pergunta aqui..."
      />

      {/* Inputs para as alternativas */}
      <Text style={styles.label}>Escreva as alternativas:</Text>
      {alternativas.map((alternativa) => (
        <View key={alternativa.id} style={styles.alternativaContainer}>
          {/* Botão de seleção da alternativa correta */}
          <TouchableOpacity
            style={[
              styles.circle,
              alternativa.isCorrect && styles.circleFilled, // Aplica estilo se for a correta
            ]}
            onPress={() => handleCorrectAlternative(alternativa.id)}
          />
          {/* Input para o texto da alternativa */}
          <TextInput
            style={styles.inputAlternativa}
            value={alternativa.text}
            onChangeText={(text) => handleAlternativeChange(text, alternativa.id)}
            placeholder={`Alternativa ${String.fromCharCode(65 + alternativa.id)}`}
          />
        </View>
      ))}

      {/* Exemplo de como você pode pegar os dados para salvar */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const dadosPergunta = {
            pergunta: pergunta,
            alternativas: alternativas,
          };
          console.log('Dados da Pergunta:', dadosPergunta);
        }}
      >
        <Text style={styles.buttonText}>Salvar Pergunta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
