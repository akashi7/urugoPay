/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Alert, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHistory } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAnyOrientation } from '../UseOrientation';

export const Profile = () => {
  const Actions = useHistory();
  useAnyOrientation();

  let url = `https://urugoserver.herokuapp.com`;

  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
    loading: false,
    oldPassword: ""
  });


  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('key');
      if (!token) {
        Actions.push('/Login');
      }
    })();
  }, []);

  const changePassword = async () => {
    const token = await AsyncStorage.getItem('key');

    setState({ ...state, loading: true });

    try {
      const res = await (await fetch(`${url}/user/updatePassword`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(state)
      })).json();

      if (res.status === 200) {
        Alert.alert('Success', 'Password changed', [{
          text: "OK",
          onPress: () => Actions.push('/Dashboard')
        }]);
      }
      else if (res.status === 409) {
        setState({ ...state, loading: false });
        Alert.alert(`Error!`, `${res.error}`);
      }
      else if (res.status === 207) {
        setState({ ...state, loading: false });
        Alert.alert(`Error!`, `${res.message}`);
      }
      else if (res.status === 205) {
        setState({ ...state, loading: false });
        Alert.alert(`Error!`, `${res.message}`);
      }
      else if (res.status === 405) {
        setState({ ...state, loading: false });
        Alert.alert(`Error!`, `${res.message}`);
      }
      else if (res.status === 401) {
        await AsyncStorage.clear();
        Actions.push('/Login');
      }


    } catch (error) {
      setState({ ...state, loading: false });
      Alert.alert(`Network Error!`, `Error try again`);
    }
  };



  return (
    <>
      <ScrollView style={styles.scroll} >
        <View style={styles.menu} >
          <Text style={styles.texts} onPress={() => Actions.push("/Dashboard")}>Home</Text>
          <Text style={styles.texts} onPress={() => Actions.goBack()} >Go back</Text>
        </View>
        <View style={styles.container} >
          <View style={styles.telephone}>
            <Icon name="user-secret" size={20} color="darkgreen" style={{ padding: 10 }} />
            <TextInput
              placeholder="New password"
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
              placeholder="Confirm new password"
              style={styles.Password}
              secureTextEntry
              onChangeText={(inputText) => setState({ ...state, confirmPassword: inputText })}
            />
          </View>
          <View style={styles.passwords} >
            <Icon name="user-secret" size={20} color="darkgreen" style={{ padding: 10 }} />
            <TextInput
              placeholder="Old password"
              style={styles.Password}
              secureTextEntry
              onChangeText={(inputText) => setState({ ...state, oldPassword: inputText })}
            />
          </View>
          {state.loading ? <TouchableOpacity style={styles.LoginButton}>
            <Text style={styles.LoginText} >Loading...</Text>
          </TouchableOpacity>
            : <TouchableOpacity style={styles.LoginButton} onPress={() => changePassword()} >
              <Text style={styles.LoginText} >Send</Text>
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
    marginTop: 70,
    padding: 10
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

});
