import { NavigationProp, useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { RootStackParams } from "../Navigation/rootstack";

export function ForgotScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParams>>()

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeview}>
                <View 
                    style={styles.container}
                >
                    <IconButton
                        icon="arrow-left"
                        size={24}
                        onPress={() => navigation.goBack()}
                        accessibilityLabel="Back"
                    />
                </View>
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
    container: {
        width: "90%",
        flexDirection: "column",
        justifyContent: "center",
    }
})