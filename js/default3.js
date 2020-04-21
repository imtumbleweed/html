
    var html5_storage = true;

    function to_admin() { if (html5_storage) localStorage["adminView"] = 0; $("#Editor").hide(); $("#VerticalPane").hide(); }

    function to_editor() { if (html5_storage) localStorage["adminView"] = 1; $("#Editor").show(); $("#VerticalPane").show(); }

    $(document).ready(function()
    {
        $.ajax({ url: "get-web-template.php", type: "POST", success: function(msg) {
            $("#template").val(msg);
        } });

        // Select current template
        $("#template").on("change", function(event)
        {
            $.ajax({ url: "update-web-template.php",
                     type: "POST",
                     data: { webtemplate: $(this).val() },
                     success: function(msg)
                     {

                     }
                   });
        });

        // Apply sortable
        $("ul#sections").sortable(
        {
            update: function()
            {
                var res = $(this).sortable('toArray');
                //alert(res);
                $.ajax( {
                    url: "order-section.php",
                    type: "POST",
                    data: { order: res },
                    success: function(r) { /* alert(r); */ }
                });
            }
        });

        var d = new Date();
        $("#sched_month").val("" + (d.getMonth() + 1));//val("May");//("selected", true);

        // Hide schedule date view on start
        //$('#ScheduleDate').hide();





    });

    $("#text-editor").prop("CONTENTEDITABLE", "true");
    $("#text-editor").on("blur", function() { localStorage.setItem("ed", $(this).html()); });
    $("#text-editor").on("keyup", function() { localStorage.setItem("ed",$(this).html()); });
    var last_edit = localStorage.getItem("ed");

    if (last_edit) {

    }

    function applyblue()
    {
        var text = get_selected_text();
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

       // replacementText = "<p>orig <b>new</b> inal</p>";

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

    function update_rss()
    {
        if ($("#rss_dir").val() == "")
        {
            alert("rss filename cannot be empty.");
            return;
        }
        $.ajax(
            {
                url:'../rss/write-rss.php',
                data: { filename: $("#rss_dir").val()},
                //type: "POST",
                success:function(msg)
                {
                    $('#rss_status').html(msg).show();
                    setTimeout(function() {
                        $('#rss_status').fadeOut()},1000);
                    }
            });
    }

    // settings popup only
    // compare time now and currently set time (scheduled time)
    // and return the difference
    function get_time_left(msg)
    {
        $.ajax( { url: 'get-time-left.php',
                 type: 'POST',
                 data: { "time": '' + msg },
              success: function(m)
              {
                  $('#sched_time_left').text(m + ' left')
              }
        } );
    }

    // settings popup only
    function get_next_available_schedule_date()
    {
        $.ajax( { url: 'get-next-available-schedule-date.php',
              success: function(m) {

                  var date = m.split("");

                  $('#sched_year').val("");
                  $('#sched_month').val("");
                  $('#sched_day').val("");
                  $('#sched_time').val("7:00am EDT");

                  get_time_left($('#sched_year').val() + '-' + $('#sched_month').val() + '-' + $('#sched_day').val() + ' ' + $('#sched_time').val());

                  $('#sched_time_left').text(m + ' left')
              }
        } );

    }

    //
    function set_schedule_time(key, time_str)
    {
        $.ajax( { url: 'set-schedule-time.php',
                type: 'POST',
                data: { 'key': key,
                        'time': time_str },
              success: function(m) {

                  // if key == article on the QueuedArticles list
                  var target = $("#sched_" + key + " .timeleft");

                  target.html("<img src = '<?php print $URL; ?>/Images/icon-scheduled.png' /><a href = '#' onclick = ''>" + m + "</a>");

              }
        } );
    }