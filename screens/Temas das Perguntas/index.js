import styles from "./styles";
import {
  Alert,
  View,
  Keyboard,
  ScrollView,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import * as DbService from "../../services/dbservice";
import CardTemaPergunta from "../../Componentes/CardTemaPergunta";
import { useNavigation } from "@react-navigation/native";

export default function TemaScreen() {
  const [temas, setTemas] = useState([]);
  const [id, setId] = useState();
  const [nomeTema, setNomeTema] = useState();

  const navigation = useNavigation();

  async function processamentoUseEffect() {
    try {
      await carregaDados();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...
  }, []);

  async function carregaDados() {
    try {
      console.log("carregando");
      let temas = await DbService.obtemTodosOsTemas();
      setTemas(temas);
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  async function limparCampos() {
    setNomeTema("");
    setId(undefined);
    Keyboard.dismiss();
  }

  async function salvarTema() {
    console.log("Salvando Tema");
    console.log(id);
    let novoRegistro = id == undefined;

    let obj = {
      nome: nomeTema,
    };

    const buscaTemas = temas.find(
      (tema) => tema.nome.trim().toLowerCase() == nomeTema.trim().toLowerCase()
    );

    if (nomeTema == "") {
      Alert.alert("Preencha o nome do tema!");
      return;
    }
    if (buscaTemas != undefined) {
      Alert.alert("O tema ja existe!");
      return;
    }

    try {
      let resposta = false;
      if (novoRegistro) {
        console.log("Inserindo um novo registro");
        resposta = await DbService.adicionaTema(obj);
      } else {
        obj.id = id;
        resposta = await DbService.alteraTema(obj);
      }
      if (resposta) Alert.alert("Tema salvo com sucesso!");
      else Alert.alert("Falha ao salvar!");

      Keyboard.dismiss();
      limparCampos();
      await carregaDados();
    } catch (e) {
      console.log(e.message);
    }
  }

  async function editar(identificador) {
    const tema = temas.find((tema) => tema.id == identificador);

    if (tema != undefined) {
      setId(tema.id);
      setNomeTema(tema.nome);
    }

    console.log(tema);
  }

  function removerElemento(identificador) {
    Alert.alert("Atenção", "Confirma a remoção do tema?", [
      {
        text: "Sim",
        onPress: async () => await efetivaRemoverTema(identificador),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  function apagarTudo() {
    if (temas.length == 0) {
      Alert.alert("Não há temas para serem excluidos");
    }
    Alert.alert("Atenção", "Confirma a exclusão de todos os temas?", [
      {
        text: "Sim",
        onPress: async () => await excluirTodosTemas(),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  async function excluirTodosTemas() {
    try {
      console.log("Entrando em excluir todos os temas");
      await DbService.excluiTodosOsTemas();
      Keyboard.dismiss();
      limparCampos();
      await carregaDados();
      Alert.alert("Temas apagados com sucesso!!!");
    } catch (e) {
      Alert.alert(e);
    }
  }

  async function efetivaRemoverTema(identificador) {
    try {
      await DbService.excluiTema(identificador);
      Keyboard.dismiss();
      limparCampos();
      await carregaDados();
      Alert.alert("Tema apagado com sucesso!!!");
    } catch (e) {
      Alert.alert(e);
    }
  }

  const irParaPerguntas = (tema) => {
    // Passa o objeto 'tema' inteiro como parâmetro
    navigation.navigate("Perguntas", { tema: tema });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.listaTemas}
      contentContainerStyle={styles.listaTemasContent}>
        {temas.map((tema, index) => (
          <CardTemaPergunta
            tema={tema}
            key={index.toString()}
            irParaPerguntas={irParaPerguntas}
          />
        ))}
      </ScrollView>
    </View>
  );
}
