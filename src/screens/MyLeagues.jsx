import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar, Dimensions, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import ModalScreen from './ModalScreen';
import { AntDesign } from '@expo/vector-icons';
const Height = Dimensions.get("window").height;
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
        <View style={styles.leagueMembers}>
          <Text style={styles.headerSubText}>Members: </Text>
          <View style={styles.memberContainer}>
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

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.header}>My Leagues</Text>
        <View style={styles.listContainer}>
          {leagues.length > 0 ? (
            <FlatList
              data={leagues}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          ) : (
            <ActivityIndicator size={60} color="#ff6347" style={styles.loadingText} />
          )}
        </View>
        <TouchableOpacity style={styles.addButton} onPress={modalOpen}>
          <Text style={styles.addButtonText}>Create League</Text>
        </TouchableOpacity>
      </View>
      <ModalScreen openModal={openModal} setOpenModal={setOpenModal} fetchLeagues={fetchLeagues} />
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
