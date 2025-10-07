function buildQuiz() {
  const quizForm = document.getElementById("quiz-form");
  let html = "";
  quizData.forEach((item, index) => {
    const questionNumber = index + 1;
    const questionId = `q${questionNumber}`;
    const resultId = `result${questionNumber}`;
    const correctAnswer = item.options[item.answer];

    html += `
      <div class="mb-3">
        <p>${questionNumber}. ${item.question}</p>
        <div class="input-group">
          <input type="text" class="form-control" id="${questionId}">
          <button type="button" class="btn btn-primary" onclick="checkAnswer('${questionId}', '${correctAnswer}', '${resultId}')">Cek</button>
        </div>
        <div id="${resultId}" class="mt-2"></div>
      </div>
    `;
  });
  quizForm.innerHTML = html;
}

function checkAnswer(inputId, correctAnswer, resultId) {
  const userAnswer = document.getElementById(inputId).value;
  const resultDiv = document.getElementById(resultId);

  if (isAnswerCorrect(userAnswer, correctAnswer)) {
    resultDiv.innerHTML = '<span class="text-success">Jawaban Benar!</span>';
  } else {
    resultDiv.innerHTML = `<span class="text-danger">Jawaban Salah. Jawaban yang benar: ${correctAnswer}</span>`;
  }
}

function isAnswerCorrect(userAnswer, correctAnswer) {
  const user = userAnswer.toLowerCase().trim();
  const correct = correctAnswer.toLowerCase().trim();

  // Simple check: if user's answer is a substring of the correct answer or vice-versa
  return correct.includes(user) || user.includes(correct);
}

// Prefer shared renderer when available. audio_quiz_form originally used per-question check buttons.
// If QuizCommon exists, render as a standard quiz form where student fills all answers and submits.
if (window.QuizCommon && typeof window.QuizCommon.renderQuiz === "function") {
  document.addEventListener("DOMContentLoaded", function () {
    window.QuizCommon.renderQuiz(quizData, "quiz-form", "results-container");
  });
} else {
  buildQuiz();
}
