
window.addEventListener("click", (event) => {
    // Initialize AudioContext
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create a Brown noise buffer
    const bufferSize = 2 * audioContext.sampleRate;
    const brownNoiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = brownNoiseBuffer.getChannelData(0);

    let lastOut = 0;

    for (let i = 0; i < bufferSize; i++) {
        const whiteNoise = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * whiteNoise)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
    }

    var context = new AudioContext();
    var o = context.createOscillator();
    var frequency = 100.0;
    var  g = context.createGain();

    o.type = "sine";
    o.frequency.value = frequency;
    g.gain.value = .01
    o.connect(g);
    g.connect(context.destination);

    // Create an oscillator for the 100 Hz tone
    // const oscillator = audioContext.createOscillator();
    // oscillator.type = 'sine';
    // oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
    // var gain = oscillator.createGain();

    // Connect the oscillator to the destination (speakers)
    // oscillator.connect(gain);
    // gain.connect(audioContext.destination);
    //oscillator.connect(audioContext.destination);

    o.start();

    // Play brown noise
    const brownNoiseSource = audioContext.createBufferSource();
    brownNoiseSource.buffer = brownNoiseBuffer;
    brownNoiseSource.loop = true;
    const noiseGain = audioContext.createGain();
    noiseGain.gain.value = 0.15;
    brownNoiseSource.connect(noiseGain);
    noiseGain.connect(audioContext.destination);
    brownNoiseSource.start();

    // Play 100 Hz tone every 18 seconds
    setInterval(() => {
        g.gain.exponentialRampToValueAtTime(
            .95, context.currentTime + 2.5
        )
        setTimeout(() => {
            g.gain.exponentialRampToValueAtTime(
                0.05, context.currentTime + 2.5
            )
        }, 3500);
    }, 18000);
});