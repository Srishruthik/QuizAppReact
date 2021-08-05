import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {decode} from 'html-entities';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choice1:false,
      choice2:false,
      choice3:false,
      choice4:false,
      answeredQuestion:false,
      question:"",
      answerChoice1:"",
      answerChoice2:"",
      answerChoice3:"",
      answerChoice4:"",
      correct_answer:"",
      arrayAnswerChoice:""
     
    };
  }

  componentDidMount() {
    this.getQuizData();
  }
  shuffleAnswers = (array) => {
    var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
  } 
   getQuizData = () => {
    fetch("https://opentdb.com/api.php?amount=1&difficulty=medium&type=multiple")
    .then((res) => res.json())
    .then((res) => res.results[0])
    .then((res) => {
     
      let answer_choices = [decode(res.correct_answer), ...decode(res.incorrect_answers)]
     
      console.log(res.correct_answer)
      answer_choices = this.shuffleAnswers(answer_choices)
     console.log(answer_choices)
      
      this.setState({
        question:decode(res.question),
        answerChoice1:answer_choices[0],
        answerChoice2:answer_choices[1],
        answerChoice3:answer_choices[2],
        answerChoice4:answer_choices[3],
        correct_answer:decode(res.correct_answer),
        arrayAnswerChoice:answer_choices
      })
     
    
    })
   
  }
  submitAnswer = (answerChoice="",val="") => {
  //  console.log(val)
   // console.log(this.state.correct_answer)
   
    if(val == this.state.correct_answer){
        if(answerChoice == "A"){
        
           this.setState({
            choice1:false,
            choice2:true,
            choice3:true,
            choice4:true,
           })
        }else if(answerChoice=="B"){
          this.setState({
            choice1:true,
            choice2:false,
            choice3:true,
            choice4:true,
           })
        }else if (answerChoice == "C"){
          this.setState({
            choice1:true,
            choice2:true,
            choice3:false,
            choice4:true,
           })
        }else if(answerChoice == "D"){
          this.setState({
            choice1:true,
            choice2:true,
            choice3:true,
            choice4:false,
           })
        }
    }else{
      let index= 0 ;
      for(let i =0;i<this.state.arrayAnswerChoice.length;i++){
          if(this.state.arrayAnswerChoice[i] == this.state.correct_answer){
            index=i;
          }
      }
      if(index == 0){
        this.setState({
          choice1:false,
          choice2:true,
          choice3:true,
          choice4:true,
         })
      }else if(index == 1){
        this.setState({
          choice1:true,
          choice2:false,
          choice3:true,
          choice4:true,
         })
      }else if(index == 2){
        this.setState({
          choice1:true,
          choice2:true,
          choice3:false,
          choice4:true,
         })
      }else if(index == 3){
        this.setState({
          choice1:true,
          choice2:true,
          choice3:true,
          choice4:false,
         })
      }
    }
    this.setState({
        answeredQuestion:true
    })
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}></View>
        <View style={styles.questionContainer}>
          <View style={{ flex: 1.5, justifyContent: "center" }}>
            <Text style={styles.questionNumberTitle}>
              Question{" "}
              <Text style={{ fontWeight: "bold", fontSize: deviceHeight / 35 }}>
                13
              </Text>{" "}
              / 20
            </Text>
          </View>
          <View style={{ flex: 3, justifyContent: "center" }}>
            <View style={styles.questionBox}>
              <Text
                style={styles.questionText}
                adjustsFontSizeToFit={true}
                numberOfLines={100}
              >
                {this.state.question}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}></View>
        <View style={styles.mainContainer}>

          <TouchableOpacity
            onPress={() => this.submitAnswer("A",this.state.answerChoice1)}
            disabled={this.state.answeredQuestion}
            style={
              this.state.choice1
                ? [styles.answerChoice, { shadowColor: "red" }]
                : [styles.answerChoice]
            }
          >
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={100}
              style={styles.answerText}
            >
              {this.state.answerChoice1}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
          disabled={this.state.answeredQuestion}
            onPress={() => this.submitAnswer("B",this.state.answerChoice2)}
          
            style={
                this.state.choice2
                ? [styles.answerChoice, { shadowColor: "red" }]
                : [styles.answerChoice]
            
            }
          >
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={100}
              style={styles.answerText}
            >
             {this.state.answerChoice2}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
        disabled={this.state.answeredQuestion}
            onPress={() => this.submitAnswer("C",this.state.answerChoice3)}
            style={
                this.state.choice3
                ? [styles.answerChoice, { shadowColor: "red" }]
                : [styles.answerChoice]
            }
          >
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={100}
              style={styles.answerText}
            >
             {this.state.answerChoice3}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
          
          disabled={this.state.answeredQuestion}
            onPress={() => this.submitAnswer("D",this.state.answerChoice4)}
            style={
                this.state.choice4
                ? [styles.answerChoice, { shadowColor: "red" }]
                : [styles.answerChoice]
            }
          >
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={100}
              style={styles.answerText}
            >
             {this.state.answerChoice4}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f7f5f0",
  },
  headerContainer: {
    flex: 4,
    backgroundColor: "rgb(79,150,999)",
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  mainContainer: {
    flex: 6,
    backgroundColor: "#f7f5f0",
    justifyContent: "center",
  },
  questionContainer: {
    height: "25%",
    width: "90%",
    backgroundColor: "white",
    position: "absolute",
    top: "20%",
    zIndex: 1,
    alignSelf: "center",

    borderRadius: 30,
    shadowOffset: {
      height: 1,
      width: 5,
    },
    shadowOpacity: 0.76,
    shadowRadius: 20,
    shadowColor: "rgb(79,150,999)",
  },
  footerContainer: {
    flex: 1,
    backgroundColor: "red",
  },
  answerChoice: {
    alignSelf: "center",
    height: "17%",
    width: "95%",
    margin: "2%",
    backgroundColor: "#f7f5f0",
    borderRadius: 30,
    shadowOffset: {
      height: 1,
      width: 5,
    },
    shadowOpacity: 0.76,
    shadowRadius: 20,
    shadowColor: "rgb(79,150,999)",
    justifyContent: "center",
    padding: "5%",
  },
  questionNumberTitle: {
    textAlign: "center",
    fontSize: deviceHeight / 50,
    fontFamily: "Gill Sans",
    color: "rgb(79,150,999)",
  },
  questionText: {
    textAlign: "center",
    fontSize: deviceHeight / 40,
    fontFamily: "Gill Sans",
    color: "#5c5b5a",
  },
  questionBox: {
    //  justifyContent:'center',
    //   marginTop:'10%',
    alignSelf: "center",
    height: "90%",

    maxHeight: "100%",
    maxWidth: "80%",
  },
  answerText: {
    textAlign: "center",
    fontSize: deviceHeight / 40,
    fontFamily: "Gill Sans",
    color: "#5c5b5a",
  },
});
export default Quiz;
