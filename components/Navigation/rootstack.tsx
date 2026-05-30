import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from 'react-native';
import { HomeScreen } from "../HomeScreen/homescreen";
import { InfoScreen } from "../InfoScreen/infoscreen";
import { ScanScreen } from "../ScanScreen/scanner";
import { RegisterScreen } from "../RegisterScreen/registerscreen";
import { LoginScreen } from "../LoginScreen/loginscreen";
import { ForgotScreen } from "../ForgotScreen/forgotscreen";
import { ProfileScreen } from "../ProfileScreen/profilescreen";

export type RootStackParams = {
  "Login": { accountCreated?: boolean}
  "Register": undefined
  "Forgot": undefined
  "Home": undefined
  "Scan": undefined
  "Info": { barcodeData?: any }
  "Profile": undefined
}

const Stack = createNativeStackNavigator<RootStackParams>()

export function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Forgot" 
        component={ForgotScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Scan" 
        component={ScanScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Info" 
        component={InfoScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default RootStack