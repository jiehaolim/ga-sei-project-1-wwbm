// Import CSS, jQuery, question list 
import "./style.css";
import $ from "jquery";
import questionsList from "./questions";

// Import images, SVG for Vercel
import moneybagSvg from "./img/game/money-bag.svg";
import timerSvg from "./img/game/timer.svg";
import audienceImg from "./img/game/audience.png";
import friendImg from "./img/game/friend.png";
import fiftyfiftyImg from "./img/game/50-50.png";

// Import sound clips for Vercel
import mainTheme from "./sound/01-Main-Theme-Cut.mp3";
import fullMainTheme from "./sound/01-Main-Theme-Org.mp3";
import rulesTheme from "./sound/03-Explain-The-Rules-Cut.mp3";
import prizeTheme from "./sound/10-Let's-Play-Prize.mp3";
import questionTheme from "./sound/11-$100-$1,000-Questions.mp3";
import finalAnswerTheme from "./sound/15-$2,000-Final Answer-Cut.mp3"
import correctTheme from "./sound/17-$2,000-Win.mp3";
import wrongTheme from "./sound/16-$2,000-Lose.mp3";
import timeUpTheme from "./sound/72-Time's-Up.mp3";
import askAudienceTheme from "./sound/68-Ask-The-Audience-Cut.mp3";
import phoneAFriendTheme from "./sound/66-Phone-A-Friend-Cut.mp3";
import fiftyFiftyTheme from "./sound/67-50-50-Cut.mp3";

// Game and user objects
// Game object
// Lifelines picture - https://imgur.com/sQvoOhJ
const gameObject = {
  prizeLadder: ["$100","$200","$300","$500","$1,000",
  "$2,000","$4,000","$8,000","$16,000","$32,000",
  "$64,000","$125,000","$250,000","$500,000","$1,000,000"],
  options: ["A", "B", "C", "D"],
  time: 25,
  roundTimer: null,
  display: { moneybag: moneybagSvg, timer: timerSvg },
  lifelinesImg: [audienceImg, friendImg, fiftyfiftyImg],
  lifelinesId: ["audience", "friend", "fifty-fifty"],
  friend: ["Dad","Mum","Brother","Sister","Girlfriend",
  "Boyfriend","Tom","Dick","Harry","Lucas"],
  friendResponse: ["I think it is","I read it on the internet, it is",
  "I read this on the newspaper yesterday, it is","I know this one. It is","I am guessing it is"],
};

// User profile
// Reset at end of game
const userProfile = {
  // Correspond to the game object lifelines Id - 1st Audience, 2nd Phone a Friend, 3rd 50:50
  lifelines: [1, 1, 1],
  // Reset at the beginning of each round
  questionIndex: null,
  currentOptions: ["A", "B", "C", "D"],
  // Update after question is answered 
  Progress: 0,
  score: null,
};

// General functions to shorten the code
// Function to create html element
const $generateHTMLElement = (htmlElement, numOfDiv, attrName, attrValue, parent, appendOrPrepend) => {
  for (let i = 1; i <= numOfDiv; i++) {
    const $htmlElement = $(`<${htmlElement}>`).attr(attrName, attrValue);
    $(parent)[appendOrPrepend]($htmlElement);
  }
};

// Function to enable or disable buttons for an array of buttons
const $disableDiv = (arrayOfButtonsId) => {
  for (const element of arrayOfButtonsId) {
    $(`#${element}`).addClass("disabled-div");
  }
};

const $hideMenuAndQuestionScreen = () => {
  // Hide the menu screen
  $(".startmenu").hide();
  $(".logo").hide();
  // Hide the question screen
  $(".timerbank").remove();
  $(".lifeline").remove();
  $(".qn").remove();
  $(".opt").remove();
}

// Function to create ok button in modal
const $okButtonModal = () => {
  $generateHTMLElement("div", 1, "class", "okbutton container", ".modal-body", "append");
  $generateHTMLElement("div", 1, "class", "ok button", ".okbutton", "append");
  $(".ok").text("ok").on("click", () => {$(".modal").css("display", "none")})
}

// Function to create yes no button in modal
const $yesNoButtonModal = () => {
  $generateHTMLElement("div", 1, "class", "yesnobutton container", ".modalresponse", "append");
  $generateHTMLElement("div", 2, "class", "yesno button", ".yesnobutton", "append");
}

// Function to clear modal
const $clearModal = () => {
  // Clear modal text
  $(".modalheader").text("").removeClass("rainbow");
  $(".modalresponse").text("");
  // Remove divs in modal
  $("#myChart").remove();
  $(".yesnobutton").remove();
  $(".okbutton").remove();
  // Remove event listener from modal
  $(".modal").off();
}

// Function to disable event listener on question screen
const $disableButton = () => {
  $disableDiv(gameObject.options);
  $disableDiv(gameObject.lifelinesId);
  $disableDiv(["walkAwayDisplay","walkAwayText"]);
}

// Function to play sound effect
const $playSound = (theme) => {
  $("#music").attr("src", theme)
  $("#music").get(0).play()
}

// Game function
// Game display function
// Display rules
const $displayRules = () => {
  // Play music
  $playSound(rulesTheme)
  // Hide the menu screen
  $(".logo").hide();
  $(".startmenu").hide();
  // Create the main divs for rules
  $generateHTMLElement("div", 1, "class", "rules container", "#overall-body-container", "append");
  $generateHTMLElement("div", 11, "class", "details", ".rules", "append");
  // Insert text for the rules header, introduction and create a sub div for timer explanation
  $(".details").eq(0).addClass("header").text("Rules of the Game");
  $(".details").eq(1).addClass("body").text(`Who wants to be a Millionaire ("WWBM") is based on the international television game show franchise of British origin created by David Briggs, Mike Whitehill and Steven Knight. The contestant will have to answer 15 questions with three lifelines to stand a chance to win a million dollars.`);
  $(".details").eq(2).addClass("timers-container")
  // Create sub divs for timer svg, header and explanation
  $generateHTMLElement("div", 1, "class", "timer-container", ".timers-container", "append");
  $generateHTMLElement("div", 1, "class", "timersvgicon", ".timer-container", "append");
  $generateHTMLElement("img", 1, "class", "timersvgimg", ".timersvgicon", "append");
  $generateHTMLElement("div", 1, "class", "timersvglabel", ".timersvgicon", "append");
  $generateHTMLElement("div", 1, "class", "timerexplainer body", ".timer-container", "append");
  // Insert timer svg, text for timer header and explanation
  $(".timersvgimg").attr("src", gameObject.display.timer)
  $(".timersvglabel").text("Timer");
  $(".timerexplainer").text("Each question needs to be answered in the duration of 25 seconds.")
  // Insert text for the safe haven header, explanation and create a sub div for walkaway explainer
  $(".details").eq(3).addClass("header").text("Safe Havens");
  $(".details").eq(4).addClass("body").text("There are two ‘safe havens’ in the question structure (Q5 - $1,000 and Q10 - $32,000). Before reaching the first safe haven on question 5, the contestant will lose all their winnings when giving an incorrect answer. Upon reaching any safe haven, the contestant will be able to retain their winnings at the amount of the last safe haven when giving an incorrect answer.");
  $(".details").eq(5).addClass("walkaways-container")
  // Create sub divs for walkaway svg, header and explanation
  $generateHTMLElement("div", 1, "class", "walkaway-container", ".walkaways-container", "append");
  $generateHTMLElement("div", 1, "class", "walkawaysvgicon", ".walkaway-container", "append");
  $generateHTMLElement("img", 1, "class", "walkawaysvgimg", ".walkawaysvgicon", "append");
  $generateHTMLElement("div", 1, "class", "walkawaysvglabel", ".walkawaysvgicon", "append");
  $generateHTMLElement("div", 1, "class", "walkawayexplainer body", ".walkaway-container", "append");  
  // Insert winnings svg, text for winnings header and explanation
  $(".walkawaysvgimg").attr("src", gameObject.display.moneybag)
  $(".walkawaysvglabel").text("Winnings");
  $(".walkawayexplainer").text("The contestant will also be able to choose to walk away with any existing winnings instead of answering the current question.")
  // Insert text for the lifelines header, explanation and create a sub div for lifelines explanation
  $(".details").eq(6).addClass("header").text("Lifelines");
  $(".details").eq(7).addClass("body").text("The contestant has access to three lifelines which each can be used only once per game. More than one lifeline can be used on a single question. The three lifelines are as follows:");
  $(".details").eq(8).addClass("lifelines-container");
  // Create sub divs for lifeline items
  $generateHTMLElement("div", 3, "class", "lifeline-container", ".lifelines-container", "append");
  $generateHTMLElement("div", 1, "class", "lifelineicon", ".lifeline-container", "append");
  $generateHTMLElement("img", 1, "class", "iconimg", ".lifelineicon", "append");
  $generateHTMLElement("div", 1, "class", "iconlabel", ".lifelineicon", "append");
  $generateHTMLElement("div", 1, "class", "lifelineexplainer body", ".lifeline-container", "append");
  // Insert lifeline images, text for lifelines header and explanation
  for (let i = 0; i < gameObject.lifelinesId.length; i++) {
    $(".iconimg").eq(i).attr("src", gameObject.lifelinesImg[i]);
  }
  $(".iconlabel").eq(0).text("Ask the audience");
  $(".lifelineexplainer").eq(0).text("A poll will be conducted with the audience and the results will be shown in a chart. The answer provided will have an accuracy of 90%.");
  $(".iconlabel").eq(1).text("Phone a friend");
  $(".lifelineexplainer").eq(1).text("Contestant will be allowed to randomly phone a friend or family member and ask for the answer to the question. The answer provided will have an accuracy of 70%.");
  $(".iconlabel").eq(2).text("Fifty fifty");
  $(".lifelineexplainer").eq(2).text("This eliminates two incorrect answers from the four answers.");
  // Insert copyright header and text
  $(".details").eq(9).addClass("header").text("Copyrights");
  $(".details").eq(10).addClass("body").text("All rights belong directly to their rightful owners. No copyright infringement intended.");
  // Create sub div for back to menu button, text and event listener
  $generateHTMLElement("div", 1, "class", "back", ".rules", "append");
  $(".back").text("Menu");
  $(".back").on("click", $displayMenu);
};

// Back to Menu
const $displayMenu = () => {
  // Play music
  $playSound(mainTheme)
  // Hide rules screen
  $(".rules").remove();
  // Hide the final score screen
  $(".scoreboard").remove();
  $(".reset").remove();
  $(".menu-container").remove()
  // Reset the game
  userProfile.Progress = 0,
  userProfile.score = null,
  userProfile.lifelines = [1, 1, 1],
  // Clear modal and show the menu
  $clearModal()
  $(".startmenu").show();
  $(".logo").show();
};

// Display the prize ladder
const $displayPrizeLadder = () => {
  // Play music
  $playSound(prizeTheme)
  // Hide the WWBM header
  $("#header").hide();
  // Hide the menu and question screen
  $hideMenuAndQuestionScreen()
  // Create divs for the prize ladder
  $generateHTMLElement("div", 1, "class", "ladder container", "#overall-footer-container", "append");
  $generateHTMLElement("div", 15, "class", "prize", ".ladder", "append");
  // Insert prize ladder text into divs
  for (let i = 0; i < gameObject.prizeLadder.length; i++) {
    let prizeNum = gameObject.prizeLadder.length - 1 - i;
    let prizeQuestionIndex = gameObject.prizeLadder.length - i;
    $(".prize").eq(i).text(`Q${[prizeQuestionIndex]} - ${gameObject.prizeLadder[prizeNum]}`);
  }
  // Add CSS effect to reflect the current level
  let prizeQuestionIndex = gameObject.prizeLadder.length - userProfile.Progress - 1;
  $(".prize").eq(prizeQuestionIndex).css("background-color", "#FF8326").addClass("blink");
};

// Display question
const $displayQuestion = (index) => {
  // Play music
  $playSound(questionTheme)
  // Hide the prize ladder screen
  $("#header").show();
  $(".ladder").remove();
  $(".logo").show();
  // Create divs for timer and winnings value
  $generateHTMLElement("div", 1, "class", "timerbank container", "#overall-body-container", "prepend");
  $generateHTMLElement("div", 2, "class", "displaytimebank container", ".timerbank", "append");
  $generateHTMLElement("img", 1, "class", "display", ".displaytimebank", "append");
  $generateHTMLElement("div", 1, "class", "text", ".displaytimebank", "append");
  // Create divs for three lifelines
  $generateHTMLElement("div", 1, "class", "lifeline container", "#overall-body-container", "append");
  $generateHTMLElement("img", 3, "class", "lifelineimg", ".lifeline", "append");
  // Create divs for question and options
  $generateHTMLElement("div", 1, "class", "qn container", "#overall-footer-container", "append");
  $generateHTMLElement("div", 1, "id", "question", ".qn", "append");
  $generateHTMLElement("div", 2, "class", "opt container", "#overall-footer-container", "append");
  $generateHTMLElement("div", 2, "class", "option", ".opt", "append");
  // Timer and winnings - Insert SVG, text and event listener
  // Reset timer
  gameObject.time = 25;
  gameObject.roundTimer = setInterval($timer, 1000);
  $(".display").eq(0).attr("src", `${gameObject.display.timer}`)
  $("text").eq(0).text(`${gameObject.time}`);
  // Winnings SVG to appear after question 1 when there are winnings
  if (userProfile.score === null) {
    $(".displaytimebank").eq(1).remove()
  } else {
    $(".display").eq(1).attr("src", `${gameObject.display.moneybag}`).on("click", $modalWalkAway).attr("id", "walkAwayDisplay")
    $(".text").eq(1).text(`${userProfile.score}`).css("color", "#37CD3B").on("click", $modalWalkAway).attr("id", "walkAwayText")
  }
  // Lifelines - Insert image and event listener
  for (let i = 0; i < gameObject.lifelinesId.length; i++) {
    $(".lifelineimg").eq(i).attr("src", gameObject.lifelinesImg[i]).attr("id", gameObject.lifelinesId[i]);
  }
  // Disabled lifelines that are used up
  for (let i = 0; i < userProfile.lifelines.length; i++) {
    if (userProfile.lifelines[i] === 0)
      $(".lifelineimg").eq(i).attr("src", gameObject.lifelinesImg[i]).attr("id", gameObject.lifelinesId[i])
        .css("opacity", "0.3").addClass("disabled-div");
  }
  $(".lifelineimg").eq(0).on("click", $audienceLifeline);
  $(".lifelineimg").eq(1).on("click", $friendLifeline);
  $(".lifelineimg").eq(2).on("click", $fiftyfiftyLifeline);
  // Question and options - Insert text and event listener
  // Reset options for users
  userProfile.currentOptions = gameObject.options;
  // Generate a random index for the question in each level
  userProfile.questionIndex = Math.floor(Math.random() * questionsList[index].length);
  $("#question").text(`${questionsList[index][userProfile.questionIndex].question}`);
  for (let i = 0; i < gameObject.options.length; i++) {
    let objKey = "option" + gameObject.options[i];
    $(".option").eq(i).attr("id", gameObject.options[i]);
    $(".option").eq(i).text(`${gameObject.options[i]}. ${questionsList[index][userProfile.questionIndex][objKey]}`);
  }
  $(".option").on("click", () => $modalFinalAnswer($(event.currentTarget).attr("id")));
};

// Display scoreboard
const $displayScoreboard = () => {
  // Play music
  $playSound(fullMainTheme)
  // Hide the menu and question screen
  $hideMenuAndQuestionScreen()
  // Local storage for high score - store high score array index instead of actual score, lesser data manipulation
  // Create high score array index if it does not exist in local storage, else retrieve it from local storage
  let wwbmScore = null
  if (localStorage.getItem("wwbmscore") === null) {
    wwbmScore = []
  } else if (localStorage.getItem("wwbmscore") !== null) {
    wwbmScore = JSON.parse(localStorage.getItem("wwbmscore"))
  }
  // Push the score index to the array if current score is not default
  if (userProfile.score !== null) {
    wwbmScore.push(gameObject.prizeLadder.indexOf(userProfile.score))
    wwbmScore.sort(function(a, b) { return b - a})
    // Limit the array to top 5 scores
    if (wwbmScore.length > 5) {
      wwbmScore.pop()
    }
    // Set high score into local storage
    localStorage.setItem("wwbmscore", JSON.stringify(wwbmScore))
  }
  // Create the final score board - current score and high score board
  // Current score - create div and insert text
  $generateHTMLElement("div", 1, "class", "scoreboard container", "#overall-footer-container", "append");
  if (userProfile.score !== null) {
    $generateHTMLElement("div", 1, "class", "currentscore", ".scoreboard", "append");
    $(".currentscore").text(`Current Score: ${userProfile.score}`);  
  }
  // High score board Header - create div and insert text
  $generateHTMLElement("div", 1, "class", "scoreheader", ".scoreboard", "append");
  if (wwbmScore.length === 0) {
    $(".scoreheader").text(`No High Score`);
  } else {
    $(".scoreheader").text(`High Score Board`);
  }
  // High score board details - create div and insert text
  $generateHTMLElement("div", wwbmScore.length, "class", "scoredetails", ".scoreboard", "append");
  // To highlight current score in green when it appears in high score board after game ended
  // No highlight of current score when viewing from main menu
  if (userProfile.score === null) {
    for (let i = 0; i < wwbmScore.length; i++) {
      // $0 is not in the prizeladder
      if (gameObject.prizeLadder[wwbmScore[i]] === undefined) {
        $(".scoredetails").eq(i).text(`${i + 1}. $0`)
      } else {
        $(".scoredetails").eq(i).text(`${i + 1}. ${gameObject.prizeLadder[wwbmScore[i]]}`)
      }
    }
  } else {
    // Highlight of current score if it appears on High score board after game ends
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
  // Create sub div for back to menu button, text and event listener
  $generateHTMLElement("div", 1, "class", "menu-container", ".scoreboard", "append");
  $generateHTMLElement("div", 1, "class", "button", ".menu-container", "append");
  $(".button").eq(0).text("Menu");
  $(".button").eq(0).on("click", $displayMenu);
}

// Game question screen event listeners
// Display modal for welcome screen, to tell user game is better with sound and trigger music
const $modalWelcome = () => {
  // Turn on and clear modal
  $(".modal").css("display", "block");
  $clearModal()
  // Insert header, response text and ok button
  $(".modalheader").text("Welcome to Who wants to be a Millionaire!");
  $(".modalresponse").text("Please turn on the volume for better game experience.");
  $okButtonModal()
  // Turn off modal and play music
  $(".modal").on("click", () => {$(".modal").css("display", "none");
  $playSound(mainTheme)})
}

// Timer
// Function to run and stop the round timer
const $timer = () => {
  if (gameObject.time > 5) {
    // Orange font for timer when > 5s
    $(".text").eq(0).css("color", "#FF8326").text(`${gameObject.time}`);
    gameObject.time--;
  } else if (gameObject.time > -1) {
    // Red font for timer when < 5s
    $(".text").eq(0).css("color", "red").text(`${gameObject.time}`);
    gameObject.time--;
  } else if (gameObject.time === -1) {
    gameObject.time = -2;
    $modalTimesUp()
  }
};

// Display modal when time is up
const $modalTimesUp = () => {
  // Play music
  $playSound(timeUpTheme)
  // Turn on and clear modal
  $(".modal").css("display", "block");
  $clearModal()
  // Insert header text and ok button
  $(".modalheader").text("Time's up!");
  $okButtonModal()
  // Turn off modal and reveal answer
  $(".modal").on("click", () => {$(".modal").css("display", "none");
  $timesUpRevealAns()})
}

// Walk away
// Display modal for walk away
const $modalWalkAway = () => {
  // Turn on and clear modal
  $(".modal").css("display", "block");
  $clearModal()
  // Insert header and reponse text and yes no button
  $(".modalheader").text(`Walk away with ${userProfile.score}?`);
  $yesNoButtonModal()
  $(".yesno").eq(0).text("Yes").on("click", $walkAway)
  $(".yesno").eq(1).text("No").on("click", () => {$(".modal").css("display", "none");});
  // Turn off modal
  $(".modal").on("click", () => {$(".modal").css("display", "none");});
}

// Lifelines 
// Function for audience lifeline
const $audienceLifeline = () => {
  // Play additional sound effect
  $("#music2").attr("src", askAudienceTheme)
  $("#music2").get(0).play()
  // Turn on and clear modal
  $(".modal").css("display", "block");
  $clearModal()
  // Insert header text
  $(".modalheader").text("Audience");
  // Create the canvas html element in response text
  $generateHTMLElement("canvas", 1, "id", "myChart", ".modalresponse", "append");
  // Random generate percentages
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
  // Take out the highest percent to insert into the correct answer index
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
  // Insert ok button
  $okButtonModal()
  // Turn off modal
  $(".modal").on("click", () => 
  {$("#music2").get(0).pause();
  $(".modal").css("display", "none");});
  // Disable the audience life line and update user profile
  $("#audience").css("opacity", "0.3").addClass("disabled-div");
  userProfile.lifelines[0] = 0;
};

// Function for friend lifeline
const $friendLifeline = () => {
  // Play additional sound effect
  $("#music2").attr("src", phoneAFriendTheme)
  $("#music2").get(0).play()
  // Turn on and clear modal
  $(".modal").css("display", "block");
  $clearModal()
  // Insert header and response text and ok button
  // Insert random friend into modal header
  let randomIndex = Math.floor(Math.random() * gameObject.friend.length);
  $(".modalheader").text(gameObject.friend[randomIndex]);
  // Generate 70% chance of getting getting the right answer
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
  // Insert random response into modal body
  let randomIndex3 = Math.floor(Math.random() * gameObject.friendResponse.length);
  $(".modalresponse").text(`${gameObject.friendResponse[randomIndex3]} ${friendAnswer}.`);
  // Insert ok button
  $okButtonModal()
  // Turn off modal
  $(".modal").on("click", () => {
    $("#music2").get(0).pause()
    $(".modal").css("display", "none");});
  // Disable the friend life lines and update user profile
  $("#friend").css("opacity", "0.3").addClass("disabled-div");
  userProfile.lifelines[1] = 0;
};

// Function for 50-50 lifeline
const $fiftyfiftyLifeline = () => {
  // Play additional sound effect
  $("#music2").attr("src", fiftyFiftyTheme)
  $("#music2").get(0).play()
  // Create an array that does not contains the answer
  const wrongAnswer = userProfile.currentOptions.filter((element) => 
  element !== questionsList[userProfile.Progress][userProfile.questionIndex].key);
  // To randomly generate 2 different wrong answers to be eliminated
  const answerToBeEliminated = [];
  while (answerToBeEliminated.length < 2) {
    let randomIndex = Math.floor(Math.random() * wrongAnswer.length);
    // Only pushes the random index if it does not exist
    if (answerToBeEliminated.indexOf(wrongAnswer[randomIndex]) === -1) {
      answerToBeEliminated.push(wrongAnswer[randomIndex]);
    }
  }
  // Remove the text of the 2 eliminated options
  for (const element of answerToBeEliminated) {
    $(`#${element}`).text("");
  }
  // Update the remaining options available incase other lifelines are utilized
  userProfile.currentOptions = userProfile.currentOptions.filter((element) => 
  answerToBeEliminated.includes(element) === false);
  // Disable the 2 options eliminated options button
  $disableDiv(answerToBeEliminated);
  // Remove the fifty fifty life lines and update user profile
  $("#fifty-fifty").css("opacity", "0.3").addClass("disabled-div");
  userProfile.lifelines[2] = 0;
};

// Answering the question
// Display modal for final answer
const $modalFinalAnswer = (id) => {
  // Turn on and clear modal
  $(".modal").css("display", "block");
  $clearModal()
  // Insert header text and yes no button
  $(".modalheader").text("Final answer?");
  $yesNoButtonModal()
  $(".yesno").eq(0).text("Yes").on("click", () => {$checkAnsAndRevealAns(id)})
  $(".yesno").eq(1).text("No").on("click", () => {$(".modal").css("display", "none");});
  // Turn off modal
  $(".modal").on("click", () => {$(".modal").css("display", "none")});
}

// Game over modal
const $modalGameOver = () => {
  // Turn on and clear modal
  $(".modal").css("display", "block");
  $clearModal()
  // Insert header text and ok button
  $(".modalheader").text("Game Over");
  $okButtonModal()
  // Turn off modal and go to score board
  $(".modal").on("click", () => {$(".modal").css("display", "none");
  $displayScoreboard()});
}

// Million dollars modal
const $modalMillionDollars = () => {
  // Play music
  $playSound(mainTheme)
  // Turn on and clear modal
  $(".modal").css("display", "block");
  $clearModal()
  // Insert header text and ok button
  $(".modalheader").addClass("rainbow").text("Congrations! You won a million dollars!");
  $okButtonModal()
  // Turn off modal and go to score board
  $(".modal").on("click", () => {$(".modal").css("display", "none");
  $displayScoreboard()});
}

// Game updating function
// Main game function
const $startGame = () => {
  $displayPrizeLadder();
  setTimeout(() => {$displayQuestion(userProfile.Progress);}, 3000);
};

// Function to reveal answer after time is up
const $timesUpRevealAns = () => {
  // Clear timer and disable button
  clearInterval(gameObject.roundTimer);
  $disableButton()
  // Show correct answer as green after 2s
  setTimeout(() => 
  {$playSound(wrongTheme); 
  $(`#${questionsList[userProfile.Progress][userProfile.questionIndex].key}`).css("background-color", "#37CD3B")
  }, 2000); 
  // End the game after 5s after revealing the answer
  setTimeout(() => {$endGame()}, 7000);     
}

// Function for walkaway
const $walkAway = () => {
  // Clear timer and disable button
  clearInterval(gameObject.roundTimer);
  // Show correct answer as green after 2s
  setTimeout(() => 
  {$playSound(wrongTheme); 
  $(`#${questionsList[userProfile.Progress][userProfile.questionIndex].key}`).css("background-color", "#37CD3B")
  }, 2000); 
  // Go to scoreboard screen after 5s after revealing the answer
  setTimeout(() => {$modalGameOver()}, 7000);   
}

// Function to set delay to create suspense then turn the answer green
const $checkAnsAndRevealAns = (id) => {
  // Play music, clear timer and disable button
  $playSound(finalAnswerTheme)
  clearInterval(gameObject.roundTimer);
  $disableButton()
  // Reflect selected answer as orange
  $(`#${id}`).css("background-color", "#FF8326");
  // Show correct answer as green after 5s and play the correct/wrong answer theme accordingly
  setTimeout(() => 
  {if (id === questionsList[userProfile.Progress][userProfile.questionIndex].key) {
    $playSound(correctTheme)
  } else {
    $playSound(wrongTheme)
  }
  $(`#${questionsList[userProfile.Progress][userProfile.questionIndex].key}`).css("background-color", "#37CD3B")
  }, 5000);
  // Proceed with the game after 5s
  setTimeout(() => {
    // Last question
    if (userProfile.Progress + 1 === gameObject.prizeLadder.length && 
      id === questionsList[userProfile.Progress][userProfile.questionIndex].key) {
      updateRoundScore();
      $modalMillionDollars();
      // Normal round
    } else if (id === questionsList[userProfile.Progress][userProfile.questionIndex].key) {
      updateRoundScore();
      $continueGame();
    } else {
      // Wrong answer
      $endGame();
    }
  },10000)
};

// Function to update the user's score
const updateRoundScore = () => {
  // Update progress
  userProfile.Progress += 1;
  userProfile.score = gameObject.prizeLadder[userProfile.Progress - 1];
};

// Function to continue game
const $continueGame = () => {
  $displayPrizeLadder();
  setTimeout(() => {$displayQuestion(userProfile.Progress);}, 3000);
};

// Function to end game
const $endGame = () => {
  // Update final score per safe heaven
  if (gameObject.prizeLadder.indexOf(userProfile.score) >= gameObject.prizeLadder.indexOf("$32,000")) {
    userProfile.score = "$32,000";
  } else if (gameObject.prizeLadder.indexOf(userProfile.score) < gameObject.prizeLadder.indexOf("$32,000") && 
  gameObject.prizeLadder.indexOf(userProfile.score) >= gameObject.prizeLadder.indexOf("$1,000")) {
    userProfile.score = "$1,000";
  } else if (gameObject.prizeLadder.indexOf(userProfile.score) < gameObject.prizeLadder.indexOf("$1,000")) {
    userProfile.score = "$0";
  }
  // Go to scoreboard screen
  $modalGameOver()
};

// document ready!
$(() => {
  $modalWelcome()
  $(".menu").eq(0).on("click", $startGame);
  $(".menu").eq(1).on("click", $displayRules);
  $(".menu").eq(2).on("click", $displayScoreboard);
});
