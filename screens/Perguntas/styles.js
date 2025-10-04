import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Manter 'center' para o layout principal
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical:"5%",
    backgroundColor: '#E6E6FA', // Fundo lilás claro
  },
  botao: {
    marginBottom:"2%",
    width: "80%", 
    height: "6%",
    borderRadius: 25, // Bordas mais arredondadas para consistência
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#8A2BE2', // Roxo vibrante (cor principal do botão)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  botaoExcluirTudo: {
    width: "80%",
    height: "6%",
    borderRadius: 25, // Bordas mais arredondadas para consistência
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#DC143C', // Vermelho Crimson para exclusão
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  botaoLimpar: { // Usado para ações positivas como "Limpar" ou "Adicionar"
    width: "80%", 
    height: "6%",
    borderRadius: 25, // Bordas mais arredondadas para consistência
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#4169E1', // Azul Royal para ações positivas
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textoBotao: {
    color: "#FFF", // Texto branco para contraste
    fontSize: 18,
    fontWeight: "bold",
  },
  areaNome: {
    flexDirection: 'row', 
    alignItems: 'center',  
    marginBottom: 15,     
    paddingHorizontal: 10,
    width: '100%', // Adicione largura para melhor alinhamento
    justifyContent: 'center', // Centraliza os itens na linha
  },
  caixaTexto: {
    height: 40,              
    width: "85%", // Ajustado para ser 85% da áreaNome
    borderColor: '#8A2BE2', // Borda com a cor roxa do botão
    borderWidth: 1,          
    paddingHorizontal: 10,   
    fontSize: 16,            
    borderRadius: 5, // Bordas levemente arredondadas para o input
  },
  listaPerguntas:{
    width:"100%",
    alignItems:'center',
  },
  cardPergunta: {
    backgroundColor: '#f0f0f0', // Manter um fundo claro para o card
    width:"80%",
    alignItems:'flex-start', // Alinha o texto à esquerda dentro do card
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#483D8B', // Borda com o roxo escuro
  },
  textoPergunta: {
    fontSize: 16,
    color: '#333', // Manter um texto escuro para legibilidade
  },
  listaPerguntasScroll: {
    width: "100%", 
  },
  tituloPrincipal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#483D8B', // Roxo escuro para o título principal
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 18,
    color: '#6A5ACD', // Roxo médio para o subtítulo
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default styles;