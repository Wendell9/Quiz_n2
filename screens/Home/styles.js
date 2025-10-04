import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#E6E6FA', // Um lilás muito claro para o fundo, suave e inspirado no roxo da logo
    gap: 20, 
  },
  logo: {
    width: 200, 
    height: 200,

  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: '#483D8B', // Um roxo escuro para o título, combinando com a paleta
    marginBottom: 40, 
  },
  botao: {
    width: "80%",
    height: 50,
    borderRadius: 25, 
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#8A2BE2', // Roxo vibrante para os botões
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textoBotao: {
    color: "#FFF", // Texto branco para contrastar com o roxo do botão
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;