import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar, ScrollView } from 'react-native'; // Import ScrollView
import axios from 'axios';
import ModalScreen from './ModalScreen';
import { AntDesign } from '@expo/vector-icons';

const MyLeagues = () => {
  const [leagues, setLeagues] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [toggle, setToggle] = useState(null);

  useEffect(() => {
    fetchLeagues();
  }, []);
 
  const fetchLeagues = async () => {
    try {
      
      const response = await axios.post(
        'https://api.bracketocracy.com/v1.0/api.php?query=league/getLeagues',
        { userId: '33' },
        { headers: { 'Content-Type': 'application/json' } }
      );
     
      setLeagues(response.data.data.leagues);
    } catch (error) {
      
      console.error('Error fetching leagues:', error);
    }
  };
  const modalOpen = () => {
    setOpenModal(true);
  };

  const toggleMembers = (leagueId) => {
    setToggle(toggle === leagueId ? null : leagueId);
  };

  const renderItem = ({ item: league }) => (
    <View key={league.id} style={styles.leagueContainer}>
      <View style={styles.leagueHeader}>
        <Text style={styles.headerText}>{league.title}</Text>
        <TouchableOpacity onPress={() => toggleMembers(league.id)}>
          <AntDesign 
            name={toggle === league.id ? "caretup" : "caretdown"} 
            size={20} 
            color="#fff" 
          />
        </TouchableOpacity>
      </View>
      {toggle === league.id && (
        <Text style={styles.headerSubText}>Members: {league.owner.email}</Text>
      )}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.main}>
        <Text style={styles.header}>My Leagues</Text>
        {leagues.length > 0 ? (
          <FlatList
            data={leagues}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <Text style={styles.loadingText}>Loading....</Text>
        )}
        <TouchableOpacity style={styles.addButton} onPress={modalOpen}>
          <Text style={styles.addButtonText}>Create League</Text>
        </TouchableOpacity>
      </View>
      <ModalScreen openModal={openModal} setOpenModal={setOpenModal}  fetchLeagues={fetchLeagues}/>
    </ScrollView>
  );
};

export default MyLeagues;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#1a1a1a',
    paddingTop: StatusBar.currentHeight ,
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
    fontSize: 16,
    color: '#ccc',
    marginTop: 10,
  },
  loadingText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
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
});

