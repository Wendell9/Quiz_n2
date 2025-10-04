import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E6E6FA', // Fundo lilás claro (consistente)
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#483D8B', // Roxo escuro para o título
    textAlign: 'center',
  },
  counter: {
    fontSize: 16,
    color: '#4169E1', // Azul royal para o contador de perguntas
    fontWeight: 'bold',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#fff', // Card com fundo branco para contraste
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
    // Adicionar borda sutil para o card
    borderWidth: 1,
    borderColor: '#ddd', 
  },
  perguntaText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333', // Cor escura para a legibilidade da pergunta
  },
  alternativaButton: {
    backgroundColor: '#f8f8f8', // Fundo bem claro para as alternativas
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: '#eee', // Borda suave
  },
  alternativaText: {
    fontSize: 16,
    color: '#333', // Cor escura para o texto da alternativa
  },
  selectedAlternative: {
    borderColor: '#4169E1', // Azul royal para a borda quando selecionado
    backgroundColor: '#4169E120' // Fundo mais claro com o tom azul para seleção
  },
  nextButton: {
    backgroundColor: '#8A2BE2', // Roxo vibrante para o botão 'Próximo' (cor principal de ação)
    padding: 15,
    borderRadius: 25, // Bordas arredondadas para consistência
    alignItems: 'center',
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nextButtonText: {
    color: '#fff', // Texto branco
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc', // Cor para botão desabilitado
  }
});

export default styles;