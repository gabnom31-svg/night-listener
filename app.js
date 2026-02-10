const btn = document.getElementById("startBtn");
const hint = document.getElementById("hint");

btn.onclick = () => {
  hint.innerText = "我在听";
  btn.innerText = "正在听…";
  btn.disabled = true;
};
