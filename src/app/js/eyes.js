class EyeController {
    constructor(elements = {}, eyeSize = '15vmin') {
        this._eyeSize = eyeSize;
        this._blinkTimeoutID = null;
        this._sleepTimeoutID = null;
        this._lookTimeoutID = null;
        this._isLooking = false;   // NEW: track if eyes are moving
        this.setElements(elements);
    }

    get leftEye() { return this._leftEye; }
    get rightEye() { return this._rightEye; }

    setElements({
        leftEye,
        rightEye,
        upperLeftEyelid,
        upperRightEyelid,
        lowerLeftEyelid,
        lowerRightEyelid,
    } = {}) {
        this._leftEye = leftEye;
        this._rightEye = rightEye;
        this._upperLeftEyelid = upperLeftEyelid;
        this._upperRightEyelid = upperRightEyelid;
        this._lowerLeftEyelid = lowerLeftEyelid;
        this._lowerRightEyelid = lowerRightEyelid;
        return this;
    }

    _createKeyframes({
        tgtTranYVal = 0,
        tgtRotVal = 0,
        enteredOffset = 1 / 3,
        exitingOffset = 2 / 3,
    } = {}) {
        return [
            { transform: `translateY(0px) rotate(0deg)`, offset: 0.0 },
            { transform: `translateY(${tgtTranYVal}) rotate(${tgtRotVal})`, offset: enteredOffset },
            { transform: `translateY(${tgtTranYVal}) rotate(${tgtRotVal})`, offset: exitingOffset },
            { transform: `translateY(0px) rotate(0deg)`, offset: 1.0 },
        ];
    }

    express({
        type = '',
        // level = 3,  // 1: min, 5: max
        duration = 1000,
        enterDuration = 75,
        exitDuration = 75,
    }) {
        if (!this._leftEye) {  // assumes all elements are always set together
            console.warn('Eye elements are not set; return;');
            return;
        }

        const options = {
            duration: duration,
        };

        switch (type) {
            case 'happy':
                return {
                    lowerLeftEyelid: this._lowerLeftEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * -2 / 3)`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                    lowerRightEyelid: this._lowerRightEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * -2 / 3)`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                };

            case 'angry':
                return {
                    upperLeftEyelid: this._upperLeftEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * 1 / 3)`,
                        tgtRotVal: `-20deg`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                    upperRightEyelid: this._upperRightEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * 1 / 3)`,
                        tgtRotVal: `20deg`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                };

            case 'sad':
                return {
                    upperLeftEyelid: this._upperLeftEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * 1 / 4)`,
                        tgtRotVal: `30deg`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                    upperRightEyelid: this._upperRightEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * 1 / 4)`,
                        tgtRotVal: `-30deg`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                };

            case 'focused':
                return {
                    upperLeftEyelid: this._upperLeftEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * 1 / 3)`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                    upperRightEyelid: this._upperRightEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * 1 / 3)`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                    lowerLeftEyelid: this._lowerLeftEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * -1 / 3)`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                    lowerRightEyelid: this._lowerRightEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * -1 / 3)`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                }

            case 'confused':
                return {
                    upperRightEyelid: this._upperRightEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * 1 / 3)`,
                        tgtRotVal: `-10deg`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                }

            default:
                console.warn(`Invalid input type=${type}`);
        }
    }

    blink({ duration = 150 } = {}) {
        if (this._isLooking) return; // 🚫 skip blink while looking
    
        if (!this._leftEye) {
            console.warn('Eye elements are not set; return;');
            return;
        }
    
        [this._leftEye, this._rightEye].map((eye) => {
            eye.animate([
                { transform: 'rotateX(0deg)' },
                { transform: 'rotateX(90deg)' },
                { transform: 'rotateX(0deg)' },
            ], {
                duration,
                iterations: 1,
            });
        });
    }
    

    sleep({
        duration = 1000,  // in ms
    } = {}) {
        if (!this._leftEye) {  // assumes all elements are always set together
            console.warn('Eye elements are not set; return;');
            return;
        }

        [this._leftEye, this._rightEye].map((eye) => {
            eye.animate([
                { transform: 'rotateX(85deg)' },
                { transform: 'rotateX(80deg)' },
                { transform: 'rotateX(85deg)' },
            ], {
                duration,
                iterations: 1,
            });
        });
    }

    sleeping() {
        // Clear all existing animations and timeouts
        this.stopBlinking();
        this.stopLookingAround();
        
        // Clear any existing sleep timeout
        if (this._sleepTimeoutID) {
            clearTimeout(this._sleepTimeoutID);
            this._sleepTimeoutID = null;
        }
        
        // Immediately set eyes to closed state
        this._leftEye.style.transform = "rotateX(85deg)";
        this._rightEye.style.transform = "rotateX(85deg)";
        
        // Stop any ongoing animations on the eyes
        if (this._leftEye.getAnimations) {
            this._leftEye.getAnimations().forEach(anim => anim.cancel());
        }
        if (this._rightEye.getAnimations) {
            this._rightEye.getAnimations().forEach(anim => anim.cancel());
        }
        
        // Create a gentle breathing sleep animation (slower and more subtle)
        const animateSleep = () => {
            // Use a very slow, subtle sleep animation
            const sleepAnim = [
                { transform: "rotateX(85deg)" },
                { transform: "rotateX(80deg)" },
                { transform: "rotateX(85deg)" }
            ];
            
            const sleepOptions = {
                duration: 3000, // Much slower breathing
                easing: 'ease-in-out',
                fill: 'forwards'
            };
            
            this._leftEye.animate(sleepAnim, sleepOptions);
            this._rightEye.animate(sleepAnim, sleepOptions);
            
            // Repeat after longer delay
            this._sleepTimeoutID = setTimeout(animateSleep, 3500);
        };
        
        // Start the sleep animation
        animateSleep();
    }
    
    wakeUp() {
        this.stopBlinking();
        if (this._sleepTimeoutID) {
            clearTimeout(this._sleepTimeoutID);
            this._sleepTimeoutID = null;
        }
    
        if (this._leftEye.getAnimations) {
            this._leftEye.getAnimations().forEach(anim => anim.cancel());
        }
        if (this._rightEye.getAnimations) {
            this._rightEye.getAnimations().forEach(anim => anim.cancel());
        }
    
        const wakeAnimation = [
            { transform: "rotateX(85deg)" },
            { transform: "rotateX(0deg)" }
        ];
    
        const wakeOptions = {
            duration: 400,
            easing: 'ease-out',
            fill: 'forwards'
        };
    
        this._leftEye.animate(wakeAnimation, wakeOptions);
        this._rightEye.animate(wakeAnimation, wakeOptions);
    
        setTimeout(() => {
            this.startBlinking();
            this.startLookingAround();
        }, 500);
    }
    

    startBlinking({ maxInterval = 5000 } = {}) {
        if (!this._leftEye) {
            console.warn('Eye elements are not set; return;');
            return;
        }
        if (this._blinkTimeoutID) {
            console.warn(`Already blinking with timeoutID=${this._blinkTimeoutID}; return;`);
            return;
        }
        const blinkRandomly = (timeout) => {
            this._blinkTimeoutID = setTimeout(() => {
                this.blink();
                blinkRandomly(Math.random() * maxInterval);
            }, timeout);
        }
        blinkRandomly(Math.random() * maxInterval);
    }

    stopBlinking() {
        clearTimeout(this._blinkTimeoutID);
        this._blinkTimeoutID = null;
        
        // Also stop any ongoing blink animations
        if (this._leftEye && this._leftEye.getAnimations) {
            this._leftEye.getAnimations().forEach(anim => {
                if (anim.effect && anim.effect.getKeyframes().some(kf => kf.transform.includes('rotateX(90deg)'))) {
                    anim.cancel();
                }
            });
        }
        if (this._rightEye && this._rightEye.getAnimations) {
            this._rightEye.getAnimations().forEach(anim => {
                if (anim.effect && anim.effect.getKeyframes().some(kf => kf.transform.includes('rotateX(90deg)'))) {
                    anim.cancel();
                }
            });
        }
    }

    setEyePosition(eyeElem, x, y, isRight = false) {
        if (!eyeElem) {  // assumes all elements are always set together
            console.warn('Invalid inputs ', eyeElem, x, y, '; retuning');
            return;
        }

        if (!x) {
            if (!isRight) {
                eyeElem.style.left = `calc(${this._eyeSize} / 3 * 2 * ${x})`;
            } else {
                eyeElem.style.right = `calc(${this._eyeSize} / 3 * 2 * ${1 - x})`;
            }
        }
        if (!y) {
            eyeElem.style.bottom = `calc(${this._eyeSize} / 3 * 2 * ${1 - y})`;
        }
    }

    startLookingAround({ maxInterval = 4000 } = {}) {
        if (!this._leftEye || !this._rightEye) {
            console.warn('Eye elements are not set; return;');
            return;
        }
        if (this._lookTimeoutID) return; // already running
    
        const moveEyesRandomly = (timeout) => {
            this._lookTimeoutID = setTimeout(() => {
                const x = (Math.random() * 2 - 1) * 10; // -10px to +10px
                const y = (Math.random() * 2 - 1) * 10; // -10px to +10px
    
                // Pause blinking while looking
                this._isLooking = true;
                this.stopBlinking();
    
                const animations = [this._leftEye, this._rightEye].map((eye) =>
                    eye.animate([
                        { transform: eye.style.transform || "translate(0px,0px)" },
                        { transform: `translate(${x}px, ${y}px)` }
                    ], {
                        duration: 600,
                        fill: 'forwards',
                        easing: 'ease-in-out',
                    })
                );
    
                // When done, resume blinking
                Promise.all(animations.map(anim => anim.finished)).then(() => {
                    this._isLooking = false;
                    this.startBlinking(); // resume natural blinking
                });
    
                moveEyesRandomly(Math.random() * maxInterval + 1000);
            }, timeout);
        };
    
        moveEyesRandomly(Math.random() * maxInterval);
    }
    
    
    stopLookingAround() {
        clearTimeout(this._lookTimeoutID);
        this._lookTimeoutID = null;
    
        if (this._leftEye) this._leftEye.getAnimations().forEach(anim => anim.cancel());
        if (this._rightEye) this._rightEye.getAnimations().forEach(anim => anim.cancel());
    
        // Reset to center
        this._leftEye.style.transform = "translate(0px,0px)";
        this._rightEye.style.transform = "translate(0px,0px)";
    }
    
}

const eyesController = new EyeController({
    leftEye: document.querySelector('.left.eye'),
    rightEye: document.querySelector('.right.eye'),
    upperLeftEyelid: document.querySelector('.left .eyelid.upper'),
    upperRightEyelid: document.querySelector('.right .eyelid.upper'),
    lowerLeftEyelid: document.querySelector('.left .eyelid.lower'),
    lowerRightEyelid: document.querySelector('.right .eyelid.lower'),
});