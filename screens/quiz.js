import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { decode } from "html-entities";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import * as firebase from "firebase";
import "firebase/firestore";
import { firestore } from "firebase";
/*
question Hard = 150 pts
question Meduim = 100 pts
question Easy = 50pts


*/
class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionData: [],
      choice1: false,
      choice2: false,
      choice3: false,
      choice4: false,
      answeredQuestion: false,
      question: "",
      answerChoice1: "",
      answerChoice2: "",
      answerChoice3: "",
      answerChoice4: "",
      correct_answer: "",
      arrayAnswerChoice: "",
      questionNumber: 0,
      bgColor: "rgb(79,150,999)",
      correct: 0,
      incorrect: 0,
      userData: [], // firebase user data
      user_points: [], // firebase user's game data,
      gameScore: 0,
      difficulty: ""
      // timer:2,
    };
    const userInfo = firebase.auth().currentUser;
    firestore()
      .collection("Users")
      .doc(userInfo.uid)
      .onSnapshot((doc) => {
        this.setState({
          user_points: doc.data(),
        });
      });
  }

  componentDidMount() {
    let uniqueID_ = firebase.auth().currentUser;
    this.setState({
      userData: uniqueID_,
    });
    fetch("https://opentdb.com/api.php?amount=7&type=multiple")
      .then((res) => res.json())
      .then((res) => res.results)
      .then((res) => {
        this.setState(
          {
            questionData: res,
          },
          () => {}
        );

        this.getQuizData();
      });
  }

  shuffleAnswers = (array) => {
    var currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  afterQuiz = () => {
    const { isDone, correct, incorrect, userData } = this.state;
    const { Correct, Incorrect, Points } = this.state.user_points;
    // console.log(this.state.user_points.Correct+correct)
    const q = Correct + Incorrect + 7;
    consol.log(Points)
  
    firestore()
      .collection("Users")
      .doc(userData.uid)
      .update({
        Correct: Correct + correct,
        Incorrect: Incorrect + incorrect,
        Attempted: q,
        Accuracy: (((Correct + correct) / q) * 100).toFixed(2),
        Points: Points+Math.round(this.state.gameScore)

      });
  };

  getQuizData = () => {
    /*  setInterval(() => {
      this.setState({
        timer:this.state.timer-1
      })
      if(this.state.timer == 0){
        this.submitAnswer("Ser","g")
      }
    },1000)
     */

    if (this.state.questionNumber == 7) {
      /*    setTimeout(() => { */
      this.props.navigation.navigate("Home", {
        isDone: true,
        correct: this.state.correct,
        incorrect: this.state.incorrect,
      });
      this.afterQuiz();

      /* }) */
    }

    try {
      console.log(
        this.state.questionData[this.state.questionNumber].correct_answer
      );
      this.setState({
        choice1: false,
        choice2: false,
        choice3: false,
        choice4: false,
        answeredQuestion: false,
        question: "",
        answerChoice1: "",
        answerChoice2: "",
        answerChoice3: "",
        answerChoice4: "",
        correct_answer: "",
        arrayAnswerChoice: "",
        bgColor: "rgb(79,150,999)",
        
      });

      let questionDetails = this.state.questionData[this.state.questionNumber];
      let answer_choices = this.shuffleAnswers([
        ...decode(questionDetails.incorrect_answers),
        decode(questionDetails.correct_answer),
      ]);
      this.setState({
        question: decode(questionDetails.question),
        answerChoice1: answer_choices[0],
        answerChoice2: answer_choices[1],
        answerChoice3: answer_choices[2],
        answerChoice4: answer_choices[3],
        correct_answer: decode(questionDetails.correct_answer),
        arrayAnswerChoice: answer_choices,
        difficulty:questionDetails.difficulty
      });
    } catch {}
  };
  submitAnswer = (answerChoice = "", val = "") => {
    //  console.log(val)
    // console.log(this.state.correct_answer)
    let {difficulty} = this.state;
    if (val == this.state.correct_answer) {
      //if the user selections a correct answer choice :)
      
      if (answerChoice == "A") {
        this.setState({
          choice1: false,
          choice2: true,
          choice3: true,
          choice4: true,
          bgColor: "#44bd42",
        });
      } else if (answerChoice == "B") {
        this.setState({
          choice1: true,
          choice2: false,
          choice3: true,
          choice4: true,
          bgColor: "#44bd42",
        });
      } else if (answerChoice == "C") {
        this.setState({
          choice1: true,
          choice2: true,
          choice3: false,
          choice4: true,
          bgColor: "#44bd42",
        });
      } else if (answerChoice == "D") {
        this.setState({
          choice1: true,
          choice2: true,
          choice3: true,
          choice4: false,
          bgColor: "#44bd42",
        });
      }
      let score = 0;
      
      if(difficulty == "easy"){
        score = Math.random() * (50 - 40) + 40;
      }else if(difficulty == "medium"){
        score = Math.random()*(100-75)+75
      }else if(difficulty == "hard"){
        score = Math.random()*(150-110)+110
      }
      this.setState({
        correct: this.state.correct + 1,
        gameScore: this.state.gameScore+score
        
      });
    } else {
      //incorrect
      let index = 0;

      for (let i = 0; i < this.state.arrayAnswerChoice.length; i++) {
        if (this.state.arrayAnswerChoice[i] == this.state.correct_answer) {
          index = i;
        }
      }

      if (index == 0) {
        this.setState({
          choice1: false,
          choice2: true,
          choice3: true,
          choice4: true,
          bgColor: "#eb4034",
        });
      } else if (index == 1) {
        this.setState({
          choice1: true,
          choice2: false,
          choice3: true,
          choice4: true,
          bgColor: "#eb4034",
        });

      } else if (index == 2) {
        this.setState({
          choice1: true,
          choice2: true,
          choice3: false,
          choice4: true,
          bgColor: "#eb4034",
        });
      } else if (index == 3) {
        this.setState({
          choice1: true,
          choice2: true,
          choice3: true,
          choice4: false,
          bgColor: "#eb4034",
        });
      }
      let score = 0;
      if(difficulty == "easy"){
        score = Math.random() * (30 - 10) + 10;
      }else if(difficulty == "medium"){
        score = Math.random()*(50-25)+25
      }else if(difficulty == "hard"){
        score = Math.random()*(20-10)+10
      }

      this.setState({
        incorrect: this.state.incorrect + 1,
        gameScore: this.state.gameScore-score,
      });
    }
    this.setState({
      answeredQuestion: true,

      //  timer:3
    });

    setTimeout(() => {
      this.setState({
        questionNumber: this.state.questionNumber + 1,
      });
      this.getQuizData();
    }, 3000);
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.headerContainer,
            { backgroundColor: this.state.bgColor, justifyContent: "center" },
          ]}
        >
          <Text style={[styles.timer, { marginBottom: "90%" }]}>
            Timer Remaining
          </Text>
          <Text style={styles.timer}>{/*this.state.timer*/}</Text>
        </View>
        <View style={styles.questionContainer}>
          <View style={{ flex: 1.5, justifyContent: "center" }}>
            <Text style={styles.questionNumberTitle}>
              Question{" "}
              <Text style={{ fontWeight: "bold", fontSize: deviceHeight / 35 }}>
                {this.state.questionNumber + 1}
              </Text>{" "}
              / 7
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
            onPress={() => this.submitAnswer("A", this.state.answerChoice1)}
            disabled={this.state.answeredQuestion}
            style={
              this.state.choice1
                ? [styles.answerChoice, { shadowColor: "#eb4034" }]
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
            onPress={() => this.submitAnswer("B", this.state.answerChoice2)}
            style={
              this.state.choice2
                ? [styles.answerChoice, { shadowColor: "#eb4034" }]
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
            onPress={() => this.submitAnswer("C", this.state.answerChoice3)}
            style={
              this.state.choice3
                ? [styles.answerChoice, { shadowColor: "#eb4034" }]
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
            onPress={() => this.submitAnswer("D", this.state.answerChoice4)}
            style={
              this.state.choice4
                ? [styles.answerChoice, { shadowColor: "#eb4034" }]
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
  timer: {
    fontSize: deviceHeight / 30,
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
    marginBottom: "25%",
    color: "white",
  },
});
export default Quiz;
