import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get("window")
const SCAN_BOX_SIZE = 250
const boxTop = (height - SCAN_BOX_SIZE) / 2
const boxLeft = (width - SCAN_BOX_SIZE) / 2

export function BlurOverlay() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <BlurView intensity={50} tint="dark" style={styles.topOverlay} />
      <BlurView intensity={50} tint="dark" style={styles.bottomOverlay} />
      <BlurView intensity={50} tint="dark" style={styles.leftOverlay} />
      <BlurView intensity={50} tint="dark" style={styles.rightOverlay} />
      <View style={styles.scanBox} />
    </View>
  );
}

const styles = StyleSheet.create({
  topOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: boxTop
  },
  bottomOverlay: {
    position: "absolute",
    top: boxTop + SCAN_BOX_SIZE,
    left: 0,
    right: 0,
    bottom: 0
  },
  leftOverlay: {
    position: "absolute",
    top: boxTop,
    left: 0,
    width: boxLeft,
    height: SCAN_BOX_SIZE
  },
  rightOverlay: {
    position: "absolute",
    top: boxTop,
    right: 0,
    width: boxLeft,
    height: SCAN_BOX_SIZE
  },
  scanBox: {
    position: "absolute",
    top: boxTop,
    left: boxLeft,
    width: SCAN_BOX_SIZE,
    height: SCAN_BOX_SIZE,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10
  },
});