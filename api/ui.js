class UI {
    constructor() {
        this.message = {
            post: `<div id = "header">
                 <div id = "close" onclick = 'document.getElementById("overlay").style.display = "none"'><span></span></div>
             </div>
             <textarea id = "letter" placeholder = "What's happening?"></textarea>
             <div id = "footer">
                 <div id = "post" style = "text-align: right; padding: 5px;"><div id = "postbutton" type = "button" value = "post">Post</div></div>
             </div>`,
             logout: `<div id = "ui-header">
             <div id = "close" onclick = 'document.getElementById("overlay").style.display = "none"'>
                <span>+</span>
                <div>Message</div>
             </div>
         </div>`,
        };
    }
}

UI.post1 = function() {
    console.log(this);
}

export { UI };