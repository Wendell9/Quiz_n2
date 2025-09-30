import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home/index';
import TemaScreen from './screens/TemaCRUD/index';
import Perguntas from './screens/Perguntas/index';
import Pergunta from './screens/Pergunta';
import TelaSelecao from './screens/TelaSelecao/index'
import JogoScreen from './screens/Jogo/index';
import ResumoScreen from './screens/Resumo/index';
import * as DbService from './services/dbservice';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  
    // Estado para controlar se o banco de dados está pronto
    const [isDbReady, setIsDbReady] = useState(false)
    // Função para inicializar o banco de dados
    async function processamentoUseEffect() {
    try {
      await DbService.limpaBancoDeDados();
      await DbService.createTableTemas();
      await DbService.createTablePerguntas();

      setIsDbReady(true); // Marca o banco de dados como pronto
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(
    () => {
      processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...
    }, []);

    // Exibe a tela de carregamento enquanto o DB não está pronto
     if (!isDbReady) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#add5fa' }}>
            <ActivityIndicator size="large" color="#fa5f49" />
        </View>
    );
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">

        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Tela Inicial' }} />
        <Stack.Screen name="Tela de Seleção" component={TelaSelecao} options={{ title: 'Tela de Seleção' }} />
        <Stack.Screen name="Temas" component={TemaScreen} options={{ title: 'Temas' }} />
        <Stack.Screen name="Perguntas" component={Perguntas} options={{ title: 'Perguntas' }} />
        <Stack.Screen name="Pergunta" component={Pergunta} options={{ title: 'Nova Pergunta' }} />
        <Stack.Screen name="Jogo" component={JogoScreen} options={{ title: 'Jogar Quiz' }} />
        <Stack.Screen name="Resumo" component={ResumoScreen} options={{ title: 'Resumo do Quiz' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}