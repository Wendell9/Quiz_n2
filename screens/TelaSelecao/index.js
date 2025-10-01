
import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as DbService from "../../services/dbservice";
import styles from "./styles";

// Componente para exibir um tema selecionável com a contagem de perguntas
const TemaCard = ({ tema, isSelected, onPress }) => (
  <TouchableOpacity 
    key={tema.id.toString()}
    style={[styles.temaCard, isSelected && styles.cardSelected]} 
    onPress={() => onPress(tema)}
  >
    <Text style={[styles.temaNome, isSelected && styles.temaNomeSelected]}>
      {tema.nome}
    </Text>
    <Text style={[styles.temaContagem, isSelected && styles.temaContagemSelected]}>
      {tema.count_perguntas} {tema.count_perguntas === 1 ? 'Pergunta' : 'Perguntas'}
    </Text>
  </TouchableOpacity>
);

export default function TelaSelecao() {
  const navigation = useNavigation();
  const [temas, setTemas] = useState([]);
  const [selectedTema, setSelectedTema] = useState(null);
  const [quantidade, setQuantidade] = useState('0'); // Valor padrão
  const [isLoading, setIsLoading] = useState(true);

  // Recarregar os temas sempre que a tela estiver em foco
  useFocusEffect(
    React.useCallback(() => {
      carregarTemas();
    }, [])
  );

  const enviaQuantidadeTratada = (text) => {
    const novoTexto = text.replace(/[,.-]/g, '');
    setQuantidade(novoTexto);
  };

  const carregarTemas = async () => {
    setIsLoading(true);
    try {
      // Usa a nova função para carregar a contagem de perguntas
      const temasComContagem = await DbService.obtemTemasComContagem();
      setTemas(temasComContagem);
      
      // Limpa o tema selecionado se ele não estiver mais na lista (ou a lista estiver vazia)
      if (temasComContagem.length === 0 || !temasComContagem.find(t => t.id === selectedTema?.id)) {
        setSelectedTema(null);
      }
    } catch (e) {
      console.error(e);
      Alert.alert("Erro", "Não foi possível carregar os temas.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemaSelection = (tema) => {
    // Se o tema já estiver selecionado, deseleciona. Senão, seleciona o novo tema.
    setSelectedTema(tema.id === selectedTema?.id ? null : tema);
  };

  const iniciarQuiz = () => {
    const qtde = parseInt(quantidade, 10);

    // 1. Validação: Tema Selecionado
    if (!selectedTema) {
      Alert.alert("Atenção", "Por favor, selecione um tema para jogar.");
      return;
    }

    // 2. Validação: Quantidade Válida
    if (isNaN(qtde) || qtde <= 0) {
      Alert.alert("Atenção", "Por favor, informe uma quantidade válida de perguntas (mínimo 1).");
      return;
    }

    // 3. Validação: Quantidade de Perguntas Disponíveis (Requisito de validação do Word)
    if (qtde > selectedTema.count_perguntas) {
      Alert.alert(
        "Atenção",
        `O tema "${selectedTema.nome}" possui apenas ${selectedTema.count_perguntas} perguntas cadastradas. Por favor, escolha uma quantidade menor ou igual.`
      );
      return;
    }
    
    // 4. Navega para a tela do jogo, passando os parâmetros
    navigation.navigate("Jogo", {
      temaId: selectedTema.id,
      temaNome: selectedTema.nome,
      quantidade: qtde,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fa5f49" />
        <Text style={{textAlign:'center', marginTop: 10}}>Carregando temas...</Text>
      </View>
    );
  }

  if (temas.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Quiz</Text>
        <Text style={{textAlign:'center', fontSize: 16, marginBottom: 20}}>
          Nenhum tema cadastrado ou erro ao carregar. Por favor, cadastre temas e perguntas antes de jogar.
        </Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate("Temas")}
        >
          <Text style={styles.buttonText}>Cadastrar Temas</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Quiz</Text>

      {/* Seleção do Tema */}
      <Text style={styles.label}>Escolha o Tema:</Text>
      <View style={styles.listContainer}>
        <ScrollView>
          {temas.map((tema) => (
            <TemaCard
              key={tema.id.toString()}
              tema={tema}
              isSelected={selectedTema?.id === tema.id}
              onPress={handleTemaSelection}
            />
          ))}
        </ScrollView>
      </View>

      {/* Seleção da Quantidade de Perguntas */}
      <Text style={styles.label}>Quantas perguntas deseja jogar?</Text>
      <TextInput
        style={styles.input}
        value={quantidade}
        onChangeText={enviaQuantidadeTratada}
        keyboardType="numeric"
        placeholder="Ex: 5"
      />
      {selectedTema && (
        <Text style={{ marginTop: 5, color: '#333' }}>
          Máximo disponível para o tema "{selectedTema.nome}": {selectedTema.count_perguntas}
        </Text>
      )}

      {/* Botão Iniciar */}
      <TouchableOpacity 
        style={styles.button}
        onPress={iniciarQuiz}
      >
        <Text style={styles.buttonText}>Iniciar Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}