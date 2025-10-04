import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: "5%",
    backgroundColor: '#E6E6FA', // Fundo lilás claro (consistente)
  },
  botao: { // Para botões de ação principal (ex: Adicionar, Salvar)
    marginBottom: "2%",
    width: "80%",
    height: "6%",
    borderRadius: 25, // Bordas arredondadas (consistente)
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#8A2BE2', // Roxo vibrante (consistente)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  botaoLimpar: { // Para botões de ação secundária/positiva (ex: Limpar, Ver)
    width: "80%",
    marginBottom: "2%",
    height: "6%",
    borderRadius: 25, // Bordas arredondadas (consistente)
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#4169E1', // Azul Royal (consistente)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  botaoExcluirTudo: { // Para botões de ação de perigo (ex: Excluir Tudo)
    width: "80%",
    height: "6%",
    borderRadius: 25, // Bordas arredondadas (consistente)
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#DC143C', // Vermelho Crimson (consistente)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textoBotao: {
    color: "#FFF", // Texto branco (consistente)
    fontSize: 18,
    fontWeight: "bold",
  },
  areaNome: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%', // Garantir que ocupa a largura total para alinhamento
    justifyContent: 'center', // Centralizar o conteúdo dentro da linha
  },
  caixaTexto: {
    // Alinhamento 'center' é geralmente para o texto *dentro* do input, não do próprio input
    // height e width estão bons
    height: 40,
    width: "85%", // Mantendo a proporção
    borderColor: '#8A2BE2', // Borda com a cor roxa (consistente)
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    borderRadius: 5, // Bordas levemente arredondadas (consistente)
  },
  listaTemas: {
    width: "100%", // Ocupar a largura total para o FlatList/ScrollView
    // Adicione 'alignItems: 'center'' aqui se quiser centralizar os itens dentro da lista
  },
  // Se tiver cards de tema, você adicionaria estilos como cardTema aqui
});

export default styles;