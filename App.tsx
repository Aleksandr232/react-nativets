import React,{useRef} from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  useWindowDimensions,
  StatusBar,
  Animated,
} from "react-native";
import Locations from "./model/location";

interface bgImgs {
  bgImg: object;
}

export default function App({ bgImg }: bgImgs) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent:{
            contentOffset:{
              x: scrollX
            }
          }
          }
        ],
        {useNativeDriver: false}
        )}
        scrollEventThrottle={1}
      >
        {Locations.map((location, index) => {
          if (location.weatherType == "Sunny") {
            bgImg = require("./assets/sunny.jpg");
          } else if (location.weatherType == "Night") {
            bgImg = require("./assets/night2.jpg");
          } else if (location.weatherType == "Cloudy") {
            bgImg = require("./assets/cloudy.jpeg");
          } else if (location.weatherType == "Rainy") {
            bgImg = require("./assets/rainy.jpg");
          }
          return (
            <View
              style={{ width: windowWidth, height: windowHeight }}
              key={index}
            >
              <ImageBackground source={bgImg} style={{ flex: 1 }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.3)",
                    padding: 20,
                  }}
                >
                  <View style={styles.infoTopWrapper}></View>
                  <View style={{
                    borderBottomColor: 'rgba(255,255,255,0.7)',
                      marginTop: 20,
                      borderBottomWidth: 1,}}/>
                  <View style={styles.infoBattomWrapper}>
                    <View>
                    <Text style={styles.city}>{location.city}</Text>
                    <Text style={styles.time}>{location.dateTime}</Text>
                    </View>
                    <View>
                        <Text style={styles.temparature}>{location.temparature}</Text>
                        <Text style={styles.weatherType}>{location.weatherType}</Text>
                    </View>
                  </View>
                  
                </View>
              </ImageBackground>
            </View>
          );
        })}
      </ScrollView>
      <View
        style={styles.indicatorWrapper}
      >
        {Locations.map((location, index) => {
          const width = scrollX.interpolate(
            {
              inputRange:[
                windowWidth * (index -1),
                windowWidth * index,
                windowWidth * (index + 1)
              ],
              outputRange:[
                5, 12, 5
              ],
              extrapolate: 'clamp'

            }
          )
          return (
            <Animated.View
              key={index}
              style={[styles.normalDot,{width}]}   
            />
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  normalDot:{
    height: 5,
    width: 5,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#fff'
  },
  indicatorWrapper:{
    position: "absolute",
    top: 160,
    left: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  infoTopWrapper:{
    flex: 1,
    marginTop: 160,
    justifyContent: 'space-between',
  },
  infoBattomWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  city: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },
  time: {
    color: '#fff',
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },
  temparature: {
    color: '#fff',
    fontFamily: 'Lato-Light',
    fontSize: 85,
  },
  weatherType: {
    color: '#fff',
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
    fontSize: 25,
    lineHeight: 34,
    marginLeft: 10,
  },
});
