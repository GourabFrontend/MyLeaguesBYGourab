import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Modal, TouchableOpacity, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal, createNewLeague ,editLeague} from '../redux/leaguesSlice';
import { fetchLeagues } from '../redux/leaguesSlice';

  // ModalScreen component displays a modal for creating a new league.
  // It uses React hooks to manage state and Redux hooks to dispatch actions.
  // It renders a modal with input fields for the league title and members.
  // It also displays a button to create the league.
 
const ModalScreen = () => {
  // Dispatch is used to dispatch actions to the Redux store.
  const dispatch = useDispatch();

  // openModal is obtained from the Redux store using the useSelector hook.
  const openModal = useSelector((state) => state.leagues.openModal);

  // title and members are the state variables for the input fields.
  const [title, setTitle] = useState('');
  const [members, setMembers] = useState('');

  
    // Close the modal by dispatching the toggleModal action.
   
  const closeModal = () => {
    dispatch(toggleModal());
  };

    // Create a new league by dispatching the createNewLeague action.
    // It also fetches the leagues from the server after creating the league.
    // It clears the input fields and displays an alert upon success or failure.
   
  const createLeague = () => {
    //  If either title or members are empty, display an alert.
    if(title.trim() === '' || members.trim() === '') {
      Alert.alert('Please fill all the  fields');
    }
    else{
      dispatch(
        createNewLeague({
          title,
          members,
          userId: '33',
        })
      )
        .then(() => {
          Alert.alert('League Created Successfully');
          dispatch(fetchLeagues('33'));
          setTitle('');
          setMembers('');
        })
        .catch((error) => {
          Alert.alert('Error creating league:', error.message);
        });
    }
   
  };



  // Edit a league by dispatching the editLeague action.

  // const editLeagues = () => {
  //   //  If either title or members are empty, display an alert.
  //   if(title.trim() === '' || members.trim() === '') {
  //     Alert.alert('Please fill all the  fields');
  //   }
  //   else{
  //     dispatch(
  //       editLeague({
  //         id,
  //         title,
  //         members,
  //         userId: '33',
  //       })
  //     )
  //       .then(() => {
  //         Alert.alert('League Updated Successfully');
  //         dispatch(fetchLeagues('33'));
  //         setTitle('');
  //         setMembers('');
  //       })
  //       .catch((error) => {
  //         Alert.alert('Error updating league:', error.message);
  //       });
  //   }
   
  // };

  return (
    <View style={styles.preMain}>
      {/* Render the modal if it is open based on openModal state. */}
      <Modal animationType="slide" transparent={true} visible={openModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Create League</Text>
              {/* Close the modal when the cross icon is pressed. */}
              <TouchableOpacity onPress={closeModal}>
                <Entypo name="circle-with-cross" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              {/* Render the input field for the league title. */}
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
              {/* Render the input field for the members. */}
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
              {/* Create the league and invite members when the button is pressed. */}
              <TouchableOpacity style={styles.createButton} onPress={createLeague}>
                <Text style={styles.createButtonText}>CREATE LEAGUE AND INVITE MEMBERS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
    


