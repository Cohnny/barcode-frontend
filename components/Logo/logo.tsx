import { View, StyleSheet, Image } from "react-native";

export function Logo() {
    return(
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/Logo.png')}
            >
            </Image>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 150,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: 125,
        height: 135
    }
})