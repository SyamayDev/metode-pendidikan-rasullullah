const quizImages = [
  { img: 'img/batang_kurma.jpg', answer: 'Batang pohon kurma' },
  { img: 'img/daun_kurma.jpg', answer: 'Daun kurma' },
  { img: 'img/akar_kurma.jpg', answer: 'Akar pohon kurma' },
  { img: 'img/buah_kurma.jpg', answer: 'Buah kurma' },
  { img: 'img/gurun_kurma.jpg', answer: 'Gurun pasir tempat tumbuhnya pohon kurma' }
];

const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submitQuiz');
const resultContainer = document.getElementById('quizResult');

function buildQuiz() {
  const output = [];
  quizImages.forEach((item, index) => {
    output.push(`
      <div class="mb-3 text-center">
        <img src="${item.img}" alt="Tebak gambar" class="img-fluid" style="max-height: 200px;">
        <input type="text" class="form-control mt-2" id="answer${index}" placeholder="Tebak gambar ini...">
      </div>
    `);
  });
  quizContainer.innerHTML = output.join('');
}

function showResults() {
  let score = 0;
  quizImages.forEach((item, index) => {
    const userAnswer = document.getElementById(`answer${index}`).value.trim();
    if (userAnswer.toLowerCase() === item.answer.toLowerCase()) score++;
  });
  resultContainer.innerHTML = `<p class="alert alert-success">Kamu benar ${score} dari ${quizImages.length}! Hebat!</p>`;
}

buildQuiz();
submitButton.addEventListener('click', showResults);