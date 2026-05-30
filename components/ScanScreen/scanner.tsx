import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import { BarcodeScanningResult, Camera, CameraView, PermissionStatus } from 'expo-camera';
import { useEffect, useState, useRef } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParams } from '../Navigation/rootstack';
import * as Haptics from 'expo-haptics';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { BlurOverlay } from '../BlurOverlay/bluroverlay'
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { NavigationBar } from '../NavigationBar/navigationbar';

export function ScanScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParams>>()
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [torchOn, setTorchOn] = useState<boolean>(false)
  const isFocused = useIsFocused()
  const scanCooldown = useRef(false)

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === PermissionStatus.GRANTED)
    };
    getCameraPermissions()
  }, [])

  useEffect(() => {
    if (isFocused) {
      scanCooldown.current = false
    }
  }, [isFocused])

  const handleBarcodeScanned = async ({ type, data }: BarcodeScanningResult) => {
    if (scanCooldown.current) return

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)

    scanCooldown.current = true

    const barcodeData = await getBarcodeData(data)

    if (barcodeData.error) {
      Alert.alert("Error: ", barcodeData.error)
      console.log(barcodeData)
    } else {
      //console.log("Barcode data: ", barcodeData)
      console.log('{"status": "Product found"}')
      console.log(barcodeData)

      navigation.navigate("Info", { barcodeData })
    }

    setTimeout(() => {
      scanCooldown.current = false
    }, 2000)
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  async function getBarcodeData(barcode: string) {
    const url = `http://79.136.27.244:5000/product/${barcode}`
    
    try {
      const response: Response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      })

      const barcodeData = await response.json()
      
      return barcodeData

      
    } catch (error: any) {
      Alert.alert("Error: ", error)
      console.log("Error fetching data: ", error)
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeview}>
        <View style={styles.container}>
          {isFocused && (
          <CameraView
            enableTorch={torchOn}
            onBarcodeScanned={handleBarcodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["ean13"],
            }}
            style={styles.cameraView}
          />
          )}
          <BlurOverlay/>
          <TouchableOpacity
            style={styles.flashButton}
            onPress={() => setTorchOn(!torchOn)}
          >
            <MaterialCommunityIcons
              name={torchOn ? "flashlight-off" : "flashlight"}
              size={32}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <NavigationBar/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%"
    
  },
  flashButton: {
    position: "absolute",
    right: 20,
    top: 50,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 10,
    borderColor: "rgba(0, 0, 0, 0.5)",
    borderWidth: 2
  },
  cameraView: {
    position: "absolute",
    height: "100%",
    width: "100%"
  },
});

export default ScanScreen