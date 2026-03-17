let data = JSON.parse(localStorage.getItem("emotions")) || [];

let list = document.getElementById("history");

data.forEach(item => {
  let li = document.createElement("li");
  li.innerText = item.time + " - " + item.emotion;
  list.appendChild(li);
});
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
  }

  chart.data.datasets[0].data = Object.values(emotionData);
  chart.update();
}

window.onload = function () {
  initChart();
};
window.onload = function () {
  let data = JSON.parse(localStorage.getItem("emotions")) || [];

  let counts = {
    Happy: 0,
    Sad: 0,
    Neutral: 0
  };

  data.forEach(e => {
    if (counts[e] !== undefined) {
      counts[e]++;
    }
  });

  document.getElementById("happyCount").innerText = counts.Happy;
  document.getElementById("sadCount").innerText = counts.Sad;
  document.getElementById("neutralCount").innerText = counts.Neutral;

  // GRAPH
  const ctx = document.getElementById('emotionChart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(counts),
      datasets: [{
        label: 'Emotions',
        data: Object.values(counts)
      }]
    }
  });
};