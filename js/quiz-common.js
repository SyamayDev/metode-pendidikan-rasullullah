// Shared quiz helper
// Exports a function to render quiz, enforce all-filled before enabling submit,
// and a flexible 'isAnswerCorrect' with fuzzy matching (levenshtein + substring).
(function (window) {
  function levenshtein(a, b) {
    if (a === b) return 0;
    const an = a ? a.length : 0;
    const bn = b ? b.length : 0;
    if (an === 0) return bn;
    if (bn === 0) return an;
    const matrix = Array.from({ length: bn + 1 }, (_, i) => [i]);
    for (let j = 0; j <= an; j++) matrix[0][j] = j;
    for (let i = 1; i <= bn; i++) {
      for (let j = 1; j <= an; j++) {
        const cost = a[j - 1] === b[i - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }
    return matrix[bn][an];
  }

  function normalizeText(s) {
    if (!s) return "";
    return s
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s]/gi, "");
  }

  // Flexible answer check: substring OR small levenshtein distance relative to length
  function isAnswerCorrect(userAnswer, correctAnswer, opts) {
    opts = opts || {};
    const user = normalizeText(userAnswer);
    const correct = normalizeText(correctAnswer);
    if (!user) return false;

    // Exact or substring matches are accepted
    if (correct === user || correct.includes(user) || user.includes(correct))
      return true;

    // Allow small typos using relative Levenshtein distance
    const maxRatio = typeof opts.maxRatio === "number" ? opts.maxRatio : 0.3; // 30% of length
    const threshold = Math.ceil(
      Math.max(1, Math.min(correct.length, user.length) * maxRatio)
    );
    const dist = levenshtein(user, correct);
    return dist <= threshold;
  }

  function renderQuiz(quizData, formId, resultsContainerId) {
    const quizForm = document.getElementById(formId);
    const resultsContainer = document.getElementById(resultsContainerId);
    if (!quizForm) return;
    let html = "";
    quizData.forEach((item, index) => {
      const questionNumber = index + 1;
      const questionId = `q${questionNumber}`;
      html += `\n      <div class="mb-3">\n        <p>${questionNumber}. ${item.question}</p>\n        <input type="text" class="form-control quiz-input" id="${questionId}">\n      </div>\n    `;
    });
    html += `<button type="submit" id="submit-btn" class="btn btn-primary" disabled>Selesai</button>`;
    quizForm.innerHTML = html;

    function checkCompletion() {
      const inputs = quizForm.querySelectorAll(".quiz-input");
      const allFilled = Array.from(inputs).every(
        (input) => input.value.trim() !== ""
      );
      const submitBtn = document.getElementById("submit-btn");
      if (submitBtn) submitBtn.disabled = !allFilled;
    }

    quizForm.addEventListener("input", checkCompletion);

    quizForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // compute results
      let numCorrect = 0;
      let resultsHtml = "";
      quizData.forEach((currentQuestion, questionIndex) => {
        const inputId = `q${questionIndex + 1}`;
        const userAnswer = document.getElementById(inputId).value;
        resultsHtml += `<div class="mb-3">`;
        resultsHtml += `<p><strong>Pertanyaan:</strong> ${currentQuestion.question}</p>`;
        resultsHtml += `<p><strong>Jawaban Anda:</strong> ${userAnswer}</p>`;
        if (
          isAnswerCorrect(userAnswer, currentQuestion.answer, {
            maxRatio: 0.35,
          })
        ) {
          numCorrect++;
          resultsHtml += `<p class="text-success"><strong>Jawaban Benar:</strong> ${currentQuestion.answer}</p>`;
        } else {
          resultsHtml += `<p class="text-danger"><strong>Jawaban yang Benar:</strong> ${currentQuestion.answer}</p>`;
        }
        resultsHtml += `</div>`;
      });
      if (resultsContainer)
        resultsContainer.innerHTML =
          `<div class="alert alert-info">Anda benar ${numCorrect} dari ${quizData.length} soal.</div>` +
          resultsHtml;
      // Show modal popup with score and percent
      try {
        const percent = Math.round((numCorrect / quizData.length) * 100);
        const modalId = `quiz-result-modal-${Date.now()}`;
        const modalHtml = `
          <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}-label" aria-hidden="true">
            <div class="modal-dialog modal-sm modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="${modalId}-label">Selamat!</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                  <p>Anda benar <strong>${numCorrect}</strong> dari <strong>${quizData.length}</strong> soal.</p>
                  <p>Nilai Anda: <strong>${percent}</strong></p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" id="${modalId}-ok">Terima kasih</button>
                </div>
              </div>
            </div>
          </div>
        `;

        // Append modal to body
        const wrapper = document.createElement("div");
        wrapper.innerHTML = modalHtml;
        document.body.appendChild(wrapper.firstElementChild);

        // Show modal using Bootstrap's modal API if available
        const modalEl = document.getElementById(modalId);
        if (modalEl) {
          // create instance
          let bsModal = null;
          if (typeof bootstrap !== "undefined" && bootstrap.Modal) {
            bsModal = new bootstrap.Modal(modalEl);
            bsModal.show();
          } else {
            // fallback: simple alert
            alert(
              `Selamat! Anda benar ${numCorrect} dari ${quizData.length} soal. Nilai Anda: ${percent}`
            );
          }

          // Close handler for the button
          const okBtn = document.getElementById(`${modalId}-ok`);
          if (okBtn) {
            okBtn.addEventListener("click", function () {
              if (bsModal) bsModal.hide();
            });
          }

          // When modal is fully hidden, remove it from DOM
          modalEl.addEventListener("hidden.bs.modal", function () {
            modalEl.parentNode && modalEl.parentNode.removeChild(modalEl);
          });
        }
      } catch (err) {
        console.error("Error showing quiz result modal", err);
      }

      const submitBtn = document.getElementById("submit-btn");
      if (submitBtn) submitBtn.disabled = true;
      const inputs = quizForm.querySelectorAll(".quiz-input");
      inputs.forEach((input) => (input.disabled = true));
    });
  }

  // Export
  window.QuizCommon = {
    renderQuiz,
    isAnswerCorrect,
  };
})(window);
