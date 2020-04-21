/* Default JavaScript for the article editor */

$("#texteditor").prop("CONTENTEDITABLE", "true");

$("#texteditor").on("blur", function() { localStorage.setItem("ed", $(this).html()); });
$("#texteditor").on("keyup", function() { localStorage.setItem("ed",$(this).html()); });
var last_edit = localStorage.getItem("ed");

if (last_edit) {

}

function applyblue()
{
    var text = get_selected_text();
    //alert(text);
}

function strip_css()
{
    document.execCommand("insertHTML", false, "#" + get_selected_html() + "#");

    // Update live preview
    update_live_preview();
}

// get selected html
function get_selected_html()
{
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    return html;
}

// Grab selected text
function get_selected_text()
{
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount)
        {

            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    }
    else if (typeof document.selection != "undefined") {
        html = document.selection.createRange().htmlText;
    }
    return html;
}

function replace_selected_text(replacementText) {
    var sel, range;

    replacementText = "<p>orig <b>new</b> inal</p>";

    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(replacementText));
        }
    }
}

function update_live_preview()
{
    // Get texteditor
    var html = $("#editor").html();

    // Format HTML
    //alert(html);

    // Apply HTML to preview
    $("#preview").html(html);
}