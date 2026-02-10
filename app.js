const startBtn = document.getElementById("startBtn");
const hint = document.getElementById("hint");

let started = false;

startBtn.onclick = () => {
  if (started) return;

  started = true;

  // 进入“正在听”的状态
  hint.style.opacity = "0";
  startBtn.innerText = "正在听…";
  startBtn.classList.add("listening");
};
