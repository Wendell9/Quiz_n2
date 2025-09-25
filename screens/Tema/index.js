import React from 'react';
import styles from './styles';
import {
  Alert, Text, TextInput, TouchableOpacity,
  View, Keyboard, ScrollView, Image
} from 'react-native';
import { useState, useEffect } from 'react';
import * as DbService from '../../services/dbservice';
import CardTema from '../../Componentes/CardTema';

export default function TemaScreen() {

  const [temas, setTemas] = useState([]);
  const [id, setId] = useState();
  const [nomeTema, setNomeTema] = useState();

  async function processamentoUseEffect() {
    try {
      await carregaDados();
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(
  () => {
    processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...
  }, []);

  async function carregaDados() {
    try {
      console.log('carregando');
      let temas = await DbService.obtemTodosOsTemas();
      setTemas(temas);
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

   async function limparCampos() {
    setNomeTema("");
    setId("");
    Keyboard.dismiss();
  }

  async function salvarTema() {
    let novoRegistro = (id == undefined);

    let obj = {
      nome: nomeTema
    };

    try {
      let resposta = false;
      if (novoRegistro)
        resposta = await DbService.adicionaTema(obj);
      else
        //resposta = await DbService.alteraContato(obj);

      if (resposta)
        Alert.alert('Tema salvo com sucesso!');
      else
        Alert.alert('Falha ao salvar!');

      Keyboard.dismiss();
      limparCampos();
      await carregaDados();
    } catch (e) {
      console.log(e.message);
    }
  }

  async function removerElemento() {
    
  }

  async function editar() {
    
  }

  return (
    <View style={styles.container}>

      <View style={styles.areaNome}>

          <TextInput style={styles.caixaTexto}
            onChangeText={(texto) => setNomeTema(texto)}
            value={nomeTema} 
            placeholder="Nome"/>
            
      </View>

    <TouchableOpacity style={styles.botao} onPress={() => salvarTema()}>
          <Text style={styles.textoBotao}>Adicionar Tema</Text>
    </TouchableOpacity>
      <ScrollView style={styles.listaTemas}>
        {
          temas.map((tema, index) => (
            <CardTema cardTema={tema} key={index.toString()}
            removerElemento={removerElemento} editar={editar}
              />
          ))
        }

      </ScrollView>
    </View>
  );
}