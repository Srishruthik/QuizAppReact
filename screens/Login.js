import React, { Component } from 'react'
import {View,Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity,Alert, ActivityIndicator} from "react-native"
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import firebase from 'firebase/app'
import Spinner from 'react-native-loading-spinner-overlay';
var firebaseConfig = {
    apiKey: "AIzaSyAgsDvbtQZlc-9PCH-tW2f6VnDTIMN1bWk",
    authDomain: "quiz-23984.firebaseapp.com",
    projectId: "quiz-23984",
    storageBucket: "quiz-23984.appspot.com",
    messagingSenderId: "890149903783",
    appId: "1:890149903783:web:a29835677f6717c25aea82"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    
  }
// app themes: #B8D8D8, #7A9E9F, #4F6367, #EEF5DB, #FE5F55, #CC6966
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username:"test@gmail.com",
            password:"Test@123",
            loading:false
         };
    }

    updateUsername = (text) => {
        this.setState({
            username:text
        })
    }

    signUpPage = () => {
        this.props.navigation.navigate("Signup")
    }

    signInAccount = () => {
        this.setState({loading:true})
        const {username,password} = this.state;


        firebase.auth().signInWithEmailAndPassword(username,password)
        .then(() => {
            this.setState({
                loading:false
            })
            this.props.navigation.navigate("Home")
        })
        .catch((err) =>{
            this.setState({loading:false})
            let msg = err.message
            Alert.alert(msg)
            console.log(msg)
           
        
        })
    }
    
    updatePassword = (val) => {
        this.setState({
            password:val
        })
    }
    render() {
        if(this.state.loading){
            return (
                <View style={{flex:1,backgroundColor:'#ffbf66'}}>
                <Spinner
             visible={this.state.loading}
             textContent={'Loading...'}
             textStyle={{color:'white'}}
           />
             </View>
            )
        }else{
      
        return (
            <View style={styles.container}>

                <View style={styles.imageContainer}>
                    <Image  style={styles.quizLogo}
                            source={require("../assets/quizLogo.png")}
                            resizeMode="contain"
                    />
                </View>
                
                <Text style={styles.textLogin}>Login to continue!</Text>
                <Text>{""}</Text>
                

                <View style={styles.mainContainer}>
                    <View style={styles.loginBox}>
                        <View style={styles.textInputContainer}>
                            <TextInput value={this.state.username} onChangeText={(val) => this.updateUsername(val)} placeholderTextColor="grey" placeholder="Enter Username" style={styles.styleTextInput} />
                            <TextInput value={this.state.password} onChangeText={(val) => this.updatePassword(val)} placeholderTextColor="grey" placeholder="Enter Password" style={styles.styleTextInput} />
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </View>
                        <View style={styles.submitContainer}>
                            <TouchableOpacity onPress={this.signInAccount} style={styles.submitLoginContainer}>
                                <Text style={styles.loginTextContainer}>Login</Text>
                                
                            </TouchableOpacity>
                            
                        </View>

                        <Text style={[styles.textLogin,{fontSize:deviceHeight/50,textAlign:'center'}]}>
                            Don't Have an Account?  
                                <Text style={[styles.textLogin,{fontSize:deviceHeight/50,color:'rgb(79,150,999)',}]} onPress={this.signUpPage}>
                               {" "} Register
                                </Text>
                        </Text>

                        <View style={{flex:0.25}}></View>
                    </View>
                </View>
                <View style={{flex:0.2}}>

                </View>
               
            </View> 
        );
    }
}
}
const styles = StyleSheet.create({
    container: {
        flex:1,
      
        backgroundColor:'#EEF5DB'
    },
    imageContainer:{
        flex:2,
        justifyContent:'center'
    },
    mainContainer:{
        flex:3,
        justifyContent:'center'
    },
    quizLogo:{
        height:'100%',
        alignSelf:'center',
        marginLeft:'8%'
    },
    loginBox:{
        height:'95%',
        width:'90%',
        backgroundColor:"#f7f5f0",
        alignSelf:'center',
        borderRadius:30,
        shadowOffset:{
            height:1,
            width:5,
        },
        shadowOpacity:0.45,
        shadowRadius:20,
        
    },
    textLogin:{
        fontFamily:"Gill Sans",
        fontSize:deviceHeight/30,
        textAlign:'center',
        marginRight:'1%'
    },
  
    textInputContainer:{
        flex:2,
        justifyContent:'center'

    },
    styleTextInput:{
        height:"20%",
        width:'75%',
        //backgroundColor:'red',
        padding:5,
        alignSelf:'center',
        borderBottomWidth:2,
        margin:'5%',

    },
    submitContainer:{
        flex:1,
      // backgroundColor:'green',
        
       justifyContent:'center'
    },
    containerText:{
        fontSize:deviceHeight/60,
        textAlign:'center',
    },
    submitLoginContainer:{
        height:'40%',
        width:'90%',
        backgroundColor:'rgb(79,150,999)',
        alignSelf:'center',
        borderRadius:10,
        justifyContent:'center',
        
        
    },
    loginTextContainer:{
        textAlign:'center',
        color:'white',
        fontFamily:"Gill Sans",
        fontSize:deviceHeight/40,
    },
    forgotPasswordText:{
        textAlign:'right',
        fontSize:deviceHeight/45,
        marginRight:'5%',
        fontFamily:'Gill Sans',
        color:'rgb(79,150,999)'
    }
})

export default Login;