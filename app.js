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

    mediaRecorder.onstop = async () => {
    const blob = new Blob(audioChunks, { type: "audio/webm" });

    player.src = URL.createObjectURL(blob);
    player.style.display = "block";

    state = "ended";
    btn.innerText = "已结束";
    hint.innerText = "正在保存你的声音…";

    // 🔥 上传到服务器
    const formData = new FormData();
    formData.append("audio", blob);

    try {
        const response = await fetch("http://localhost:5000/upload", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        console.log("服务器返回：", result);

        hint.innerText = "你刚刚说的话，已安全保存。";
    } catch (error) {
        console.error("上传失败：", error);
        hint.innerText = "保存失败，请检查服务器。";
    }
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
