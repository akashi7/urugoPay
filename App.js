/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { NativeRouter, Switch, Route } from 'react-router-native';
import { SplashScreen } from './screens/SplashScreen';
import { SignUp } from './screens/SignUp';
import { Login } from './screens/Login';
import { InMembers } from './screens/InMembers';
import { ChoosePasswords } from './screens/ChoosePasswords';
import { Dashboard } from './screens/Dashboard';
import { MyMaids } from './screens/MyMaids';
import { ViewMaid } from './screens/ViewMaid';
import { MoMo } from './screens/MoMo';
import { Airtel } from './screens/Airtel';
import { SearchMaid } from './screens/SearchMaid';
import { FoundMaid } from './screens/FoundMaid';
import { Profile } from './screens/Profile';
import { RegisterMaid } from './screens/RegisterMaid';
import { useLockOrientationPortrait } from './UseOrientation';
import InAppUpdate from './InAppUpdate';




const App = () => {


  useEffect(() => {
    InAppUpdate.checkUpdate();
  }, []);

  useLockOrientationPortrait();


  return (
    <>
      <NativeRouter>
        <Switch>
          <Route path="/" component={SplashScreen} exact />
          <Route path="/SignUp" component={SignUp} exact />
          <Route path="/Login" component={Login} exact />
          <Route path="/InMembers" component={InMembers} exact />
          <Route path="/ChoosePasswords" component={ChoosePasswords} exact />
          <Route path="/Dashboard" component={Dashboard} exact />
          <Route path="/MyMaids" component={MyMaids} exact />
          <Route path="/ViewMaid" component={ViewMaid} exact />
          <Route path="/MomoPay" component={MoMo} exact />
          <Route path="/AirtelPay" component={Airtel} exact />
          <Route path="/Search" component={SearchMaid} exact />
          <Route path="/FoundMaid" component={FoundMaid} exact />
          <Route path="/Profile" component={Profile} exact />
          <Route path="/RegisterMaid" component={RegisterMaid} exact />
        </Switch>
      </NativeRouter>
    </>
  );
};



export default App;
