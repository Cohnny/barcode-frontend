import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, StyleSheet, View } from 'react-native';
import { RootStackParams } from '../Navigation/rootstack';

export function HomeScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParams>>()

    return (
        <View style={styles.container}>
            <Button title="Scan" onPress={() => navigation.navigate("Scan")}/>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default HomeScreen