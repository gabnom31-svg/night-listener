const startBtn = document.getElementById("startBtn");
const hint = document.getElementById("hint");
const player = document.getElementById("player");

let mediaRecorder;
let audioChunks = [];
let recording = false;

startBtn.onclick = async () => {
  // 第二次点击：停止录音
  if (recording) {
    mediaRecorder.stop();
    startBtn.innerText = "已结束";
    startBtn.disabled = true;
    recording = false;
    return;
  }

  // 第一次点击：开始录音
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = event => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
      const audioURL = URL.createObjectURL(audioBlob);

      player.src = audioURL;
      player.style.display = "block";
    };

    mediaRecorder.start();

    hint.style.opacity = "0";
    startBtn.innerText = "结束倾诉";
    startBtn.classList.add("listening");

    recording = true;
  } catch (err) {
    alert("无法访问麦克风，请检查权限设置");
  }
};
