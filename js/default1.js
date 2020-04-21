/* Default JavaScript per any content page */

function html5_storage() { try { return 'localStorage' in window && window['localStorage'] !== null; } catch (e) { return false; } }

$(document).ready(function()
{
    /* Dress up code blocks */
    //applyCodeStyle($("#content section"));

    /* Format LI spacing */
    /*
    $(".cat_list a").wrap("<span/>"); */

    //$("a").on("mouseover", function() { $(this).removeAttr('title'); } );

   // $("a").on("mouseover", function() { $(this).css('background', '#ffff00'); } );

    /* Need to do this once on load */
    $(window).resize();

    /* Pre-load search results */

    /*
    $.ajax( { url : '<?php print $URL; ?>/admin/search-results-listing.php',
             type : 'post',
           success : function(msg) {

                   $("#FutureSearchResults").html(msg);
                   // calculate search results #s, populate search placeholder
                   var total_articles = $('#Collection li').length;
                   var s = "";
                   if (total_articles != 1) s = "s";
                   $("#Search input").attr("placeholder", "Search among " + total_articles +  " article" + s);


               }

           } ); */ 

});

function LookUp(value)
{
    var filter = new RegExp(value, "ig");

    $(".SearchResults").html("");

    if (value == "") return;

    var x = 0;

    var matched = 0;

    $('#Collection li').each(function()
    {

       if ($(this).text().match(filter))
       {
           $(".SearchResults").prepend("<p>" + $(this).html() + "</p>");
           matched++;
       }

    });

    $("#ResultsMag").hide();

    if (matched == 0)
        $(".SearchResults").prepend("<h2>No articles found.</h2>");

    if (matched > 0)
    {
        if (matched == 1)
            $(".SearchResults").prepend("<h2>1 article found:</h2>");
        else
            $(".SearchResults").prepend("<h2>" + matched + " articles found:</h2>");

        $("#ResultsMag").show();
    }

}