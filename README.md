# ![](./img/readme/ga_logo.svg) Project #1: The Game

## Technical Requirements
The game app needs to:
- Display a game in the browser
- Be interactive
- Include separate HTML / CSS / JavaScript files
- Use Javascript for DOM manipulation that is triggered by a browser event

# Who wants to be a Millionaire ("WWBM")
<img src="./img/readme/wwbm-wallpaper.jpeg"/>

This game is based on the international television game show franchise of British origin created by David Briggs, Mike Whitehill and Steven Knight. The contestant will have to answer 15 questions with three lifelines to stand a chance to win a million dollars.

## Where to Play
Play [Who Wants to be a Millionaire.](https://wwbm.vercel.app/)

## Rules
- The contestant will have to answer 15 random questions and climb up the prize ladder to win the a million dollars. A total of 150 questions have been set into the game with 10 different question type per level.
- The contestant is given 25 seconds to answer each question per round.
- There are two ‘safe havens’ in the question structure (Q5 - $1,000 and Q10 - $32,000). Before reaching the first safe haven on question 5, the contestant will lose all their winnings when giving an incorrect answer. Upon reaching any safe haven, the contestant will be able to retain their winnings at the amount of the last safe haven when giving an incorrect answer.
- The contestant will also have the choice to walk away with any existing winnings prior to answering the next question.
- The contestant is given 3 lifelines "ask the audience", "phone a friend" and "fifty fifty".
- For "ask the audience", a poll will be conducted with the audience and the results will be shown in a chart. The answer provided will have an accuracy of 90%.
- For "phone a friend", a random phone call to a friend or family member will be generated. The answer provided will have an accuracy of 70%.
- For "fifty fifty, two incorrect answers will be eliminated for the existing four answers.

## Copyrights
- All rights belong directly to their rightful owners. No copyright infringement intended.

# Code
## Technologies and Tools used
- HTML
- CSS
- Javascript
- jQuery
- Chart.js
- Git and GitHub

## Game Flow
View [flowchart at Miro.](https://miro.com/app/board/uXjVPccHgUw=/?share_link_id=161052720807)

<img src="./img/readme/wwbm-flowchart.png"/>

## HTML Structure
<img src="./img/readme/html-structure-1.png"/>
<img src="./img/readme/html-structure-2.png"/>

## CSS Properties
<img src="./img/readme/css-1.png"/>
<img src="./img/readme/css-2.png"/>

## Javascript and jQuery Code Organisation
The code is organised into the five categories as follows:
1. Objects to track game items and user's progress
2. General functions that are repeatedly used in other functions
3. Display functions to generate different screens
4. Event listener functions on game screens
5. Game flow functions to update the game progress

## Javascript and jQuery Code Structure
Most of the codes are structured in the following manner with the exception of customized code required in different screens/modals/event listeners:
<p align="left"><img src="./img/readme/js-structure-1.png"/></p>
<p align="left"><img src="./img/readme/js-structure-2.png"/></p>

## Learning and Improvement Points
1. Learned and discovered that general functions can be written to shorten code. For example, the $generateHTMLElement function allows me to generate HTML element more efficiently instead of coding jQuery line by line.
<p align="left"><img src="./img/readme/generalhtmlelement.png"/></p>

2. Learned how to use local storage to store high scores.
<p align="left"><img src="./img/readme/local-storage.png"/></p>

3. CSS class and id naming convention can be confusing. This causes time to be wasted when coding and can be improved with better planning.
4. Current app is mostly responsive to other screen size, but it can be even more responsive since some of the CSS properties are in px instead of em/rem.
5. Game can be improved by implementing more game settings, e.g. adjust timer per round or adjust difficulty of the questions.
6. Game can have more CSS animation to make the game even more "alive".

## References and Inspirations
- [W3Schools for the modal](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal2)
- [Codegrepper for the blinking CSS effect](https://www.codegrepper.com/code-examples/css/how+to+make+a+box+blink+in+css)
- [Code Boxx for rainbow CSS effect](https://code-boxx.com/create-rainbow-text-pure-css-js/)
- [Deviant Art for the WWBM logo](https://www.deviantart.com/zackthetimelordrblx/art/Who-Wants-To-Be-a-Millionaire-UK-2018-logo-remake-762595559)
- [Imgur for lifelines icons picture](https://imgur.com/sQvoOhJ)
- [Khinsider for the WWBM soundtrack](https://downloads.khinsider.com/game-soundtracks/album/who-wants-to-be-a-millionaire-the-album)
- [TheGuardian.com for trial question list](https://www.theguardian.com/tv-and-radio/ng-interactive/2020/sep/12/who-wants-to-be-a-millionaire-jackpot-questions-quiz-yourself)
- [The Trivia API for the list of questions](https://the-trivia-api.com/search/)