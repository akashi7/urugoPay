/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHistory } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAnyOrientation } from '../UseOrientation';



export const RegisterMaid = () => {


  useAnyOrientation();
  //  example of maidPhone : 0781400500


  const Actions = useHistory();
  let url = `https://urugoserver.herokuapp.com`;

  const [state, setState] = useState({
    Nid: "",
    names: "",
    phone: "",
    gender: "",
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


  const RegisterNewMaid = async () => {

    if ((state.Nid === '') || (!state.names === '') || (!state.phone === '') || (!state.gender === '')) {
      Alert.alert("Error!!", "Please Fill all gaps", [{
        text: "OK",
        onPress: () => Actions.push('/RegisterMaid')
      }]);
    }
    else {

      const token = await AsyncStorage.getItem('key');
      setState({ ...state, loading: true });

      try {

        const res = await (await fetch(`${url}/user/registerMaid`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(state)
        })).json();

        if (res.status === 200) {
          setState({ ...state, loading: false });
          Alert.alert(`Success!`, `Registered succesfully!`, [{
            text: "OK",
            onPress: () => Actions.push('/Dashboard')
          }]);
        }
        else if (res.status === 400) {
          setState({ ...state, loading: false });
          Alert.alert('Error!!', `${res.message}`);
        }
        else if (res.status === 501) {
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
        Alert.alert(`Error!`, `Network Error`);
      }
    }

  };


  return (
    <>
      <ScrollView style={styles.scrollView} >
        <View style={styles.slogan}  >
          <Text style={styles.sign} onPress={() => Actions.push('/Dashboard')}  >Home</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.telephone}  >
            <Icon name="phone" size={20} color="darkgreen" style={{ padding: 10 }} />
            <TextInput
              placeholder="Telephone"
              onChangeText={(inputText) => setState({ ...state, phone: inputText })}
              style={styles.input}
            />
          </View>

          <View style={styles.NidView}>
            <Icon name="id-card" size={20} color="darkgreen" style={{ padding: 10 }} />
            <TextInput
              placeholder="Nid"
              onChangeText={(inputText) => setState({ ...state, Nid: inputText })}
              style={styles.input}
            />
          </View>
          <View style={styles.NamesView}>
            <Icon name="id-card" size={20} color="darkgreen" style={{ padding: 10 }} />
            <TextInput
              placeholder="Names"
              onChangeText={(inputText) => setState({ ...state, names: inputText })}
              style={styles.input} />
          </View>
          <View style={styles.NamesView}>
            <Icon name="user" size={20} color="darkgreen" style={{ padding: 10 }} />
            <TextInput
              placeholder="Gender"
              onChangeText={(inputText) => setState({ ...state, gender: inputText })}
              style={styles.input} />
          </View>
          {state.loading ? <TouchableOpacity style={styles.LoginButton}>
            <Text style={styles.LoginText}  >Loading...</Text>
          </TouchableOpacity>
            : <TouchableOpacity style={styles.LoginButton} onPress={() => RegisterNewMaid()} >
              <Text style={styles.LoginText}  >Send</Text>
            </TouchableOpacity>}

        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  container: {
    marginTop: 10,
    padding: 10
  },
  slogan: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 90
  },
  sign: {
    backgroundColor: "darkgreen",
    color: "white",
    padding: 10,
    fontSize: 17
  },
  Up: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    fontSize: 17
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
  NidView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 10
  },
  NamesView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 10
  },
  LoginButton: {
    padding: 10,
    backgroundColor: "green",
    marginTop: 20,
    borderRadius: 7
  },
  LoginText: {
    textAlign: "center",
    alignItems: "center",
    color: "white",
    fontSize: 17
  },
  ToLogin: {
    marginTop: 10,
    alignItems: "center",
  },
  ToLoginText: {
    fontSize: 17,
    color: "darkgreen"
  }
});
