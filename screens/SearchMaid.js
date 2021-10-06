/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHistory } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAnyOrientation } from '../UseOrientation';

export const SearchMaid = () => {

  useAnyOrientation();
  const Actions = useHistory();

  const [state, setState] = useState({
    tel: "",
    loading: false
  });

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('key');
      if (!token) {
        Actions.push('/Login');
      }
    })();
  }, []);

  let url = `https://urugoserver.herokuapp.com`;

  const findMaid = async () => {
    const token = await AsyncStorage.getItem('key');

    setState({ ...state, loading: true });

    try {

      const res = await (await fetch(`${url}/user/search`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(state)
      })).json();



      if (res.status === 200) {
        await AsyncStorage.setItem('tel', (res.MaidTel));
        Actions.push('/FoundMaid');
      }
      else if (res.status === 400) {
        setState({ ...state, loading: false });
        Alert.alert(`Error!`, `${res.message}`);
      }
      else if (res.status === 405) {
        setState({ ...state, loading: false });
        Alert.alert(`Error!`, `${res.message}`);
      }
      else if (res.status === 409) {
        setState({ ...state, loading: false });
        Alert.alert(`Error!`, `${res.error}`);
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
      <ScrollView style={styles.scroll} >
        <View style={styles.menu}>
          <Text style={styles.menuText} onPress={() => Actions.goBack()} >Go back</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.telephone}>
            <Icon name="search" size={20} color="darkgreen" style={{ padding: 10 }} />
            <TextInput
              placeholder="Search Telephone "
              onChangeText={(inputText) => setState({ ...state, tel: inputText })}
              style={styles.input} />
          </View>
          {state.loading ? <TouchableOpacity style={styles.LoginButton}>
            <Text style={styles.LoginText} >Loading .....</Text>
          </TouchableOpacity>
            : <TouchableOpacity style={styles.LoginButton} onPress={() => findMaid()} >
              <Text style={styles.LoginText} >Search</Text>
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
  container: {
    marginTop: 120,
    padding: 10
  },
  menu: {
    marginTop: 50,
    alignItems: "center"
  },
  menuText: {
    fontSize: 17,
    color: "darkgreen"
  },
  telephone: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
    fontSize: 17,
    borderBottomWidth: 1
  },
  LoginButton: {
    padding: 10,
    backgroundColor: "green",
    marginTop: 50,
    borderRadius: 7
  },
  LoginText: {
    textAlign: "center",
    alignItems: "center",
    color: "white",
    fontSize: 17
  },

});
