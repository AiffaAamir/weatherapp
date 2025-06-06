import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// Assets
const forecastModal = require('@/assets/images/Modal2.png');
const cloudIcon = require('@/assets/images/cloud.png');
const snowIcon = require('@/assets/images/snow.png');
const airQualityImage = require('@/assets/images/airquality.png');
const airImage = require('@/assets/images/air.png');
const foggyIcon =  require('@/assets/images/foggy.png');
const nightRainIcon = require('@/assets/images/nightRain.png');
const dayRainIcon = require('@/assets/images/dayRain.png');
const dayShowersIcon = require('@/assets/images/dayShower.png');
const tornadoIcon = require('@/assets/images/Tornado.png');
const sunnyIcon = require( '@/assets/images/sunny.png');


// BounceButton merged here
const BounceButton: React.FC<{
  imageSource: ImageSourcePropType;
  onPress?: () => void;
}> = ({ imageSource, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onPress) onPress();
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View style={[styles.bounceButtonContainer, { transform: [{ scale: scaleAnim }] }]}>
        <Image
          source={imageSource}
          style={styles.bounceImage}
          resizeMode="stretch"
        />
      </Animated.View>
</TouchableWithoutFeedback>


  );
};


// BounceCard
const BounceCard = ({ title, value }: { title: string; value: string }) => {
  const scale = useState(new Animated.Value(1))[0];

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad),
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad),
      }),
    ]).start();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View style={[styles.cardContainer, { transform: [{ scale }] }]}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardValue}>{value}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

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

export default function TabTwoScreen() {
  const [selectedHour, setSelectedHour] = useState('Now');
  const [selectedTab, setSelectedTab] = useState('hourly');

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#422E5A', '#1C1B33']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={styles.weatherInfo}>
        <Text style={styles.city}>Islamabad</Text>
        <Text style={styles.tempStatus}>25° | Mostly Clear</Text>
      </View>

      <View style={styles.forecastModalContainer}>
        <Image source={forecastModal} style={styles.forecastModalBackground} resizeMode="stretch" />

        {/* Button shown over background */}
        <BounceButton imageSource={airQualityImage} onPress={() => console.log('Bounced!')} />
        <Image
          source={airImage}
          style={styles.cuteAirImage}
        />

        {/* Grid of 4 square buttons */}
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
            style={styles.scrollContainer}
          >
            <TouchableOpacity style={styles.squareButton}>
              <Image source={require('@/assets/images/sunrise.png')} style={styles.squareButtonImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.squareButton}>
              <Image source={require('@/assets/images/rainfall.png')} style={styles.squareButtonImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.squareButton}>
              <Image source={require('@/assets/images/uv.png')} style={styles.squareButtonImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.squareButton}>
              <Image source={require('@/assets/images/wind.png')} style={styles.squareButtonImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.squareButton}>
              <Image source={require('@/assets/images/feel.png')} style={styles.squareButtonImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.squareButton}>
              <Image source={require('@/assets/images/humidity.png')} style={styles.squareButtonImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.squareButton}>
              <Image source={require('@/assets/images/visibility.png')} style={styles.squareButtonImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.squareButton}>
              <Image source={require('@/assets/images/pressure.png')} style={styles.squareButtonImage} />
            </TouchableOpacity>
          </ScrollView>

    


        <View style={styles.tabsContainer}>
          <TouchableOpacity onPress={() => setSelectedTab('hourly')}>
            <Text style={[styles.tabText, selectedTab === 'hourly' && styles.activeTab]}>
              Hourly Forecast
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab('weekly')}>
            <Text style={[styles.tabText, selectedTab === 'weekly' && styles.activeTab]}>
              Weekly Forecast
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.forecastScroll}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {selectedTab === 'hourly' &&
              hourlyData.map((item, index) => {
                const isSelected = selectedHour === item.time;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.forecastCard, isSelected && styles.selectedCard]}
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

        <ScrollView style={styles.cardList} showsVerticalScrollIndicator={false}>
          {[
            { title: 'AIR QUALITY', value: '3-Low Health Risk' },
            { title: 'UV INDEX', value: '4\nModerate' },
            { title: 'SUNRISE', value: '5:28 AM\nSunset: 7:25PM' },
            { title: 'WIND', value: 'N\n9.7 km/h' },
            { title: 'RAINFALL', value: '1.8 mm\nin last hour' },
          ].map((item, index) => (
            <BounceCard key={index} title={item.title} value={item.value} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { ...StyleSheet.absoluteFillObject },
  weatherInfo: { alignItems: 'center', marginTop: 70 },
  city: { fontSize: 45, fontWeight: 'bold', color: '#fff' },
  tempStatus: { fontSize: 18, color: '#fff' },

  forecastModalContainer: {
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
    zIndex: 2,
    marginTop: 40,
    height: '100%',
  },
  forecastModalBackground: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    opacity: 0.96,
    shadowOpacity: 0.9,
  },
  tabsContainer: {
    position: 'absolute',
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    zIndex: 3,
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
    top: 70,
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
    height: 150,
  },
  selectedCard: {
    backgroundColor: '#5B48EB',
  },
  cardText: { color: '#fff', fontSize: 14 },
  cardTemp: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cardList: {
    marginTop: 180,
    paddingBottom: 200,
    paddingHorizontal: 20,
  },
  cardContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 16,
    marginVertical: 8,
  },
  cardTitle: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '600',
  },
  cardValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 6,
    lineHeight: 22,
  },
  
  
  bounceButtonContainer: {
    position: 'absolute',
    top: 250,
    left: 20, // <- push it 6 units from the left edge
    width: '70%',
    height: 125,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 4,
  },
  
  bounceButtonInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  bounceImage: {
    width: '100%',   // Fill container width (which is 90% of screen)
    height: '100%',  // Or keep it at '90%' if needed
    aspectRatio:2,

  },
  
  cuteAirImage: {
    position: 'absolute',
    top: 240,      // adjust vertically
    left: 220,     // adjust horizontally
    width: 120,     // control image size
    height: 120,
    zIndex: 4,
    opacity: 0.7,  // optional: make it blend subtly
  },
  scrollContainer: {
    position: 'absolute',
    top: 390,
    left: 0,
    right: 0,
    paddingLeft: 20,
    paddingRight: 20,
    zIndex: 4,
  },
  
  horizontalScroll: {
    flexDirection: 'row',
  },
  
  squareButton: {
    width: 130,
    height: 125,
    borderRadius: 15,
    backgroundColor: 'transparent',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  squareButtonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
 
  
  
  
  
});
