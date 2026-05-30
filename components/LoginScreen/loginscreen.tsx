import { View, StyleSheet, Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from 'react-native-paper';
import { useEffect, useState } from "react";
import { NavigationProp, useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParams } from "../Navigation/rootstack";
import { useUser } from "../UserContext/usercontext";
import { Logo } from "../Logo/logo";

type LoginRouteProp = RouteProp<RootStackParams, 'Login'>;

export function LoginScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParams>>()
    const route = useRoute<LoginRouteProp>();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showMessage, setShowMessage] = useState(false)
    const { setUser } = useUser()

    useEffect(() => {
        if (route.params?.accountCreated) {
        setShowMessage(true);

        setTimeout(() => setShowMessage(false), 5000)
        }
    }, [route.params])

    async function getUser() {
        const url = `http://79.136.27.244:5000/users/${email}`
    
        try {
        const response: Response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        })

        const user = await response.json()
        
        return user

        
        } catch (error: any) {
            Alert.alert("Error: ", error)
            console.log("Error fetching data: ", error)
        }
    }

    async function login() {
        const url = "http://79.136.27.139:5000/login"
        const user = {
            email: email,
            password: password
        }

        try {
            const response: Response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            })

            const result = await response.json()
            
            if (response.ok && result.success) {
                const userData = await getUser()

                setUser({
                    email: userData.email,
                    surname: userData.surname,
                    lastname: userData.lastname
                })
                navigation.navigate("Scan")
            } else {
                console.log("Login failed:", result.error)
                Alert.alert("Failed to login. Wrong email or password")
            }
        
        } catch (error: any) {
            console.log("Error fetching data: ", error)
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeview}>
                <Logo/>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="default"
                        textContentType="none"
                        autoComplete="off"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        textContentType="none"
                        autoComplete="off"
                        autoCorrect={false}
                        autoCapitalize="none"
                        importantForAutofill="no"
                        keyboardType="default"
                    />
                    <View style={styles.loginoptions}>
                        <Button
                            onPress={() => navigation.navigate("Forgot")}
                        >
                            Forgot password?
                        </Button>
                        <Button
                            onPress={() => navigation.navigate("Register")}
                        >
                            Create an account
                        </Button>
                    </View>
                    <Button 
                        mode="contained"
                        style={styles.loginBtn}
                        onPress={login}
                    >
                        Login
                    </Button>
                    {showMessage && (
                        <Button
                            mode="text"
                            disabled
                            style={styles.successmsg}
                            labelStyle={styles.successtext}
                        >
                            Account successfully created!
                        </Button>
                    )}
                    <Button
                        style={styles.guestBtn}
                        onPress={() => navigation.navigate("Scan")}
                    >
                        Continue as a guest
                    </Button>
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
    },
    input: {
        borderWidth: 1,
        top: 10,
        margin: 5
    },
    loginoptions: {
        flexDirection: "row",
        justifyContent: "space-between",
        top: 10
    },
    loginBtn: {
        top: 40
    },
    successmsg: {
        top: 45,
        
    },
    successtext: {
        color: "green"
    },
    guestBtn: {
        top: 50
    }
})