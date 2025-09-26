import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home/index';
import TemaScreen from './screens/TemaCRUD/index';
import Perguntas from './screens/Perguntas/index';
import Pergunta from './screens/Pergunta';
import * as DbService from './services/dbservice';
import React, { useState, useEffect } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
    async function processamentoUseEffect() {
    try {
      await DbService.createTableTemas();
      await DbService.createTablePerguntas();
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(
    () => {
      processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...
    }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Tela Inicial' }} />
        <Stack.Screen name="Temas" component={TemaScreen} options={{ title: 'Temas' }} />
        <Stack.Screen name="Perguntas" component={Perguntas} options={{ title: 'Perguntas' }} />
        <Stack.Screen name="Pergunta" component={Pergunta} options={{ title: 'Nova Pergunta' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}