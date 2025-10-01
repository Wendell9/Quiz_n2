import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from "@react-navigation/native";
import * as DbService from "../../services/dbservice";
import styles from './styles';

export default function JogoScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    // 1. Recebe os parâmetros de navegação (Tema e Quantidade)
    const { temaId, temaNome, quantidade } = route.params;

    // 2. Estados do Jogo
    const [perguntas, setPerguntas] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null); // ID da alternativa selecionada pelo usuário
    const [quizResults, setQuizResults] = useState([]); // Armazena o resumo de acertos/erros
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        carregarPerguntasParaOJogo();
    }, []);

    // 3. Carrega as perguntas do banco de dados
    async function carregarPerguntasParaOJogo() {
        try {
            // Chama a função do dbservice para buscar 'quantidade' de perguntas aleatórias
            const data = await DbService.obtemPerguntasParaOJogo(temaId, quantidade);
            
            if (data.length === 0) {
                Alert.alert("Erro", "Não foi possível carregar as perguntas para o Quiz.");
                navigation.goBack();
                return;
            }
            setPerguntas(data);
        } catch (error) {
            console.error("Erro ao carregar perguntas do jogo:", error);
            Alert.alert("Erro", "Ocorreu um erro ao preparar o quiz.");
            navigation.goBack();
        } finally {
            setIsLoading(false);
        }
    }
    const handleAnswerSelection = (alternativeId) => {
        setSelectedAnswer(alternativeId);

    };


// 5. Lógica de passagem para a próxima pergunta / finalização
const handleNextQuestion = () => {
        // Cria o objeto de resultado para a pergunta atual
        const result = {
            pergunta: currentQuestion.pergunta,
            alternativaUsuario: selectedAnswer,
            alternativaCorreta: currentQuestion.alternativaCorreta,
            acertou: selectedAnswer === currentQuestion.alternativaCorreta,
        };
        
        // Adiciona o resultado ao array de resumo
        const updatedQuizResults = [...quizResults, result];
        setQuizResults(updatedQuizResults);

        // Verifica se o Quiz terminou
        const isLastQuestion = currentQuestionIndex === perguntas.length - 1;

        if (isLastQuestion) {
            navigation.replace("Resumo", {
                temaNome,
                resultados: updatedQuizResults, 
            });
            return;
        }

        // Passa para a próxima pergunta e reseta a seleção
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedAnswer(null); 
    };

    // Renderização de Estado (Carregando ou Sem Perguntas)
    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#fa5f49" />
                <Text style={{textAlign:'center', marginTop: 10}}>Preparando Quiz...</Text>
            </View>
        );
    }
    
    if (perguntas.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Não foi possível carregar as perguntas.</Text>
            </View>
        );
    }

    // Renderização principal do Jogo
    const currentQuestion = perguntas[currentQuestionIndex];
    const isAnswerSelected = selectedAnswer !== null;

    return (
        <View style={styles.container}>
            {/* Cabeçalho com o nome do tema e contador */}
            <View style={styles.header}>
                <Text style={styles.title}>Quiz: {temaNome}</Text>
                <Text style={styles.counter}>
                    Pergunta {currentQuestionIndex + 1} de {perguntas.length}
                </Text>
            </View>

            {/* Card da Pergunta e Alternativas */}
            <View style={styles.card}>
                <Text style={styles.perguntaText}>{currentQuestion.pergunta}</Text>

                {/* Mapeia e renderiza as alternativas */}
                {currentQuestion.alternativas.map((alt) => (
                    <TouchableOpacity
                        key={alt.id}
                        style={[
                            styles.alternativaButton,
                            selectedAnswer === alt.id && styles.selectedAlternative
                        ]}
                        onPress={() => handleAnswerSelection(alt.id)}
                    >
                        <Text style={styles.alternativaText}>
                            {alt.id}) {alt.text}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Botão de Navegação */}
            <TouchableOpacity
                style={[
                    styles.nextButton,
                    // Desabilita o botão se nenhuma resposta foi selecionada
                    !isAnswerSelected && styles.nextButtonDisabled
                ]}
                onPress={handleNextQuestion}
                disabled={!isAnswerSelected}
            >
                <Text style={styles.nextButtonText}>
                    {/* Muda o texto do botão na última pergunta */}
                    {currentQuestionIndex === perguntas.length - 1 ? "Finalizar Quiz" : "Próxima Pergunta"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}