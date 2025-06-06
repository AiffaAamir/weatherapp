import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Assets
const localBackground = require('@/assets/images/back.png');
const houseImage = require('@/assets/images/house.png');
const forecastModal = require('@/assets/images/Modal.png');
const cloudIcon = require('@/assets/images/cloud.png');
const snowIcon = require('@/assets/images/snow.png');
const foggyIcon =  require('@/assets/images/foggy.png');
const nightRainIcon = require('@/assets/images/nightRain.png');
const dayRainIcon = require('@/assets/images/dayRain.png');
const dayShowersIcon = require('@/assets/images/dayShower.png');
const tornadoIcon = require('@/assets/images/Tornado.png');
const sunnyIcon = require( '@/assets/images/sunny.png');

const hourlyData = [
  { time: '12 AM', temp: '18°', icon: foggyIcon, chance: '20%' },
  { time: '1 AM', temp: '18°', icon: nightRainIcon, chance: '50%' },
  { time: '2 AM', temp: '17°', icon: nightRainIcon, chance: '55%' },
  { time: '3 AM', temp: '17°', icon: dayRainIcon, chance: '60%' },
  { time: '4 AM', temp: '17°', icon: dayShowersIcon, chance: '40%' },
  { time: '5 AM', temp: '18°', icon: foggyIcon, chance: '25%' },
  { time: '6 AM', temp: '18°', icon: cloudIcon, chance: '30%' },
  { time: '7 AM', temp: '19°', icon: cloudIcon, chance: '25%' },
  { time: '8 AM', temp: '20°', icon: cloudIcon, chance: '15%' },
  { time: '9 AM', temp: '21°', icon: sunnyIcon, chance: '5%' },
  { time: '10 AM', temp: '23°', icon: sunnyIcon, chance: '0%' },
  { time: '11 AM', temp: '25°', icon: sunnyIcon, chance: '0%' },
  { time: '12 PM', temp: '27°', icon: sunnyIcon, chance: '0%' },
  { time: '1 PM', temp: '28°', icon: sunnyIcon, chance: '0%' },
  { time: '2 PM', temp: '29°', icon: sunnyIcon, chance: '0%' },
  { time: '3 PM', temp: '28°', icon: cloudIcon, chance: '10%' },
  { time: '4 PM', temp: '27°', icon: dayShowersIcon, chance: '25%' },
  { time: '5 PM', temp: '26°', icon: dayRainIcon, chance: '35%' },
  { time: '6 PM', temp: '24°', icon: tornadoIcon, chance: '60%' },
  { time: '7 PM', temp: '22°', icon: tornadoIcon, chance: '70%' },
  { time: '8 PM', temp: '21°', icon: snowIcon, chance: '40%' },
  { time: '9 PM', temp: '20°', icon: nightRainIcon, chance: '50%' },
  { time: '10 PM', temp: '19°', icon: nightRainIcon, chance: '55%' },
  { time: '11 PM', temp: '18°', icon: foggyIcon, chance: '20%' },
  // Add more...
];

const weeklyData = [
  { day: 'Mon', temp: '24° / 18°', icon: sunnyIcon },
  { day: 'Tue', temp: '22° / 17°', icon: snowIcon },
  { day: 'Wed', temp: '25° / 19°', icon: dayShowersIcon },
  { day: 'Thu', temp: '26° / 20°', icon: cloudIcon},
  { day: 'Fri', temp: '23° / 18°', icon: dayRainIcon },
  { day: 'Sat', temp: '27° / 21°', icon: sunnyIcon },
  { day: 'Sat', temp: '21° / 17°', icon: tornadoIcon },
];

export default function App() {
  const [selectedHour, setSelectedHour] = useState('Now');
  const [selectedTab, setSelectedTab] = useState('hourly');

  return (
    <View style={styles.container}>
      <ImageBackground source={localBackground} style={styles.image} resizeMode="cover">
        {/* Weather Info */}
        <View style={styles.weatherInfo}>
          <Text style={styles.city}>Islamabad</Text>
          <Text style={styles.temp}>25°</Text>
          <Text style={styles.status}>Mostly Clear</Text>
          <Text style={styles.highLow}>H:24° L:18°</Text>
        </View>

        {/* House */}
        <View style={styles.houseContainer}>
          <Image source={houseImage} style={styles.houseImage} />
        </View>

        {/* Modal Forecast */}
        <View style={styles.forecastModalContainer}>
          <Image source={forecastModal} style={styles.forecastModalBackground} resizeMode="stretch" />

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity onPress={() => setSelectedTab('hourly')}>
              <Text style={[styles.tabText, selectedTab === 'hourly' && styles.activeTab]}>Hourly Forecast</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedTab('weekly')}>
              <Text style={[styles.tabText, selectedTab === 'weekly' && styles.activeTab]}>Weekly Forecast</Text>
            </TouchableOpacity>
          </View>

          {/* Forecast Scroll */}
          <View style={styles.forecastScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedTab === 'hourly' &&
                hourlyData.map((item, index) => {
                  const isSelected = selectedHour === item.time;
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.forecastCard,
                        isSelected && styles.selectedCard,
                      ]}
                      onPress={() => setSelectedHour(item.time)}
                    >
                      <Text style={styles.cardText}>{item.time}</Text>
                      <Image source={item.icon} style={{ width: 30, height: 30, marginVertical: 5 }} />
                      {item.chance && <Text style={styles.cardText}>{item.chance}</Text>}
                      <Text style={styles.cardTemp}>{item.temp}</Text>
                    </TouchableOpacity>
                  );
                })}

              {selectedTab === 'weekly' &&
                weeklyData.map((item, index) => (
                  <View key={index} style={styles.forecastCard}>
                    <Text style={styles.cardText}>{item.day}</Text>
                    <Image source={item.icon} style={{ width: 30, height: 30, marginVertical: 5 }} />
                    <Text style={styles.cardTemp}>{item.temp}</Text>
                  </View>
                ))}
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  weatherInfo: {
    alignItems: 'center',
    marginTop: 80,
  },
  city: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  temp: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#fff',
  },
  status: {
    fontSize: 22,
    color: '#fff',
  },
  highLow: {
    fontSize: 18,
    color: '#fff',
    marginTop: 5,
  },
  houseContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 130,
  },
  houseImage: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  forecastModalContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: '100%',
    height: 300,
    alignItems: 'center',
    zIndex: 2,
  },
  forecastModalBackground: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    position: 'absolute',
    bottom: 30,
    opacity:0.96,
    shadowOpacity:0.9,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: -14,
    
  },
  tabText: {
    color: '#aaa',
    fontSize: 16,
    fontWeight: '600',
  },
  activeTab: {
    color: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#5B48EB',
    paddingBottom: 4,
  },
  forecastScroll: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    height: 150,
  },
  forecastCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 70,
    height:150,
  },
  selectedCard: {
    backgroundColor: '#5B48EB',
  },
  cardText: {
    color: '#fff',
    fontSize: 14,
  },
  cardTemp: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
