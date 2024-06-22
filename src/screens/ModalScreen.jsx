import { StyleSheet, Text, View, TextInput, Modal, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';


const ModalScreen = ({ openModal, setOpenModal, fetchLeagues }) => {
    const [title, setTitle] = useState('');
    const [members, setMembers] = useState('');

    const createLeague = async () => {
        try {
            const response = await axios.post('https://api.bracketocracy.com/v1.0/api.php?query=league/createLeague', {
                title: title,
                members: members,
                userId: '33',
                allowInvitation: 0,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
           
            Alert.alert("League Created Successfully");
            fetchLeagues();
            setOpenModal(false);
            setMembers('');
            setTitle('');
        } catch (error) {
            Alert.alert('Error creating league:', error);
        }
    };



    return (
        <View style={styles.preMain}>
            <Modal animationType="slide" transparent={true} visible={openModal}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Create League</Text>
                            <TouchableOpacity onPress={() => setOpenModal(false)}>
                                <Entypo name="circle-with-cross" size={24} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.headerSubText}>Title</Text>
                                <TextInput
                                    placeholder="Enter Title"
                                    placeholderTextColor="#ccc"
                                    style={[styles.input, { marginTop: 30 }]}
                                    value={title}
                                    onChangeText={setTitle}
                                />
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.headerSubText}>Members</Text>
                                <TextInput
                                    placeholder="Enter Members"
                                    placeholderTextColor="#ccc"
                                    style={[styles.input, { marginTop: 30 }]}
                                    value={members}
                                    onChangeText={setMembers}
                                />
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.createButton} onPress={createLeague}>
                                <Text style={styles.createButtonText}>CREATE LEAGUE AND INVITE MEMBERS</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default ModalScreen;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: "80%",
        backgroundColor: "#2c2c2c",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerSubText: {
        fontSize: 16,
        color: '#ccc',
        marginBottom: 10,
        marginLeft: 5,
        marginTop: 10
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,

    },
    inputWrapper: {
        marginBottom: 30,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#444',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#fff',
        marginTop: 10,
    },
    createButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#ff6347",
        borderRadius: 5,
    },
    createButtonText: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
    },
    preMain: {
        flex: 1,
        backgroundColor: "#1a1a1a",
    },
});

