function startCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      document.getElementById("video").srcObject = stream;
    })
    .catch(err => {
      alert("Camera access denied!");
    });
}
async function startCamera() {
  const video = document.getElementById('video');

  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
}