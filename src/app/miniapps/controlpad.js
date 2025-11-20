const controlPadApp = {
  name: "controlpad",
  // HTML template
  getHTML: () => `
    <div id="controlpad-container" class="screen">
    <button class="back-button">←</button>
    <div class="controlpad-content">
        <h2 class="title">Movement Control</h2>
        <p class="screen-subtitle">Direct your robot's journey with precision</p>
        
        <div class="control-grid">
        <button class="control-btn btn-up" data-direction="f">⬆</button>
        <button class="control-btn btn-left" data-direction="l">⬅</button>
        <button class="control-btn btn-stop" data-direction="s">
            <div id="square"></div>
        </button>
        <button class="control-btn btn-right" data-direction="r">➡</button>
        <button class="control-btn btn-down" data-direction="b">⬇</button>
        </div>
    </div>
    </div>
    `,
  // CSS styles
  getCSS: () => `
      #controlpad-container {
        display: flex;
        flex-direction: column;
        padding: var(--space-medium);
        background-color: var(--background-soft-white);
      }
  
      .back-button {
        position: absolute;
        padding: 0.5rem 1rem;
        background: var(--surface-card-white);
        border: 2px solid var(--neutral-light-gray);
        border-radius: var(--radius-medium);
        cursor: pointer;
        font-size: 1rem;
        color: var(--text-primary-charcoal);
        transition: all var(--transition-normal);
        align-self: flex-start;
      }
  
      .back-button:hover {
        border-color: var(--primary-sky-blue);
        transform: translateX(-2px);
      }
  
      .controlpad-content {
        max-width: 500px;
        margin: 0 auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
  
      .title {
        font-size: 2rem;
        font-weight: 700;
        color: var(--text-primary-charcoal);
        margin-bottom: 0.5rem;
        text-align: center;
      }
  
      .screen-subtitle {
        color: #6b7280;
        font-size: 1rem;
        margin-bottom: 1rem;
        text-align: center;
      }
  
      .control-grid {
        display: grid;
        grid-template-areas: 
          ". up ."
          "left stop right"
          ". down .";
        gap: var(--space-large);
        padding: var(--space-medium);
      }
  
      .control-btn {
        width: 60px;
        height: 60px;
        border: none;
        border-radius: var(--radius-medium);
        background: var(--surface-card-white);
        color: var(--text-primary-charcoal);
        font-size: 1.5rem;
        cursor: pointer;
        transition: all var(--transition-normal);
        box-shadow: var(--shadow-subtle);
        border: 2px solid var(--neutral-light-gray);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
      }
  
      .control-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: var(--shadow-medium);
        border-color: var(--primary-sky-blue);
      }
  
      .control-btn:active:not(:disabled) {
        transform: translateY(0) scale(0.98);
      }
  
      .control-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
  
      .control-btn:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(77, 168, 255, 0.3);
        border-color: var(--primary-sky-blue);
      }
  
      .btn-up { grid-area: up; }
      .btn-down { grid-area: down; }
      .btn-left { grid-area: left; }
      .btn-right { grid-area: right; }
      .btn-stop { grid-area: stop; }
  
      .btn-stop {
        background: var(--accent-coral-red);
        border-color: var(--accent-coral-red);
        position: relative;
      }
  
      .btn-stop::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.1);
        opacity: 0;
        transition: opacity var(--transition-fast);
      }
  
      .btn-stop:hover::before {
        opacity: 1;
      }
  
      #square {
        background: white;
        width: 50%;
        height: 50%;
        border-radius: 6px;
      }
  
      .control-btn.active {
        background: var(--primary-sky-blue);
        color: white;
        border-color: var(--primary-sky-blue);
        box-shadow: 0 0 0 3px rgba(77, 168, 255, 0.2), var(--shadow-medium);
        animation: gentle-pulse 2s infinite;
      }
  
      .btn-stop.active {
        background: var(--accent-coral-red);
        border-color: var(--accent-coral-red);
        box-shadow: 0 0 0 3px rgba(255, 75, 75, 0.2), var(--shadow-medium);
        animation: gentle-pulse-stop 2s infinite;
      }
  
      @keyframes gentle-pulse {
        0%, 100% {
          box-shadow: 0 0 0 3px rgba(77, 168, 255, 0.2), var(--shadow-medium);
        }
        50% {
          box-shadow: 0 0 0 6px rgba(77, 168, 255, 0.1), var(--shadow-medium);
        }
      }
  
      @keyframes gentle-pulse-stop {
        0%, 100% {
          box-shadow: 0 0 0 3px rgba(255, 75, 75, 0.2), var(--shadow-medium);
        }
        50% {
          box-shadow: 0 0 0 6px rgba(255, 75, 75, 0.1), var(--shadow-medium);
        }
      }
  
      @media (prefers-reduced-motion: reduce) {
        .control-btn {
          transition: none;
        }
        
        .control-btn:hover:not(:disabled) {
          transform: none;
        }
        
        .control-btn:active:not(:disabled) {
          transform: none;
        }
        
        .control-btn.active {
          animation: none;
          box-shadow: var(--shadow-medium);
        }
      }
    `,
  // Initialize function - sets up event listeners
  init: (container) => {
    const MOVEMENT_COMMANDS = {
      FORWARD: "<FW,-1>",
      BACKWARD: "<BW,-1>",
      RIGHT: "<RT,-1>",
      LEFT: "<LT,-1>",
      STOP: "<ST,-1>",
    };

    let activeButton = null;

    // Movement function
    const moveTo = (dir, button) => {
      // Remove active class from all buttons
      container.querySelectorAll(".control-btn").forEach((btn) => {
        btn.classList.remove("active");
      });

      // Update active button state
      if (dir === "s") {
        activeButton = null;
      } else {
        activeButton = dir;
        button.classList.add("active");
      }

      // Handle movement commands
      switch (dir) {
        case "f":
          sendData(MOVEMENT_COMMANDS.FORWARD);
          break;
        case "b":
          sendData(MOVEMENT_COMMANDS.BACKWARD);
          break;
        case "r":
          sendData(MOVEMENT_COMMANDS.RIGHT);
          break;
        case "l":
          sendData(MOVEMENT_COMMANDS.LEFT);
          break;
        case "s":
          sendData(MOVEMENT_COMMANDS.STOP);
          break;
      }
    };

    // Set up event listeners
    const controlButtons = container.querySelectorAll(".control-btn");
    controlButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const direction = e.currentTarget.getAttribute("data-direction");
        moveTo(direction, e.currentTarget);
      });
    });

    // Back button
    const backButton = container.querySelector(".back-button");
    if (backButton) {
      backButton.addEventListener("click", () => {
        loadScreen(0);
        currentScreen = 0;
      });
    }
  },

  // Cleanup function - removes event listeners
  destroy: (container) => {
    // Remove all event listeners by cloning and replacing the container
    // const newContainer = container.cloneNode(false);
    // container.parentNode.replaceChild(newContainer, container);
  },
};

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = controlPadApp;
}
