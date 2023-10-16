var audioOn = false;

//window.addEventListener("click", (event) => {
function audioStart() {
  // Initialize AudioContext
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Create a Brown noise buffer
  const bufferSize = 2 * audioContext.sampleRate;
  const brownNoiseBuffer = audioContext.createBuffer(
    1,
    bufferSize,
    audioContext.sampleRate
  );
  const data = brownNoiseBuffer.getChannelData(0);

  var cb = document.querySelector("#audioCheck");
  console.log(cb.checked);

  let lastOut = 0;

  var noiseGain;

  if (cb.checked) {
    if (!audioOn) {
      for (let i = 0; i < bufferSize; i++) {
        const whiteNoise = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * whiteNoise) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }

      // Play brown noise
      const brownNoiseSource = audioContext.createBufferSource();
      brownNoiseSource.buffer = brownNoiseBuffer;
      brownNoiseSource.loop = true;
      noiseGain = audioContext.createGain();
      noiseGain.gain.value = 0.15;
      brownNoiseSource.connect(noiseGain);
      noiseGain.connect(audioContext.destination);
      brownNoiseSource.start();
      audioOn = true;
    }
  } 
}