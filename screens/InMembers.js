/*eslint-disable*/
import React, { useState } from 'react';
import { TextInput, Button, View, Text, Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHistory } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAnyOrientation } from '../UseOrientation';

export const InMembers = () => {
  const Actions = useHistory();
  useAnyOrientation();

  let url = `http://10.0.2.2:6000`;

  const [state, setState] = useState({
    tel: "",
    loading: false
  });

  const checkUser = async () => {
    setState({ ...state, loading: true });
    try {

      const res = await (await fetch(`${url}/auth/DWCmember`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
      })).json();

      if (res.status === 200) {
        await AsyncStorage.setItem('checkTel', res.Tel);
        Actions.push('/ChoosePasswords');
      }
      else if (res.status === 402) {
        setState({ ...state, loading: false });
        Alert.alert(`Error!`, `${res.message}`);
      }
      else if (res.status === 400) {
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
      <ScrollView style={styles.scroll}>
        <View style={styles.slogan} >
          <Text style={styles.sign} >Search</Text>
          <Text style={styles.Up} >RDAWU member</Text>
        </View>
        <View style={styles.container} >
          <View style={styles.telephone}>
            <Icon name="phone" size={20} color="darkgreen" style={{ padding: 10 }} />
            <TextInput
              placeholder="Telephone"
              onChangeText={(inputText) => setState({ ...state, tel: inputText })}
              style={styles.input}
            />
          </View>
          {state.loading ? <TouchableOpacity style={styles.LoginButton} >
            <Text style={styles.LoginText} >Loading....</Text>
          </TouchableOpacity>
            : <TouchableOpacity style={styles.LoginButton} onPress={() => checkUser()} >
              <Text style={styles.LoginText} >Send</Text>
            </TouchableOpacity>}

          <View style={styles.GOBack} >
            <Text style={styles.goBacktext} onPress={() => Actions.goBack()} >Go Back</Text>
          </View>
        </View>

        {/* <Button title="Search" color="darkgreen" onPress={() => Actions.push('ChoosePasswords')} /> */}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    marginTop: 120,
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
  GOBack: {
    marginTop: 30,
    alignItems: "center"
  },
  goBacktext: {
    color: "darkgreen",
    fontSize: 17
  }

});
