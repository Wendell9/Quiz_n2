import {
    StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

export const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    listaNome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1, // Permite que o texto se expanda e ocupe o espaço disponível
    },
    dadosBotoesAcao: {
        flexDirection: 'row',
        gap: 15, // Adiciona espaço entre os botões de ação
    },
});