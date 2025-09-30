import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#add5fa",
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  counter: {
    fontSize: 16,
    color: '#fa5f49',
    fontWeight: 'bold',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  perguntaText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  alternativaButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: '#f0f0f0',
  },
  alternativaText: {
    fontSize: 16,
    color: '#333',
  },
  selectedAlternative: {
    borderColor: '#fa5f49', // Cor da borda ao selecionar
    backgroundColor: '#fa5f4920' // Fundo mais claro para seleção
  },
  nextButton: {
    backgroundColor: "#59AC77", // Cor Verde para 'Próximo'
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
  }
});

export default styles;