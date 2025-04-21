var multiChoices = [
  {
    question:
      "<h4 class = 'text-left'>The viola is a member of which family of musical instruments?</h4><ol class = 'text-left'><li>Brass</li><li>String</li><li>Woodwinds</li></ol>",
    answer: "2",
  },
  {
    question:
      "<h4 class = 'text-left'>The size of a viola, compared to a violin is usually a bit:</h4><ol class = 'text-left'><li>Larger</li><li>Smaller</li><li>Just the same</li></ol>",
    answer: "1",
  },
  {
    question:
      "<h4 class = 'text-left'>Compared to a violin, the 4 strings of a viola are tuned:</h4><ol class = 'text-left'><li>Higher than a violin</li><li>Lower than a violin</li><li>Lower than a cello</li><ol class = 'text-left'>",
    answer: "2",
  },
  {
    question:
      "<h4 class = 'text-left'>The viola when played is held under the chin like a violin:</h4><ol class = 'text-left'><li>true</li><li>false</li><li>Neither</li></ol>",
    answer: "1",
  },
  {
    question:
      "<h4 class = 'text-left'>Generally speaking, the role of the viola in the symphony orchestra is</h4><ol class = 'text-left'><li>Mostly melody</li><li>Mostly accompaniment</li><li>The bass line</li></ol>",
    answer: "2",
  },
  {
    question:
      "<h4 class = 'text-left'>Perhaps the most famous work for solo viola is entitled:</h4><ol class = 'text-left'><li><em>Finalandia</em></li><li><em>Afternoon of a Fawn</em></li><li><em>Harold in Italy</em></li></ol>",
    answer: "3",
  },
  {
    question: "",
  },
];

var qIndex = 0;
let nextQuesArr = [];
// var initStorage = document.querySelector('#initials');
let quesSection = document.querySelector("section");
let timeEl = document.querySelector(".time");
const startButton = document.getElementById("start");
startButton.addEventListener("click", setTime);
const scoreDisplay = document.getElementById("result");
const initialsClear = document.querySelector(".clearField");
let finalScore = document.getElementById("finalScore");
const initialsEntry = document.getElementById("initials");
let loadFinalScore = document.getElementById("formPost");
let displyField = document.getElementById("loadField");

var t = 60;
var score = 0;

// document
//   .querySelector("#initSubmit")
//   .addEventListener("mousedown", function () {
//     document.querySelector("#initSubmit").value = "Submitted";
//     console.log("initials : " + initStorage.value);
//   });

function isFieldEmpty(field) {
  return field.value.trim() === "";
}
const submitBtn = document.getElementById("submit-btn");
// initSubmit.addEventListener("click", validateForm());

const validateForm = (e) => {
  e.preventDefault;
  const initSubmit = document.querySelector("#initSubmit");
  if (initSubmit.value === "") {
    alert("Initials must be filled out");
    initSubmit.focus();
    return false;
  } else {
    e.preventDefault;
    alert("Initials submitted. Now press start!");
    submitBtn.disabled = true;
    submitBtn.style.opacity = 0.5;
  }
  return true;
};

submitBtn.addEventListener("click", validateForm);

// startButton.addEventListener("mousedown", function () {
//   if (isFieldEmpty(initialsEntry)) {
//     alert("Please enter your initials first");
//     location.reload();
//   }
// });

function loadStart() {
  $("#initForm").empty();
  document.getElementById("testInit").innerHTML =
    "<h5 class='text-center'>Answer Here: <input type='number' id='ans' name='scoreRecord' placeholder = '1,2,3' min='1' max='3'></h5><button class='btn btn-outline-light mx-auto' style='width: 100px;' id='submit'>Submit</button>";
  var submitBtn = document.getElementById("submit");
  submitBtn.addEventListener("click", chooseFamily);
}

function setTime() {
  loadStart();
  $("#intro").empty();
  $("#startBtn").empty();

  displyField.innerHTML =
    "<input type='number' name='finalScore' id='finalScore' class='clearField' style='width: 35px;' required min='1' max='6'> ";
  event.preventDefault();

  finalScore = document.getElementById("finalScore");
  var userChoice;
  loadFinalScore = document.getElementById("formPost");
  finalScore.innerHTML = "";
  startButton.innerHTML = "";
  nextQuesArr.push(multiChoices[qIndex].question);
  quesSection.innerHTML = nextQuesArr;

  var timerInterval = setInterval(function () {
    t--;
    timeEl.textContent = t + " Timer";
    if (t === 0 || qIndex === 6 || score === 6 || t < 0) {
      finalScore.value = score;
      $("#testInit").empty();
      loadFinalScore.innerHTML =
        "<label class = 'timeEl'>Submit Your Final Score here!</label><button class='btn btn-outline-light' value='Submit' onclick='clearScore' style='margin-left:5px;' >Final Score</button>";
      clearInterval(timerInterval);
      sendMessage();
      nextQuesArr = null;
      setTimeout(quizRepeat, 15000);
    }
  }, 1000);
}

quizRepeat = () => {
  return location.reload(true / false);
};

function sendMessage() {
  timeEl.textContent = "Test Over!";
  if ("Test Over") {
    scoreDisplay.innerHTML = "Final Score:";
    finalScore.innerHTML = "Final score : " + score;
    quesSection.innerHTML = "";
    userChoice = "";
    console.log("score at close :" + score);
    setTimeout(() => {
      $(".modal").hide();
      $(document.body).removeClass("modal-open");
      $(".modal-backdrop").remove();
    }, 1000);

    if (score === 6) {
      setTimeout(function () {
        alert("Perfect score, congratulations! Submit your final score below!");
      }, 1000);
    } else if (score >= 4) {
      setTimeout(function () {
        alert("Good score, congratulations! Submit your final score below!");
      }, 1000);
    } else if (score < 4 && score > 0) {
      setTimeout(function () {
        alert(
          "Perhaps you should study up on the viola! (It will make you a better person! Submit your final score below!)"
        );
      }, 1000);
    } else {
      quizRepeat();
    }
  }
}

//Load questions
function chooseFamily() {
  let submitAnsw = document.querySelector("#ans");
  userChoice = submitAnsw.value;
  if (userChoice === multiChoices[qIndex].answer) {
    //alert("Correct!")
    $("#modal_correct").modal();
    $("input").val("");
    scoreDisplay.innerHTML = "Score: " + parseInt(++score);
  } else {
    $("input").val("");
    $("#modal_incorrect").modal();
    score = score;
    t = t + 5;
  }

  scoreDisplay.innerHTML = "Score: " + score;
  nextQuesArr.push(multiChoices[++qIndex].question);
  nextQuesArr.shift(multiChoices[qIndex].question);
  quesSection.innerHTML = nextQuesArr;
}

const clearScore = () => {
  document.getElementById("finalScore").value = "";
  submitAnsw.innerhtml = "";
  quizRepeat();
};

// CSS.registerProperty(propertyDefinition);

//Storage
// const initialStorage = () => {
//   const quizStats = {
//     PlayerInitials: initStorage.value,
//     finalScore: score,
//   };
//   typeof Storage !== "undefined"
//     ? console.log(quizStats)
//     : (document.getElementById("result").innerHTML =
//         "Sorry, your browser does not support Web Storage...");

//   let AppendValueToStorage = (key, value) => {
//     let RetrievedInput = JSON.parse(localStorage.getItem(key));
//     if (RetrievedInput === null) {
//       RetrievedInput = [];
//     }

//     RetrievedInput.push(value);
//     localStorage.setItem(key, JSON.stringify(RetrievedInput));

//     console.log(localStorage.getItem(key));
//   };
//   AppendValueToStorage("Results", quizStats);
//   document.forms[0].reset();
//};

// function cnsoleInitials() {
//   initStorage.length > 3 ||
//   initStorage == '' ||
//   isNaN(parseInt(initStorage)) == false
//     ? alert('Please enter your intials.') + (initStorage = ' ')
//     : alert('Now press start!');
//   console.log('initials : ' + typeof initStorage);
// }

// cnsoleInitials();
