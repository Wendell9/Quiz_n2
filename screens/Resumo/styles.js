import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E6E6FA', // Fundo lilás claro
  },
  
  // Estilo para o CARD DE RESUMO GERAL
  header: { // Este é o card que resume os resultados gerais
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ddd', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#483D8B',
    marginBottom: 15,
    textAlign: 'center',
  },
  summaryText: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 6,
    color: '#333',
  },
  summaryAcerto: { // Cor para percentual alto
    color: '#4169E1',
  },
  summaryErro: { // Cor para percentual baixo
    color: '#DC143C',
  },
  percentualText: { // Estilo para o texto do percentual (tamanho, peso)
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  
  // Estilos para os CARDS DE RESULTADO DE PERGUNTA INDIVIDUAL (ResultCard)
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
    borderLeftWidth: 5, // Borda lateral para indicar acerto/erro
  },
  acerto: {
    borderLeftColor: '#4169E1', // Azul royal para acerto
  },
  erro: {
    borderLeftColor: '#DC143C', // Vermelho crimson para erro
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  answerText: {
    fontSize: 14,
    marginTop: 2,
    color: '#666',
  },
  correctAnswer: {
    color: '#4169E1',
    fontWeight: 'bold',
    marginTop: 5,
  },
  userAnswer: {
    color: '#DC143C',
  },

  // Estilos para o BOTÃO FINAL
  button: {
    backgroundColor: '#8A2BE2',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;