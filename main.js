import "./style.css";
import $ from "jquery";
import questionsList from "./questions";

// array for the prize ladder
const prizeLadder = ["100","200","300","500","1,000","2,000","4,000","8,000","16,000","32,000","64,000","125,000","250,000","500,000","1,000,000"];

// array for options
const options = ["A", "B", "C", "D"];

// array to store user's answer this can use to track the question number.
let userProgress = 0;
let userScore = 0;

// function to create html element
const $generateHTMLElement = (htmlElement, numOfDiv, attrName, attrValue, parent, appendOrPrepend) => {
  for (let i = 1; i <= numOfDiv; i++){
    const $div = $(`<${htmlElement}>`).attr(attrName,attrValue)
    $(parent)[appendOrPrepend]($div)
  }
}

// display the prize ladder
const $displayPrizeLadder = (prizeLadder, userProgress) => {
  // hide header, logo and menu div
  $("#header").hide()
  $("#logo").hide()
  $(".startmenu").hide()
  $(".timerbank").remove()
  $(".lifeline").remove()
  // create the divs for the ladder
  $generateHTMLElement("div",15,"class","ladder container","#footer","append")
  $generateHTMLElement("div",1,"class","prize",".ladder","append")
  // insert prize ladder text into divs
  for (let i = 0; i < prizeLadder.length; i++){
    let prizeNum = prizeLadder.length - 1 - i
    let prizeQuestionIndex = prizeLadder.length - i
    $(".prize").eq(i).text(`${[prizeQuestionIndex]} $${prizeLadder[prizeNum]}`)
  }
  // change the css of current level
  let prizeQuestionIndex = prizeLadder.length - userProgress - 1
  $(".prize").eq(prizeQuestionIndex).css("background-color","#FF8326").addClass("blink")
};

// display question
const $displayQuestion = (index) => {
  // hide prize ladder div
  $("#header").show()
  $(".ladder").remove()
  $("#logo").show()
  // create the divs for timer and current prize value
  $generateHTMLElement("div",1,"class","timerbank container",".overall-body","prepend")
  $generateHTMLElement("div",2,"class","button",".timerbank","append")
  // $(".button").eq(0).text(`Current Winnings: $${userScore}`)
  $(".button").eq(1).text(`Current Winnings: $${userScore}`)
  // create divs for the three life lines
  $generateHTMLElement("div",1,"class","lifeline container","#body","append")
  $generateHTMLElement("div",3,"class","button",".lifeline","append")
  // create the divs
  $generateHTMLElement("div",1,"class","qn container","#footer","append")
  $generateHTMLElement("div",1,"id","question",".qn","append")
  $generateHTMLElement("div",2,"class","opt container","#footer","append")
  $generateHTMLElement("div",2,"class","option",".opt","append")
  // insert question into div
  $("#question").text(`${questionsList[index].question}`)
  // loop the ids into the options and text
  for (let i = 0; i < options.length; i++){
    let objKey = "option" + options[i]
    $(".option").eq(i).attr("id",options[i])
    $(".option").eq(i).text(`${options[i]}. ${questionsList[index][objKey]}`)
  }
  // add event listener
  const $answerSelected = (event) => {suspenseAndReflectAns($(event.currentTarget).attr("id"));}
  $(".option").on("click", $answerSelected);
};

const $enableOrDisableDiv = (id, addClassOrRemove, enabledOrDisabled) => {
  // identify the rest of the button
  const optionsNotChosen = options.filter(element => element !== id)
  // disable all other options button via loop
  for (const element of optionsNotChosen) {
    $(`#${element}`)[addClassOrRemove]("disabled-div").prop(enabledOrDisabled, true);
  }
}

// function to set delay to create suspense then turn the answer green
const suspenseAndReflectAns = (id) => {
  // disable button
  $enableOrDisableDiv(id,"addClass","enabled")
  // selected answer as orange
  $(`#${id}`).css("background-color","#FF8326")
  // show correct answer as green after 5s
  setTimeout(() => {$(`#${questionsList[userProgress].key}`).css("background-color","#37CD3B")},1000)
  // check answer after 10s
  setTimeout(() => {checkAnswer(id)},2000)
  // enable button
  $enableOrDisableDiv(id,"remove","Disabled")
}

// function to check the user's input
const checkAnswer = (id) => {
  if ((userProgress + 1) === prizeLadder.length && id === questionsList[userProgress].key){
    alert("Congrats!") // To change this.
  } else if (id === questionsList[userProgress].key) {
    updateScore()
  } else {
    alert("GO TO HIGHSCORE BOARD"); // To change this.
  }
};

// function to update the user's score
const updateScore = () => {
  // Update progress
  userProgress += 1
  userScore = prizeLadder[userProgress - 1]
  // Hide the question div
  $(".qn").remove()
  $(".opt").remove()
  $displayPrizeLadder(prizeLadder,userProgress)
  setTimeout(() => {$displayQuestion(userProgress)},1000)
}

// function for the main game
const startGame = () => {
  $displayPrizeLadder(prizeLadder,userProgress)
  setTimeout(() => {$displayQuestion(userProgress)},1000)
}

// document ready
$(() => {
  $(".menu").eq(0).on("click", startGame)
});
