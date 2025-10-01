import { useState, useEffect } from "react";
import React from "react";
import { useRoute, useFocusEffect } from "@react-navigation/native"; // Importa o hook
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  ScrollView,
} from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import * as DbService from "../../services/dbservice";
import CardPergunta from "../../Componentes/CardPergunta";

export default function Perguntas() {
  const navigation = useNavigation();
  const route = useRoute();
  const { tema } = route.params; // Lê o parâmetro 'temaId'
  const [perguntas, setPerguntas] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      carregarPerguntas();
    }, [])
  );

  const AdicionarPergunta = (temaId) => {
    navigation.navigate("Pergunta", { temaId: temaId });
  };

  // Função para carregar as perguntas do banco de dados
  const carregarPerguntas = async () => {
    try {
      console.log(tema.id);
      const data = await DbService.obterPerguntasPorTema(tema.id);
      console.log(data);
      setPerguntas(data); // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.error("Erro ao carregar perguntas:", error);
      Alert.alert("Erro", "Não foi possível carregar as perguntas.");
    }
  };

  function removerElemento(idPergunta, idTema) {
    Alert.alert("Atenção", "Confirma a remoção do tema?", [
      {
        text: "Sim",
        onPress: () => efetivaRemoverPergunta(idPergunta, idTema),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  async function excluirTodasPerguntas(idTema) {
    if (perguntas.length == 0) {
      Alert.alert("Não há perguntas para serem excluidas!");
      return;
    }
    Alert.alert("Atenção", "Confirma a exclusão de todas as perguntas?", [
      {
        text: "Sim",
        onPress: async () => {
          try {
            // 1. Exclui as perguntas
            await DbService.excluirPerguntasPorTema(idTema);
            // 2. Recarrega a lista APÓS a exclusão
            await carregarPerguntas();
            Alert.alert("Sucesso", "Todas as perguntas foram excluídas.");
          } catch (error) {
            console.error("Erro ao excluir perguntas:", error);
            Alert.alert("Erro", "Não foi possível excluir as perguntas.");
          }
        },
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  async function efetivaRemoverPergunta(idPergunta, idTema) {
    try {
      await DbService.excluiPergunta(idPergunta, idTema);
      Keyboard.dismiss();
      await carregarPerguntas();
      Alert.alert("Pergunta apagado com sucesso!!!");
    } catch (e) {
      console.error("Erro ao realizar a exclusão: ", e);
      Alert.alert("Erro", "Não foi possível realizar a exclusão.");
    }
  }

  async function editar(temaId, perguntaId) {
    navigation.navigate("Pergunta", { temaId: temaId, perguntaId: perguntaId });
  }

  // UseEffect para chamar a função de carregamento
  useEffect(() => {
    carregarPerguntas();
  }, []); // O efeito é executado sempre na primeira montagem do componente

  return (
    <View style={styles.container}>
      <Text style={styles.tituloPrincipal}>Tela de Perguntas</Text>
      <Text style={styles.subtitulo}>Perguntas de {tema.nome}</Text>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => AdicionarPergunta(tema.id)}
      >
        <Text style={styles.textoBotao}>Nova Pergunta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoExcluirTudo}
        onPress={async () => await excluirTodasPerguntas(tema.id)}
      >
        <Text style={styles.textoBotao}>Excluir Perguntas</Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.listaPerguntasScroll}
        contentContainerStyle={styles.listaPerguntas}
      >
        {perguntas.map((pergunta) => (
          <CardPergunta
            pergunta={pergunta}
            key={pergunta.id.toString()}
            removerElemento={removerElemento}
            editar={editar}
            idTema={tema.id}
          />
        ))}
      </ScrollView>
    </View>
  );
}
