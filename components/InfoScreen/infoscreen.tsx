import { RouteProp, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Image, Text } from 'react-native';
import { RootStackParams } from '../Navigation/rootstack';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationBar } from '../NavigationBar/navigationbar';

export function InfoScreen() {
  const route = useRoute<RouteProp<RootStackParams, "Info">>()
  const { barcodeData } = route.params
  const name = String(barcodeData.product)
  const ingredients = String(barcodeData.ingredients)
  const quantity = String(barcodeData.quantity)
  const barcode = String(barcodeData.barcode)
  const imageUrl = String(barcodeData.image_url)

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeview}>
        <View style={styles.container}>
          <View style={styles.namequantity}>
            <Text style={styles.namequantitytext}>
              {name}
            </Text>
            <Text style={styles.namequantitytext}>
              {quantity}
            </Text>
          </View>
          <Image
            style={styles.image}
            source = {{
              uri: imageUrl
            }}
          />
          <View style={styles.barcode}>
            <Text>
              EAN: {barcode}
            </Text>
          </View>
          <View style={styles.ingredients}>
            <Text>
              Ingredients: {ingredients}
            </Text>
          </View>
        </View>
        <NavigationBar/>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  topcontainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(255, 255, 255)"
  },
  image: {
    flex: 4,
    width: 200,
    justifyContent: "center",
    alignItems: "center", 
    resizeMode: "contain"
  },
  barcode: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  namequantity: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    width: "90%"
  },
  namequantitytext: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 26,
  },
  ingredients: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    width: "90%"
  },
})

export default InfoScreen