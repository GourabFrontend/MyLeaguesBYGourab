import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator,Dimensions,Image,StatusBar} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeagues, toggleModal, toggleMembers } from '../redux/leaguesSlice';
import ModalScreen from './ModalScreen';
import { AntDesign } from '@expo/vector-icons';
const Height = Dimensions.get("window").height;

  // MyLeagues component displays a list of leagues and allows the user to create a new league.
  // It fetches the leagues from the server and displays them in a FlatList.
  // It also displays a loading indicator while the leagues are being fetched.
  // The user can toggle the member list of each league.
  // The user can also create a new league by pressing the "Create League" button.
 
const MyLeagues = () => {
  // Dispatch is used to dispatch actions to the Redux store.
  const dispatch = useDispatch();

  // leagues and status are obtained from the Redux store using the useSelector hook.
  const { leagues, status } = useSelector((state) => state.leagues);

  // Fetch the leagues from the server whenever the component is mounted or when the dispatch function changes.
  useEffect(() => {
    dispatch(fetchLeagues('33'));
  }, [dispatch]);

  // Open the modal for creating a new league when the "Create League" button is pressed.
  const modalOpen = () => {
    dispatch(toggleModal());
  };

  //  Render a single league item in the FlatList.
  const renderItem = ({ item: league }) => (
    <View key={league.id} style={styles.leagueContainer}>
      <View style={styles.leagueHeader}>
        <Text style={styles.headerText}>{league.title}</Text>
         {/* Toggle the visibility of the member list when the icon is pressed.  */}
        <TouchableOpacity onPress={() => dispatch(toggleMembers(league.id))}>
          <AntDesign
            name={league.isOpen ? 'caretup' : 'caretdown'}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      {/* Render the member list if it is open.  */}
      {league.isOpen && (
        <View style={styles.leagueMembers}>
          <Text style={styles.headerSubText}>Members: </Text>
          <View style={styles.memberContainer}>
            {/* Render the owner's profile picture and email as per API. */}
            {/* As per API members profile photo and emails are same for every title */}
            <Image
              style={styles.logo}
              source={{
                uri: league.owner.profilePhoto
              }}
            />
            <Text style={styles.headerSubText1}>{league.owner.email}</Text>
          </View>
        </View>
      )}
    </View>
  );

  // Render the MyLeagues component.
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.header}>My Leagues</Text>
        <View style={styles.listContainer}>
          {/* Display the loading indicator while the leagues are being fetched. */}
          {status === 'loading' ? (
            <ActivityIndicator size="large" color="#ff6347" style={styles.loadingText} />
          ) : (
            <FlatList
              data={leagues}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </View>
         {/* Display the "Create League" button. */}
        <TouchableOpacity style={styles.addButton} onPress={modalOpen}>
          <Text style={styles.addButtonText}>Create League</Text>
        </TouchableOpacity>
      </View>
      {/* Render the modal for creating a new league. */}
      <ModalScreen />
    </View>
  );
};

export default MyLeagues;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#1a1a1a',
      paddingTop: StatusBar.currentHeight,
    },
    header: {
      backgroundColor: "#1e1e1e",
      borderRadius: 10,
      padding: 10,
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 20,
    },
    headerText: {
      fontWeight: "bold",
      fontSize: 18,
      color: '#fff',
    },
    headerSubText: {
      fontSize: 18,
      color: '#ccc',
      marginTop: 10,
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 30,
      color: '#fff',
      textAlign: 'center',
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',
      height: "90%"
    },
    main: {
      width: "90%",
      backgroundColor: '#2c2c2c',
      padding: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
    listContainer: {
      height: Height - 200,
    },
    memberContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      borderColor: '#444',
      gap: 5,
      padding: 10,
      marginTop: 10,
      borderWidth: 2,
    },
    headerSubText1: {
      fontSize: 16,
      color: '#ccc',
      marginRight: 10,
    },
    leagueContainer: {
      backgroundColor: '#3b3b3b',
      padding: 15,
      borderRadius: 10,
      marginVertical: 10,
    },
    leagueHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    leagueMembers: {
      flexDirection: 'column',
    },
    addButton: {
      backgroundColor: "#ff6347",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 20,
    },
    addButtonText: {
      textAlign: "center",
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
    },
    logo: {
      width: 25,
      height: 25,
      borderRadius: 15
    }
  });
  
