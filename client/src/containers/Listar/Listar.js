import React, {useState, useEffect} from 'react';
import axios from '../../../axios.instance';
import {StyleSheet, View} from 'react-native';
import {Snackbar, DataTable, IconButton, Colors} from 'react-native-paper';
import EditModal from '../../components/EditModal/EditModal';
import firebase from 'firebase';

const Listar = () => {
    const [televisoes,
        settelevisoes] = useState([]);

    const [hasAlert,
        setAlert] = useState(false);

    const [isEditing,
        setIsEditing] = useState(false);

    const updateList = () => {
        try {
            firebase
                .database()
                .ref('/crud')
                .on('value', (snapshot) => {
                    const list = [];
                    snapshot.forEach((childItem) => {
                        list.push({
                            key: childItem.key,
                            nome: childItem
                                .val()
                                .nome || '',
                            marca: childItem
                                .val()
                                .marca || '',
                            modelo: childItem
                                .val()
                                .modelo || '',
                            altura: childItem
                                .val()
                                .altura || '',
                            cor: childItem
                                .val()
                                .cor || '',
                            tipo: childItem
                                .val()
                                .tipo || '',
                            foto: childItem
                                .val()
                                .foto || ''
                        });
                    });
                    settelevisoes(list);
                })

        } catch (error) {
            setAlert(err.response.data)
        } finally {
            
        }
    }

    const deleteCarro = (id) => {
        firebase
            .database()
            .ref('/crud/' + id)
            .remove()
    }

    useEffect(updateList, []);

    return (
        <View style={styles.container}>
            <View
                style={{
                height: 30,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginBottom: 10
            }}>
                
            </View>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Nome</DataTable.Title>
                    <DataTable.Title>Marca</DataTable.Title>
                    <DataTable.Title>Modelo</DataTable.Title>
                    <DataTable.Title>Tipo</DataTable.Title>
                    <DataTable.Title>Cor</DataTable.Title>
                    <DataTable.Title>Altura</DataTable.Title>
                    <DataTable.Title></DataTable.Title>
                </DataTable.Header>

                {televisoes.map(data => <DataTable.Row key={data.key}>
                    <DataTable.Cell>{data.nome}</DataTable.Cell>
                    <DataTable.Cell>{data.marca}</DataTable.Cell>
                    <DataTable.Cell>{data.modelo}</DataTable.Cell>
                    <DataTable.Cell>{data.tipo}</DataTable.Cell>
                    <DataTable.Cell>{data.cor}</DataTable.Cell>
                    <DataTable.Cell>{data.altura}</DataTable.Cell>
                    <View
                        style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                    }}>
                        <IconButton
                            icon="delete"
                            color={Colors.red500}
                            size={20}
                            onPress={() => deleteCarro(data.key)}/>

                        <IconButton
                            icon="edit"
                            color={Colors.blue500}
                            size={20}
                            style={{
                            marginLeft: -5
                        }}
                            onPress={() => setIsEditing(data)}/>
                    </View>
                </DataTable.Row>)
}
            </DataTable>

            <Snackbar
                visible={hasAlert}
                onDismiss={() => setAlert(false)}
                action={{
                label: 'Ok',
                onPress: () => setAlert(false)
            }}>
                {hasAlert}
            </Snackbar>

            {isEditing
                ? <EditModal
                        isEditing={!!isEditing}
                        data={isEditing}
                        hideModal={() => setIsEditing(false)}
                        updateList={updateList}/>
                : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 0,
        paddingBottom: 30,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});

export default Listar;