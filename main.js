import "./style.css";
import $ from "jquery";
import questionsList from "./questions";

// Game and user objects!
// Game object
// line lifes picture - https://imgur.com/sQvoOhJ
const gameObject = {
  prizeLadder: ["100","200","300","500","1,000","2,000","4,000","8,000","16,000","32,000","64,000","125,000","250,000","500,000","1,000,000"],
  options: ["A", "B", "C", "D"],
  time: 30,
  roundTimer: null,
  display: {moneybag: "img/money-bag.svg",timer: "img/timer.svg"},
  lifelinesImg: ["img/audience.png","img/friend.png","img/50-50.png"],
  lifelinesId: ["audience","friend","fifty-fifty"],
  friend: ["Dad", "Mum","Brother","Sister","Girlfriend","Boyfriend","Tom","Dick","Harry","Lucas"],
  friendResponse: ["I think it is", "I read it on the internet, it is", "I read this on the newspaper yesterday, it is", "I know this one. It is","I am guessing it is"]
}

// User profile
const userProfile = {
  Progress: 0,
  score: 0,
  lifelines: [1,1,1] //correspond to the game object lifelines Id
}

// General functions to shorten the code!
// function to create html element
const $generateHTMLElement = (htmlElement, numOfDiv, attrName, attrValue, parent, appendOrPrepend) => {
  for (let i = 1; i <= numOfDiv; i++){
    const $htmlElement = $(`<${htmlElement}>`).attr(attrName,attrValue)
    $(parent)[appendOrPrepend]($htmlElement)
  }
} 

// function to enable or disable buttons for an array of buttons
const $enableOrDisableDiv = (arrayOfButtonsId, addClassOrRemove, enabledOrDisabled) => {
  // disable all other options button via loop
  for (const element of arrayOfButtonsId) {
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
  $generateHTMLElement("div",1,"class","ladder container","#overall-footer-container","append")
  $generateHTMLElement("div",15,"class","prize",".ladder","append")
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
  $generateHTMLElement("div",2,"class","displaytimebank container",".timerbank","append")
  $generateHTMLElement("img",1,"class","display",".displaytimebank","append")
  $generateHTMLElement("div",1,"class","text",".displaytimebank","append")
  // create divs for the three life lines
  $generateHTMLElement("div",1,"class","lifeline container","#overall-body-container","append")
  $generateHTMLElement("img",3,"class","lifelineimg",".lifeline","append")
  // create the divs
  $generateHTMLElement("div",1,"class","qn container","#overall-footer-container","append")
  $generateHTMLElement("div",1,"id","question",".qn","append")
  $generateHTMLElement("div",2,"class","opt container","#overall-footer-container","append")
  $generateHTMLElement("div",2,"class","option",".opt","append")
  // current winnings text
  $(".display").eq(0).attr("src",`${gameObject.display.moneybag}`)
  $(".text").eq(0).text(`$${userProfile.score}`)
  // reset timer, start timer and user current winnings
  gameObject.time = 30
  gameObject.roundTimer = setInterval(timer,1000)
  // insert 3 life lines images
  for (let i = 0; i < gameObject.lifelinesId.length; i++){
      $(".lifelineimg").eq(i).attr("src",gameObject.lifelinesImg[i]).attr("id",gameObject.lifelinesId[i])
  }
  // disabled life lines that are used up
  for (let i = 0; i < userProfile.lifelines.length; i++) {
    if (userProfile.lifelines[i] === 0)
    $(".lifelineimg").eq(i).attr("src",gameObject.lifelinesImg[i]).attr("id",gameObject.lifelinesId[i]).css("opacity","0.3").addClass("disabled-div").prop("enabled", true);
  }
  // add life line event listener for audience lifeline
  $(".lifelineimg").eq(0).on("click", audienceLifeline);
  // add life line event listener for friend lifeline
  $(".lifelineimg").eq(1).on("click", friendLifeline);
  // add life line event listener for 50-50 lifeline
  $(".lifelineimg").eq(2).on("click", fiftyfiftyLifeline);
  // insert question into div
  $("#question").text(`${questionsList[index].question}`)
  // loop the ids into the options and text
  for (let i = 0; i < gameObject.options.length; i++){
    let objKey = "option" + gameObject.options[i]
    $(".option").eq(i).attr("id",gameObject.options[i])
    $(".option").eq(i).text(`${gameObject.options[i]}. ${questionsList[index][objKey]}`)
  }
  // add event listener for the options
  const $answerSelected = (event) => {$suspenseAndReflectAns($(event.currentTarget).attr("id"));}
  $(".option").on("click", $answerSelected);
};

// Game round timer function!
// function to run and stop the round timer
const timer = () => {
  if (gameObject.time > -1) {
    // 
    $(".display").eq(1).attr("src",`${gameObject.display.timer}`).text(`${gameObject.time}`)
    $(".text").eq(1).text(`${gameObject.time}`)
    gameObject.time--
  } else if (gameObject.time === -1) {
    gameObject.time = -2
    clearInterval(gameObject.roundTimer)
    reflectAnsAfterTimeOut()
  }
}

// Game life line function!
// function for audience lifeline
const audienceLifeline = () => {

  

  //Canvas Chart https://www.w3schools.com/js/tryit.asp?filename=tryai_chartjs_bars_horizontal
  var xValues = ["A", "B", "C", "D"];
  var yValues = [55, 49, 44, 24];
  var barColors = ["red", "green","blue","orange"];

  new Chart("myChart", {
    type: "horizontalBar",
    data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
    options: {
      legend: {display: false},
      title: {
        display: true,
        text: "Audience"
      },
      scales: {
        xAxes: [{ticks: {min: 10, max:60}}]
      }
    }
  });
}

// function for friend lifeline
const friendLifeline = () => {
    // turn on modal
    $(".modal").css("display","block")
    // insert random friend into modal header
    let randomIndex = Math.floor(Math.random() * gameObject.friend.length)
    $(".modalheader").text(gameObject.friend[randomIndex])
    // generate 80% chance of getting getting the right answer
    let randomIndex1 = Math.random()
    let friendAnswer = null
    if (randomIndex1 <= 0.2){
      const wrongAnswer = gameObject.options.filter(element => element !== questionsList[userProfile.Progress].key)
      let randomIndex2 = Math.floor(Math.random() * wrongAnswer.length)
      friendAnswer = wrongAnswer[randomIndex2]
    } else {
      friendAnswer = questionsList[userProfile.Progress].key
    }
    // insert random response into modal body
    let randomIndex3 = Math.floor(Math.random() * gameObject.friendResponse.length)
    $(".modalresponse").text(`${gameObject.friendResponse[randomIndex3]} ${friendAnswer}.`)
    // turn off modal
    $(".modal").on("click",()=>{$('.modal').css("display","none")})
    // remove the fifty life lines
    $("#friend").css("opacity","0.3").addClass("disabled-div").prop("enabled", true);
    // update user profile
    userProfile.lifelines[1] = 0
}

// function for 50-50 lifeline
const fiftyfiftyLifeline = () => {
  // create an array that does not contains the answer
  const wrongAnswer = gameObject.options.filter(element => element !== questionsList[userProfile.Progress].key)
  // to randomly generate 2 different wrong answers to be eliminated
  const answerToBeEliminated = []
  while(answerToBeEliminated.length < 2){
    let randomIndex = Math.floor(Math.random() * wrongAnswer.length)
    // only pushes the random index if it does not exist
    if (answerToBeEliminated.indexOf(wrongAnswer[randomIndex]) === -1) {
      answerToBeEliminated.push(wrongAnswer[randomIndex])
    }
  }
  // remove the text of the 2 eliminated options
  for (const element of answerToBeEliminated) {
    $(`#${element}`).text("")
  }
  // disable the 2 options eliminated options button
  $enableOrDisableDiv(answerToBeEliminated,"addClass","enabled")
  // remove the fifty life lines
  $("#fifty-fifty").css("opacity","0.3").addClass("disabled-div").prop("enabled", true);
  // update user profile
  userProfile.lifelines[2] = 0
}

// Game animation function!
// function to set delay to create suspense then turn the answer green
const $suspenseAndReflectAns = (id) => {
  // stop timer
  clearInterval(gameObject.roundTimer)
  // identify the rest of the button
  const optionsNotChosen = gameObject.options.filter(element => element !== id)
  // disable button
  $enableOrDisableDiv(optionsNotChosen,"addClass","enabled")
  $enableOrDisableDiv(gameObject.lifelinesId,"addClass","enabled")
  // selected answer as orange
  $(`#${id}`).css("background-color","#FF8326")
  // show correct answer as green after 5s
  setTimeout(() => {$(`#${questionsList[userProfile.Progress].key}`).css("background-color","#37CD3B")},1000)
  // check answer after 10s
  setTimeout(() => {checkAnswer(id)},2000)
  // enable button
  $enableOrDisableDiv(optionsNotChosen,"remove","Disabled")
  $enableOrDisableDiv(gameObject.lifelinesId,"remove","Disabled")
}

const reflectAnsAfterTimeOut = () => {
  // stop timer
  clearInterval(gameObject.roundTimer)
  // identify the all of the button
  const allOptions = gameObject.options
  // disable all button
  $enableOrDisableDiv(allOptions,"addClass","enabled")
  $enableOrDisableDiv(gameObject.lifelinesId,"addClass","enabled")
  // show correct answer as green after 5s
  setTimeout(() => {$(`#${questionsList[userProfile.Progress].key}`).css("background-color","#37CD3B")},1000)
  // enable all button
  $enableOrDisableDiv(allOptions,"remove","Disabled")
  $enableOrDisableDiv(gameObject.lifelinesId,"remove","Disabled")
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
