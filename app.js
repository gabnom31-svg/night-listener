const startBtn = document.getElementById("startBtn");
const hint = document.getElementById("hint");
const player = document.getElementById("player");

let mediaRecorder;
let audioChunks = [];

startBtn.onclick = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = e => audioChunks.push(e.data);

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: "audio/webm" });
      player.src = URL.createObjectURL(blob);
      player.style.display = "block";
    };

    mediaRecorder.start();

    hint.innerText = "我在听。";
    startBtn.innerText = "结束";

    startBtn.onclick = () => {
      mediaRecorder.stop();
      startBtn.innerText = "已结束";
      startBtn.disabled = true;
    };

  } catch (e) {
    alert("未获得麦克风权限");
    console.error(e);
  }
};
