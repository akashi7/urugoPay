/*eslint-disable*/
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useHistory } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAnyOrientation } from '../UseOrientation';

export const SignUp = ({ navigation }) => {
  useAnyOrientation();

  const Actions = useHistory();

  let url = `http://10.0.2.2:6000`;

  const [state, setState] = useState({
    tel: '',
    password: "",
    loading: false,
    confirmPassword: "",
    names: "",
    Nid: '',
    address: "",
    king: ""
  });
  const signUpUser = async () => {
    setState({ ...state, loading: true });
    try {

      let Data = JSON.stringify(state);
      const res = await (await axios.post(`${url}/auth/signUp`, JSON.stringify(state),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })).data;

      if (res.status === 200) {
        await AsyncStorage.setItem('key', res.token);
        Actions.push('/Dashboard');
      }

      else if (res.status === 402) {
        setState({ ...state, loading: false });
        Alert.alert(`Password Error!`, `${res.message}`);
      }
      else if (res.status === 205) {
        setState({ ...state, loading: false });
        Alert.alert(`Password Error!`, `${res.message}`);
      }
      else if (res.status === 401) {
        setState({ ...state, loading: false });
        Alert.alert(`RDAWU Error!`, `${res.message}`);
      }
      else if (res.status === 409) {
        setState({ ...state, loading: false });
        Alert.alert(`Error!`, `${res.error}`);
      }
      else if (res.status === 501) {
        setState({ ...state, loading: false });
        Alert.alert(`Error!`, `${res.message}`);
      }


    } catch (error) {
      setState({ ...state, loading: false });
      Alert.alert(`Error!`, `Network Error`);
    }
  };
  const goToLogin = () => {
    Actions.push('/Dashboard');
  };
  return (
    <>
      <ScrollView style={styles.scrollView} >

        <View style={styles.slogan} >
          <Text style={styles.sign} >Sign Up</Text>
          <Text style={styles.Up} >Now</Text>
        </View>

        <View style={styles.container}>
          <View style={styles.telephone}  >
            <Icon name="phone" size={20} color="darkgreen" style={{ padding: 10 }} />
            <TextInput
              placeholder="tel"
              onChangeText={(inputText) => setState({ ...state, tel: inputText })}
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
            <Icon name="address-card" size={20} color="darkgreen" style={{ padding: 10 }} />
            <TextInput
              placeholder="address"
              onChangeText={(inputText) => setState({ ...state, address: inputText })}
              style={styles.input} />
          </View>
          <View style={styles.NamesView}>
            <Icon name="user-secret" size={20} color="darkgreen" style={{ padding: 10 }} />
            <TextInput
              placeholder="Password"
              secureTextEntry
              onChangeText={(inputText) => setState({ ...state, password: inputText })}
              style={styles.input} />
          </View>
          <View style={styles.NamesView}>
            <Icon name="user-secret" size={20} color="darkgreen" style={{ padding: 10 }} />
            <TextInput
              placeholder="Confirm password"
              secureTextEntry
              onChangeText={(inputText) => setState({ ...state, confirmPassword: inputText })}
              style={styles.input} />
          </View>
          {state.loading ? <TouchableOpacity style={styles.LoginButton}>
            <Text style={styles.LoginText}  >Loading....</Text>
          </TouchableOpacity>
            : <TouchableOpacity style={styles.LoginButton} onPress={() => signUpUser()} >
              <Text style={styles.LoginText}  >Sign Up</Text>
            </TouchableOpacity>}

          <View style={styles.ToLogin} >
            <Text style={styles.ToLoginText} onPress={() => Actions.push('Login')} >Have Account ?</Text>
          </View>
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
    marginTop: 50,
    padding: 10
  },
  slogan: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
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
// names: JSON.stringify(state.names),
        // password: JSON.stringify(state.password),
        // confirmPassword: JSON.stringify(state.confirmPassword),
        // Nid: JSON.stringify(state.Nid),
        // tel: JSON.stringify(state.tel),
        // address: JSON.stringify(state.address)