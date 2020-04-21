import { User } from "./user.js";
import { Email } from "./email.js";
import { UI } from "./ui.js";

class API {
    constructor() {
        this.user = User;
        this.email = Email;
        this.ui = new UI();
    }
}

export { API };