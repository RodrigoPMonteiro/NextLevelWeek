import React from 'react';
import { StyleSheet, Text, StatusBar, View } from 'react-native';
import { AppLoading } from 'expo';

import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';

import Routes from './src/routes';


export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  });

  if(!fontsLoaded){
    return <AppLoading />
  }

  return (
    <>
      <StatusBar 
        barStyle='dark-content'
        backgroundColor="transparent"  // blue
        translucent
       />
      <Routes />
    </>
  );
}

    // <View style={styles.container}>
    //   <Text style={styles.text}>Hello</Text>
    // </View>

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    alignItems :'center',
    justifyContent: 'center',
  },

  text: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  }
}); */



