import { NavigationProp, useNavigation } from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { RootStackParams } from "../Navigation/rootstack";

export function NavigationBar() {
    const navigation = useNavigation<NavigationProp<RootStackParams>>()
    
    return (
        <View style={styles.container}>
            <Button
                mode="contained"
                style={styles.button}
                labelStyle={styles.buttontext}
                onPress={ () => {navigation.navigate("Profile")} }
            >
                Profile
            </Button>
            <Button
                mode="contained"
                style={styles.button}
                labelStyle={styles.buttontext}
                onPress={ () => {navigation.navigate("Scan")} }
            >
                Scan
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 10,
    },
    button: {
        flex: 1,
        backgroundColor: "white",
    },
    buttontext: {
        color: "black"
    }
})