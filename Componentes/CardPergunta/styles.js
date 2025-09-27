import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dadosBotoesAcao: {
    flexDirection: "row",
    gap: 15, // Adiciona espaço entre os botões de ação
  },
  textoPergunta: {
    // flex: 1 faz com que o texto ocupe todo o espaço disponível
    flex: 1,
    // flexShrink: 1 garante que o texto irá encolher para caber
    flexShrink: 1,
    marginRight: 10,
  },
});

export default styles;
