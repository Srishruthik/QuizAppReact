import React, { Component } from 'react'
import {View,Text, StyleSheet,TouchableOpacity, Dimensions,SafeAreaView} from "react-native"
import * as firebase from 'firebase'
import "firebase/firestore";
import { firestore } from "firebase";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

/* 
Current data:  Object {
  "Accuracy": 0,
  "Attempted": 0,
  "Correct": 0,
  "Email": "test@gmail.com",
  "Incorrect": 0,
  "Name": "Test",
  "Points": 0,
  "TimeStamp": Object {
    "nanoseconds": 307000000,
    "seconds": 1627847616,
  },
  "UniqueId": "mie6Fl2HEjNRmCXf9HnkIOr9lFX2",
}
 */
class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            user_details: [],
            user_points: []
          };
        
        
         
         
    }
    componentDidMount() {
        
        console.log("Hello")
        let user_details = firebase.auth().currentUser;
        this.setState({
            user_details:user_details
        },() => {

        let user_uuid = user_details.uid;
        console.log(user_uuid)
        firestore().collection("Users").doc(user_uuid)
        .onSnapshot((doc) => {
        
            this.setState({
                user_points:doc.data()
            })
        
        });

    })
      

   
    }

    beginQuiz =() =>{
        this.props.navigation.navigate("Quiz")
    }

    

    signout = () => {
       
        firebase.auth().signOut().then(() => {
            this.props.navigation.navigate("Login")
        }).catch((err) => {
            console.log(err.message)
        })
        
          
       
          
    }
    render() {
       
        return (
            <View style={styles.container}>

            <View style={styles.containerheader}>
            <Text style={[styles.beginQuizText,{marginBottom:30,textAlign:'center'}]}>{"\n"}Welcome! {"\n"} {this.state.user_points.Name}</Text>
                <View style={styles.accuracyBall}>
                    <Text style={styles.accuracyTitle}>Total Points</Text>
                    <Text style={styles.accuracyText}>
                    {this.state.user_points.Points}
                        <Text style={[styles.accuracyTitle,{fontSize:deviceWidth/15}]}>
                        pts
                        </Text>
                    </Text>
                </View>
            </View>

            <View style={styles.pointsdataContainer}>
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={styles.dataContainer}>
                        <Text style={styles.accuracyDataContainer}>•{'\t'}{this.state.user_points.Accuracy}%</Text>
                        <Text style={styles.accuracyDataTitle}>{'\t'}Accuracy</Text>
                    </View>

                    <View style={styles.dataContainer}>
                        <Text style={[styles.accuracyDataContainer,{color:'rgb(79,150,999)'}]}>•{'\t'}{this.state.user_points.Attempted}</Text>
                        <Text style={[styles.accuracyDataTitle,{color:"rgb(79,150,999)"}]}>{'\t'}Attempted</Text>
                    </View>
                   
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={styles.dataContainer}>
                        <Text style={[styles.accuracyDataContainer,{color:"#23c50d"}]}>•{'\t'}{this.state.user_points.Correct}</Text>
                        <Text style={[styles.accuracyDataTitle,{color:'#23c41d'}]}>{'\t'}Correct</Text>
                    </View>
                    <View style={styles.dataContainer}>
                        <Text style={[styles.accuracyDataContainer,{color:'#FE5F55'}]}>•{'\t'}{this.state.user_points.Incorrect}</Text>
                        <Text style={[styles.accuracyDataTitle,{color:'#FE5F55'}]}>{'\t'}Incorrect</Text>
                    </View>
                </View>
            </View>

            <View style={{flex:5,}}>
                
            </View>
            <View style={styles.containermain}>
                   
                    <TouchableOpacity onPress={this.beginQuiz} style={styles.startQuizContainer}>
                        <Text style={styles.beginQuizText}>Begin Quiz!</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.signout} style={styles.settingsPage}>
                    <Text style={styles.beginQuizText}>Sign Out</Text>
                    </TouchableOpacity>
            </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
container:{
    
    flex:1,
    backgroundColor:'#EEF5DB'

},
signout:{
    height:'5%',
    width:'90%',
    backgroundColor:'lightblue'
},
containerheader:{
    flex:10,
    backgroundColor:'rgb(79,150,999)',
    borderBottomLeftRadius:35,
    borderBottomRightRadius:35,
    justifyContent:'center'
},
containermain:{
    flex:6,
    backgroundColor:'#EEF5DB'

},
accuracyBall:{
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    backgroundColor:'white',
    justifyContent: 'center',
    alignSelf:'center',
    borderWidth:1,
    borderColor:"rgb(79,300,999)",
    marginBottom:'15%'
},
accuracyTitle:{
    fontSize:deviceHeight/40,
    fontFamily:'Gill Sans',
    color:"rgb(79,150,999)",
    textAlign:'center',
},
accuracyText:{
    fontSize:deviceHeight/20,
    fontFamily:'Gill Sans',
    color:"rgb(79,150,999)",
    textAlign:'center',
    fontWeight:'400'
},
pointsdataContainer:{
    height:"18%",
    width:'90%',
    backgroundColor:'white',
    position:'absolute',
    top:"40%",
    zIndex:1,
    alignSelf:'center',
   
    borderRadius:30,
        shadowOffset:{
            height:1,
            width:5,
        },
        shadowOpacity:0.76,
        shadowRadius:20,
        shadowColor:'rgb(79,150,999)',
       
},
dataContainer:{
    flex:1,
    justifyContent:'center'
},
accuracyDataContainer:{
    textAlign:'center',
    fontSize:deviceHeight/35,
    fontFamily:'Gill Sans',
    color:'purple'
},
accuracyDataTitle:{
    textAlign:'center',
    fontSize:deviceHeight/60,
    fontFamily:'Gill Sans',
    color:'purple'
},

startQuizContainer:{
    height:'35%',
    width:'75%',
    backgroundColor:'rgb(79,150,999)',
    alignSelf:'center',
    borderRadius:20,
    justifyContent: 'center',
  
    
},
beginQuizText:{
    fontSize:deviceHeight/30,
    color:'white',
    fontFamily:'Gill Sans',
    textAlign:'center'
    
},
settingsPage:{
    margin:'5%',
    height:'35%',
    width:'60%',
    backgroundColor:'rgb(79,150,999)',
    alignSelf:'center',
    borderRadius:20,
    justifyContent: 'center',
  
    
}


})
/* borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
width: Dimensions.get('window').width * 0.5,
height: Dimensions.get('window').width * 0.5,
backgroundColor:'#B8D8D8',
justifyContent: 'center',
alignSelf:'center' */
export default Home;