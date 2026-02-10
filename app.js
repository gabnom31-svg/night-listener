const startBtn = document.getElementById("startBtn");
const hint = document.getElementById("hint");
const player = document.getElementById("player");

let mediaRecorder;
let audioChunks = [];
let recording = false;

startBtn.addEventListener("click", async () => {
  // 第二次点击：结束
  if (recording) {
    mediaRecorder.stop();
    startBtn.innerText = "已结束";
    startBtn.disabled = true;
    recording = false;
    return;
  }

  // 第一次点击：开始
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = e => {
      audioChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      player.src = url;
      player.style.display = "block";
    };

    mediaRecorder.start();

    hint.style.opacity = "0";
    startBtn.innerText = "结束倾诉";
    startBtn.classList.add("listening");
    recording = true;
  } catch (e) {
    alert("无法访问麦克风，请检查浏览器权限");
  }
});
