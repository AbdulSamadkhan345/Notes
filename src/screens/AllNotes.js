/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
const AllNotes = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [allNotes, setAllNotes] = useState();
    useEffect(() => {
        getAllnotes();
    }, [isFocused]);
    const getAllnotes = async () => {
        let x = [];
        let y = await EncryptedStorage.getItem('notes');
        let data = JSON.parse(y);
        data.data.map(item => {
            x.push(item);
        });
        setAllNotes(x);
    };
    const deleteNote = async (index) => {
        let temp = allNotes;
        let x = [];
        temp.map((item, ind) => {
            if (ind !== index) {
                x.push(item);
            }
        });
        await EncryptedStorage.setItem('notes', JSON.stringify({ data: x }));
        getAllnotes();
    };
    return (
        <View style={styles.CONTAINER}>
            <View style={styles.header}>
                <Text style={{color:'#fff',fontSize:22}}>Notes</Text>
            </View>
            <FlatList data={allNotes}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.view}>
                            <Text style={styles.txt}>{item.title}</Text>
                            <Text style={[styles.txt, { fontSize: 16 }]}>{item.desc}</Text>
                            <TouchableOpacity style={styles.delbtn}
                                onPress={() => {
                                    deleteNote(index);
                                }}>
                                <Text style={{ color: 'red', fontSize: 15 }}>delete</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }} />
            <TouchableOpacity style={styles.addBtn}
                onPress={() => [
                    navigation.navigate('AddNotes'),
                ]}>
                <Text style={{ color: '#fff', fontSize: 35 }}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AllNotes;

const styles = StyleSheet.create({
    CONTAINER: {
        flex: 1,
    },
    addBtn: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#000',
        position: 'absolute',
        right: 20,
        bottom: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    view: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        height: 130,
    },
    txt: {
        fontSize: 18,
        fontWeight: '700',
        margin: 10,
    },
    delbtn: {
        position: 'absolute',
        top: 20,
        right: 20,
        height: 44,
        width: 70,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.3,
        borderColor: 'red',
    },
    header: {
        width: '100%',
        height: 65,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
