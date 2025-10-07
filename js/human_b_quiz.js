const quizData = [
  {
    question: "Huruf dalam al-Quran disebut huruf?",
    answer: "Huruf Hijaiah",
  },
  {
    question: "Huruf hijaiah berjumlah ?",
    answer: "29 huruf",
  },
  {
    question: "Huruf hijaiah \u0628 dibaca?",
    answer: "Ba",
  },
  {
    question: "Huruf hijaiah \u062c dibaca?",
    answer: "Jim",
  },
  {
    question: "Harakat fathah berbunyi?",
    answer: "A",
  },
  {
    question: "Harakat kasrah berbunyi?",
    answer: "I",
  },
  {
    question: "Harakat Dammah berbunyi?",
    answer: "U",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  if (window.QuizCommon && typeof window.QuizCommon.renderQuiz === "function") {
    window.QuizCommon.renderQuiz(quizData, "quiz-form", "results-container");
  } else {
    console.error(
      "QuizCommon not loaded - make sure js/quiz-common.js is included before this script."
    );
  }
});
