import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical:"5%",
    backgroundColor: "#add5fa",
  },
    botao: {
    marginBottom:"2%",
    width: "80%", 
    height: "6%",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fa5f49",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
    botaoLimpar: {
    width: "80%", 
    height: "6%",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#59AC77",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
    textoBotao: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
    areaNome: {
    flexDirection: 'row', 
    alignItems: 'center',  
    marginBottom: 15,     
    paddingHorizontal: 10,
  },
  caixaTexto: {
    alignItems: 'center',  
    height: 40,              
    width: "85%",
    borderColor: 'black',    
    borderWidth: 1,          
    paddingHorizontal: 10,   
    fontSize: 16,            
  },
  listaTemas:{
    width:"100%",
    
  },
});

export default styles;