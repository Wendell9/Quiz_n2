import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: "#add5fa",
    gap:'5%'
  },
    botao: {
    width: "80%", // Make buttons wider
    height: "12%",
    borderRadius: 2, // Pill shape for a softer look
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fa5f49",
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
});

export default styles;