var codeStyle = {
    keyword: '#0000ff',
    comment: '#777777',
    jquery_method: '#950095',
    html_tag: '#ad3d00' 
};

/* Format all code within <code> tags. Accepts an HTML string. */
function applyCodeStyle(element) {

    /* Element as a string */
    var str = "";

    /* Is this an object of type jQuery? (All jQuery objects contain a method called "animate" and method "on") */
    if (element.animate != undefined && element.on != undefined)
    {
        /* Not a string. A jQuery object. Convert to string. */
        str = element.html();

        if (str == undefined)
            str = "";
    }

    /* First, overwrite keyword highlighting in comments */
    $("body").prepend("<style type = 'text/css'>.comment i { color: " + codeStyle.comment + " !important; }</style>");

    var m = 0;
    var matches = str.match(/<code>[\S\s]*?<\/code>/gi);
    str = str.replace(/<code>[\S\s]*?<\/code>/gi, "<code></code>");

    $("code", element).each(

        function(index, object)
        {
            var replacement = "";
            
            /* Add color to keywords and comments */
            replacement = matches[m].substr(6,matches[m].length-13);

            /* < > brackets */
            replacement = replacement.replace(/</g,"&lt;").replace(/>/g,"&gt;");//.replace(/ /g, "&nbsp");

            /* HTML */
            replacement = replacement.replace(/&lt;(\/)?(doctype|abbr|acronym|address|applet|area|base|basefont|bdo|big|blockquote|body|button|caption|center|cite|code|col|colgroup|dd|del|dfn|fieldset|font|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|hr|html|iframe|img|input|ins|isindex|kbd|label|legend|link|map|menu|meta|noframes|noscript|object|ol|optgroup|option|param|pre|samp|script|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|thead|title|tr|tt|ul|var|br|dir|div|dl|dt|li|em|u|th|s|a|b|p|q|i)(.*?)&gt;/g, "&lt;$1<span style = 'color: " + codeStyle.html_tag + "'>$2</span>$3&gt;");

            /* <BR> tags */
            replacement = replacement.replace(/\n/g,"<br/>");

            replacement = replacement.replace(/\b(true|false|var|function|for|break|case|catch|continue|debugger|default|delete|do|else|finally|if|in|instanceof|new|return|switch|this|throw|try|typeof|void|while|with)\b/g, "<i style = 'color: " + codeStyle.keyword + "; font-style:normal;'>$1</i>").replace(/(\/\/(.*?)(<br\/>|$))/g, '<span class = "comment" style = "color: ' + codeStyle.comment + ' !important;">$1</span>').replace(/\/\*(.*?)\*\//g, "<span class = 'comment' style = 'color: " + codeStyle.comment + "; font-style:normal;'>/*$1*/</span>");

            /* Apply color to jQuery prototype methods */
            replacement = replacement.replace(/(\$|jQuery)\.(Animation|Callbacks|Deferred|documented|hereEvent|documented|hereTween|_data|_evalUrl|_queueHooks|_removeData|acceptData|access|ajax|ajaxPrefilter|ajaxSetup|ajaxTransport|attr|buildFragment|camelCase|cleanData|clone|contains|css|data|dequeue|dir|each|error|extend|filter|find|fx|get|getJSON|getScript|globalEval|grep|hasData|holdReady|inArray|isArray|isEmptyObject|isFunction|isNumeric|isPlainObject|isWindow|isXMLDoc|makeArray|map|merge|noConflict|nodeName|noop|now|param|parseHTML|parseJSON|parseXML|post|prop|proxy|queue|ready|removeAttr|removeData|removeEvent|sibling|speed|style|swap|text|trim|type|unique|when)/g, "$1.$2<span style = 'color: " + codeStyle.jquery_method + "'></span>");

            /* Apply color to main jQuery object methods (utility) */
            replacement = replacement.replace(/(\$|jQuery)(.*?)\.(add|addBack|addClass|after|ajaxComplete|ajaxError|ajaxSend|ajaxStart|ajaxStop|ajaxSuccess|andSelf|animate|append|appendTo|attr|before|bind|blur|change|children|clearQueue|click|clone|closest|constructor|contents|contextmenu|css|data|dblclick|delay|delegate|dequeue|detach|domManip|each|empty|end|eq|error|extend|fadeIn|fadeOut|fadeTo|fadeToggle|filter|find|finish|first|focus|focusin|focusout|get|has|hasClass|height|hide|hover|html|index|init|innerHeight|innerWidth|insertAfter|insertBefore|is|keydown|keypress|keyup|last|load|map|mousedown|mouseenter|mouseleave|mousemove|mouseout|mouseover|mouseup|next|nextAll|nextUntil|not|off|offset|offsetParent|on|one|outerHeight|outerWidth|parent|parents|parentsUntil|position|prepend|prependTo|prev|prevAll|prevUntil|promise|prop|push|pushStack|queue|ready|remove|removeAttr|removeClass|removeData|removeProp|replaceAll|replaceWith|resize|scroll|scrollLeft|scrollTop|select|serialize|serializeArray|show|siblings|size|slice|slideDown|slideToggle|slideUp|sort|splice|stop|submit|text|toArray|toggle|toggleClass|trigger|triggerHandler|unbind|undelegate|unload|unwrap|val|width|wrap|wrapAll|wrapInner)/g, "$1$2.<span style = 'color: " + codeStyle.jquery_method + "'>$3</span>");

            $(object).html(replacement);

            m++;

        });
}

$(window).resize(function() {
    var w = 640;
    if (navigator.appName == 'Microsoft Internet Explorer') {
        w = getViewport()[0];
    }
    else {
        w = $(window).width();
    }
    w -= 250; /* subtract sidebar */
    $("code").css("max-width", w + "px");

} );



// Wow, thanks, IE.
function getViewport() {
 var viewPortWidth;
 var viewPortHeight;
 // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
 if (typeof window.innerWidth != 'undefined') {
   viewPortWidth = window.innerWidth,
   viewPortHeight = window.innerHeight
 }
// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
 else if (typeof document.documentElement != 'undefined'
 && typeof document.documentElement.clientWidth !=
 'undefined' && document.documentElement.clientWidth != 0) {
    viewPortWidth = document.documentElement.clientWidth,
    viewPortHeight = document.documentElement.clientHeight
 }
 // older versions of IE
 else {
   viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
   viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
 }
 return [viewPortWidth, viewPortHeight];
}

function getScrollBarWidth () {
  var inner = document.createElement('p');
  inner.style.width = "100%";
  inner.style.height = "200px";

  var outer = document.createElement('div');
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild (inner);

  document.body.appendChild (outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;
  if (w1 == w2) w2 = outer.clientWidth;

  document.body.removeChild (outer);

  return (w1 - w2) + 1;
};



/*
decodeURI
decodeURIComponent
encodeURI
encodeURIComponent
escape
eval
isFinite
isNaN
isXMLName
Number("string")
parseFloat("string")
parseInt
toString
unescape
*/