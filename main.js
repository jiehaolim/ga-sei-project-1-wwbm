import "./style.css";
import $ from "jquery";
import questionsList from "./questions";

// Game and user objects!
// Game object
const gameObject = {
  prizeLadder: ["100","200","300","500","1,000","2,000","4,000","8,000","16,000","32,000","64,000","125,000","250,000","500,000","1,000,000"],
  options: ["A", "B", "C", "D"],
  timeLeft: 12,
}

// User profile
const userProfile = {
  Progress: 0, // might need to change it to object to keep track of life line
  score: 0,
}

// General functions to shorten the code!
// function to create html element
const $generateHTMLElement = (htmlElement, numOfDiv, attrName, attrValue, parent, appendOrPrepend) => {
  for (let i = 1; i <= numOfDiv; i++){
    const $htmlElement = $(`<${htmlElement}>`).attr(attrName,attrValue)
    $(parent)[appendOrPrepend]($htmlElement)
  }
} 

// function to enable or disable buttons
const $enableOrDisableDiv = (id, addClassOrRemove, enabledOrDisabled) => {
  // identify the rest of the button
  const optionsNotChosen = gameObject.options.filter(element => element !== id)
  // disable all other options button via loop
  for (const element of optionsNotChosen) {
    $(`#${element}`)[addClassOrRemove]("disabled-div").prop(enabledOrDisabled, true);
  }
}

// Game function!
// Game display function!
// display the prize ladder
const $displayPrizeLadder = (prizeLadder, Progress) => {
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
  for (let i = 0; i < gameObject.prizeLadder.length; i++){
    let prizeNum = gameObject.prizeLadder.length - 1 - i
    let prizeQuestionIndex = gameObject.prizeLadder.length - i
    $(".prize").eq(i).text(`${[prizeQuestionIndex]} $${gameObject.prizeLadder[prizeNum]}`)
  }
  // change the css of current level
  let prizeQuestionIndex = gameObject.prizeLadder.length - userProfile.Progress - 1
  $(".prize").eq(prizeQuestionIndex).css("background-color","#FF8326").addClass("blink")
};

// display question
const $displayQuestion = (index) => {
  // hide prize ladder div
  $("#header").show()
  $(".ladder").remove()
  $("#logo").show()
  // create the divs for timer and current prize value
  $generateHTMLElement("div",1,"class","timerbank container","#overall-body-container","prepend")
  $generateHTMLElement("div",2,"class","button",".timerbank","append")
  // create divs for the three life lines
  $generateHTMLElement("div",1,"class","lifeline container","#overall-body-container","append")
  $generateHTMLElement("div",3,"class","button",".lifeline","append")
  // create the divs
  $generateHTMLElement("div",1,"class","qn container","#footer","append")
  $generateHTMLElement("div",1,"id","question",".qn","append")
  $generateHTMLElement("div",2,"class","opt container","#footer","append")
  $generateHTMLElement("div",2,"class","option",".opt","append")
  // add timer and user current winnings
  




  // current winnings text
  $(".button").eq(1).text(`Winnings: $${userProfile.score}`)
  // insert 3 life lines



  
  // insert question into div
  $("#question").text(`${questionsList[index].question}`)
  // loop the ids into the options and text
  for (let i = 0; i < gameObject.options.length; i++){
    let objKey = "option" + gameObject.options[i]
    $(".option").eq(i).attr("id",gameObject.options[i])
    $(".option").eq(i).text(`${gameObject.options[i]}. ${questionsList[index][objKey]}`)
  }
  // add event listener
  const $answerSelected = (event) => {$suspenseAndReflectAns($(event.currentTarget).attr("id"));}
  $(".option").on("click", $answerSelected);

};

// Game timer function!
// function to start timer
// function for reflecting the count down per question

// function to alert user game is over
const timeUp = () => {
  alert("Your time is up! Have a better luck tomorrow.")
}

// Game animation function!
// function to set delay to create suspense then turn the answer green
const $suspenseAndReflectAns = (id) => {
  // disable button
  $enableOrDisableDiv(id,"addClass","enabled")
  // selected answer as orange
  $(`#${id}`).css("background-color","#FF8326")
  // show correct answer as green after 5s
  setTimeout(() => {$(`#${questionsList[userProfile.Progress].key}`).css("background-color","#37CD3B")},1000)
  // check answer after 10s
  setTimeout(() => {checkAnswer(id)},2000)
  // enable button
  $enableOrDisableDiv(id,"remove","Disabled")
}

// Game logic function!
// function to check the user's input
const checkAnswer = (id) => {
  if ((userProfile.Progress + 1) === gameObject.prizeLadder.length && id === questionsList[userProfile.Progress].key){
    alert("Congrats!") // To change this.
  } else if (id === questionsList[userProfile.Progress].key) {
    updateScore()
  } else {
    alert("GO TO HIGHSCORE BOARD"); // To change this.
  }
};

// Game updating function!
// function to update the user's score
const updateScore = () => {
  // Update progress
  userProfile.Progress += 1
  userProfile.score = gameObject.prizeLadder[userProfile.Progress - 1]
  // Hide the question div
  $(".qn").remove()
  $(".opt").remove()
  $displayPrizeLadder(gameObject.prizeLadder,userProfile.Progress)
  setTimeout(() => {$displayQuestion(userProfile.Progress)},1000)
}

// Main game function!
const startGame = () => {
  $displayPrizeLadder(gameObject.prizeLadder,userProfile.Progress)
  setTimeout(() => {$displayQuestion(userProfile.Progress)},1000)
}

// document ready!
$(() => {
  $(".menu").eq(0).on("click", startGame)
});
