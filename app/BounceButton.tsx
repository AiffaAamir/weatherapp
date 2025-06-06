import React, { useRef } from 'react';
import {
    Animated,
    Easing,
    Image,
    ImageSourcePropType,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';

interface BounceButtonProps {
  imageSource: ImageSourcePropType;
  onPress?: () => void;
}

const BounceButton: React.FC<BounceButtonProps> = ({ imageSource, onPress }) => {
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
      <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default BounceButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
