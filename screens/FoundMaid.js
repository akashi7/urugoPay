/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHistory } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAnyOrientation } from '../UseOrientation';

export const FoundMaid = () => {

  useAnyOrientation();


  const Actions = useHistory();
  let url = `http://10.0.2.2:6000`;


  const [state, setState] = useState({
    foundMaid: {
      user: {}
    },
    loading: false
  });



  const fetchMaid = async () => {


    const token = await AsyncStorage.getItem('key');
    const MaidTel = await AsyncStorage.getItem('tel');


    try {
      const res = await (await fetch(`${url}/user/searching?tel=${MaidTel}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })).json();


      if (res.status === 200) {

        setState({ ...state, foundMaid: res.data });

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
      await fetchMaid();
    })();
  }, []);



  const AddToMyMaids = async (names, tel) => {
    setState({ ...state, loading: true });
    const token = await AsyncStorage.getItem('key');

    try {

      const res = await (await fetch(`${url}/user/addToFav?maidTel=${tel}&&Names=${names}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })).json();

      if (res.status === 200) {
        Alert.alert('Success!!', `Employee taken ok!!`, [{
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
      setState({ ...state, loading: false });
      Alert.alert(`Network Error!`, `${error}`);
    }
  };












  return (
    <>
      <ScrollView style={styles.scroll}>
        <View style={styles.menu} >
          <Text style={styles.texts} onPress={() => Actions.push("/Dashboard")}>Home</Text>
          <Text style={styles.texts} onPress={() => Actions.goBack()} >Go back</Text>
        </View>
        <View style={styles.container} >

          <Icon name="user" size={100} color="darkgreen" style={{ padding: 10 }} />
          <Text style={styles.content} >{state.foundMaid.user.tel}</Text>
          <Text style={styles.content} >{state.foundMaid.user.fn}</Text>

          {state.loading ? <TouchableOpacity style={styles.addContainer} >
            <Icon name="user-plus" size={50} color="darkgreen" style={{ padding: 10, flex: 1 }} />
            <Text style={styles.addText} >Loading....</Text>
          </TouchableOpacity>
            : <TouchableOpacity style={styles.addContainer} onPress={(i, e) => AddToMyMaids(state.foundMaid.user.fn, state.foundMaid.user.tel)} >
              <Icon name="user-plus" size={50} color="darkgreen" style={{ padding: 10, flex: 1 }} />
              <Text style={styles.addText} >Add to your Employees</Text>
            </TouchableOpacity>}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1
  },
  menu: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },
  texts: {
    flex: 1,
    padding: 10,
    fontSize: 17,
    color: "darkgreen",
    textAlign: "center"
  },
  container: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    marginTop: 70
  },
  addContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  addText: {
    flex: 1,
    textAlign: "center",
    fontSize: 17
  },
  content: {
    fontSize: 17,
  },


});
