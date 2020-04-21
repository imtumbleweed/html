    class User {
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

    /* Add user to mongo
       payload = { x : 0, y : 0, lat: 0.0, lon: 0.0 } */
    User.register = function(payload) {
        fetch("/api/user/register", make(payload))
        .then(promise => promise.json()).then(json => {
            if (json.success) {
                console.log(`User data was entered.`);
                // Update user array
                //console.log(json.userList);
            } else
                console.warn(`User could not be entered!`);
        });
    }

    /* Get all users who logged into the app within last "10000" seconds
       payload = { secondsAgo : 10000 } */
    User.create1 = function(payload) {
        fetch("/api/get/users", make(payload))
        .then(promise => promise.json())
        .then(json => {
            if (json.success) {
                console.log(`User data was successfully fetched.`);
                // Update user array
                //console.log(json.userList);
            }
            else
                console.warn(`Users could not be fetched!`);
        });
    }

    /* Create user in database
       payload = {
       username   : "felix",
       email      : "felix@thecat.net",
       first_name : "Felix",
       last_name  : "Felicis",
       password   : "Password123",
       type       : "normal" } */
    User.create = function(payload) {
        fetch("/api/user/register", make(payload))
        .then(promise => promise.json())
        .then(json => {
            if (json.success)
                console.log(`User <${payload.username}> <${payload.email_address}> was successfully registered.`);
            else
                console.warn(`User with email address <${payload.email_address}> already exists!`);
        });
    }



    /* Read (get) user from database:
       payload = {
       id: 1,
       token: "ABC123xyz" } */
    User.get = function(payload) {
        fetch("/api/user/get", make(payload)).then(promise => promise.json()).then(json => {
            //console.log(json);
        });
    }

    /* Update user table in database
       payload = {
       id: 1,
       token: "ABC123xyz" } */
    User.update = function(payload) {
        fetch("/api/user/update", make(payload)).then(promise => promise.json()).then(json => {
            //console.log(json);
        });
    }

    /* Delete user from database
       payload = {
       id: 1,
       token: "ABC123xyz" } */
    User.delete = function(payload) {
        fetch("/api/user/delete", make(payload)).then(promise => promise.json()).then(json => {
            console.log(json);
        });
    }

    /* Login and create user session (if credentials match)
       payload = {
       username: "username",
       password: "password" } */
    User.login = function(payload) {
        fetch("/api/user/login", make(payload)).then(promise => promise.json()).then(json => {
            console.log(json);
        });
    }

    /* Confirm verification code (optional)
       payload = {
           email: "felix@gmail.com",
           verification_code: "12345AbcXyz" } */
    User.verify = function(payload) {
        fetch("/api/user/verify", make(payload)).then(promise => promise.json()).then(json => {
            console.log(json)
        });
    }

    // Authenticate user (check if session exists and receive back auth id)
    // token.id = "ABC123xyz"
    // token.timestamp = 12334545670
    // (token in session on server must match token.id from localStorage)
    User.authenticate = function(payload) {
        fetch("/api/user/authenticate", make(payload)).then(promise => promise.json()).then(json => {
            console.log(json);
        });
    }

    /* Post a tweet
       payload = {
       id: 1,
       payload.message: "hello" } */
    User.tweet = function(payload) {
        fetch("/api/tweet/post", make(payload)).then(promise => promise.json()).then(json => {
            console.log(json);
        });
    }

    /* Like a tweet
       payload = {id: 1,
                  tweet_id: 100 } */
    User.like = function(payload) {
        fetch("/api/tweet/like", make(payload)).then(promise => promise.json()).then(json => {
            console.log(json);
        });
    }

    /* Comment on a tweet
        payload = {id: 1,
                   tweet_id: 100,
                   message: "I'm right, #yourewrong"}; */
    User.comment = function(payload) {
        fetch("/api/tweet/comment", make(payload)).then(promise => promise.json()).then(json => {
            console.log(json);
        });
    }

    export { User };