import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function CardTemaPergunta({
  tema,
  irParaPerguntas,
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => irParaPerguntas(tema)}>
      <Text style={styles.listaNome}> {tema.nome}</Text>
    </TouchableOpacity>
  );
}
