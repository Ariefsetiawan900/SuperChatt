import React from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from "react-native"
import * as firebase from 'firebase'

export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    state = {
        name: "",
        email: "",
        password: "",
        errorMessage: null
    }
    handleSignUp = () => {
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(userCredentials => {
            return userCredentials.user.updateProfile({
                displayName: this.state.name
            })
        })
        .then(async () => {
            const uid = await firebase.auth().currentUser.uid
            const email = await firebase.auth().currentUser.email
            const ref = await firebase.database().ref(`/user/${uid}`)
            const imageUrl = 'https://clipartart.com/images/clipart-profile-2.jpg'
            await ref.set({
                uid: uid,
                email:email,
                displayName: this.state.name,
                imageUrl: imageUrl
            })
        })
        .catch(error => this.setState({ errorMessage: error.message}))
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
               <Text style={styles.greeting}>{`Hello.\nSign up to get started`}</Text>

            <View style={styles.errorMessage}>
               {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
            </View>

            <View style={styles.form}>
                
            <View>
                    <Text style={styles.inputTitle}>FULL NAME</Text>
                    <TextInput style={styles.input} 
                    autoCapitalize="none"
                    onChangeText={name => this.setState({ name })}
                    value={this.state.name}
                    ></TextInput>
                </View>

                <View  style={styles.containerEmail}>
                    <Text style={styles.inputTitle}>Email Address</Text>
                    <TextInput style={styles.input} 
                    autoCapitalize="none"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                    ></TextInput>
                </View>

                <View style={styles.containerPassword}>
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput style={styles.input} 
                    secureTextEntry 
                    autoCapitalize="none"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                    ></TextInput>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                <Text style={styles.buttonSignUp}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.headerLogin} onPress={() => this.props.navigation.navigate("Login")}>
                <Text style={{ color: "#414959", fontSize: 13}}>
                        Have a SocialApp? <Text style={styles.login}>Login</Text>
                </Text>
            </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A"
    },
    form : {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor : "#3498db",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonSignUp: {
     color: "#FFF",
     fontWeight: "500"
    },
    headerLogin: {
    alignSelf: "center", 
    marginTop: 32
    },
    login: {
    fontWeight:"500", 
    color: "#E9446A"
    },
    containerEmail: {
        marginTop: 32
    },
    containerPassword: {
        marginTop: 32
    }
})
