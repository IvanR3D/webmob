const screenContainer = document.querySelector(".screen-container");
const navigation = document.getElementById("navigation");
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");
const arrow = document.getElementById("arrow");

// Import or define your miniapps here
// You can either import them as modules or include them in the same file
const navigationScreens = [
  {
    name: "home",
    icon: "home",
    app: homeApp, // Your home app object
  },
  {
    name: "controlpad",
    icon: "controlpad",
    app: controlPadApp,
  },
  {
    name: "expressions",
    icon: "expressions",
    app: expressionsApp, 
  },
  {
    name: "actions",
    icon: "actions",
    app: actionsApp,
  },
  {
    name: "support",
    icon: "support",
    app: supportApp,
  },
];

let currentScreen = 0;
let currentAppInstance = null;
let styleElement = null;

// Load a miniapp into the screen container
const loadScreen = (index) => {
  // Cleanup previous app
  if (currentAppInstance) {
    currentAppInstance.destroy?.(screenContainer);
  }
  
  // Remove previous styles
  if (styleElement) {
    styleElement.remove();
    styleElement = null;
  }
  
  const screen = navigationScreens[index];
  const app = screen.app;
  
  // Clear container
  screenContainer.innerHTML = '';
  
  // Inject HTML
  screenContainer.innerHTML = app.getHTML();
  
  // Inject CSS
  if (app.getCSS) {
    styleElement = document.createElement('style');
    styleElement.textContent = app.getCSS();
    document.head.appendChild(styleElement);
  }
  
  // Initialize the app
  if (app.init) {
    app.init(screenContainer, closeNavigation);
  }
  
  currentAppInstance = app;
};

const nextScreen = () => {
  currentScreen++;
  if (currentScreen >= navigationScreens.length) {
    currentScreen = 0;
  }
  loadScreen(currentScreen);
};

const previousScreen = () => {
  currentScreen--;
  if (currentScreen < 0) {
    currentScreen = navigationScreens.length - 1;
  }
  loadScreen(currentScreen);
};

const openNavigation = () => {
  screenContainer.style.display = "flex";
  leftArrow.style.display = "block";
  rightArrow.style.display = "block";
  arrow.classList.add("down");
  loadScreen(currentScreen);
};

const closeNavigation = () => {
  // Cleanup current app
  if (currentAppInstance) {
    currentAppInstance.destroy?.(screenContainer);
    currentAppInstance = null;
  }
  
  // Remove styles
  if (styleElement) {
    styleElement.remove();
    styleElement = null;
  }
  
  screenContainer.style.display = "none";
  screenContainer.innerHTML = '';
  leftArrow.style.display = "none";
  rightArrow.style.display = "none";
  arrow.classList.remove("down");
};

const toggleNavigation = () => {
  navigation.classList.toggle("disabled");
  if (navigation.classList.contains("disabled")) {
    closeNavigation();
  } else {
    openNavigation();
  }
};

// Event listeners
arrow.addEventListener("click", () => {
  if (arrow.classList.contains("down")) {
    closeNavigation();
  } else {
    openNavigation();
  }
});

leftArrow.addEventListener("click", () => {
  previousScreen();
});

rightArrow.addEventListener("click", () => {
  nextScreen();
});