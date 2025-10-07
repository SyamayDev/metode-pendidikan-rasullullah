const quizData = [
  {
    question: "Arti sa’i secara bahasa…",
    answer: "Berlari-lari kecil",
  },
  {
    question: "Pengertian sa’i…",
    answer: "berlari-lari kecil dari bukit Safa ke bukit Marwah dan sebaliknya",
  },
  {
    question: "Tata cara sa’i..",
    answer:
      "Memulai dari Bukit Safa, Perjalanan dari Safa ke Marwah, Tiba di Bukit Marwah, Perjalanan dari Marwah ke Safa, Menyelesaikan Tujuh Putaran, Mengakhiri Sa'i",
  },
  {
    question: "Waktu pelaksanaan sa’i",
    answer: "Sa'i dilakukan setelah selesai tawaf",
  },
  {
    question: "Jumlah putaran sa’i…",
    answer: "tujuh kali",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  if (window.QuizCommon && typeof window.QuizCommon.renderQuiz === "function") {
    window.QuizCommon.renderQuiz(quizData, "quiz-form", "results-container");
  } else {
    console.error("QuizCommon not loaded for human_a_quiz.js");
  }
});
