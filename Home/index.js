import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botao} onPress={()=> navigation.navigate('Questions')}>
        <Text style={styles.textoBotao}>Perguntas</Text>
      </TouchableOpacity>
    </View>
  );
}
