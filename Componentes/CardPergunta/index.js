import {
    Text, TouchableOpacity, View
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo'; 
import styles from './styles';

export default function CardPergunta({ pergunta, removerElemento, editar, idTema}) {
    return (
        <View style={styles.card}>
            {/* O Text agora é um filho direto do card */}
            <Text style={styles.textoPergunta}>{pergunta.pergunta}</Text>

            <View style={styles.dadosBotoesAcao}>
                <TouchableOpacity onPress={async () => await removerElemento(pergunta.id,idTema)}>
                    <AntDesign name="delete" size={24} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editar(idTema,pergunta.id)}>
                    <Entypo name="edit" size={24} color="black" />
                </TouchableOpacity>

            </View>
        </View>
    
    );

};