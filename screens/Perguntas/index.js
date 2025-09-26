import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native'; // Importa o hook
import {
  Alert, Text, TextInput, TouchableOpacity,
  View, Keyboard, ScrollView, Image
} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native'; 
import * as DbService from '../../services/dbservice';

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

        // Função para carregar as perguntas do banco de dados
    const carregarPerguntas = async () => {
        try {
          console.log(tema.id)
            const data = await DbService.obterPerguntasPorTema(tema.id);
            setPerguntas(data); // Atualiza o estado com os dados recebidos
        } catch (error) {
            console.error("Erro ao carregar perguntas:", error);
            Alert.alert("Erro", "Não foi possível carregar as perguntas.");
        }
    };

    // UseEffect para chamar a função de carregamento
    useEffect(() => {
        carregarPerguntas();
    }, [tema.id]); // O efeito é executado sempre que o tema.id mudar

    return (
        <View style={styles.container}>
            <Text>Tela de Perguntas</Text>
            <Text>Perguntas de {tema.nome}</Text>
        <TouchableOpacity style={styles.botao} onPress={() => AdicionarPergunta(tema.id)}>
          <Text style={styles.textoBotao}>Nova Pergunta</Text>
        </TouchableOpacity>

        <ScrollView  style={styles.listaPerguntasScroll}
        contentContainerStyle={styles.listaPerguntas}>
        {
        perguntas.map((pergunta) => (
            <TouchableOpacity 
              style={styles.cardPergunta} // Crie esse estilo no seu arquivo styles.js
              
              key={pergunta.id.toString()}
            >
              <Text style={styles.textoPergunta}>{pergunta.pergunta}</Text>
            </TouchableOpacity>
          ))
        }

      </ScrollView>
        </View>
    );
}