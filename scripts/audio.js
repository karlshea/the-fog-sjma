var audioOn = false;

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

  if (cb.checked) {
    if (!audioOn) {
      for (let i = 0; i < bufferSize; i++) {
        const whiteNoise = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * whiteNoise) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }

      var context = new AudioContext();
      var o = context.createOscillator();
      var frequency = 125.0;
      var g = context.createGain();

      o.type = "sine";
      o.frequency.value = frequency;
      g.gain.value = 0.1;
      o.connect(g);
      g.connect(context.destination);
      o.start();

      // Play brown noise
      const brownNoiseSource = audioContext.createBufferSource();
      brownNoiseSource.buffer = brownNoiseBuffer;
      brownNoiseSource.loop = true;
      const noiseGain = audioContext.createGain();
      noiseGain.gain.value = 0.1;
      brownNoiseSource.connect(noiseGain);
      noiseGain.connect(audioContext.destination);
      brownNoiseSource.start();
      audioOn = true;
    }

    // Play 100 Hz tone every 18 seconds
    setInterval(() => {
      g.gain.exponentialRampToValueAtTime(0.9, context.currentTime + 2.5);
      setTimeout(() => {
        g.gain.exponentialRampToValueAtTime(0.1, context.currentTime + 2.5);
      }, 3500);
    }, 18000);
  } else {
    g.gain.value = 0;
    noiseGain.gain.value = 0;
  }
}
