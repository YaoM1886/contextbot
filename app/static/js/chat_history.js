// extract worker's prolific ID
var prolific_q_str = window.location.search;
const w_id = prolific_q_str.split("?PROLIFIC_PID=")[1]

// start loading the experiment page
$("document").ready(function(){
    $.ajax({
        type: "POST",
        url: "/setTime",
        data: JSON.stringify({
            "prolificID": w_id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            console.log(JSON.stringify(data));
        }
    });


    // show the chat history in the window
    for (i=0; i<historyBotText.length; i++) {
        $("#chatContainer").append("<div class='userMsg'>" + "<span class='user'>User: </span>" + historyUserText[i] + "</div>" + "<br>");
        $("#chatContainer").append("<div class='coachMsg'>" + "<span class='coach'>Coach: </span>" + historyBotText[i] + "</div>" + "<br>");
    }

    // append the current user utterance to the last and scroll to the bottom
    $("#chatContainer").append("<div class='userMsg'>"+"<span class='user'>User: </span>"+historyUserText[historyUserText.length-1]+"</div>"+"<br>");
    $('#chatContainer').scrollTop($('#chatContainer')[0].scrollHeight);


});
$("#textbox").keypress(function(event){
    //    to check only for enter key (13 is value for enter)
    if(event.which==13){
        $("#sendBtn").click();

        // to prevent creating new line on pressing Enter key, when checkbox is checked
        event.preventDefault();
    }
});

$("#sendBtn").on("click", function(){
    var newmsg=$("#textbox").val();

    $.ajax({
        type: "POST",
        url: "/message",
        data: JSON.stringify({
            "message": newmsg,
            "status": "Added"
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            console.log(JSON.stringify(data));
        }
    });

    // before clearing the textbox we store its values in variable newmsg
    $("#textbox").val("");
    // to display users message on screen
    $("#chatContainer").append("<div class='coachMsg'>"+"<span class='coach'>Coach: </span>"+"<span>"+newmsg+"</span>"+"&nbsp;"+"<button type='reset' class='reset' style='font-size: 13px'>Reset</button>"+"</div>"+"<br>");
    // to scroll the contents in container in case of overflow
    $("#chatContainer").scrollTop($("#chatContainer").prop("scrollHeight"));
    // converts all user inputs to lower case
    $('#chatContainer').scrollTop($('#chatContainer')[0].scrollHeight);

});

$(document).on("click", "#chatContainer .coachMsg .reset", function (){
    $(this).parent().remove();
    $("#textbox").val($(this).prev().text());
    $.ajax({
        type: "POST",
        url: "/message",
        data: JSON.stringify({
            "message": $(this).prev().text(),
            "status": "Deleted"
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            console.log(JSON.stringify(data));
        }
    });
});