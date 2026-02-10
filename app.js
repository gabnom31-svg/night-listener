const startBtn = document.getElementById("startBtn");
const hint = document.getElementById("hint");
const player = document.getElementById("player");

let mediaRecorder;
let audioChunks = [];

startBtn.addEventListener("click", async () => {
  // UI 先进入“我在听”
  hint.innerText = "我在听。";
  startBtn.innerText = "结束";
  startBtn.disabled = true; // 防止二次点

  try {
    // ⚠️ 关键：必须在点击事件里直接调用
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = (e) => {
      audioChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);

      player.src = url;
      player.style.display = "block";

      hint.innerText = "夜深时刻";
      startBtn.innerText = "已结束";
      startBtn.disabled = true;
    };

    mediaRecorder.start();

    // 第二次点击 = 结束录音
    startBtn.disabled = false;
    startBtn.onclick = () => {
      mediaRecorder.stop();
    };

  } catch (err) {
    alert("无法访问麦克风，请检查浏览器权限");
    console.error(err);
  }
});
