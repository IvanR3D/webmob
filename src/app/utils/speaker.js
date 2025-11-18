function speak(text, selectedVoice) {
  return new Promise((resolve, reject) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice || synth.getVoices()[0]; // Default to the first available voice if none selected
    utterance.onend = () => { resolve(); };
    utterance.onerror = (error) => { reject(error); };
    synth.speak(utterance);
  });
}

async function say(msg, selectedVoice) {
  const mouth = document.getElementById("mouth");
  mouth.classList.add("talk");
  await speak(msg, selectedVoice).then(() => mouth.classList.remove("talk"));
}