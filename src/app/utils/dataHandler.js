async function sendData(command) {
  const INPUTVALUE = command;
  if (!("TextEncoder" in window)) {
    console.log("Sorry, this browser does not support TextEncoder...");
  }
  let enc = new TextEncoder(); // always utf-8
  blueToothCharacteristic.writeValue(enc.encode(INPUTVALUE));
}
