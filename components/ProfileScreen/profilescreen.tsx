import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationBar } from '../NavigationBar/navigationbar';
import { useUser } from '../UserContext/usercontext';
import { Button } from 'react-native-paper';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../Navigation/rootstack';

export function ProfileScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParams>>()
    const { user, setUser } = useUser()

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeview}>
                <View style={styles.container}>
                    {user ? (
                        <>
                            <View style={styles.row}>
                                <Text style={styles.label}>Email:</Text>
                                <Text style={styles.value}>{user.email}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Surname:</Text>
                                <Text style={styles.value}>{user.surname}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Lastname:</Text>
                                <Text style={styles.value}>{user.lastname}</Text>
                            </View>
                            <Button
                                style={styles.logoutBtn}
                                onPress={() => {
                                    setUser(null)
                                    console.log("User logged out")
                                    navigation.navigate("Login", {})
                                }}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Text>Logged in as guest.</Text>
                            <Button
                                style={styles.loginBtn}
                                onPress={() => navigation.navigate("Login", {})}
                            >
                                <Text>Go back to </Text>
                                Login
                            </Button>
                        </>
                        
                    )}
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
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
    },
    row: {
        flexDirection: "row",
        width: "80%",
        justifyContent: "space-between",
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "gray",
        padding: 8,
        borderRadius: 5,
    },
    label: {
        flex: 1,
        textAlign: "left",
        fontWeight: "bold",
    },
    value: {
        flex: 1,
        textAlign: "right",
    },
    loginBtn: {

    },
    logoutBtn: {
        top: 40
    }
})