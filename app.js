document.getElementById("startBtn").onclick = () => {
  document.getElementById("hint").innerText = "我在听。";
  document.getElementById("startBtn").style.opacity = "0.3";
  document.getElementById("startBtn").innerText = "正在听…";
};
