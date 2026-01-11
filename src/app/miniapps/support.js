const supportApp = {
  name: "support",
  getHTML: () => `
      <div id="support-container" class="screen">
        <button class="back-button">←</button>
        <a class="support-btn" href="https://github.com/sponsors/IvanR3D" target="_blank">Support WebMob</a>
        <h2 class="title">Help us keep the project growing</h2>
        <div>
            <p>
                WebMob is a web-based version of the app for <a href="https://www.cevinius.com/mobbob/" target="_blank" rel="noopener noreferrer">MobBob</a> robot originally created by Cevinius. Turning it into a web app will allow easier maintenance of the app being cross-platform. <a href="https://ivanr3d.com/projects/webmob/get-started.html">Build your own WebMob.</a>
            </p>
            <p>If you find it valuable, please consider supporting our efforts with a small donation. Your contribution will help to continue to grow and bring more innovative features to the project. Together, we can make a difference!</p>
        </div>
    </div>
    `,
  // CSS styles
  getCSS: () => `
      #support-container {
        display: flex;
        flex-direction: column;
        padding: var(--space-xlarge);
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

      .support-btn {
        padding: 0.5rem 1rem;
        background: var(--secondary-mint-green);
        border: 2px solid var(--neutral-light-gray);
        border-radius: var(--radius-medium);
        cursor: pointer;
        font-size: 1rem;
        color: #fff;
        transition: all var(--transition-normal);
        align-self: center;
        text-decoration: none;
      }
  
      .title {
        font-size: 1.4rem;
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