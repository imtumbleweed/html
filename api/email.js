class Email {
    constructor() {
        this.array = [];
    }
}

// Create payload -- redundant everywhere, now in neat make() function
let make = function(payload) {
    return { method: 'post',
             headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
             body: JSON.stringify(payload) };
}

/* Send test email */
Email.send= function(payload) {
    fetch("/api/email/send", make(payload))
    .then(promise => promise.json()).then(json => {
        if (json.success) {
            console.log(`User data was entered.`);
            console.log(json);
        } else
            console.warn(`User could not be entered!`);
    });
}

export { Email };