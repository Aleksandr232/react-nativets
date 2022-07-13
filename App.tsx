import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, useWindowDimensions, StatusBar } from 'react-native';

export default function App() {
  const {width: windowWidth, height:windowHeight}=useWindowDimensions()
  return (
    <>
    <StatusBar barStyle='light-content'/>
    <ScrollView>
      <View style={{width: windowWidth, height: windowHeight}}>
          <ImageBackground source={require('./assets/night2.jpg')} style={{flex:1}}/>
      </View>
    </ScrollView>
    </>
  );
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */
