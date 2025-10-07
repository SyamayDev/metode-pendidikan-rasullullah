const quizData = [
  {
    question: "Qadha artinya…",
    answer: "Ketetapan",
  },
  {
    question: "Takdir artinya…",
    answer: "Takdir",
  },
  {
    question:
      "ketetapan atau rencana Allah yang bersifat umum dan telah tertulis di Lauhul Mahfuz sejak dahulu kala merupakan pengertian…",
    answer: "Qadha",
  },
  {
    question: "Pengertian takdir adalah…",
    answer: "realisasi atau perwujudan dari Qadha dalam kehidupan nyata.",
  },
  {
    question:
      "Pada gambar qadha dan qadar yang terjadi pada manusia digambarkan dengan garis yang berada di… kotak.",
    answer: "Dalam",
  },
];

const quizForm = document.getElementById("quiz-form");
const resultsContainer = document.getElementById("results-container");

function buildQuiz() {
  let html = "";
  quizData.forEach((item, index) => {
    const questionNumber = index + 1;
    const questionId = `q${questionNumber}`;

    html += `
      <div class="mb-3">
        <p>${questionNumber}. ${item.question}</p>
        <input type="text" class="form-control quiz-input" id="${questionId}">
      </div>
    `;
  });
  html += `<button type="submit" id="submit-btn" class="btn btn-primary" disabled>Selesai</button>`;
  quizForm.innerHTML = html;

  quizForm.addEventListener("input", checkCompletion);
  quizForm.addEventListener("submit", function (e) {
    e.preventDefault();
    showResults();
  });
}

function checkCompletion() {
  const inputs = document.querySelectorAll(".quiz-input");
  const allFilled = Array.from(inputs).every(
    (input) => input.value.trim() !== ""
  );
  document.getElementById("submit-btn").disabled = !allFilled;
}

function showResults() {
  let numCorrect = 0;
  let resultsHtml = "";

  quizData.forEach((currentQuestion, questionNumber) => {
    const inputId = `q${questionNumber + 1}`;
    const userAnswer = document.getElementById(inputId).value;

    resultsHtml += `<div class="mb-3">`;
    resultsHtml += `<p><strong>Pertanyaan:</strong> ${currentQuestion.question}</p>`;
    resultsHtml += `<p><strong>Jawaban Anda:</strong> ${userAnswer}</p>`;

    if (isAnswerCorrect(userAnswer, currentQuestion.answer)) {
      numCorrect++;
      resultsHtml += `<p class="text-success"><strong>Jawaban Benar:</strong> ${currentQuestion.answer}</p>`;
    } else {
      resultsHtml += `<p class="text-danger"><strong>Jawaban yang Benar:</strong> ${currentQuestion.answer}</p>`;
    }
    resultsHtml += `</div>`;
  });

  resultsContainer.innerHTML =
    `<div class="alert alert-info">Anda benar ${numCorrect} dari ${quizData.length} soal.</div>` +
    resultsHtml;
  document.getElementById("submit-btn").disabled = true;
  // Disable all inputs after submission
  const inputs = document.querySelectorAll(".quiz-input");
  inputs.forEach((input) => (input.disabled = true));
}

function isAnswerCorrect(userAnswer, correctAnswer) {
  const user = userAnswer
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/gi, "");
  const correct = correctAnswer
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/gi, "");

  // For these short answers, 'includes' is flexible enough.
  return correct.includes(user) || user.includes(correct);
}

document.addEventListener("DOMContentLoaded", function () {
  if (window.QuizCommon && typeof window.QuizCommon.renderQuiz === "function") {
    window.QuizCommon.renderQuiz(quizData, "quiz-form", "results-container");
  } else {
    console.error("QuizCommon not loaded for visual_a_quiz.js");
  }
});
