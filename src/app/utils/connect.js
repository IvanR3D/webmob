// DOM elements 
const connectBtn = document.getElementById("connectBtn");
const connectTxt = document.getElementById("connectTxt");

// Global variables
let blueTooth;
let blueToothCharacteristic;
let isConnected = false;
let isConnecting = false;
let devMode = false;

// Configuration
const DEV_MODE = window.location.search.includes("devmode=true");

// Mock BLE implementation for development
class MockBLE {
  constructor() {
    this.connected = false;
  }

  connect(serviceUuid, callback) {
    setTimeout(() => {
      console.log("[MockBLE] Connected successfully");
      this.connected = true;
      callback(null, [
        {
          service: { uuid: serviceUuid },
          characteristics: [{ uuid: "mock-characteristic" }],
        },
      ]);
    }, 1000);
  }

  startNotifications(characteristic, callback, dataType) {
    console.log("[MockBLE] Started notifications");
  }

  disconnect() {
    console.log("[MockBLE] Disconnected");
    this.connected = false;
  }

  isConnected() {
    return this.connected;
  }
}

// Connection state management
const connectionCallbacks = {
  onConnected: null,
  onDisconnected: null,
  onConnecting: null,
  onError: null,
};

// Initialize BLE connection system
function initBLE(options = {}) {
  if (options.devMode !== undefined) {
    devMode = options.devMode;
  } else {
    devMode = DEV_MODE;
  }

  // Set up callbacks
  if (options.onConnected)
    connectionCallbacks.onConnected = options.onConnected;
  if (options.onDisconnected)
    connectionCallbacks.onDisconnected = options.onDisconnected;
  if (options.onConnecting)
    connectionCallbacks.onConnecting = options.onConnecting;
  if (options.onError) connectionCallbacks.onError = options.onError;

  // Set up dev mode toggle shortcut
  setupDevModeToggle();

  if (devMode) {
    console.log(
      "%c[Dev Mode] ACTIVE - Using Mock BLE",
      "color: #00ff00; font-weight: bold; font-size: 14px;"
    );
  }

  return {
    connect: connectToBle,
    disconnect: onDisconnected,
    toggleConnection,
    isConnected: () => isConnected,
    isConnecting: () => isConnecting,
    getDevMode: () => devMode,
  };
}

// Main connection function
function connectToBle() {
  if (isConnecting || isConnected) return;
  connectBtn.classList.remove("disconnected");
  connectTxt.textContent = "waking up...";
  connectBtn.classList.add("connecting");
  isConnecting = true;
  

  if (connectionCallbacks.onConnecting) {
    connectionCallbacks.onConnecting();
  }

  if (devMode) {
    console.log("[Dev Mode] Connecting with MockBLE...");
    blueTooth = new MockBLE();
  } else {
    if (typeof p5ble !== "undefined") {
      blueTooth = new p5ble();
    } else {
      console.error(
        "BLE library not found. Please include p5.ble.js or use dev mode."
      );
      handleConnectionError(new Error("BLE library not available"));
      return;
    }
  }
  
  // Service UUID - adjust as needed for your BLE device
  const serviceUuid = 0xffe0;
  blueTooth.connect(serviceUuid, gotCharacteristics);
}

// Handle characteristics discovery
function gotCharacteristics(error, characteristics) {
  console.log("BLE connected");
  isConnecting = false;
  connectBtn.classList.remove("connecting");
  connectTxt.innerHTML = "<img src='./assets/ble.svg'>";
  connectBtn.classList.add("connected");
  if (error) {
    console.log("BLE connection error: ", error);
    handleConnectionError(error);
    return;
  }

  console.log("BLE characteristics: ", characteristics);
  blueToothCharacteristic = characteristics[0];

  // Start receiving notifications
  blueTooth.startNotifications(blueToothCharacteristic, gotValue, "string");

  isConnected = blueTooth.isConnected();

  if (connectionCallbacks.onConnected) {
    connectionCallbacks.onConnected();
  }

  // Wake up eyes and show happy expression
  if (eyesController) {
    eyesController.wakeUp();
    setTimeout(() => {
      if (eyesController.express) {
        eyesController.express({ type: "happy", duration: 1000 });
      }
    }, 350);
  }
  say("Oh, hello there!");
  toggleNavigation();
}

// Handle incoming BLE data
function gotValue(value) {
  console.log("BLE value received: ", value);
  // You can add custom logic here to handle specific data from your BLE device
}

// Disconnect from BLE
function onDisconnected() {
  if (blueTooth) {
    blueTooth.disconnect();
  }

  isConnected = false;
  isConnecting = false;
  connectTxt.textContent = "wake up";
  connectBtn.classList.remove("connected");
  connectBtn.classList.add("disconnected");
  
  if (connectionCallbacks.onDisconnected) {
    connectionCallbacks.onDisconnected();
  }

  // Put eyes to sleep
  setTimeout(() => {
    if (eyesController && eyesController.sleeping) {
      eyesController.sleeping();
    }
  }, 100);
  say("Bye bye");
  toggleNavigation();
}

// Toggle connection state
function toggleConnection() {
  if (isConnected) {
    onDisconnected();
  } else {
    connectToBle();
  }
}

// Error handling
function handleConnectionError(error) {
  isConnecting = false;
  if (connectionCallbacks.onError) {
    connectionCallbacks.onError(error);
  }
}

// Dev mode utilities
function setupDevModeToggle() {
  const handleKeyPress = (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === "D") {
      devMode = !devMode;
      console.log(`[Dev Mode] ${devMode ? "ENABLED" : "DISABLED"}`);
    }
  };

  window.addEventListener("keydown", handleKeyPress);
}

initBLE();
connectBtn.addEventListener("click", toggleConnection);