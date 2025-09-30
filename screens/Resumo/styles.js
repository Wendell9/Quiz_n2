import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#add5fa",
  },
  header: {
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  // Cards de Resultado
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderLeftWidth: 5,
  },
  // Cores condicionais
  acerto: {
    borderLeftColor: '#59AC77', // Verde (Acerto)
  },
  erro: {
    borderLeftColor: '#fa5f49', // Vermelho (Erro)
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  answerText: {
    fontSize: 14,
    marginTop: 2,
  },
  correctAnswer: {
    color: '#59AC77',
    fontWeight: 'bold',
    marginTop: 5,
  },
  userAnswer: {
    color: '#fa5f49',
  },
  button: {
    backgroundColor: "#fa5f49",
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;