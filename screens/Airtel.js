/*eslint-disable*/
import React, { useEffect } from 'react';
import { TextInput, View, Text, Alert, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useHistory } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AirTel from '../Images/airtel.jpg';
import { useAnyOrientation } from '../UseOrientation';

export const Airtel = () => {

  useAnyOrientation();

  const Actions = useHistory();

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('key');
      if (!token) {
        Actions.push('/Login');
      }
    })();
  }, []);

  return (
    <>
      <ScrollView style={styles.scroll}>
        <View style={styles.menu}>
          <Text style={styles.goToHome} onPress={() => Actions.push("/Dashboard")} >Home</Text>
          <Text style={styles.GoBack} onPress={() => Actions.goBack()} >Go Back</Text>
        </View>
        <View style={styles.viewCenter}>
          <Image source={AirTel} style={styles.imageK} />
        </View>
        <View style={styles.container}>
          <View style={styles.telephone}>
            <Icon name="keyboard-o" size={20} color="darkgreen" style={{ padding: 10 }} />
            <TextInput
              placeholder="Amount"
              style={styles.input}
            />
          </View>
          <TouchableOpacity style={styles.LoginButton} >
            <Text style={styles.LoginText} >Pay</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1
  },
  imageK: {
    width: 170,
    height: 100
  },
  viewCenter: {
    flex: 1,
    alignItems: "center",
    marginTop: 100
  },
  container: {
    marginTop: 80,
    padding: 10
  },
  menu: {
    flex: 1,
    flexDirection: "row",
    marginTop: 70
  },
  goToHome: {
    flex: 1,
    padding: 10,
    textAlign: "center",
    fontSize: 17
  },
  GoBack: {
    flex: 1,
    padding: 10,
    textAlign: "center",
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
