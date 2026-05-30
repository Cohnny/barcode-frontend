import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStack, RootStackParams } from './components/Navigation/rootstack';
import { UserProvider } from './components/UserContext/usercontext';

const Stack = createNativeStackNavigator<RootStackParams>();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </UserProvider>
    
  );
}