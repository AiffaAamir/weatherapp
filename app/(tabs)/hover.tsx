import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const NowScreen = () => {
  return (
    <LinearGradient
      colors={['#422E5A', '#1C1B33']}
      style={styles.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.heading}>Now</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/sunny.png')} // path to your sunny icon
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.text}>Sunny</Text>
    </LinearGradient>
  );
};

export default NowScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  heading: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 130,
    textAlign: 'center',
  },
  imageContainer: {
    
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  text: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  }
});
