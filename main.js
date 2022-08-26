import "./style.css";
import $ from "jquery";
import questionsList from "./questions";
import moneybagSvg from "./img/money-bag.svg";
import timerSvg from "./img/timer.svg";
import audienceImg from "./img/audience.png";
import friendImg from "./img/friend.png";
import fiftyfiftyImg from "./img/50-50.png";
import mainTheme from "./sound/01-Main-Theme-Cut.mp3";
import fullMainTheme from "./sound/01-Main-Theme-Org.mp3";
import prizeTheme from "./sound/10-Let's-Play-Prize.mp3";
import questionTheme from "./sound/11-$100-$1,000-Questions.mp3";
import finalAnswerTheme from "./sound/15-$2,000-Final Answer-Cut.mp3"
import correctTheme from "./sound/17-$2,000-Win.mp3";
import wrongTheme from "./sound/16-$2,000-Lose.mp3";
import timeUpTheme from "./sound/72-Time's-Up.mp3";
import askAudienceTheme from "./sound/68-Ask-The-Audience-Cut.mp3";
import phoneAFriendTheme from "./sound/66-Phone-A-Friend-Cut.mp3";
import fiftyFiftyTheme from "./sound/67-50-50-Cut.mp3";


// Game and user objects!
// Game object
// line lifes picture - https://imgur.com/sQvoOhJ
const gameObject = {
  prizeLadder: ["$100","$200","$300","$500","$1,000",
  "$2,000","$4,000","$8,000","$16,000","$32,000",
  "$64,000","$125,000","$250,000","$500,000","$1,000,000",],
  options: ["A", "B", "C", "D"],
  time: 25,
  roundTimer: null,
  display: { moneybag: moneybagSvg, timer: timerSvg },
  lifelinesImg: [audienceImg, friendImg, fiftyfiftyImg],
  lifelinesId: ["audience", "friend", "fifty-fifty"],
  friend: ["Dad","Mum","Brother","Sister","Girlfriend",
  "Boyfriend","Tom","Dick","Harry","Lucas",],
  friendResponse: ["I think it is","I read it on the internet, it is",
  "I read this on the newspaper yesterday, it is","I know this one. It is","I am guessing it is",],
};

// User profile
const userProfile = {
  // reset at end of game
  // correspond to the game object lifelines Id
  lifelines: [1, 1, 1],
  Progress: 0,
  // 0 is just a placeholder for game not started.
  score: 0,
  // reset every new question
  questionIndex: 0,
  currentOptions: ["A", "B", "C", "D"],
};

// General functions to shorten the code!
// function to create html element
const $generateHTMLElement = (htmlElement, numOfDiv, attrName, attrValue, parent, appendOrPrepend) => {
  for (let i = 1; i <= numOfDiv; i++) {
    const $htmlElement = $(`<${htmlElement}>`).attr(attrName, attrValue);
    $(parent)[appendOrPrepend]($htmlElement);
  }
};

// function to enable or disable buttons for an array of buttons
const $enableOrDisableDiv = (arrayOfButtonsId, addClassOrRemove, enabledOrDisabled) => {
  // disable all other options button via loop
  for (const element of arrayOfButtonsId) {
    $(`#${element}`)
      [addClassOrRemove]("disabled-div")
      .prop(enabledOrDisabled, true);
  }
};

// function to create ok button in modal
const $okButtonModal = () => {
  $generateHTMLElement("div", 1, "class", "okbutton container", ".modal-body", "append");
  $generateHTMLElement("div", 1, "class", "ok button", ".okbutton", "append");
  $(".ok").text("ok").on("click", () => {$(".modal").css("display", "none")})
}

// function to create yes no button in modal
const $yesNoButtonModal = () => {
  $generateHTMLElement("div", 1, "class", "yesnobutton container", ".modalresponse", "append");
  $generateHTMLElement("div", 2, "class", "yesno button", ".yesnobutton", "append");
}

// function to clear modal
const $clearModal = () => {
  $(".modalheader").text("");
  $(".modalresponse").text("");
  $("#myChart").remove();
  $(".yesnobutton").remove()
  $(".okbutton").remove()
  // remove event listener from .modal
  $(".modal").off()
}

// function to play sound effect
const $playSound = (theme) => {
  $("#music").attr("src", theme)
  $("#music").get(0).play()
}

// function to return the sound attr for checking
const $soundSRC = () => {
  return $("#music").attr("src")
}

// Game function!
// Game display function!
// Rules!
const $displayRules = () => {
  // hide the menu screen
  $(".logo").hide();
  $(".startmenu").hide();
  // Create the divs for rules
  $generateHTMLElement("div", 1, "class", "rules container", "#overall-body-container", "append");
  $generateHTMLElement("div", 10, "class", "details", ".rules", "append");
  $generateHTMLElement("div", 1, "class", "back", ".rules", "append");
  // add text to the divs
  $(".details").eq(0).addClass("header").text("Rules of the Game");
  $(".details").eq(1).addClass("body").text(`Who wants to be a Millionaire ("WWBM") is based on the international television game show franchise of British origin created by David Briggs, Mike Whitehill and Steven Knight. The contestant will have to answer 15 questions with three lifelines to stand a chance to win a million dollars.`);
  $(".details").eq(2).addClass("timers-container")
  // Create the divs for walkaway svg
  $generateHTMLElement("div", 1, "class", "timer-container", ".timers-container", "append");
  $generateHTMLElement("div", 1, "class", "timersvgicon", ".timer-container", "append");
  $generateHTMLElement("img", 1, "class", "timersvgimg", ".timersvgicon", "append");
  $generateHTMLElement("div", 1, "class", "timersvglabel", ".timersvgicon", "append");
  $generateHTMLElement("div", 1, "class", "timerexplainer body", ".timer-container", "append");
  // add text for timer svg and text
  $(".timersvgimg").attr("src", gameObject.display.timer)
  $(".timersvglabel").text("Timer");
  $(".timerexplainer").text("Each question needs to be answered in the duration of 25 seconds.")
  // Create the divs for timer svg
  $(".details").eq(3).addClass("header").text("Safe Havens");
  $(".details").eq(4).addClass("body").text("There are three ‘safe havens’ in the question structure (Q5 - $1,000, Q10 - $32,000 and Q15 - $1,000,000). Before reaching the first safe haven on question 5, the contestant will lose all their winnings when giving an incorrect answer. Upon reaching any safe haven, the contestant will be able to retain their winnings at the amount of the last safe haven when giving an incorrect answer.");
  $(".details").eq(5).addClass("walkaways-container")
  // Create the divs for walkaway svg
  $generateHTMLElement("div", 1, "class", "walkaway-container", ".walkaways-container", "append");
  $generateHTMLElement("div", 1, "class", "walkawaysvgicon", ".walkaway-container", "append");
  $generateHTMLElement("img", 1, "class", "walkawaysvgimg", ".walkawaysvgicon", "append");
  $generateHTMLElement("div", 1, "class", "walkawaysvglabel", ".walkawaysvgicon", "append");
  $generateHTMLElement("div", 1, "class", "walkawayexplainer body", ".walkaway-container", "append");  
  // add text for walkaway svg and text
  $(".walkawaysvgimg").attr("src", gameObject.display.moneybag)
  $(".walkawaysvglabel").text("Winnings");
  $(".walkawayexplainer").text("The contestant will also be able to choose to walk away with any existing winnings prior to answering the next question.")
  // add text to the divs for life lines
  $(".details").eq(6).addClass("header").text("Lifelines");
  $(".details").eq(7).addClass("lifelines-container");
  // Create the divs for lifeline items
  $generateHTMLElement("div", 3, "class", "lifeline-container", ".lifelines-container", "append");
  $generateHTMLElement("div", 1, "class", "lifelineicon", ".lifeline-container", "append");
  $generateHTMLElement("img", 1, "class", "iconimg", ".lifelineicon", "append");
  $generateHTMLElement("div", 1, "class", "iconlabel", ".lifelineicon", "append");
  $generateHTMLElement("div", 1, "class", "lifelineexplainer body", ".lifeline-container", "append");
  // lifeline image and text
  for (let i = 0; i < gameObject.lifelinesId.length; i++) {
    $(".iconimg").eq(i).attr("src", gameObject.lifelinesImg[i]);
  }
  $(".iconlabel").eq(0).text("Ask the audience");
  $(".lifelineexplainer").eq(0).text("A poll will be conducted with the audience and the results will be shown in a chart. The answer provided will have an accuracy of 90%.");
  $(".iconlabel").eq(1).text("Phone a friend");
  $(".lifelineexplainer").eq(1).text("Contestant will be allowed to randomly phone a friend or family member and ask for the answer to the question. The answer provided will have an accuracy of 70%.");
  $(".iconlabel").eq(2).text("Fifty fifty");
  $(".lifelineexplainer").eq(2).text("This eliminates two incorrect answers from the four answers.");
  // copyright text
  $(".details").eq(8).addClass("header").text("Copyrights");
  $(".details").eq(9).addClass("body").text("All rights belong directly to their rightful owners. No copyright infringement intended.");
  $(".back").text("Menu");
  // add life line event listener for resetting the game
  $(".back").on("click", $displayMenu);
};

// Back to Menu!
const $displayMenu = () => {
  $(".rules").remove();
  $(".logo").show();
  $(".startmenu").show();
};

// display the prize ladder
const $displayPrizeLadder = () => {
  // play music
  $playSound(prizeTheme)
  // hide header, logo and menu div
  $("#header").hide();
  $("#logo").hide();
  $(".startmenu").hide();
  $(".timerbank").remove();
  $(".lifeline").remove();
  // create the divs for the ladder
  $generateHTMLElement("div", 1, "class", "ladder container", "#overall-footer-container", "append");
  $generateHTMLElement("div", 15, "class", "prize", ".ladder", "append");
  // insert prize ladder text into divs
  for (let i = 0; i < gameObject.prizeLadder.length; i++) {
    let prizeNum = gameObject.prizeLadder.length - 1 - i;
    let prizeQuestionIndex = gameObject.prizeLadder.length - i;
    $(".prize").eq(i).text(`Q${[prizeQuestionIndex]} - ${gameObject.prizeLadder[prizeNum]}`);
  }
  // change the css of current level
  let prizeQuestionIndex =
    gameObject.prizeLadder.length - userProfile.Progress - 1;
  $(".prize").eq(prizeQuestionIndex).css("background-color", "#FF8326").addClass("blink");
};

// display question
const $displayQuestion = (index) => {
  // play music
  $playSound(questionTheme)
  // hide prize ladder div
  $("#header").show();
  $(".ladder").remove();
  $("#logo").show();
  // create the divs for timer and current prize value
  $generateHTMLElement("div", 1, "class", "timerbank container", "#overall-body-container", "prepend");
  $generateHTMLElement("div", 2, "class", "displaytimebank container", ".timerbank", "append");
  $generateHTMLElement("img", 1, "class", "display", ".displaytimebank", "append");
  $generateHTMLElement("div", 1, "class", "text", ".displaytimebank", "append");
  // create divs for the three life lines
  $generateHTMLElement("div", 1, "class", "lifeline container", "#overall-body-container", "append");
  $generateHTMLElement("img", 3, "class", "lifelineimg", ".lifeline", "append");
  // create the divs for the questions
  $generateHTMLElement("div", 1, "class", "qn container", "#overall-footer-container", "append");
  $generateHTMLElement("div", 1, "id", "question", ".qn", "append");
  $generateHTMLElement("div", 2, "class", "opt container", "#overall-footer-container", "append");
  $generateHTMLElement("div", 2, "class", "option", ".opt", "append");
  // current text plus timer svg and winnings svg
  // timer svg
  $(".display").eq(0).attr("src", `${gameObject.display.timer}`).text(`${gameObject.time}`);
  // reset timer, start timer and user current winnings
  gameObject.time = 25;
  gameObject.roundTimer = setInterval($timer, 1000);
  // winnings svg and event listener to walk away after question 1
  if (userProfile.score === 0) {
    $(".displaytimebank").eq(1).remove()
  } else {
    $(".display").eq(1).attr("src", `${gameObject.display.moneybag}`).on("click", $modalWalkAway).attr("id", "walkAwayDisplay")
    $(".text").eq(1).text(`${userProfile.score}`).css("color", "#37CD3B").on("click", $modalWalkAway).attr("id", "walkAwayText")
  }
  // insert 3 life lines images
  for (let i = 0; i < gameObject.lifelinesId.length; i++) {
    $(".lifelineimg").eq(i).attr("src", gameObject.lifelinesImg[i]).attr("id", gameObject.lifelinesId[i]);
  }
  // disabled life lines that are used up
  for (let i = 0; i < userProfile.lifelines.length; i++) {
    if (userProfile.lifelines[i] === 0)
      $(".lifelineimg").eq(i).attr("src", gameObject.lifelinesImg[i]).attr("id", gameObject.lifelinesId[i])
        .css("opacity", "0.3").addClass("disabled-div").prop("enabled", true);
  }
  // add life line event listener for audience lifeline
  $(".lifelineimg").eq(0).on("click", $audienceLifeline);
  // add life line event listener for friend lifeline
  $(".lifelineimg").eq(1).on("click", $friendLifeline);
  // add life line event listener for 50-50 lifeline
  $(".lifelineimg").eq(2).on("click", $fiftyfiftyLifeline);
  // reset the user available options
  userProfile.currentOptions = gameObject.options;
  // generate a random index for the question in each level
  userProfile.questionIndex = Math.floor(Math.random() * questionsList[index].length);
  // insert question into div
  $("#question").text(`${questionsList[index][userProfile.questionIndex].question}`);
  // loop the ids into the options and text
  for (let i = 0; i < gameObject.options.length; i++) {
    let objKey = "option" + gameObject.options[i];
    $(".option").eq(i).attr("id", gameObject.options[i]);
    $(".option").eq(i).text(`${gameObject.options[i]}. ${questionsList[index][userProfile.questionIndex][objKey]}`);
  }
  // add event listener for the options
  $(".option").on("click", () => $modalFinalAnswer($(event.currentTarget).attr("id")));
};

// display scoreboard
const $displayScoreboard = () => {
  // play music
  if ($soundSRC() !== mainTheme && $soundSRC() !== fullMainTheme) {
    $playSound(fullMainTheme)
  }
  // Hide all the game objects
  $(".startmenu").hide();
  $("#logo").hide()
  $(".timerbank").remove();
  $(".lifeline").remove();
  $(".qn").remove();
  $(".opt").remove();
  // store high score array index instead of actual score, lesser data manipulation
  // create high score array index if it does not exist in local storage, else retrieve it from local storage
  let wwbmScore = ""
  if (localStorage.getItem("wwbmscore") === null) {
    wwbmScore = []
  } else if (localStorage.getItem("wwbmscore") !== null) {
    wwbmScore = JSON.parse(localStorage.getItem("wwbmscore"))
  }
  // push the score index to the array if it is not default
  if (userProfile.score !== 0) {
    wwbmScore.push(gameObject.prizeLadder.indexOf(userProfile.score))
    wwbmScore.sort(function(a, b) { return b - a})
    // limit the array to top 5 scores
    if (wwbmScore.length > 5) {
      wwbmScore.pop()
    }
    // set high score into local storage
    localStorage.setItem("wwbmscore", JSON.stringify(wwbmScore))
  }
  // Create the final score board
  $generateHTMLElement("div", 1, "class", "scoreboard container", "#overall-footer-container", "append");
  // generate div for current score and add text to the div
  if (userProfile.score !== 0) {
    $generateHTMLElement("div", 1, "class", "currentscore", ".scoreboard", "append");
    $(".currentscore").text(`Current Score: ${userProfile.score}`);  
  }
  // generate div and add text for the scoreboard header
  $generateHTMLElement("div", 1, "class", "scoreheader", ".scoreboard", "append");
  if (wwbmScore.length === 0) {
    $(".scoreheader").text(`No High Score`);
  } else {
    $(".scoreheader").text(`High Score Board`);
  }
  // generate divs for the high score details
  $generateHTMLElement("div", wwbmScore.length, "class", "scoredetails", ".scoreboard", "append");
  // loop the high score into the divs
  // when the scoreboard is viewed from the main screen no current score
  if (userProfile.score === 0) {
    for (let i = 0; i < wwbmScore.length; i++) {
      // $0 is not in the prizeladder
      if (gameObject.prizeLadder[wwbmScore[i]] === undefined) {
        $(".scoredetails").eq(i).text(`${i + 1}. $0`)
      } else {
        $(".scoredetails").eq(i).text(`${i + 1}. ${gameObject.prizeLadder[wwbmScore[i]]}`)
      }
    }
    // when the scoreboard is after a game to highlight the current score if it appear in high score board
  } else {
    const currentScoreIndex = gameObject.prizeLadder.indexOf(userProfile.score)
    const currentScoreExists = wwbmScore.lastIndexOf(currentScoreIndex)
    for (let i = 0; i < wwbmScore.length; i++) {
      // $0 is not in the prizeladder
      if (gameObject.prizeLadder[wwbmScore[i]] === undefined && currentScoreExists === i) {
        $(".scoredetails").eq(i).text(`${i + 1}. $0`).css("color", "#37CD3B")
      } else if (gameObject.prizeLadder[wwbmScore[i]] === undefined) {
        $(".scoredetails").eq(i).text(`${i + 1}. $0`)
      } else if (currentScoreExists === i) {
        $(".scoredetails").eq(i).text(`${i + 1}. ${gameObject.prizeLadder[wwbmScore[i]]}`).css("color", "#37CD3B")
      } else {
        $(".scoredetails").eq(i).text(`${i + 1}. ${gameObject.prizeLadder[wwbmScore[i]]}`)
      }
    }
  }
  // generate div for button
  $generateHTMLElement("div", 1, "class", "menu-container", ".scoreboard", "append");
  $generateHTMLElement("div", 1, "class", "button", ".menu-container", "append");
  $(".button").text("Menu");
  // add life line event listener for resetting the game
  $(".button").on("click", $restartGame);
}

// Game question screen event listeners
// display modal for welcome screen, to tell user game is better with sound and trigger music
const $modalWelcome = () => {
  // turn on modal
  $(".modal").css("display", "block");
  // clear modal
  $clearModal()
  // insert header text
  $(".modalheader").text("Welcome to Who wants to be a Millionaire!");
  // insert response text
  $(".modalresponse").text("Please turn on the volume for better game experience.");
  // create the response html element
  $okButtonModal()
  // turn off modal
  $(".modal").on("click", () => {$(".modal").css("display", "none");
  $playSound(mainTheme)})
}

// timer
// function to run and stop the round timer
const $timer = () => {
  if (gameObject.time > 5) {
    $(".text").eq(0).css("color", "#FF8326").text(`${gameObject.time}`);
    gameObject.time--;
  } else if (gameObject.time > -1) {
    $(".text").eq(0).css("color", "red").text(`${gameObject.time}`);
    gameObject.time--;
  } else if (gameObject.time === -1) {
    gameObject.time = -2;
    $modalTimesUp()
  }
};

// display modal when time is up
const $modalTimesUp = () => {
  // play music
  $playSound(timeUpTheme)
  // turn on modal
  $(".modal").css("display", "block");
  // clear modal
  $clearModal()
  // insert header text
  $(".modalheader").text("Time's up!");
  // create the response html element
  $okButtonModal()
  // turn off modal
  $(".modal").on("click", () => {$(".modal").css("display", "none");
  $timesUpRevealAns()})
}

// walk away
// display modal for walk away
const $modalWalkAway = () => {
  // turn on modal
  $(".modal").css("display", "block");
  // clear modal
  $clearModal()
  // insert header text
  $(".modalheader").text(`Walk away with ${userProfile.score}?`);
  // create the response html element
  $yesNoButtonModal()
  $(".yesno").eq(0).text("Yes").on("click", $walkAway)
  $(".yesno").eq(1).text("No").on("click", () => {$(".modal").css("display", "none");});
  // turn off modal
  $(".modal").on("click", () => {$(".modal").css("display", "none");});
}

// lifelines 
// function for audience lifeline
const $audienceLifeline = () => {
  // play additional sound effect
  $("#music2").attr("src", askAudienceTheme)
  $("#music2").get(0).play()
  // turn on modal
  $(".modal").css("display", "block");
  // clear modal
  $clearModal()
  // Insert header words for modal
  $(".modalheader").text("Audience");
  // create the canvas html element
  $generateHTMLElement("canvas", 1, "id", "myChart", ".modalresponse", "append");
  // random generate percentages
  const randomNumberArray = [];
  let randomTotal = 0;
  for (let i = 0; i < userProfile.currentOptions.length; i++) {
    // Step 1: Generate random numbers between 0 and 1
    let randomindex = Math.random() * userProfile.currentOptions.length;
    randomNumberArray.push(randomindex);
    // Step 2: Add these numbers
    randomTotal += randomindex;
  }
  // Step 3: Divide each of the numbers by the sum,
  // Step 4: Multiply by 100, and round to the nearest integer.
  const randomPercentage = randomNumberArray.map((element) => Math.round((element / randomTotal) * 100));
  // Align the percentage with the options to reflect the correct answer and with 90% chance of getting right
  // take out the highest percent to insert into the correct answer index
  let maxPercent = randomPercentage.reduce(function (a, b) { return Math.max(a, b);});
  const chartPercentage = randomPercentage.filter((element) => element !== maxPercent);
  let randomIndex1 = Math.random();
  const correctAnsIndex = userProfile.currentOptions.indexOf(questionsList[userProfile.Progress][userProfile.questionIndex].key);
  let randomIndex2 = 0;
  if (randomIndex1 <= 0.1) {
    do {
      randomIndex2 = Math.floor(
        Math.random() * userProfile.currentOptions.length
      );
    } while (randomIndex2 === correctAnsIndex);
    chartPercentage.splice(randomIndex2, 0, maxPercent);
  } else {
    chartPercentage.splice(correctAnsIndex, 0, maxPercent);
  }
  // Canvas Chart
  let xValues = userProfile.currentOptions;
  let yValues = chartPercentage;
  let barColors = ["red", "green", "blue", "orange"];
  const myAudienceChart = new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
        },
      ],
    },
    options: {
      indexAxis: "y",
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          ticks: {
            color: "white",
            beginAtZero: true,
          },
        },
        y: {
          ticks: {
            color: "white",
            beginAtZero: true,
          },
        },
      },
    },
  });
  // create the response html element
  $okButtonModal()
  // turn off modal
  $(".modal").on("click", () => 
  {$("#music2").get(0).pause();
  $(".modal").css("display", "none");});
  // remove the audience life line
  $("#audience").css("opacity", "0.3").addClass("disabled-div").prop("enabled", true);
  // update user profile
  userProfile.lifelines[0] = 0;
};

// function for friend lifeline
const $friendLifeline = () => {
  // play additional sound effect
  $("#music2").attr("src", phoneAFriendTheme)
  $("#music2").get(0).play()
  // turn on modal
  $(".modal").css("display", "block");
  // clear modal
  $clearModal()
  // insert random friend into modal header
  let randomIndex = Math.floor(Math.random() * gameObject.friend.length);
  $(".modalheader").text(gameObject.friend[randomIndex]);
  // generate 70% chance of getting getting the right answer
  let randomIndex1 = Math.random();
  let friendAnswer = null;
  if (randomIndex1 <= 0.3) {
    const wrongAnswer = userProfile.currentOptions.filter((element) => 
    element !== questionsList[userProfile.Progress][userProfile.questionIndex].key);
    let randomIndex2 = Math.floor(Math.random() * wrongAnswer.length);
    friendAnswer = wrongAnswer[randomIndex2];
  } else {
    friendAnswer = questionsList[userProfile.Progress][userProfile.questionIndex].key;
  }
  // insert random response into modal body
  let randomIndex3 = Math.floor(Math.random() * gameObject.friendResponse.length);
  $(".modalresponse").text(`${gameObject.friendResponse[randomIndex3]} ${friendAnswer}.`);
  // create the response html element
  $okButtonModal()
  // turn off modal
  $(".modal").on("click", () => {
    $("#music2").get(0).pause()
    $(".modal").css("display", "none");});
  // remove the friend life lines
  $("#friend").css("opacity", "0.3").addClass("disabled-div").prop("enabled", true);
  // update user profile
  userProfile.lifelines[1] = 0;
};

// function for 50-50 lifeline
const $fiftyfiftyLifeline = () => {
  // play additional sound effect
  $("#music2").attr("src", fiftyFiftyTheme)
  $("#music2").get(0).play()
  // create an array that does not contains the answer
  const wrongAnswer = userProfile.currentOptions.filter((element) => 
  element !== questionsList[userProfile.Progress][userProfile.questionIndex].key);
  // to randomly generate 2 different wrong answers to be eliminated
  const answerToBeEliminated = [];
  while (answerToBeEliminated.length < 2) {
    let randomIndex = Math.floor(Math.random() * wrongAnswer.length);
    // only pushes the random index if it does not exist
    if (answerToBeEliminated.indexOf(wrongAnswer[randomIndex]) === -1) {
      answerToBeEliminated.push(wrongAnswer[randomIndex]);
    }
  }
  // remove the text of the 2 eliminated options
  for (const element of answerToBeEliminated) {
    $(`#${element}`).text("");
  }
  // update the remaining options available incase other lifelines are utilized
  userProfile.currentOptions = userProfile.currentOptions.filter((element) => 
  answerToBeEliminated.includes(element) === false);
  // disable the 2 options eliminated options button
  $enableOrDisableDiv(answerToBeEliminated, "addClass", "enabled");
  // remove the fifty fifty life lines
  $("#fifty-fifty").css("opacity", "0.3").addClass("disabled-div").prop("enabled", true);
  // update user profile
  userProfile.lifelines[2] = 0;
};

// answering the question
// display modal for final answer
const $modalFinalAnswer = (id) => {
  // turn on modal
  $(".modal").css("display", "block");
  // clear modal
  $clearModal()
  // insert header text
  $(".modalheader").text("Final answer?");
  // create the response html element
  $yesNoButtonModal()
  $(".yesno").eq(0).text("Yes").on("click", () => {$checkAnsAndRevealAns(id)})
  $(".yesno").eq(1).text("No").on("click", () => {$(".modal").css("display", "none");});
  // turn off modal
  $(".modal").on("click", () => {$(".modal").css("display", "none");});
}

// Game updating function!
// Main game function!
const $startGame = () => {
  // play music
  $displayPrizeLadder();
  setTimeout(() => {$displayQuestion(userProfile.Progress);}, 3000);
};

// function to reveal answer after time is up
const $timesUpRevealAns = () => {
  // clear timer
  clearInterval(gameObject.roundTimer);
  // disable button
  $enableOrDisableDiv(gameObject.options, "addClass", "enabled");
  $enableOrDisableDiv(gameObject.lifelinesId, "addClass", "enabled");
  $enableOrDisableDiv(["walkAwayDisplay","walkAwayText"], "addClass", "enabled");
  // show correct answer as green after 2s
  setTimeout(() => 
  {$playSound(wrongTheme); 
  $(`#${questionsList[userProfile.Progress][userProfile.questionIndex].key}`).css("background-color", "#37CD3B")
  }, 2000); 
  // end the game after 5s after revealing the answer
  setTimeout(() => {$endGame()}, 7000);     
}

// function for walkaway
const $walkAway = () => {
  // stop timer
  clearInterval(gameObject.roundTimer);
  // go to scoreboard screen
  $displayScoreboard()
}

// function to set delay to create suspense then turn the answer green
const $checkAnsAndRevealAns = (id) => {
  // play music
  $playSound(finalAnswerTheme)
  // clear timer
  clearInterval(gameObject.roundTimer);
  // disable button
  $enableOrDisableDiv(gameObject.options, "addClass", "enabled");
  $enableOrDisableDiv(gameObject.lifelinesId, "addClass", "enabled");
  $enableOrDisableDiv(["walkAwayDisplay","walkAwayText"], "addClass", "enabled");
  // reflect selected answer as orange
  $(`#${id}`).css("background-color", "#FF8326");
  // show correct answer as green after 5s
  setTimeout(() => 
  {if (id === questionsList[userProfile.Progress][userProfile.questionIndex].key) {
    $playSound(correctTheme)
  } else {
    $playSound(wrongTheme)
  }
  $(`#${questionsList[userProfile.Progress][userProfile.questionIndex].key}`).css("background-color", "#37CD3B")
  }, 5000);
  // proceed with the game
  setTimeout(() => {
    if (userProfile.Progress + 1 === gameObject.prizeLadder.length && 
      id === questionsList[userProfile.Progress][userProfile.questionIndex].key) {
      updateRoundScore();
      $endGame();
      // normal round
    } else if (id === questionsList[userProfile.Progress][userProfile.questionIndex].key) {
      updateRoundScore();
      $continueGame();
    } else {
      // wrong answer
      $endGame();
    }
  },10000)
};

// function to update the user's score
const updateRoundScore = () => {
  // Update progress
  userProfile.Progress += 1;
  userProfile.score = gameObject.prizeLadder[userProfile.Progress - 1];
};

const $continueGame = () => {
  // Hide the question div
  $(".qn").remove();
  $(".opt").remove();
  $displayPrizeLadder();
  setTimeout(() => {$displayQuestion(userProfile.Progress);}, 3000);
};

const $endGame = () => {
  // update final score per safe heaven
  if (gameObject.prizeLadder.indexOf(userProfile.score) === gameObject.prizeLadder.indexOf("$1,000,000")) {
    userProfile.score = "$1,000,000";
  } else if (gameObject.prizeLadder.indexOf(userProfile.score) >= gameObject.prizeLadder.indexOf("$32,000")) {
    userProfile.score = "$32,000";
  } else if (gameObject.prizeLadder.indexOf(userProfile.score) < gameObject.prizeLadder.indexOf("$32,000") && 
  gameObject.prizeLadder.indexOf(userProfile.score) >= gameObject.prizeLadder.indexOf("$1,000")) {
    userProfile.score = "$1,000";
  } else if (gameObject.prizeLadder.indexOf(userProfile.score) < gameObject.prizeLadder.indexOf("$1,000")) {
    userProfile.score = "$0";
  }
  // go to scoreboard screen
  $displayScoreboard()
};

const $restartGame = () => {
  // hide the final score screen
  $(".scoreboard").remove();
  $(".reset").remove();
  $(".menu-container").remove()
  // reset the game
  userProfile.Progress = 0,
  userProfile.score = 0,
  userProfile.lifelines = [1, 1, 1],
  // clear modal
  $clearModal()
  // show the menu
  $(".startmenu").show();
  $("#logo").show()
};

// document ready!
$(() => {
  $modalWelcome()
  $(".menu").eq(0).on("click", $startGame);
  $(".menu").eq(1).on("click", $displayRules);
  $(".menu").eq(2).on("click", $displayScoreboard);
});
