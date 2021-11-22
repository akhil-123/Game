var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var gameStarted = false;

var level = 0;


if (!localStorage.getItem('level')) {
  populateStorage();
}

function populateStorage() {
  localStorage.setItem('level', 0);
}

$("button").click(function() {
  if (gameStarted === false) {
    $("button").addClass("restart");
    nextSequence();
    gameStarted = true;
  }
});

$(document).keydown(function() {
  if (gameStarted === false) {
    $("button").addClass("restart");
    nextSequence();
    gameStarted = true;
  }
});


function nextSequence() {
  userClickedPattern = [];
  $("h1").text("Level " + level);
  level += 1;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

$(".btn").click(function(event) {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key Or Click On Restart Button");
    console.log("wrong");
    localStorage.setItem('level', Math.max(localStorage.getItem('level'), level));
    startOver();
    $("button").text("Restart");
    $("button").removeClass("restart");
    swal("Your high score is " + localStorage.getItem('level'));
    console.log(localStorage.getItem('level'));
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
