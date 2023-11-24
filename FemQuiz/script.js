// Function to load questions from the JSON file
// Функція для завантаження питань з JSON-файлу
async function loadQuestions() {
    try {
      const response = await fetch("questions.json");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error loading questions:", error);
      return [];
  
  }
}

// Function to build the quiz form
// Функція для побудови форми опитування

function buildQuiz(questions) {
const quizForm = document.getElementById("quiz-form");

questions.forEach ((question, index) => {
    const questionDiv = createQuestionDiv(index, question);
    quizForm.appendChild(questionDiv);
});

}
// Function to create a question div
// Функція для створення блоку питання
function createQuestionDiv(index, question) {
    const questionDiv = document.createElement ("div");
    questionDiv.id = `question${index + 1}`;
    questionDiv.classList.add("quiz-questions");

    const questionText = document.createElement ("p");
    questionText.textContent = `${index + 1}. ${question.question}`;
    questionDiv.appendChild(questionText);
    questionText.style.fontWeight = "900";

question.options.forEach ((option, optionIndex) => {
    const label = createOptionLabel (index + 1, option);
    questionDiv.appendChild(label);
})

return questionDiv;
}

// Function to create an option label
// Функція для створення мітки для варіанта відповіді

function createOptionLabel (questionIndex, option) {
    const label = document.createElement("label");
    const radio = document.createElement("input");
   radio.type = "radio";
   radio.name = `q${questionIndex}`;
   radio.value = option;
   label.appendChild (radio);
   label.appendChild (document.createTextNode (` ${option}`));

   return label;

}

// Function to submit the quiz and display the result
// Функція для подання відповіді на вікторину та відображення результату

function submitQuiz(questions) {
    const answers = getCorrectAnswers(questions);
    let score = 0;

    for (let i = 1; i <= questions.length; i++) {
        const selectedOption = document.querySelector (`input[name="q${i}"]:checked`);
    if (selectedOption) {
    const userAnswer = selectedOption.value;
    if (userAnswer === answers [`q${i}`]) {
        score ++;
    }
}
    }
displayResult (score, questions)

}


// Function to get correct answers
// Функція для отримання правильних відповідей
function getCorrectAnswers (questions) {
    const correctAnswers = {};
    questions.forEach ((question, index) => {
        correctAnswers [`q${index + 1}`] = question.correctAnswer;
    });
    return correctAnswers;
}

// Function to display the result
// Функція для відображення результату

function displayResult (score, questions) {
    const resultContainer = document.getElementById("result");
    let message;

    if (score === questions.length) {
        message = "Congratulations, you are a real feminist!!!"; 
    } else if (score === questions.length - 1) {
        message = "Well done, you have 2 correct answer. Continue to learn the feminism topic";    
    } else if (score === questions.length -2) {
       message = "You have 1 correct answer, find out more about feminism";
    } else {
        message = "No correct answer, your knowledge of feminism needs to be improved";
    }

       resultContainer.innerHTML = `<p>${message}</p>`;


       //Show result 
       alert (message)
    }


// Load questions, build the quiz, add an event listener to the button
// Завантаження питань, побудова вікторини та додавання обробника подій для кнопки
loadQuestions().then((questions) => {
    buildQuiz (questions); 

    const submitButton = document.getElementById ("submit-button");
    submitButton.addEventListener ("click", () => submitQuiz (questions));
} ); 

// EXTERNAL API

// Function to load data from jsonplaceholder.typicode.com
// Функція для завантаження даних з jsonplaceholder.typicode.com
async function loadDataFromJSONPlaceholder() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error loading data:", error);
      return [];
    }
  }

  
  // Function to display selected data on the page
  // Функція для відображення обраних даних на сторінці
  function displayData(data) {
    const dataContainer = document.getElementById("jsonplaceholder-data");
    // styling API Data
    dataContainer.style.color = "#6d22b3";
    dataContainer.style.marginLeft= "40px";
  
    //Name and Email
    const selectedData = data.map(user => ({
      name: user.name,
      email: user.email
    }));

    document.getElementById("title").style.textAlign = "center";
  
    // Створіть рядок для виведення
    const output = selectedData.map((user, index) => `${index + 1}. Name: ${user.name}, Email: ${user.email}`).join('<br>');
  
    // Display data
    // Відобразіть вибрані дані
    dataContainer.innerHTML = output;
  }
  
  // Load data from jsonplaceholder.typicode.com and display it on the page
  // Завантаження даних з jsonplaceholder.typicode.com та їх відображення на сторінці
  loadDataFromJSONPlaceholder().then((data) => {
    displayData(data);
  });
  







