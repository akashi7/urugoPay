/*eslint-disable*/
import React, { useState } from 'react';
import { TextInput,View, Text, Alert, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useHistory } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAnyOrientation } from '../UseOrientation';


export const ChoosePasswords = () => {
  const Actions = useHistory();
  useAnyOrientation();

  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
    loading: false
  });


  let url = `https://urugoserver.herokuapp.com`;

  const userChoosePassword = async () => {

    const TEL = await AsyncStorage.getItem('checkTel');
    setState({ ...state, loading: true });
    try {

      const res = await (await fetch(`${url}/auth/DWCpassword?tel=${TEL}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
      })).json();

      if (res.status === 200) {
        Alert.alert('Success!!', 'Password created', [{
          text: "OK",
          onPress: () => Actions.push('/Dashboard')
        }]);
      }
      else if (res.status === 402) {
        setState({ ...state, loading: false });
        Alert.alert(`Error!`, `${res.message}`);
      }
      else if (res.status === 405) {
        setState({ ...state, loading: false });
        Alert.alert(`Error!`, `${res.message}`);
      }
      else if (res.status === 205) {
        setState({ ...state, loading: false });
        Alert.alert(`Error!`, `${res.message}`);
      }
      else if (res.status === 409) {
        setState({ ...state, loading: false });
        Alert.alert(`Error!`, `${res.error}`);
      }


    } catch (error) {
      setState({ ...state, loading: false });
      Alert.alert(`Network Error!`, `Error try again`);
    }
  };

  return (
    <>
      <ScrollView style={styles.scroll} >
        <View style={styles.slogan} >
          <Text style={styles.sign} >Create</Text>
          <Text style={styles.Up} >Password</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.telephone}>
            <Icon name="user-secret" size={20} color="darkgreen" style={{ padding: 10 }} />
            <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.input}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(inputText) => setState({ ...state, password: inputText })}
            />
          </View>
          <View style={styles.passwords} >
            <Icon name="user-secret" size={20} color="darkgreen" style={{ padding: 10 }} />
            <TextInput
              placeholder="Confirm password"
              style={styles.Password}
              secureTextEntry
              onChangeText={(inputText) => setState({ ...state, confirmPassword: inputText })}
            />
          </View>
          {state.loading ? <TouchableOpacity style={styles.LoginButton}>
            <Text style={styles.LoginText} >Loading.....</Text>
          </TouchableOpacity>
            : <TouchableOpacity style={styles.LoginButton} onPress={() => userChoosePassword()}>
              <Text style={styles.LoginText} >Send</Text>
            </TouchableOpacity>}

          <View style={styles.GOBack} >
            <Text style={styles.goBacktext} onPress={() => Actions.goBack()} >Go Back</Text>
          </View>

        </View>

        {/* <Button title="Send" color="darkgreen" onPress={() => Actions.push('Dashboard')} /> */}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  slogan: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  container: {
    marginTop: 120,
    padding: 10
  },
  sign: {
    flex: 1,
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
  Password: {
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
  telephone: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  passwords: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 20
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
  GOBack: {
    marginTop: 30,
    alignItems: "center"
  },
  goBacktext: {
    color: "darkgreen",
    fontSize: 17
  }
});
