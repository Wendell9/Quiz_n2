import styles from "./styles";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  ScrollView,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import * as DbService from "../../services/dbservice";
import CardTema from "../../Componentes/CardTema";
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
        onPress: () => efetivaRemoverTema(identificador),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  function apagarTudo() {
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
      console.log("Entrando em excluir todos os temas")
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
      <View style={styles.areaNome}>
        <TextInput
          style={styles.caixaTexto}
          onChangeText={(texto) => setNomeTema(texto)}
          value={nomeTema}
          placeholder="Nome"
        />
      </View>
      <TouchableOpacity
        style={styles.botao}
        onPress={async () => {
          await salvarTema();
        }}
      >
        <Text style={styles.textoBotao}>Salvar Tema</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.botaoLimpar}
        onPress={() => limparCampos()}
      >
        <Text style={styles.textoBotao}>Limpar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoExcluirTudo}
        onPress={async () => await excluirTodosTemas()}
      >
        <Text style={styles.textoBotao}>Apagar Tudo</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.listaTemas}>
        {temas.map((tema, index) => (
          <CardTema
            tema={tema}
            key={index.toString()}
            removerElemento={removerElemento}
            editar={editar}
            irParaPerguntas={irParaPerguntas}
          />
        ))}
      </ScrollView>
    </View>
  );
}
