/*eslint-disable*/

import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHistory } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Mtn from '../Images/mtn.png';
import AirTel from '../Images/airtel.jpg';
import { useAnyOrientation } from '../UseOrientation';

export const ViewMaid = () => {

  useAnyOrientation();

  const Actions = useHistory();
  let url = `http://10.0.2.2:6000`;

  const [state, setState] = useState({
    Maid: {
      oneMaid: []
    },
    loading: false
  });


  const ViewOneMaid = async () => {
    setState({ ...state, loading: true });
    const token = await AsyncStorage.getItem('key');
    const MaidTel = await AsyncStorage.getItem('MPHONE');

    try {

      const res = await (await fetch(`${url}/user/ViewOneMaid?maidTel=${MaidTel}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })).json();


      if (res.status === 200) {
        setState({ ...state, loading: false });
        setState({ ...state, Maid: res.data });
      }
      else if (res.status === 405) {
        setState({ ...state, loading: false });
        Alert.alert(`Network Error!`, `${res.message}`);
      }
      else if (res.status === 401) {
        await AsyncStorage.clear();
        Actions.push('/Login');
      }


    } catch (error) {
      Alert.alert(`Error!`, `Network Error`);
    }
  };

  const RemoveEmp = async (tel) => {
    setState({ ...state, loading: true });
    const token = await AsyncStorage.getItem('key');
    try {
      const res = await (await fetch(`${url}/user/deleteOne?maidTel=${tel}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })).json();

      if (res.status === 200) {
        Alert.alert("Success!!", "Removed Ok !!", [{
          text: "OK",
          onPress: () => Actions.push('/Dashboard')
        }]);
      }
      else if (res.status === 401) {
        await AsyncStorage.clear();
        Actions.push('/Login');
      }

    } catch (error) {
      Alert.alert(`Error!`, `Network Error`);
    }


  };

  const GetAlert = (Tel) => {
    Alert.alert("Warning!!", "Want to remove employee", [{
      text: "Accept",
      onPress: () => RemoveEmp(Tel)
    }]);
  };


  useEffect(() => {
    (async () => {
      await ViewOneMaid();
    })();
  }, []);

  const generateRandomNumbers = () => {
    let number = Math.floor((Math.random() * 100) + 1);
    return number;
  };

  return (
    <>
      <ScrollView style={styles.scroll} >
        <View style={styles.menu}>
          <Text style={styles.goToHome} onPress={() => Actions.push("/Dashboard")} >Home</Text>
          <Text style={styles.GoBack} onPress={() => Actions.goBack()} >Go Back</Text>
        </View>
        {state.loading ? <View style={styles.MaidInfo}>
          <Text>Loading......</Text>
        </View>
          : state.Maid.oneMaid.map(({ id, maid_phone, maid_names }) => {
            return (
              <>
                <View style={styles.MaidInfo} key={generateRandomNumbers()}>
                  <Icon name="user" size={100} color="darkgreen" style={{ padding: 10 }} />
                  <Text style={styles.content} >{maid_phone}</Text>
                  <Text style={styles.content} >{maid_names}</Text>
                  <Text style={styles.remove} onPress={(e) => GetAlert(maid_phone)} >Remove Emp</Text>
                </View>
              </>
            );
          })}
        <View style={styles.Pay}>
          <Text style={styles.PayText}>Pay</Text>
        </View>
        <View style={styles.Images}>
          <TouchableOpacity style={styles.MTN} onPress={() => Actions.push('/MomoPay')}>
            <Image source={Mtn} style={styles.imageK} />
            <Text style={styles.onText} onPress={() => Actions.push('/MomoPay')}  >MOMO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.AIRTEL} onPress={() => Actions.push('/AirtelPay')}>
            <Image source={AirTel} style={styles.imageK} />
            <Text style={styles.onText} onPress={() => Actions.push('/AirtelPay')} >AirTel Money</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  scroll: {
    flex: 1,
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


  MaidInfo: {
    marginTop: 50,
    alignItems: "center",
    padding: 10
  },
  content: {
    fontSize: 17
  },
  remove: {
    fontSize: 19,
    color: "red"
  },
  Images: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    marginTop: 30
  },
  MTN: {
    flex: 1,
    flexDirection: "column",
    textAlign: "center",
    padding: 5
  },
  AIRTEL: {
    flex: 1,
    flexDirection: "column",
    textAlign: "center",
    padding: 5
  },
  imageK: {
    width: 170,
    height: 100
  },
  onText: {
    marginTop: 10,
    fontSize: 17,
    textAlign: "center"
  },
  Pay: {
    alignItems: "center",
    padding: 5
  },
  PayText: {
    fontSize: 17,
    color: "darkgreen"
  }



});