/*eslint-disable*/
import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHistory } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAnyOrientation } from '../UseOrientation';

export const Dashboard = () => {

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



  let url = `https://urugoserver.herokuapp.com`;

  const goLogOut = async () => {
    await AsyncStorage.clear();
    Actions.push('/Login');
  };


  return (
    <>
      <ScrollView style={styles.scroll} >
        <View style={styles.secondRound} >
          <View style={styles.firstRound}>
            <Icon name="users" size={60} color="darkgreen" style={{ padding: 10 }} onPress={() => Actions.push('/MyMaids')} />
            <Text style={styles.maids} onPress={() => Actions.push('/MyMaids')} >My Employees</Text>
          </View>
          <View style={styles.second}>
            <Icon name="search" size={60} color="darkgreen" style={{ padding: 10 }} onPress={() => Actions.push('/Search')} />
            <Text style={styles.maids} onPress={() => Actions.push('/Search')}>Find Emp</Text>
          </View>
        </View>
        <View style={styles.ProfilePlace}>
          <View style={styles.one} >
            <Icon name="user" size={60} color="darkgreen" style={{ padding: 10 }} onPress={() => Actions.push('/Profile')} />
            <Text style={styles.ProfileTxet} onPress={() => Actions.push('/Profile')} >Profile</Text>
          </View>
          <View style={styles.two}>
            <Icon name="user-plus" size={55} color="darkgreen" style={{ padding: 10 }} onPress={() => Actions.push('/RegisterMaid')} />
            <Text style={styles.ProfileTxet} onPress={() => Actions.push('/RegisterMaid')} >Register Emp</Text>
          </View>
        </View>
        <View style={styles.firstRound}>
          <Icon name="sign-out" size={55} color="darkgreen" style={{ padding: 10 }} onPress={() => goLogOut()} />
          <Text style={styles.ProfileTxet} onPress={() => goLogOut()} >Log Out</Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({

  scroll: {
    flex: 1
  },

  firstRound: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 10
  },
  maids: {
    flex: 1,
    fontSize: 17
  },
  secondRound: {
    flex: 1,
    flexDirection: "row",
    marginTop: 150
  },
  one: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 10
  },
  two: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 10
  },
  second: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 10
  },
  ProfilePlace: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50
  },
  ProfileTxet: {
    textAlign: "center",
    fontSize: 17
  }

});