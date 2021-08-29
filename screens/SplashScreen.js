/*eslint-disable*/
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import logo from '../Images/kabuto.png';
import { useHistory } from 'react-router-native';
import { useAnyOrientation } from '../UseOrientation';

export const SplashScreen = () => {

  useAnyOrientation();

  const Actions = useHistory();

  useEffect(() => {
    setTimeout(() => {
      Actions.push('Login');
    }, 5000);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Image style={styles.imav} source={logo} />
        <Text style={{ fontSize: 29 }}></Text>
        <View style={styles.developer}>
          <Text style={{ color: 'darkgreen', fontSize: 29, fontWeight: "bold" }}>Urugo Pay</Text>
        </View>
      </View>
    </>
  );


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
    alignItems: "center",
  },
  developer: {
    marginTop: 150,
  },
  imav: {
    width: 151,
    height: 140
  }

});


