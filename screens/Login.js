/*eslint-disable*/

import React, { useState } from 'react';
import { TextInput, View, Text, Alert, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHistory } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAnyOrientation } from '../UseOrientation';



export const Login = () => {

  useAnyOrientation();

  const Actions = useHistory();

  let url = `http://10.0.2.2:6000`;

  const [state, setState] = useState({
    tel: '',
    password: "",
    loading: false
  });

  const LoginUser = async () => {

    setState({ ...state, loading: true });

    try {
      const res = await (await fetch(`${url}/auth/Login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
      })).json();

      console.log('res', res);

      if (res.status === 200) {
        await AsyncStorage.setItem('key', res.token);
        Actions.push('/Dashboard');
      }
      else if (res.status === 409) {
        setState({ ...state, loading: false });
        Alert.alert(`Error!`, `${res.error}`);
      }
      else if (res.status === 300) {
        setState({ ...state, loading: false });
        Alert.alert(`Error!`, `${res.message}`);
      }
      else if (res.status === 301) {
        setState({ ...state, loading: false });
        Alert.alert(`Error!`, `${res.message}`);
      }
      else if (res.status === 501) {
        setState({ ...state, loading: false });
        Alert.alert(`Error!`, `${res.message}`);
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
          <Text style={styles.sign} >Login</Text>
          <Text style={styles.Up} >Now</Text>
        </View>
        <View style={styles.container} >
          <View style={styles.telephone} >
            <Icon name="phone" size={20} color="darkgreen" style={{ padding: 10 }} />
            <TextInput
              placeholder="Telephone"
              onChangeText={(inputText) => setState({ ...state, tel: inputText })}
              style={styles.input}
            />
          </View>
          <View style={styles.passwords} >
            <Icon name="user-secret" size={20} color="darkgreen" style={{ padding: 10 }} />
            <TextInput
              placeholder="Password"
              secureTextEntry
              onChangeText={(inputText) => setState({ ...state, password: inputText })}
              style={styles.Password}
            />
          </View>
          {state.loading ? <TouchableOpacity style={styles.LoginButton}>
            <Text style={styles.LoginText} >Loading.....</Text>
          </TouchableOpacity>
            : <TouchableOpacity style={styles.LoginButton} onPress={() => LoginUser()}>
              <Text style={styles.LoginText} >Login</Text>
            </TouchableOpacity>}

          <View style={styles.links}>
            <Text style={styles.ToLink}>Forgot Password</Text>
            <Text style={styles.ToLink} onPress={() => Actions.push('/SignUp')}  >Do not have Account ?</Text>
            <Text style={styles.ToLink} onPress={() => Actions.push('/InMembers')} >Already a member of RDAWU ?</Text>
          </View>
        </View>
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

  container: {
    marginTop: 120,
    padding: 10
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
  ToLink: {
    fontSize: 17,
    color: "darkgreen",
    margin: 10
  },
  links: {
    marginTop: 20
  }
});
