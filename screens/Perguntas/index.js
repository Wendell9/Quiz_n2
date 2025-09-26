import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native'; // Importa o hook
import {
  Alert, Text, TextInput, TouchableOpacity,
  View, Keyboard, ScrollView, Image
} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native'; 

export default function Perguntas() {
    const navigation = useNavigation();
    const route = useRoute();
    const { tema } = route.params; // Lê o parâmetro 'temaId'
    const [perguntas, setPerguntas] = useState([]);

    useEffect(() => {
        // Você pode usar o temaId para carregar os dados das perguntas aqui
        console.log(`Carregando perguntas para o tema ID: ${tema.id}`);
        // Ex: const perguntasDoTema = obterPerguntasPorId(temaId);
    }, [tema.id]);

     const AdicionarPergunta = (temaId) => {
        navigation.navigate('Pergunta', { temaId: temaId });
    };

    return (
        <View style={styles.container}>
            <Text>Tela de Perguntas</Text>
            <Text>Perguntas de {tema.nome}</Text>
        <TouchableOpacity style={styles.botao} onPress={() => AdicionarPergunta(tema.id)}>
          <Text style={styles.textoBotao}>Nova Pergunta</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.listaPerguntas}>
        {
          perguntas.map((pergunta, index) => (
            <CardPergunta tema={pergunta} key={index.toString()}
            removerElemento={removerElemento} editar={editar} 
              />
          ))
        }

      </ScrollView>
        </View>
    );
}