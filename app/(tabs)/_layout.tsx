import { Tabs } from 'expo-router';
import React, { useRef } from 'react';
import {
  Animated,
  Easing,
  ImageBackground,
  Pressable
} from 'react-native';

import { useRouter } from 'expo-router';

const router = useRouter();

export default function TabLayout() {
  const TabBarImage = require('@/components/TabBar.png');
  const HoverIcon = require('@/components/Hover.png');
  const AddIcon = require('@/assets/images/ADD2.png');
  const MenuIcon = require('@/assets/images/menu1.png');
  const AddIconRed = require('@/assets/images/REDD.png');
  

  // Animation refs
  const menuAnim = useRef(new Animated.Value(0)).current;
  const hoverAnim = useRef(new Animated.Value(1)).current;
  const addAnim = useRef(new Animated.Value(1)).current;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    // Fade to red image
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 900, // fade in
      useNativeDriver: true,
    }).start(() => {
      // Wait and fade back to original image
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 800, // fade out smoothly
          useNativeDriver: true,
        }).start();
      }, 700); // duration to keep red image before fading back
    });

    router.push('/'); // Navigate to home or another screen
  };

  // Menu animation
  const triggerMenuAnim = () => {
    Animated.sequence([
      Animated.timing(menuAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(menuAnim, {
        toValue: 0,
        duration: 5000,
        delay: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
    ]).start();
  };

  // Bounce animation (used for hover and add)
  const triggerBounce = (animRef: Animated.Value) => {
    Animated.sequence([
      Animated.timing(animRef, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(animRef, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          height: 90,
          elevation: 0,
        },
        tabBarBackground: () => (
          <ImageBackground
            source={TabBarImage}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        ),
      }}
    >
      {/* Hover Tab (Bounce) */}
      <Tabs.Screen
        name="hover"
        options={{
          title: '',
          tabBarItemStyle: {
            position: 'absolute',
            left: 35,
            bottom: 10,
          },
          tabBarIcon: () => (
            <Pressable
                   onPress={() => {
                            triggerBounce(hoverAnim);
                            setTimeout(() => {
                              router.push('/hover'); // Make sure you have an explore.tsx or explore/index.tsx screen
                            }, 200); // Delay slightly to let bounce start
                          }}
                   >
              <Animated.Image
                source={HoverIcon}
                style={{
                  width: 60,
                  height: 60,
                  transform: [{ scale: hoverAnim }],
                }}
                resizeMode="contain"
              />
            </Pressable>
          ),
        }}
      />

      {/* Add Tab (Bounce) */}
      <Tabs.Screen
      name="index"
      options={{
        title: '',
        tabBarItemStyle: {
          position: 'absolute',
          left: '52%',
          bottom: 9,
          transform: [{ translateX: -28 }],
        },
        tabBarIcon: () => (
          <Pressable onPress={handlePress}>
            <Animated.View
              style={{
                padding: 0,
                borderRadius: 90,
                backgroundColor: 'transparent',
              }}
            >
              {/* Original Icon */}
              <Animated.Image
                source={AddIcon}
                style={{
                  width: 110,
                  height: 110,
                  position: 'absolute',
                  opacity: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                  }),
                }}
                resizeMode="contain"
              />
              {/* Red Icon */}
              <Animated.Image
                source={AddIconRed}
                style={{
                  width: 110,
                  height: 110,
                  opacity: fadeAnim,
                }}
                resizeMode="contain"
              />
            </Animated.View>
          </Pressable>
        ),
      }}
    />

      {/* Menu Tab (Color Change) */}
      <Tabs.Screen
        name="explore"
        options={{
          title: '',
          tabBarItemStyle: {
            position: 'absolute',
            right: 35,
            bottom: 10,
          },
          tabBarIcon: () => (
                      <Pressable
                          onPress={() => {
                            triggerBounce(addAnim);
                            setTimeout(() => {
                              router.push('/explore'); // Make sure you have an explore.tsx or explore/index.tsx screen
                            }, 200); // Delay slightly to let bounce start
                          }}
                        >
                        <Animated.Image
                          source={MenuIcon}
                          style={{
                            width: 30,
                            height: 30,
                            transform: [{ scale: addAnim }],
                          }}
                          resizeMode="contain"
                        />
                      </Pressable>
                    ),
        }}
      />
    </Tabs>
  );
}
