let state = "idle";
let mediaRecorder;
let audioChunks = [];

const btn = document.getElementById("actionBtn");
const hint = document.getElementById("hint");
const subtitle = document.getElementById("subtitle");
const player = document.getElementById("player");

btn.onclick = async () => {
  if (state === "idle") {
    startListening();
  } else if (state === "listening") {
    stopListening();
  }
};

async function startListening() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = e => audioChunks.push(e.data);

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: "audio/webm" });
      player.src = URL.createObjectURL(blob);
      player.style.display = "block";
      state = "ended";
      btn.innerText = "已结束";
      hint.innerText = "你刚刚说的话，只留在这里";
    };

    mediaRecorder.start();
    state = "listening";
    btn.innerText = "结束";
    hint.innerText = "我在听。";
  } catch (e) {
    alert("无法获取麦克风权限");
  }
}

function stopListening() {
  mediaRecorder.stop();
}
