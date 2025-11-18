const homeApp = {
  name: "home",
  // HTML template
  getHTML: () => `
    <div class="home-container">
      <h1>👋🏼 Hello, WebMob!</h1>
      <p>🚧 home screen under construction</p>
    </div>
  `,
  // CSS styles
  getCSS: () => `
    .home-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 2rem;
      background: #f8f9fa;
    }
    
    .home-container h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: #2c3e50;
    }
    
    .home-container p {
      font-size: 1.2rem;
      color: #6b7280;
      margin-bottom: 2rem;
    }
  `,
  // Initialize function
  init: (container) => {
    // Add any other initialization logic here
    console.log("Home app initialized");
  },

  // Cleanup function
  destroy: (container) => {
    console.log("Home app destroyed");
    // Clean up any timers, intervals, or event listeners
  },
};

// Settings app example
const settingsApp = {
  name: "settings",

  getHTML: () => `
      <div class="settings-container">
        <h1>Settings</h1>
        <div class="settings-list">
          <div class="setting-item">
            <label>Dark Mode</label>
            <input type="checkbox" id="dark-mode-toggle">
          </div>
          <div class="setting-item">
            <label>Notifications</label>
            <input type="checkbox" id="notifications-toggle">
          </div>
        </div>
      </div>
    `,

  getCSS: () => `
      .settings-container {
        display: flex;
        flex-direction: column;
        padding: 2rem;
        background: #f8f9fa;
        height: 100%;
      }
      
      .settings-container h1 {
        font-size: 2rem;
        margin-bottom: 2rem;
        color: #2c3e50;
      }
      
      .settings-list {
        flex: 1;
      }
      
      .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background: white;
        border-radius: 12px;
        margin-bottom: 1rem;
      }
      
      .setting-item label {
        font-size: 1.1rem;
        color: #2c3e50;
      }
    `,

  init: (container) => {

    // Setup toggles
    const darkModeToggle = container.querySelector("#dark-mode-toggle");
    const notificationsToggle = container.querySelector(
      "#notifications-toggle"
    );

    darkModeToggle?.addEventListener("change", (e) => {
      console.log("Dark mode:", e.target.checked);
    });

    notificationsToggle?.addEventListener("change", (e) => {
      console.log("Notifications:", e.target.checked);
    });
  },

  destroy: (container) => {
    console.log("Settings app destroyed");
  },
};
