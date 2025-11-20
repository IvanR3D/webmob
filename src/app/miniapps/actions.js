const actionsApp = {
    name: "actions",
    getHTML: () => `
    <div id="actions-container" class="screen">
        <button class="back-button">← Back</button>

        <div class="actions-content">
            <h2 class="title">Actions</h2>
            <p class="screen-subtitle">Test your robot's actions</p>

            <div class="buttons-grid">
                <!-- Action buttons go here -->
            </div>
        </div>
    </div>
    `,
    getCSS: () => `
    #actions-container {
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

    .buttons-grid {
        max-width: 380px;
        display: grid;
        grid-template-columns: repeat(3, minmax(150px, 1fr));
        gap: 1rem;
        margin: 0 auto;
        padding: 0 1rem;
        justify-content: center;
    }
    `,
    init: () => {
        const ACTIONS = [
            { id: 1, label: "Shake", say: "shaking", command: "<SX,1>" },
            { id: 2, label: "Bounce", say: "Bouncing", command: "<BX,1>" },
            { id: 3, label: "Wobble Left", say: "Wobbling left", command: "<WY,1>" },
            { id: 4, label: "Wobble", say: "Wobbling", command: "<WX,1>" },
            { id: 5, label: "Wobble Right", say: "wobbling right", command: "<WZ,1>" },
            { id: 6, label: "Tap Left Foot", say: "tapping left foot", command: "<TY,1>", },
            { id: 7, label: "Tap Feet", say: "tapping", command: "<TX,1>" },
            { id: 8, label: "Tap Right Foot", say: "tapping right", command: "<TZ,1>" },
            { id: 9, label: "Shake Left Leg", say: "shaking left leg", command: "<LY,1>", },
            { id: 10, label: "Shake Legs", say: "shaking legs", command: "<LX,1>" },
            { id: 11, label: "Shake Right Leg", say: "shaking right leg", command: "<LZ,1>", },
        ];
        const grid = document.querySelector('.buttons-grid');
        ACTIONS.map(action =>
            grid.innerHTML += `
            <button class="btn btn-secondary" data-action="${action.id}">
                <p>${action.label}</p>
            </button>`
        ).join('');
        // Action buttons
        const actionButtons = document.querySelectorAll('.btn-secondary');
        actionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const actionId = button.dataset.action;
                const action = ACTIONS.find(a => a.id === parseInt(actionId));
                if (action) {
                    console.log(action)
                    say(action.say);
                    sendData(action.command);
                }
            });
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