import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from "@react-navigation/native";
import styles from './styles';

// Componente para exibir o resultado detalhado de cada pergunta (Requisito: pergunta a pergunta, mostrando correta)
const ResultCard = ({ result }) => {
    // Define o estilo de cor da borda baseado se acertou ou errou
    const cardStyle = result.acertou ? styles.acerto : styles.erro;
    
    // Texto da resposta do usuário
    const userAnswerText = result.alternativaUsuario 
        ? `Sua Resposta: ${result.alternativaUsuario}` 
        : 'Você não respondeu.';

    return (
        <View style={[styles.resultCard, cardStyle]}>
            <Text style={styles.questionText}>
                {result.pergunta}
            </Text>

            {/* Exibe a resposta do usuário apenas se ele errou */}
            {!result.acertou && (
                <Text style={[styles.answerText, styles.userAnswer]}>
                    {userAnswerText}
                </Text>
            )}
            
            {/* Exibe a resposta correta, conforme requisito */}
            <Text style={styles.correctAnswer}>
                Resposta Correta: {result.alternativaCorreta}
            </Text>
        </View>
    );
};

export default function ResumoScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    
    // Extrai os resultados passados pela tela Jogo
    const { temaNome, resultados } = route.params;

    // Calcula os resultados usando useMemo para otimização
    const { totalAcertos, percentualAcertos } = useMemo(() => {
        const totalAcertos = resultados.filter(r => r.acertou).length;
        const totalPerguntas = resultados.length;
        // Calcula a porcentagem de acertos (Requisito: em termos de % de acerto)
        const percentualAcertos = totalPerguntas > 0 
            ? ((totalAcertos / totalPerguntas) * 100).toFixed(1) 
            : 0;
        
        return { totalAcertos, percentualAcertos };
    }, [resultados]);

    // Função para voltar para a tela inicial, resetando a pilha de navegação
    const goHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    };
    
    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
                
                {/* Cabeçalho e Resumo Geral */}
                <View style={styles.header}>
                    <Text style={styles.title}>Resumo do Quiz ({temaNome})</Text>
                    
                    <Text style={styles.summaryText}>
                        Total de Perguntas: {resultados.length}
                    </Text>
                    
                    <Text style={[
                        styles.summaryText, 
                        { color: totalAcertos > resultados.length / 2 ? '#59AC77' : '#fa5f49' }
                    ]}>
                        Total de Acertos: {totalAcertos}
                    </Text>

                    <Text style={styles.summaryText}>
                        % de Acertos: {percentualAcertos}%
                    </Text>
                </View>

                {/* Resumo Detalhado (Pergunta a Pergunta) */}
                {resultados.map((result, index) => (
                    <ResultCard key={index.toString()} result={result} />
                ))}

                {/* Botão de Finalização */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={goHome}
                >
                    <Text style={styles.buttonText}>Voltar para a Tela Inicial</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}