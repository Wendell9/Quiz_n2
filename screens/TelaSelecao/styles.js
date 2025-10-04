import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E6E6FA', // Fundo lilás claro
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#483D8B', // Roxo escuro para o título
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: '#483D8B', // Roxo escuro para os rótulos
  },
  input: {
    borderWidth: 1,
    borderColor: '#8A2BE2', // Borda com a cor do botão para consistência
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  temaCard: {
    padding: 15,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: '#f0f0f0', // Fundo claro para o card
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc', // Borda cinza suave
  },
  temaNome: {
    fontSize: 16,
    fontWeight: 'bold',
    flexShrink: 1,
    marginRight: 10,
    color: '#333',
  },
  temaContagem: {
    fontSize: 14,
    color: '#4169E1', // Azul royal para a contagem, um destaque complementar
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#8A2BE2', // Roxo vibrante para o botão
    padding: 15,
    borderRadius: 25, // Bordas arredondadas (consistente)
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
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
  listContainer: {
    height: 250,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  cardSelected: {
    backgroundColor: '#4169E1', // Azul royal para o card selecionado
    borderColor: '#1E90FF', // Tom de azul mais escuro para a borda
  },
  temaNomeSelected: {
    color: '#fff',
  },
  temaContagemSelected: {
    color: '#fff',
  },
});

export default styles;