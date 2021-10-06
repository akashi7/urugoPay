/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHistory } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAnyOrientation } from '../UseOrientation';

export const MyMaids = () => {

  useAnyOrientation();

  let url = `https://urugoserver.herokuapp.com`;

  const Actions = useHistory();

  const [state, setState] = useState({
    allMaids: {
      myMaids: []
    },
    loading: false
  });

  const clearAll = async () => {
    const token = await AsyncStorage.getItem('key');
    try {
      const res = await (await fetch(`${url}/user/deleteAll`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })).json();

      if (res.status === 200) {
        Alert.alert(`Sucess`, 'All deleted', [{
          text: "OK",
          onPress: () => Actions.push('/Dashboard')
        }]);
      }
      else if (res.status === 405) {
        Alert.alert(`Error!`, `${res.message}`);
      }
      else if (res.status === 401) {
        await AsyncStorage.clear();
        Actions.push('/Login');
      }

    } catch (error) {
      Alert.alert(`Error!`, `Network Error`);
    }
  };

  const clearAllQuestion = async () => {
    Alert.alert("Warning!!", 'About to remove all !!', [{
      text: "Accept",
      onPress: () => clearAll()
    }]);
  };

  const fetchMyMaids = async () => {

    const token = await AsyncStorage.getItem('key');

    setState({ ...state, loading: true });
    try {
      const res = await (await fetch(`${url}/user/getAllMyMaids`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })).json();

      if (res.status === 200) {
        setState({ ...state, loading: false });
        setState({ ...state, allMaids: res.data });
      }
      else if (res.status === 401) {
        await AsyncStorage.clear();
        Actions.push('/Login');
      }

    } catch (error) {
      Alert.alert(`Error!`, `Network Error`);
    }
  };


  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('key');
      if (!token) {
        Actions.push('/Login');
      }
      else {
        await fetchMyMaids();
      }
    })();
  }, []);


  const viewOne = async (tel) => {
    await AsyncStorage.setItem("MPHONE", tel);
    Actions.push('/ViewMaid');
  };

  const generateRandomNumbers = () => {
    let number = Math.floor((Math.random() * 100) + 1);
    return number;
  };


  return (
    <>
      <ScrollView style={styles.scroll}>
        <View style={styles.GOBack}>
          <Text style={styles.goBacktext} onPress={() => Actions.goBack()} >Go Back</Text>
          <Text style={styles.clearAll} onPress={() => clearAllQuestion()} >Clear my Employees</Text>
        </View>
        {state.loading ? <View style={styles.container}>
          <Text>Loading wait.......</Text>
        </View>
          : state.allMaids.myMaids.length === 0 ? <View style={styles.container} >
            <Text style={styles.No}>You have no employees yet</Text>
          </View>
            : state.allMaids.myMaids.map(({ maid_phone, maid_names }) => {
              return (
                <>
                  <View style={styles.container} key={generateRandomNumbers()} >
                    <View style={styles.AllMaids} key={generateRandomNumbers()}>
                      <Icon name="user" size={20} color="white" style={{ padding: 10, flex: 1 }} onPress={(e) => viewOne(maid_phone)} />
                      <Text style={styles.tel} onPress={(e) => viewOne(maid_phone)} >{maid_phone}</Text>
                      <Text style={styles.Names} onPress={(e) => viewOne(maid_phone)}>{maid_names}</Text>
                    </View>
                  </View>
                </>
              );
            })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    marginTop: 20,
    alignItems: "center"
  },
  GOBack: {
    flex: 1,
    flexDirection: "row",
    marginTop: 70,
    alignItems: "center"
  },
  goBacktext: {
    flex: 1,
    color: "darkgreen",
    fontSize: 17,
    padding: 10,
    textAlign: "center"
  },
  clearAll: {
    flex: 1,
    color: "red",
    fontSize: 17,
    padding: 10,
    textAlign: "center"
  },

  AllMaids: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "darkgreen",
    margin: 10
  },
  Names: {
    flex: 1,
    padding: 10,
    fontSize: 17,
    color: "white"
  },
  No: {
    textAlign: "center",
    color: "darkgreen"
  },
  tel: {
    flex: 1,
    padding: 10,
    fontSize: 17,
    color: "white"
  }
});