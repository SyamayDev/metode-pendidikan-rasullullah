const quizData = [
  {
    question:
      "Surah Ad-Dhuha diawali dengan sumpah Allah Swt. Sumpah tersebut merujuk pada waktu...",
    answer: "Dhuha dan malam",
  },
  {
    question:
      "Berdasarkan Surah Ad-Dhuha ayat ke-3, Allah SWT tidak akan meninggalkan Nabi Muhammad SAW dan tidak...",
    answer: "Membencinya",
  },
  {
    question:
      "Ayat yang menyatakan bahwa kehidupan yang akan datang lebih baik dari yang telah lalu adalah ayat ke...",
    answer: "4",
  },
  {
    question:
      "Janji Allah SWT kepada Nabi Muhammad SAW pada ayat ke-5 adalah akan memberikan sesuatu hingga beliau merasa...",
    answer: "Puas",
  },
  {
    question:
      "Surah Ad-Dhuha ayat ke-6 mengingatkan Nabi Muhammad SAW bahwa saat yatim, Allah SWT telah...",
    answer: "Melindunginya",
  },
  {
    question:
      "Ayat ke-7 Surah Ad-Dhuha menjelaskan bahwa saat Nabi Muhammad SAW dalam keadaan bingung, Allah SWT...",
    answer: "Memberi petunjuk",
  },
  {
    question:
      "Surah Ad-Dhuha ayat ke-8 mengingatkan bahwa saat Nabi Muhammad SAW dalam keadaan kekurangan, Allah SWT...",
    answer: "Memberikan kecukupan",
  },
  {
    question: "Apa pesan utama yang terkandung dalam Surah Ad-Dhuha?",
    answer: "Penegasan bahwa Allah tidak akan meninggalkan hamba-Nya",
  },
  {
    question:
      "Surah Ad-Dhuha diturunkan untuk memberikan hiburan dan dukungan kepada Nabi Muhammad SAW saat beliau merasa...",
    answer: "Sedih dan kesepian",
  },
  {
    question: "Mengapa surah ini dinamakan Surah Ad-Dhuha?",
    answer: "Karena surah ini diawali dengan sumpah demi waktu dhuha",
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

document.addEventListener("DOMContentLoaded", buildQuiz);
document.addEventListener("DOMContentLoaded", function () {
  if (window.QuizCommon && typeof window.QuizCommon.renderQuiz === "function") {
    window.QuizCommon.renderQuiz(quizData, "quiz-form", "results-container");
  }
});
