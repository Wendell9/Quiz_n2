import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import * as DbService from "../../services/dbservice";
import { useNavigation } from "@react-navigation/native";

export default function Pergunta() {
  const navigation = useNavigation();
  // Estado para a pergunta principal
  const [pergunta, setPergunta] = useState("");
  const route = useRoute();
  const { temaId, perguntaId } = route.params; // Lê o parâmetro 'temaId'

  useEffect(() => {
    if (perguntaId) {
      carregarDadosEditar();
    }
  }, [perguntaId]);

  async function carregarDadosEditar() {
    if (perguntaId) {
      let pergunta;
      pergunta = await DbService.puxarDadosPergunta(perguntaId, temaId);
      if (pergunta) {
        console.log("A pergunta puxada do banco de dados foi: ", pergunta)
        setPergunta(pergunta.textoPergunta);
        setAlternativas(pergunta.alternativas);
      } else {
        console.log("Não foi possível encontrar a pergunta para editar");
      }
    }
  }

  // Estado para as quatro alternativas. 'isCorrect' é booleano para a resposta correta.
  const [alternativas, setAlternativas] = useState([
    { id: "A", text: "", isCorrect: false },
    { id: "B", text: "", isCorrect: false },
    { id: "C", text: "", isCorrect: false },
    { id: "D", text: "", isCorrect: false },
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
    const novasAlternativas = alternativas.map(
      (alt) =>
        alt.id === id
          ? { ...alt, isCorrect: true } // Marca esta como correta
          : { ...alt, isCorrect: false } // Desmarca as outras
    );
    setAlternativas(novasAlternativas);
  };

  function temAlternativasDuplicadas(alternativas) {
    // 1. Pega apenas o texto de cada alternativa
    const textos = alternativas.map(alt => alt.text.toLowerCase().trim());

    // 2. Cria um Set com esses textos. O Set remove duplicatas automaticamente.
    const textosUnicos = new Set(textos);

    // 3. Compara o tamanho do Set com o número total de alternativas.
    // Se os tamanhos forem diferentes, há duplicatas.
    return textosUnicos.size !== alternativas.length;
}

  const SalvarPergunta = async () => {
    if (!pergunta.trim()) {
      Alert.alert("Atenção", "Por favor, escreva a pergunta.");
      return;
    }
    const alternativaCorreta = alternativas.find((alt) => alt.isCorrect);
    if (!alternativaCorreta) {
      Alert.alert("Atenção", "Por favor, selecione a alternativa correta.");
      return;
    }
    if(temAlternativasDuplicadas(alternativas)){
      Alert.alert("Atenção", "Não é permitido a mesma resposta em mais de uma alternativa")
      return
    }
    const algumaRespostaVazia = alternativas.some((alt) => alt.text === "");

    if (algumaRespostaVazia) {
      Alert.alert("Atenção", "Por favor, preencha todas as respostas.");
      return;
    }

    let perguntaJaExiste = await DbService.verificaPerguntaExistente(temaId, pergunta)

    if(perguntaJaExiste){
      Alert.alert("Atenção", "Essa pergunta ja foi cadastrada. Por favor escolha outra pergunta;");
      return;
    }

    let indexCorreto;

    alternativas.forEach((element) => {
      if (element.isCorrect) {
        indexCorreto = element.id;
      }
    });

    console.log("A alternativa correta é: " + indexCorreto);

    try {
      const dadosPergunta = {
        pergunta: pergunta,
        alternativas: alternativas,
        alternativaCorreta: indexCorreto,
      };

      console.log(alternativas);

      let resultado;

      // Verifica se o perguntaId foi passado. Se sim, é uma edição.
      if (perguntaId !== undefined) {
        console.log("Modo de Edição: Chamando atualizaPergunta.");
        // Você precisará criar essa função na próxima etapa
        resultado = await DbService.atualizaPergunta(perguntaId, dadosPergunta, temaId);
      } else {
        console.log("Modo de Criação: Chamando adicionaPergunta.");
        resultado = await DbService.adicionaPergunta(temaId, dadosPergunta);
      }
      console.log(resultado);
      if (resultado) {
        Alert.alert("Sucesso!", "Pergunta salva com sucesso.");
        navigation.goBack();
      } else {
        Alert.alert("Erro", "Não foi possível salvar a pergunta.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Ocorreu um erro ao salvar a pergunta.");
    }
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
            onChangeText={(text) =>
              handleAlternativeChange(text, alternativa.id)
            }
            placeholder={`Alternativa ${String.fromCharCode(
              65 + alternativa.id
            )}`}
          />
        </View>
      ))}

      {/* Exemplo de como você pode pegar os dados para salvar */}
      <TouchableOpacity style={styles.button} onPress={async()=> await SalvarPergunta()}>
        <Text style={styles.buttonText}>Salvar Pergunta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
