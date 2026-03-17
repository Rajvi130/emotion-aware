function detectEmotion() {
  let emotions = ["Happy", "Sad", "Angry", "Neutral"];
  let random = emotions[Math.floor(Math.random() * emotions.length)];

  document.getElementById("result").innerText = "Emotion: " + random;

  saveEmotion(random);
}

function saveEmotion(emotion) {
  let data = JSON.parse(localStorage.getItem("emotions")) || [];

  data.push({
    emotion: emotion,
    time: new Date().toLocaleTimeString()
  });

  localStorage.setItem("emotions", JSON.stringify(data));
}
function startMic() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  recognition.start();

  recognition.onresult = function(event) {
    const text = event.results[0][0].transcript;

    document.getElementById("voiceResult").innerText = "Voice Input: " + text;

    detectVoiceEmotion(text);
  };
}


// FACE (dummy for now)
function detectFaceEmotion() {
  let emotions = ["Happy 😊", "Sad 😢", "Angry 😡", "Neutral 😐"];
  face = emotions[Math.floor(Math.random() * emotions.length)];

  document.getElementById("faceEmotion").innerText = "Face Emotion: " + face;

  updateFinalEmotion();
}
function detectFaceEmotion() {
  showLoader();

  setTimeout(() => {
    face = "Happy"; // example
    document.getElementById("faceEmotion").innerText = face;

    hideLoader();
    updateFinalEmotion();

  }, 2000);
}

// VOICE
function startMic() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";

  recognition.start();

  recognition.onresult = function(event) {
    const text = event.results[0][0].transcript.toLowerCase();

    document.getElementById("speechText").innerText = "You said: " + text;

    detectVoiceEmotion(text);
  };
}

// VOICE LOGIC

// FINAL COMBINE
function updateFinalEmotion() {
  let final = "Neutral 😐";

  if (face === voice && face !== "") {
    final = face;
  } else if (face !== "" && voice !== "") {
    final = face + " / " + voice;
  }

  document.getElementById("finalEmotion").innerText = final;

  saveEmotion(final);
}

// SAVE
function saveEmotion(emotion) {
  let data = JSON.parse(localStorage.getItem("emotions")) || [];

  data.push({
    emotion: emotion,
    time: new Date().toLocaleTimeString()
  });

  localStorage.setItem("emotions", JSON.stringify(data));
}
function highlightEmotion(emotion) {
  let emotions = ["happy", "sad", "angry", "neutral", "fear"];

  emotions.forEach(e => {
    document.getElementById(e).classList.remove("active");
  });

  if (emotion.toLowerCase().includes("happy")) {
    document.getElementById("happy").classList.add("active");
  }
  else if (emotion.toLowerCase().includes("sad")) {
    document.getElementById("sad").classList.add("active");
  }
  else if (emotion.toLowerCase().includes("angry")) {
    document.getElementById("angry").classList.add("active");
  }
  else if (emotion.toLowerCase().includes("fear")) {
    document.getElementById("fear").classList.add("active");
  }
  else {
    document.getElementById("neutral").classList.add("active");
  }
}
function updateBars(emotion) {

  // reset
  document.getElementById("happyBar").style.width = "0%";
  document.getElementById("sadBar").style.width = "0%";
  document.getElementById("angryBar").style.width = "0%";
  document.getElementById("neutralBar").style.width = "0%";

  if (emotion.includes("Happy")) {
    document.getElementById("happyBar").style.width = "80%";
  }
  else if (emotion.includes("Sad")) {
    document.getElementById("sadBar").style.width = "80%";
  }
  else if (emotion.includes("Angry")) {
    document.getElementById("angryBar").style.width = "80%";
  }
  else {
    document.getElementById("neutralBar").style.width = "80%";
  }
}
let emotionData = {
  Happy: 0,
  Sad: 0,
  Angry: 0,
  Neutral: 0
};

let chart;

function initChart() {
  const ctx = document.getElementById('emotionChart').getContext('2d');

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(emotionData),
      datasets: [{
        label: 'Emotion Count',
        data: Object.values(emotionData)
      }]
    }
  });
}

function updateChart(emotion) {
  if (emotionData[emotion] !== undefined) {
    emotionData[emotion]++;
  } else {
    emotionData["Neutral"]++;
  }

  chart.data.datasets[0].data = Object.values(emotionData);
  chart.update();
}
let face = "";
let voice = "";

function updateFinalEmotion() {
  let final = "Neutral";

  if (face === voice && face !== "") {
    final = face;
  } else if (face !== "" && voice !== "") {
    final = face;
  }

  document.getElementById("finalEmotion").innerText = final;

  updateChart(final); // graph update
}
f// DARK MODE TOGGLE
function toggleDarkMode() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

// LOAD THEME ON PAGE LOAD
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
});
function showLoader() {
  document.getElementById("loader").classList.remove("hidden");
}

function hideLoader() {
  document.getElementById("loader").classList.add("hidden");
}
let face = "";
let voice = "";

function updateFinalEmotion() {
  let final = "Neutral 😐";

  if (face && voice) {
    final = face + " / " + voice;
  } else if (face) {
    final = face;
  } else if (voice) {
    final = voice;
  }

  document.getElementById("finalEmotion").innerText = final;
}
