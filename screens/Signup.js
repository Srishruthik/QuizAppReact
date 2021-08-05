import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import * as firebase from "firebase";
import "firebase/firestore";
import { firestore } from "firebase";
import Spinner from "react-native-loading-spinner-overlay";
// app themes: #B8D8D8, #7A9E9F, #4F6367, #EEF5DB, #FE5F55, #CC6966
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      name: "",
      loading: false,
    };
  }

  createAccount = () => {
    this.setState({ loading: true });

    const { username, password, name } = this.state;

    firebase
      .auth()
      .createUserWithEmailAndPassword(username, password)
      .then((userCredentials) => {
        if (userCredentials.user) {
          userCredentials.user
            .updateProfile({
              displayName: name,
            })
            .then((s) => {
              this.setState({
                loading: false,
              });
              const userInfo = firebase.auth().currentUser;
              firestore().collection("Users").doc(userInfo.uid).set({
                Email: this.state.username.toLowerCase(),
                Name: name,
                TimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                UniqueId: userInfo.uid,
                Accuracy: 0,
                Correct: 0,
                Incorrect: 0,
                Attempted: 0,
                Points: 0
              });
              
              this.props.navigation.navigate("Home");
            });
        }
      })
      .catch((err) => {
        try {
          Alert.alert(err.message);
        } catch {
          Alert.alert("Something went wrong");
        }
        console.log(err.message);
        this.setState({
          loading: false,
        });
      });
  };

  updateUsername = (text) => {
    this.setState({
      username: text,
    });
  };

  updatePassword = (text) => {
    this.setState({
      password: text,
    });
  };
  updateName = (val) => {
    this.setState({
      name: val,
    });
  };
  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, backgroundColor: "#ffbf66" }}>
          <Spinner
            visible={this.state.loading}
            textContent={"Loading..."}
            textStyle={{ color: "white" }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.quizLogo}
              source={require("../assets/quizLogo.png")}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.textSignup}>Create an account to continue!</Text>
          <Text>{""}</Text>

          <View style={styles.mainContainer}>
            <View style={styles.SignupBox}>
              <View style={styles.textInputContainer}>
                <TextInput
                  value={this.state.name}
                  onChangeText={(val) => this.updateName(val)}
                  placeholderTextColor="grey"
                  placeholder="Enter name"
                  style={styles.styleTextInput}
                />
                <TextInput
                  value={this.state.username}
                  onChangeText={(val) => this.updateUsername(val)}
                  placeholderTextColor="grey"
                  placeholder="Create Username"
                  style={styles.styleTextInput}
                />
                <TextInput
                  value={this.state.password}
                  onChangeText={(val) => this.updatePassword(val)}
                  placeholderTextColor="grey"
                  placeholder="Create Password"
                  style={styles.styleTextInput}
                />
              </View>
              <View style={styles.submitContainer}>
                <TouchableOpacity
                  onPress={this.createAccount}
                  style={styles.submitSignUpContainer}
                >
                  <Text style={styles.signUpTextContainer}>Signup</Text>
                </TouchableOpacity>
              </View>

              <Text
                style={[
                  styles.textSignup,
                  { fontSize: deviceHeight / 50, textAlign: "center" },
                ]}
              >
                Already have an account?
                <Text
                  style={[
                    styles.textSignup,
                    { fontSize: deviceHeight / 50, color: "rgb(79,150,999)" },
                  ]}
                  onPress={() => this.props.navigation.navigate("Login")}
                >
                  {" "}
                  Login
                </Text>
              </Text>

              <View style={{ flex: 0.25 }}></View>
            </View>
          </View>
          <View style={{ flex: 0.2 }}></View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF5DB",
  },
  imageContainer: {
    flex: 2,
    justifyContent: "center",
  },
  mainContainer: {
    flex: 3,
    justifyContent: "center",
  },
  quizLogo: {
    height: "100%",
    alignSelf: "center",
    marginLeft: "8%",
  },
  SignupBox: {
    height: "95%",
    width: "90%",
    backgroundColor: "#f7f5f0",
    alignSelf: "center",
    borderRadius: 30,
    shadowOffset: {
      height: 1,
      width: 5,
    },
    shadowOpacity: 0.45,
    shadowRadius: 20,
  },
  textSignup: {
    fontFamily: "Gill Sans",
    fontSize: deviceHeight / 35,
    textAlign: "center",
    marginRight: "1%",
  },

  textInputContainer: {
    flex: 2,
    justifyContent: "center",
  },
  styleTextInput: {
    height: "20%",
    width: "75%",
    //backgroundColor:'red',
    padding: 5,
    alignSelf: "center",
    borderBottomWidth: 2,
    margin: "5%",
  },
  submitContainer: {
    flex: 1,
    // backgroundColor:'green',

    justifyContent: "center",
  },
  containerText: {
    fontSize: deviceHeight / 60,
    textAlign: "center",
  },
  submitSignUpContainer: {
    height: "40%",
    width: "90%",
    backgroundColor: "rgb(79,150,999)",
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "center",
  },
  signUpTextContainer: {
    textAlign: "center",
    color: "white",
    fontFamily: "Gill Sans",
    fontSize: deviceHeight / 40,
  },
});
export default Signup;
