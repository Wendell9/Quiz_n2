import { View, TouchableOpacity, Text, Image } from "react-native";
import styles from "./styles";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../Imagens/logo_cerebro.png")}
        style={styles.logo}
      />
      <Text style={styles.titulo}>Quiz App</Text>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("Tela de Seleção")}
      >
        <Text style={styles.textoBotao}>Jogar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("Temas")}
      >
        <Text style={styles.textoBotao}>Temas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("Temas das Perguntas")}
      >
        <Text style={styles.textoBotao}>Perguntas</Text>
      </TouchableOpacity>
    </View>
  );
}
