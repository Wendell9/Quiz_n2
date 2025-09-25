import {
    Text, TouchableOpacity, View
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo'; 
import styles from './styles';

export default function CardTema({ tema, removerElemento, editar }) {
    return (
        <View style={styles.card} >

            <Text style={styles.listaNome}> {tema.nome}</Text>

            <View style={styles.dadosBotoesAcao}>
                <TouchableOpacity onPress={() => removerElemento(tema.id)}>
                    <AntDesign name="delete" size={24} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editar(tema.id)}>
                    <Entypo name="edit" size={24} color="black" />
                </TouchableOpacity>

            </View>
        </View>
    );

};