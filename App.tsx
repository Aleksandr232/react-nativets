import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, useWindowDimensions, StatusBar } from 'react-native';
import Locations from './model/location';


interface bgImgs{
  bgImg: object
}


export default function App({bgImg}: bgImgs) {
  const {width: windowWidth, height:windowHeight}=useWindowDimensions()
  return (
    <>
    <StatusBar barStyle='light-content'/>
    <ScrollView 
      horizontal={true}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    >
      {Locations.map((location, index)=>{
         if (location.weatherType == 'Sunny') {
           bgImg = require('./assets/sunny.jpg');
        } else if (location.weatherType == 'Night') {
           bgImg = require('./assets/night2.jpg');
        } else if (location.weatherType == 'Cloudy') {
          bgImg = require('./assets/cloudy.jpeg');
        } else if (location.weatherType == 'Rainy') {
           bgImg = require('./assets/rainy.jpg');
        }
          return(
          <View style={{width: windowWidth, height: windowHeight}} key={index}>
            <ImageBackground source={bgImg} style={{flex:1}}/>
        </View>
          );
      })}
     
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
