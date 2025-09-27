import {
    Text, TouchableOpacity, View
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo'; 
import styles from './styles';

export default function CardPergunta({ pergunta, removerElemento, editar, idTema}) {
    return (
        <View style={styles.card}>

            <View 
              style={styles.cardPergunta} // Crie esse estilo no seu arquivo styles.js
              
              key={pergunta.id.toString()}
            >
              <Text style={styles.textoPergunta}>{pergunta.pergunta}</Text>
            </View>

            <View style={styles.dadosBotoesAcao}>
                <TouchableOpacity onPress={() => removerElemento(pergunta.id,idTema)}>
                    <AntDesign name="delete" size={24} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editar(idTema,pergunta.id)}>
                    <Entypo name="edit" size={24} color="black" />
                </TouchableOpacity>

            </View>
        </View>
    );

};