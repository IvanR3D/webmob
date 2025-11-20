const expressionsApp = {
    name: "expressions",
    getHTML: () => `
    <div id="expressions-container" class="screen">
        <button class="back-button">← Back</button>
        <div class="movement-toggle"><label class="toggle-label"><input id="toggleInput" name="toggleInput" type="checkbox" class="toggle-input"><span class="toggle-slider"></span><span class="toggle-text">Add move</span></label></div>
        <div class="expressions-content">
            <h2 class="title">Expressions</h2>
            <p class="screen-subtitle">Control your robot's expressions</p>

            <div class="buttons-grid">
                <button class="btn btn-secondary" data-expression="happy">Happy</button>
                <button class="btn btn-secondary" data-expression="sad">Sad</button>
                <button class="btn btn-secondary" data-expression="angry">Angry</button>
                <button class="btn btn-secondary" data-expression="focused">Focused</button>
                <button class="btn btn-secondary" data-expression="confused">Confused</button>
            </div>
        </div>
    </div>
    `,
    getCSS: () => `
    #expressions-container {
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

    .movement-toggle {
        position: absolute;
        top: 2%;
        right: 2%;
    }

    .toggle-label {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .toggle-input { display: none; }

    .toggle-slider {
        width: 3rem;
        height: 1.3rem;
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: .4s;
        border-radius: 30px;
        box-shadow: inset 0 2px 4px #0000001a;
    }

    .toggle-slider:before {
        position: absolute;
        content: "";
        height: 19px;
        width: 19px;
        left: 2px;
        bottom: 0;
        background-color: #fff;
        transition: .4s;
        border-radius: 50%;
        box-shadow: 0 2px 4px #0003;
    }

    .toggle-input:checked+.toggle-slider {
        background: var(--secondary-mint-green);
    }

    .toggle-input:checked+.toggle-slider:before {
        transform: translate(25px);
    }

    .toggle-text {
        position: relative;
        top: 20px;
        color: #2c3e50;
        font-size: var(--text-caption);
    }

    .buttons-grid {
        max-width: 380px;
        display: grid;
        grid-template-columns: repeat(2, minmax(150px, 1fr));
        gap: 1rem;
        margin: 0 auto;
        padding: 0 1rem;
    }
    `,
    init: () => {
        const EXPRESSION_MOVEMENTS = {
            happy: { id: 2, label: "Bounce", say: "Bouncing", command: "<BX,1>" },
            sad: { id: 9, label: "Shake Left Leg", say: "shaking left leg", command: "<LY,1>", },
            angry: { id: 4, label: "Wobble", say: "Wobbling", command: "<WX,1>" },
            focused: { id: 7, label: "Tap Feet", say: "tapping", command: "<TX,1>" },
            confused: { id: 5, label: "Wobble Right", say: "wobbling right", command: "<WZ,1>", },
        };
        const grid = document.querySelector('.buttons-grid');
        grid.addEventListener('click', (event) => {
            const checked = document.getElementById('toggleInput').checked;
            if (event.target.tagName === 'BUTTON') {
                const expression = event.target.dataset.expression;
                eyesController.express({
                    type: expression,
                    duration: 1000
                });
                if (checked) {
                    sendData(EXPRESSION_MOVEMENTS[expression].command);
                }
            }
        });
        // Back button
        const backButton = document.querySelector(".back-button");
        if (backButton) {
        backButton.addEventListener("click", () => {
            loadScreen(0);
            currentScreen = 0;
        });
        }
    }
}