//calls the DOM elements to be manipulated during the code quiz
var timeEl = document.querySelector(".time");
var contain = document.querySelector(".container");
var highScore = document.querySelector(".highscore");
var remove = document.querySelector(".removal");

//initializes all the questions for the code
var q1 = {
    question: "1) Commonly used data types DO NOT Include:",
    button1: "Strings",
    button2: "Booleans",
    button3: "Alerts",
    button4: "Numbers",
    answer: "button3"
};

var q2 = {
    question: "2) The condition in an if/else statement is enclosed within ______.",
    button1: "Quotes",
    button2: "Curly Brackets",
    button3: "Parentheses",
    button4: "Square Brackets",
    answer: "button3"
};

var q3 = {
    question: "3) Arrays in Javascript can be used to store ______.",
    button1: "Numbers and Strings",
    button2: "Booleans",
    button3: "Other Arrays",
    button4: "All of the Above",
    answer: "button4"
};

var q4 = {
    question: "4) String values must be enclosed within ______ when being assigned to variables.",
    button1: "Quotes",
    button2: "Curly Brackets",
    button3: "Commas",
    button4: "Parentheses",
    answer: "button1"
};

var q5 = {
    question: "5) A very useful tool during development and debugging for printing content to the debugger is:",
    button1: "Javascript",
    button2: "Console.log",
    button3: "For Loops",
    button4: "Terminal/Bash",
    answer: "button2"
};

var q6 = {
    question: "6) The correct way to select a div element with an ID of Basic using JQuery is:",
    button1: "$(\"div\")",
    button2: "$(.Basic)",
    button3: "$(#Basic)",
    button4: "$(\"#Basic\")",
    answer: "button4"
};

var q7 = {
    question: "7) What is the notation to create a span element in the DOM?",
    button1: "$(\"<span>\")",
    button2: "$(span)",
    button3: "$(\"span\")",
    button4: ".createElement(\"span\")",
    answer: "button4"
};

var q8 = {
    question: "8) Which of the following is the correct way to declare a for loop?",
    button1: "for (index = 0; index < 10; index++)",
    button2: "for (index = 0, index < 10, index++)",
    button3: "for (index < 10; index = 0; index++)",
    button4: "for (index++; index < 10; index = 0)",
    answer: "button1"
};

var q9 = {
    question: "9) How would you set the variable, start, equal to the ID, starter, from a html file?",
    button1: "var start = document.getElementById(\"starter\")",
    button2: "var start = document.querySelector(\"#starter\")",
    button3: "Both 1) and 2)",
    button4: "None of the above",
    answer: "button3"
};

var q10 = {
    question: "10) What method do you need to call to store and object in Local Storage?",
    button1: ".parse()",
    button2: ".stringify()",
    button3: ".condense()",
    button4: ".push()",
    answer: "button2"
};

//initializes the variable necessary to run the quiz and keep track of user info
//needs to be updated to use local storage instead of an array 
var index = 0;
var questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];
var secondsLeft = 60;
var timerInterval;
var finalInterval;
var userAnswer;
var userScore = 0;
var correct;
var start = false;
var highScores = [];

//sets the time interval for the quiz once it is started
function setTime() {
    timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = "Time: " + secondsLeft;
  
      if(secondsLeft == 0) {
        clearInterval(timerInterval);
        timeEl.textContent = " ";
        storeHighScore();
      }

      if (secondsLeft <= 0){
        clearInterval(timerInterval);
        timeEl.textContent = " ";
        storeHighScore();
      }
  
    }, 1000);
  }

  //runs the mainpage to explain the quiz and penalties for wrong answers
  function displayMainPage(){
    while (contain.firstChild) {
        contain.removeChild(contain.firstChild);
    }
    var head = document.createElement("h2");
    var text = document.createElement("p");
    var but = document.createElement("button");
    head.textContent = "Coding Quiz Challenge";
    text.textContent = "Try to answer the following code related questions within the time limit. Keep in mind that incorrect answers will penalize your time by 10 seconds.";
    but.className = "button submit";
    but.textContent = "Start Quiz";
    
    contain.appendChild(head);
    contain.appendChild(text);
    contain.appendChild(but);

    var submit = document.querySelector(".submit");
    submit.addEventListener("click", function(){
        displayQuestionsPage()
        setTime();
    });
    

  }

//Displays the questions page by removing all the elements of the main container
//Only runs after the start quiz button is pushed
function displayQuestionsPage(){
    while (contain.firstChild) {
        contain.removeChild(contain.firstChild);
    }
    
    if (index != 10){
        var head = document.createElement("h2");
        var text = document.createElement("p");
        var div = document.createElement("div");
        var but1 = document.createElement("button");
        var but2 = document.createElement("button");
        var but3 = document.createElement("button");
        var but4 = document.createElement("button");
        var disp = document.createElement("div");
        var answer = questions[index].answer;
        head.textContent = questions[index].question;
        but1.textContent = "1) " + questions[index].button1;
        but2.textContent = "2) " + questions[index].button2;
        but3.textContent = "3) " + questions[index].button3;
        but4.textContent = "4) " + questions[index].button4;
        contain.setAttribute("style", "text-align: left");
        but1.className = "button";
        but2.className = "button";
        but3.className = "button";
        but4.className = "button";
        div.className = "btn-group-vertical";
    
        div.appendChild(but1);
        div.appendChild(but2);
        div.appendChild(but3);
        div.appendChild(but4);
        contain.appendChild(head);
        contain.appendChild(div);

        //adds all the buttons for the answer choices for the specific question
        //run the display Right or Wrong function to have appended to the next question based on the answer to question before it.
        //reruns the displays question page to move on to the next question
        but1.addEventListener("click", function(){
            userAnswer = "button1";
            index++;
            displayRightOrWrong();
            displayQuestionsPage();
        });

        but2.addEventListener("click", function(){
            userAnswer = "button2";
            index++;
            displayRightOrWrong();
            displayQuestionsPage();
        });

        but3.addEventListener("click", function(){
           userAnswer = "button3";
           index++;
           displayRightOrWrong();
           displayQuestionsPage();
        });

        but4.addEventListener("click", function(){
            userAnswer = "button4";
            index++;
           displayRightOrWrong();
           displayQuestionsPage();
        });
    }
    
    //handles when the code when the last question has been answered and runs the storage of the last high score
    if (index == 10){
        clearInterval(timerInterval);
        storeHighScore();
    }

    //Appends the correct or wrong display after the 1st question is answered
    //It also is set to a new 1 second time interval to disappear after the next question has loaded
    if (start == true){
        if (correct == true){
            var seconds = 1;
            var line = document.createElement("hr");
            var text = document.createElement("p");
            var disp = document.createElement("div");
            text.textContent = "Correct!";
            disp.className = "removal";
            disp.appendChild(line);                
            disp.appendChild(text);
            contain.appendChild(disp);
            dispInterval = setInterval(function() {
                seconds--;

                if(seconds == 0) {
                  clearInterval(dispInterval);
                  if (contain.lastChild.className == "removal")
                    contain.removeChild(contain.lastChild);
                }
            }, 1000);
        }
        else {
            var seconds = 1;
            var line = document.createElement("hr");
            var text = document.createElement("p");
            var disp = document.createElement("div");
            text.textContent = "Wrong!";
            disp.className = "removal";
            disp.appendChild(line);                
            disp.appendChild(text);
            contain.appendChild(disp);
            dispInterval = setInterval(function() {
                seconds--;
                if(seconds == 0) {
                    clearInterval(dispInterval);
                    if (contain.lastChild.className == "removal")
                        contain.removeChild(contain.lastChild);
                }
            }, 1000);
        }
    }
}

//Compares the users choice to the answer of the question and updates the score or time
//The start variable tells the script that the first question has been answered
function displayRightOrWrong (){
    if (userAnswer == questions[index-1].answer){
        userScore += 3;
        correct = true;
        start = true;
    }
    else{
        correct = false;
        secondsLeft -= 10;
        start = true;
    }
}

//Clears the main container and opens the submit page after the quiz is taken
function storeHighScore(){
    while (contain.firstChild) {
        contain.removeChild(contain.firstChild);
    }
    var seconds = 1;
    var head = document.createElement("h2");
    var text = document.createElement("p");
    var input = document.createElement("input");
    var label = document.createElement("label");
    var btn = document.createElement("button");
    var high = document.createElement("div");
    input.setAttribute("type", "text");
    input.setAttribute("style", "margin: 0px 12px");
    label.textContent = "Enter Your Initials: ";
    btn.textContent = "Submit";
    btn.setAttribute("class", "button");
    timeEl.textContent = " ";
    head.textContent = "All Done!";
    text.textContent = "Your final score is " + userScore + ".";
    high.appendChild(label);
    high.appendChild(input);
    high.appendChild(btn);
    contain.prepend(high);
    contain.prepend(text);
    contain.prepend(head);
    
    //clears the correct or wrong display after a question is answered
    dispInterval = setInterval(function() {
        seconds--;
        if(seconds == 0) {
            clearInterval(dispInterval);
            if (contain.lastChild.className == "removal")
                contain.removeChild(contain.lastChild);
         }
     }, 1000);
    
    //Submits a user object with the values of initials and scores into the highscores array
    btn.addEventListener("click", function(){
        var user = {
            initials: input.value,
            score: userScore
        }

        //Adds the user to its correct spot in the array based on the users score
        if (highScores.length != 0){
            for (index = 0; index < highScores.length; index++){
                if (userScore >= highScores[index].score){
                    highScores.splice(index, 0, user)   
                    index = highScores.length;
                }
                if ((index == (highScores.length-1)) && (userScore <= highScores[index].score))
                    highScores.push(user);
            }
        }
        else{
            highScores.push(user);
        }

        //displays the highscores after the last user submits their info
        displayHighScores();
    });
}

//empties the main container of every element and displays the highscores page
function displayHighScores(){
    while (contain.firstChild) {
        contain.removeChild(contain.firstChild);
    }

    var head = document.createElement("h2");
    var disp = document.createElement("div");
    var btnBack = document.createElement("button");
    var btnClear = document.createElement("button");
    btnBack.textContent = "Go Back";
    btnClear.textContent = "Clear HighScores";
    btnBack.setAttribute("class", "button");
    btnClear.setAttribute("class", "button");
    head.textContent = "High Scores";

    //Updates the display element with every stored Userscore and Initial in the highscores array
    for (index = 0; index < highScores.length; index++){
        var user = document.createElement("p");
        user.textContent = (index+1) + ") " + highScores[index].initials + " - " + highScores[index].score;
        user.setAttribute ("style", "background-color: plum; margin-bottom: 12px");
        disp.appendChild(user);
    }

    //appends the elements to the highscores page 
    contain.appendChild (head);
    contain.appendChild (disp);
    contain.appendChild (btnBack);
    contain.appendChild (btnClear);

    //Adds two buttons to the Highscores page, 1) clears the scores, and 2) brings user back to main page
    btnClear.addEventListener ("click", clearHighScores);
    btnBack.addEventListener ("click", function(){
        userScore = 0;
        secondsLeft = 60;
        start = false;
        index = 0;
        displayMainPage();
    });
}

//Clears the highscores array and updates the display page
function clearHighScores(){
    highScores = [];
    displayHighScores();
}

//Run the Quiz from the Main Page
displayMainPage();

/*Opens the Highscores Display Page from the NavBar, while also setting all the variables back to their starting points, in case the quiz was currently running when the page is opened.*/
highScore.addEventListener("click", function (){
    timeEl.textContent = " ";
    userScore = 0;
    secondsLeft = 60;
    start = false;
    index = 0;
    clearInterval(timerInterval);
    displayHighScores();
});

  

  


