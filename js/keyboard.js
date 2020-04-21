export function activate_keyboard_shortcuts() { // Keyboard shortcuts

    console.log("Activating keyboard shortcuts.");

    // Map variables representing keys to ASCII codes
    let [ A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z ] = Array.from({ length: 26 }, (v, i) => 65 + i);

    const Delete = 46;
    const Shift = 16;
    const Ctrl = 17;
    const Alt = 18;

    // Arrow keys
    const Left = 37;
    const Right = 39;
    const Up = 38;
    const Down = 40;

    const Escape = 27;

    // Key is pressed
    document.body.addEventListener("keydown", (e) => {

        let key = e.which || e.keyCode;

        if (key == Escape) {
            const cog = document.querySelector(".cog").classList;
            const settings = document.getElementById("settings").classList;
            /* Cancel current overlay */
            if (document.getElementById("x").style.display == 'flex')
                document.getElementById("x").style.display = 'none';
            else
                document.getElementById("o").style.display = 'none';
            /* Cancel cog drop-down */
            settings.remove("active");
            cog.add("inactive");
            cog.remove("active");
            cog.add("inactive");
        }

        if (key == X) {} // delete
        if (key == C) {} // copy
        if (key == V) {} // paste

        if (key == A) {} // A
        if (key == B) {} // B
        /* ...etc... */
        if (key == X) {

        } // X
        if (key == Z) {} // Z

        // Arrows
        if (key == Left) {}
        if (key == Right) {}
        if (key == Up) {}
        if (key == Down) {}

        if (key == Delete) {  }

        if (key == Shift) { window.keyShift = true; }
        if (key == Ctrl) { window.keyCtrl = true; }
        if (key == Alt) { window.keyAlt = true; }

        // Shift + Delete
        if (window.keyShift && key == Delete) {}
        // Shift + Alt
        if (window.keyShift && key == Alt) {}
        // Ctrl + C
        if (window.keyCtrl && key == C) {}
        // Ctrl + V
        if (window.keyCtrl && key == V) {}
    });

    // Key (is) depressed :...(
    document.body.addEventListener("keyup", (e) => {

        const key = e.which || e.keyCode;

        if (key == X) {} // delete
        if (key == C) {} // copy
        if (key == V) {} // paste

        if (key == A) {} // A
        if (key == B) {} // B
        /* ...etc... */
        if (key == Z) {} // Z

        // Arrows
        if (key == Left) {}
        if (key == Right) {}
        if (key == Up) {}
        if (key == Down) {}

        if (key == Delete) { /* delete something currently selected */ }

        if (key == Shift) { window.keyShift = false; }
        if (key == Ctrl) { window.keyCtrl = false; }
        if (key == Alt) { window.keyAlt = false; }

        // Shift + Delete
        if (window.keyShift && key == Delete) {}
        // Shift + Alt
        if (window.keyShift && key == Alt) {}
        // Ctrl + C
        if (window.keyCtrl && key == C) {}
        // Ctrl + V
        if (window.keyCtrl && key == V) {}
    });
}