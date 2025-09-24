import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home/index';
import QuestionScreen from './screens/QuestionScreen/index';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Tela Inicial' }} />
        <Stack.Screen name="Questions" component={QuestionScreen} options={{ title: 'Perguntas' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}