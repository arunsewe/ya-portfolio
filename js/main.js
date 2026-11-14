// Bug hunt mini game: click the bug as many times as you can in 15 seconds.
const field = document.getElementById("field");

if (field) {
  const bug = document.getElementById("bug");
  const startBtn = document.getElementById("start");
  const scoreEl = document.getElementById("score");
  const timeEl = document.getElementById("time");
  const bestEl = document.getElementById("best");
  const ROUND_SECONDS = 15;

  let score = 0;
  let timeLeft = ROUND_SECONDS;
  let best = 0;
  let countdown = null;
  let mover = null;

  try {
    best = Number(localStorage.getItem("bugBest")) || 0;
  } catch (e) {
    // storage blocked: best score just resets each visit
  }
  bestEl.textContent = best;

  function moveBug() {
    bug.style.left = 10 + Math.random() * 80 + "%";
    bug.style.top = 15 + Math.random() * 70 + "%";
  }

  function endGame() {
    clearInterval(countdown);
    clearInterval(mover);
    bug.hidden = true;
    startBtn.hidden = false;
    startBtn.textContent = "Play again (you got " + score + ")";
    if (score > best) {
      best = score;
      bestEl.textContent = best;
      try {
        localStorage.setItem("bugBest", best);
      } catch (e) {}
    }
  }

  startBtn.addEventListener("click", () => {
    clearInterval(countdown);
    clearInterval(mover);
    score = 0;
    timeLeft = ROUND_SECONDS;
    scoreEl.textContent = score;
    timeEl.textContent = timeLeft;
    startBtn.hidden = true;
    bug.hidden = false;
    moveBug();
    mover = setInterval(moveBug, 900);
    countdown = setInterval(() => {
      timeLeft -= 1;
      timeEl.textContent = timeLeft;
      if (timeLeft <= 0) endGame();
    }, 1000);
  });

  bug.addEventListener("click", () => {
    score += 1;
    scoreEl.textContent = score;
    moveBug();
  });
}