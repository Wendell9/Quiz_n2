import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home/index';
import TemaScreen from './screens/Tema/index';
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
        <Stack.Screen name="Temas" component={TemaScreen} options={{ title: 'Perguntas' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}