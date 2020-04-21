// Caret object
window.caret = new Object();
window.caret.coordinates = [];
window.caret.top = 0;
window.caret.left = 0;
window.caret.index = 0;         // Text position / 0-based index of the caret
window.caret.element = null;

// Universal rule for self-closing tags
var SelfClosingTagHasSlash = false;
var SelfClosingTags = ["br", "hr", "img"];
var TotalLength = 0;

// Normalize attribute = signs
function normalize_html(html)
{
    return html.replace(/\s=\s/g, '=');
}

function draw_link( start1, start2, end1, end2, color )
{
    var str = "";
    var height = start2 - start1;
    var s1x = 0;
    var s1y = start1;
    var s2x = 0;
    var s2y = start2;
    var span = 50;//460 - 349;
    var delta1y = (end1 - start1) / span;
    var delta2y = (end2 - start2) / span;
    for (var i = 0; i < 50; i++) {
        var L = i;
        s1y += delta1y;
        height += delta2y - delta1y;
        str += "<div style = 'z-index: 1000000; top: " + s1y + "px;left:" + L + "px; background: " + color + ";position: absolute; width: 1px; height:" + height + "px'></div>";
    }
    $( "#source_code_stripe" ).append( str );
}

function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }
    else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    }
}

var global_markers = new Array();

// First attempt at the solution
function parseChildren(node) {

    if (node == null)
        return;

    // If this a text node, it has no children or open/close tags
    if(node.nodeType == 3) {
        var text = node.textContent.replace(/\r\n|\n|\r/, '');
        var t_len = text.length;
        TotalLength += t_len;
        //        console.log("text - [" + text.replace('/ /g', '*') + "] (" + t_len + ") L=" + TotalLength);
        return;
    }
    // var out = (node.outerHTML.split(">")[0] + ">");
    // TODO: We still need to handle "tbody" tag, when it does exist.
    var len = (node.outerHTML.split(">")[0] + ">").length;
    var tag_name = node.tagName.toLowerCase();
    if (tag_name != "tbody") TotalLength += len;

    for (var i = 0; i < node.childNodes.length; ++i) parseChildren(node.childNodes[i]);

    // Closing tags + skip automatically inserted tags:
    /* if (node.tagName.toLowerCase() != "tbody") { TotalLength += len;
     console.log("- " + node.tagName.toLowerCase() + " (" + len + ") " + " L=" + TotalLength); } */
}

function update_marker(element, element_height)
{
    // Prevent selecting the container itself
    if (element === $("#html-preview")[0]) return;

    //$(element).css('border', '1px solid red');

    // Get clicked tag HTML
    var tag = element.outerHTML;

    var target_offset = $(element).offset();

    // Get original HTML before split character is inserted
    var orig_html = document.getElementById("html-preview").innerHTML;//.replace(/<preview>/g, '').replace(/<\/preview>/g, '');

    // Insert unique separator just before the tag that was clicked, to mark beginning
    $(element).before("[*-*]");

    // Get preview source code
    var html = document.getElementById("html-preview").innerHTML;

    // Remove line breaks
    // html = html.replace(/\r|\n/g, '');

    // Remove tags that were auto-inserted by native normalization process that did not exist in original HTML.
    html = html.replace(/<tbody>/g, '');

    var before_split = html;

    // Split HTML at the tag that was clicked
    html = html.split("[*-*]")[0];

    // Restore preview to original HTML
    $("#html-preview")[0].innerHTML = orig_html;

    // Get start and end of caret in source code
    var caret_start = html.length;
    var caret_end = caret_start + tag.length;

    // setSelectionRange($("#text-editor")[0], caret_start, caret_end);

    var textarea = document.querySelector( "#text-editor" );

    // Not sure if we need this line...
    var fontSize = getComputedStyle(textarea).getPropertyValue('font-size');

    var coordinates_s = getCaretCoordinates(textarea, caret_start);
    var coordinates_e = getCaretCoordinates(textarea, caret_end);

//console.log("greg==="+);

    //coordinates_s.top += $("#text-editor").offset().top - 24;
    //var preview_y_offset = $("#html-preview").offset().top - 48;

    var height = coordinates_e.top - coordinates_s.top;
    if (height == 0) height = 16;

    //var source_code_stripe_Y = $("#html-preview").offset().top;

    var coor1 = coordinates_s.top + $("#dragup").offset().top + 16;
    var coor2 = coor1 + height;

        var margin_top = 10;
        var padding    = 48;

    //var html_preview_top = 97 + margin_top;

    var coor3 = target_offset.top;
    var coor4 = coor3 + element_height;

    console.log( target_offset.top );
    console.log( element_height );
    //console.log( $(element).css("height") );

    // var rnd_color = "#" + ((1<<24)*Math.random()|0).toString(16);

    var value = Math.random() * 0xFF | 0;
    var grayscale = (value << 16) | (value << 8) | value;
    var rnd_color = '#' + grayscale.toString(16);

    //coor3 = coor3 - 48;

    //coor1 =

    draw_link( coor1, coor2, coor3, coor4, rnd_color);
}


$(document).ready(function()
{
    var TextEditor = $("#text-editor");
    var HtmlPreview = $("#html-preview");

    var source = TextEditor.html(); // Before anything; populate both the preview and text area with the HTML source.

    TextEditor.val(source);

    HtmlPreview.html(source);

    var container = document.getElementById("html-preview");

    parseChildren( container );

    var normalized_html = container.innerHTML;

    TextEditor.html( normalized_html );

    HtmlPreview.on("click", function(event) {
        update_marker( event.target, $(event.target).height() );
    });

    /*
    $("*", "#preview").each(function(E, index){
    console.log(index + " - " + E + " - ");
    }); */

    setTimeout(function(){
        var tag = "p"; for (var i = 0; i < $("#html-preview " + tag).length; i++) $($("#html-preview " + tag)[i]).trigger("click");
        var tag = "table"; for (var i = 0; i < $("#html-preview " + tag).length; i++) $($("#html-preview " + tag)[i]).trigger("click");
        var tag = "td"; for (var i = 0; i < $("#html-preview " + tag).length; i++) $($("#html-preview " + tag)[i]).trigger("click");
        var tag = "div"; for (var i = 0; i < $("#html-preview " + tag).length; i++) $($("#html-preview " + tag)[i]).trigger("click");
    },1000);

/*
     var index = 0;
     $("#html-preview td").each(function() { if (index == 0) $(this).trigger("click"); index++; } );
     index = 0;
     $("#html-preview td").each(function() { if (index == 1) $(this).trigger("click"); index++; } );
     index = 0;
     $("#html-preview td").each(function() { if (index == 2) $(this).trigger("click"); index++; } );
*/

    // console.log( global_markers );
});