import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { TextInput, HelperText, Button, IconButton } from 'react-native-paper';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParams } from '../Navigation/rootstack';

export function RegisterScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const [sureName, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")

    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [confirmedPasswordError, setConfirmedPasswordError] = useState(false)

    function validateEmail(text: string) {
        // Validates that the email contains no consecutive dots, includes a single @, no spaces, and follows a standard email format.
        const emailRegex = /^(?!.*\.\.)[^\s@]+@[^\s@]+\.[^\s@]+$/
        // Tests if email meets the regex expression
        const isValid = emailRegex.test(text)
        // Sets the error state if the email is invalid
        setEmailError(!isValid)
        // Sets the email state
        setEmail(text)
    }

    function validatePassword(text: string) {
        // Validates that the password contains at least 6 letters, 1 upper case, 1 number, and 1 special character
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/
        // Tests if password meets the regex expression
        const isValid = passwordRegex.test(text)
        // Sets the error state if the password is invalid
        setPasswordError(!isValid) 
        // Sets the password state
        setPassword(text) 
    }

    function confirmPassword(text: string) {
        // Checks if the password confirmation matches the password
        setConfirmedPasswordError(text === password ? false : true)
        // Sets the password confirmation state
        setConfirmedPassword(text) 
    }

    async function registerNewUser() {
        const url = "http://79.136.27.244:5000/users"
        const user = {
            surname: sureName,
            lastname: lastName,
            email: email,
            password: password,
            confirm_password: confirmedPassword
        }

        try {
            const accountCreated = false
            const response: Response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            })

            const responseData = await response.json()

            if (response.ok) {
                console.log("Registration successful:", responseData.message)
                navigation.navigate("Login", { accountCreated: true })
            } else {
                let errorMessage = "An unknown error occurred."; // Default message

                // Check if the server sent back specific validation error details.
                if (responseData.details && Object.keys(responseData.details).length > 0) {
                    // Get the key of the first error (e.g., "surname").
                    const firstErrorKey = Object.keys(responseData.details)[0];
                    // Get the specific error message (e.g., "Surname is required.").
                    errorMessage = responseData.details[firstErrorKey];
                } else if (responseData.message) {
                    // Fallback to the general message from the backend if 'details' isn't available.
                    errorMessage = responseData.message
                }

                Alert.alert("Validation Error", errorMessage)
            }
        
        } catch (error: any) {
            console.log("Error fetching data: ", error)
        }
    }

    const isFormValid = 
        sureName.length > 0 &&
        lastName.length > 0 &&
        email.length > 0 &&
        !emailError &&
        password.length > 0 &&
        !passwordError &&
        confirmedPassword.length > 0 &&
        !confirmedPasswordError
    
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
                    <TextInput
                        style={styles.input}
                        placeholder="Surname"
                        value={sureName}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Lastname"
                        value={lastName}
                        onChangeText={setLastName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={validateEmail}
                        error={emailError}
                        autoCapitalize="none"
                        autoComplete="email"
                        keyboardType="email-address"
                    />
                    <HelperText type="error" visible={emailError}>
                        Please enter a valid email address
                    </HelperText>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={validatePassword}
                        error={passwordError}
                        secureTextEntry={true}
                        textContentType="newPassword"
                        autoComplete="new-password"
                        autoCorrect={false}
                        autoCapitalize="none"
                        importantForAutofill="no"
                        keyboardType="default"
                    />
                    <HelperText type="error" visible={passwordError}>
                        Please enter a valid password
                    </HelperText>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm password"
                        value={confirmedPassword}
                        onChangeText={confirmPassword}
                        error={confirmedPasswordError}
                        secureTextEntry={true}
                        textContentType="none"
                        autoComplete="off"
                        autoCorrect={false}
                        autoCapitalize="none"
                        importantForAutofill="no"
                        keyboardType="default"
                    />
                    <HelperText type="error" visible={confirmedPasswordError}>
                        Password must match
                    </HelperText>
                </View>
                <View style={styles.container}>
                    <Button 
                        mode="contained"
                        style={styles.registerBtnContainer}
                        contentStyle={styles.registerBtnContent}
                        labelStyle={styles.registerBtnLabel}
                        onPress={registerNewUser}
                        disabled={!isFormValid}
                    >
                        Register
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
    registerBtnContainer: {
        marginTop: 20,
        width: "100%",
        alignSelf: "center",
    },
    registerBtnContent: {
        height: 48,
        justifyContent: "center",
    },
    registerBtnLabel: {
        fontSize: 16,
    },
});