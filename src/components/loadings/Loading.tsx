import React from 'react';
import {View, StyleSheet, ActivityIndicator, ColorValue} from 'react-native';

type LoadingProps = {
  isVisible: boolean;
  size?: number | 'large' | 'small';
  color?: ColorValue;
  backgroundColor?: ColorValue;
};
const Loading = ({isVisible, size = 'large', color = 'gray'}: LoadingProps) => {
  if (isVisible)
    return (
      <View style={styles.container}>
        <ActivityIndicator color={color} size={size} />
      </View>
    );
  return null;
};

export default Loading;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    zIndex: 999,
  },
});
