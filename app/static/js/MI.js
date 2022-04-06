// identify the positivity or negativity of the quickReply button by regex processing
function preprocessReply(reply_string){
    const re = /Sure|Yes|Hmm|Maybe|Nice|Okay|Wow*/;
    return (re.test(reply_string));
}

// add quickReply buttons in a row
function addQuickReplyBtn(options) {
    var q = "<div class='action_btn'>";
    var arrayLength = options.length;
    for (var i = 0; i < arrayLength; i++) {
        q += "<button class='quickReplyBtn' style='margin:20px' type='button'>" + options[i] + "</button>";
    }
    q+= "<br></div>";
    $('#botContainer').append(q);
}


// automatically send the quickReply choice from the worker side
function sendReply(callbackReply, cxtTag){
    $(".quickReplyBtn").one("click", function(){
        var text = $(this).text();
        $('#botContainer div').last().remove();
        workerSendMessage(text);

        $.ajax({
            type: "POST",
            url: "/workerClick",
            data: JSON.stringify({
                "b_name": text
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                console.log(JSON.stringify(data));
            }
        });

        replyBool = preprocessReply(text);

        // determine to show which context in the conversational flow
        callbackReply(replyBool, cxtTag);
    })
}

// control the conversational flow of context dimensions
function callbackReply(replyBool, cxtTag){
    if (replyBool && cxtTag == "greeting"){
        addCxtPrompts("greeting");
        setTimeout(()=>{
            addQuickReplyBtn(["Sure, let us begin!", "Hmm...I think so."]);
            $('#botContainer').scrollTop($('#botContainer')[0].scrollHeight);
            sendReply(callbackReply, "social_cxt_MI");
        },1800);

    }else if (replyBool && cxtTag == "social_cxt_MI"){
        addCxtPrompts("social_cxt_MI");
        setTimeout(() => {
            addQuickReplyBtn(["Yes, very clear!", "Well...I still don't understand."]);
            $('#botContainer').scrollTop($('#botContainer')[0].scrollHeight);
            sendReply(callbackReply, "linguistic_cxt_MI");
        }, 1800);

    }else if (replyBool && cxtTag == "linguistic_cxt_MI"){
        addCxtPrompts("linguistic_cxt_MI");
        setTimeout(() => {
            addQuickReplyBtn(["Yes, I'm totally aware now!", "Not really...I am confused."]);
            $('#botContainer').scrollTop($('#botContainer')[0].scrollHeight);
            sendReply(callbackReply, "semantic_cxt_MI");
        }, 5000);
    }else if (replyBool && cxtTag == "semantic_cxt_MI"){
        addCxtPrompts("semantic_cxt_MI");
        setTimeout(() => {
            addQuickReplyBtn(["Yes, I am ready!", "Maybe...you can tell me more."]);
            $('#botContainer').scrollTop($('#botContainer')[0].scrollHeight);
            sendReply(callbackReply, "cognitive_cxt_MI");
        }, 6000);
    }else if (replyBool && cxtTag == "cognitive_cxt_MI"){
        addCxtPrompts("cognitive_cxt_MI");
        setTimeout(() => {
            addQuickReplyBtn(["Wow, I think I've known enough!", "Okay, anything else?"]);
            $('#botContainer').scrollTop($('#botContainer')[0].scrollHeight);
            sendReply(callbackReply, "templates_MI");
        }, 6000);
    }else if (replyBool && cxtTag == "templates_MI"){
        addCxtPrompts();
        $('#botContainer').scrollTop($('#botContainer')[0].scrollHeight);
    }else if (!replyBool && cxtTag == "linguistic_cxt_MI"){
        messageText = "Don't worry. You will get more information on the user and how to respond sympathetically. Keep following:)";
        contextBotSendMessage(messageText);
        setTimeout(()=>{
            callbackReply(true, "linguistic_cxt_MI");
        }, 1500);
    }else if (!replyBool && cxtTag == "semantic_cxt_MI"){
        contextBotSendMessage(prompts_semantic_cxt_MI);
        setTimeout(()=>{
            addQuickReplyBtn(["Nice, I'd like that.", "Okay, share what you have with me."]);
            $('#botContainer').scrollTop($('#botContainer')[0].scrollHeight);
            sendReply(callbackReply, "semantic_cxt_MI");
        }, 1800);

    }
}


// start the prompts with context
function addCxtPrompts(cxtTag){
    switch (cxtTag){
        case "greeting":
            messageText = "Hi, I am your ContextBot today! I will walk you through the important contexts that have been talked in previous conversation turns. Shall we begin?";
            contextBotSendMessage(messageText);
            break;
        case "social_cxt_MI":
            messageText = `Your role is to act as a coach ${social_cxt_MI}. You need to ${prompts_social_cxt_MI}. How does that sound to you?`;
            contextBotSendMessage(messageText);
            break;
        // add the link
        case "linguistic_cxt_MI":
            contextBotSendMessage(linguistic_cxt_MI);
            setTimeout(()=>{contextBotSendMessage(`Are you now aware of the chat history relevant to the current utterance ?`)}, 3000);
            break;
        case "semantic_cxt_MI":
            messageText1 = `I further summarized some important facts about the user:`;
            messageText2 = semantic_cxt_MI;
            messageText3 =  `Ready to finally get some tips of what intentions you should have when responding to the user? `;
            contextBotSendMessage(messageText1);
            setTimeout(()=>{contextBotSendMessage(messageText2)}, 1000);
            setTimeout(()=>{contextBotSendMessage(messageText3)}, 4000);
            break;
        case "cognitive_cxt_MI":
            messageText1 = `Great! Now find out what the participants of the previous conversation were thinking about.`
            messageText2 = `
                <p>Click each of them to see the intention:</p>
                <button class="collapsible">User's intention</button>
                    <div class="content">
                      <p>${cognitive_cxt_MI_1}</p>
                    </div>
                <button class="collapsible">Previous coach's intention</button>
                    <div class="content">
                      <p>${cognitive_cxt_MI_2}</p>
                    </div>
                <button class="collapsible">Your intention</button>
                    <div class="content">
                      <p>${cognitive_cxt_MI_3}</p>
                    </div>`;
            contextBotSendMessage(messageText1);
            setTimeout(()=>{contextBotSendMessage(messageText2)}, 2000);
            break;
        default:
            messageText = `
                <p>Congratulations! You've known all the relevant information discussed earlier.</p>`;
            contextBotSendMessage(messageText);
            setTimeout(()=>{contextBotSendMessage(prompts_MI)}, 2000);

    }
}


function contextBotSendMessage(messageText){
    const typingHTML = `
            <div class='botMsg'> 
            <div class='botImg'>
            <img height='40%' width='40%' alt='Bot' style='vertical-align:middle' src='/static/img/bot.jpg' />
                    <div class="typing">
                    <span class="circle scaling"></span>
                    <span class="circle scaling"></span>
                    <span class="circle scaling"></span>
                    </div>
            </div>
            </div>
        `;

    const messageHTML = `
                    <div class="botText">
                    ${messageText}
                    </div>
        `;

    setTimeout(()=>{
        $("#botContainer").append(typingHTML);
        $('#botContainer').scrollTop($('#botContainer')[0].scrollHeight);
    }, 500);
    setTimeout(()=>{
        $(".typing").replaceWith(messageHTML);
        $('#botContainer').scrollTop($('#botContainer')[0].scrollHeight);
    }, 1300);

}

function workerSendMessage(messageText){

    $("#botContainer").append("<div style='float:right; margin:10px; font-size:14px; background-color:#425B76; color:white; height:6%; text-align:center; padding:6px; border-radius: 0 3% 3% 3%'>"+messageText+"</div><br><br>");
}

function animateHighlight(){
    $("#highlightCxt"+clickCounter+"").removeClass('unfocused');
    $("#highlightCxt"+clickCounter+"").addClass('focused');
    document.getElementById("highlightCxt"+clickCounter+"").scrollIntoView();
}

function clearHighlight(){
    $("#highlightCxt"+clickCounter+"").removeClass('focused');
    $("#highlightCxt"+clickCounter+"").addClass('unfocused');
}

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

    var highlightCounter = 0;

    // show the chat history in the window
    for (i=0; i<historyBotText.length; i++) {

        if (linguistic_cxt_link_ids["User"].length>0 && linguistic_cxt_link_ids["User"].includes(i)){
            $("#chatContainer").append("<div class='userMsg'>"+"<span class='user'>User: </span>"+"<span id='highlightCxt"+highlightCounter+"'>"+historyUserText[i]+"</span>"+"</div>"+"<br>");
            highlightCounter+=1;
        }else
            $("#chatContainer").append("<div class='userMsg'>"+"<span class='user'>User: </span>"+historyUserText[i]+"</div>"+"<br>");



        if (linguistic_cxt_link_ids["Bot"].length>0 && linguistic_cxt_link_ids["Bot"].includes(i))
        {
            $("#chatContainer").append("<div class='coachMsg'>"+"<span class='coach'>Coach: </span>"+"<span id='highlightCxt"+highlightCounter+"'>"+historyBotText[i]+"</span>"+"</div>"+"<br>");
            highlightCounter+=1;
        }else
            $("#chatContainer").append("<div class='coachMsg'>"+"<span class='coach'>Coach: </span>"+historyBotText[i]+"</div>"+"<br>");
    }

    // append the current user utterance to the last and scroll to the bottom
    $("#chatContainer").append("<div class='userMsg'>"+"<span class='user'>User: </span>"+historyUserText[historyUserText.length-1]+"</div>"+"<br>");
    $('#chatContainer').scrollTop($('#chatContainer')[0].scrollHeight);


});

// after clicking the help icon, start the interaction with ContextBot
$("#helpIcon").click(function(){

    $.ajax({
        type: "POST",
        url: "/workerClick",
        data: JSON.stringify({
            "b_name": "Clicked the ContextBot Icon"
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            console.log(JSON.stringify(data));
        }
    });

    // initial greetings from ContextBot
    $(this).replaceWith(
        "<div id='botWindow'><div id='botHeader'><h5>Get help from ContextBot </h5> </div><div id='botContainer'></div></div>"
    );

    callbackReply(true, "greeting");

});


$("#textbox").keypress(function(event){
    //    to check only for enter key (13 is value for enter)
    if(event.which==13){

        $("#sendBtn").click();
        event.preventDefault();

    }
});

$("#sendBtn").on("click", function(e){
    var newmsg=$("#textbox").val();
    if (newmsg == ""){
            e.preventDefault();
    }else{
        // $(".submit_task").prop("disabled", false);
        $(".submit_task").click(function (){
            task_type = window.location.href.split("com/")[1].split("?PROLIFIC")[0];
            window.location.replace("https://tudelft.fra1.qualtrics.com/jfe/form/SV_1NtVVn8veUJwjBk" + prolific_q_str + "&TASK_TYPE=" + task_type);

            $.ajax({
                type: "POST",
                url: "/endTime",
                data: JSON.stringify({
                    "endTask": true,
                    "expCondition": task_type
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data) {
                    console.log(JSON.stringify(data));
                }
            });

        });

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
    }


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

$(document).on("click", "#botContainer .botMsg .botText #linkToCxt", function(){
    $.ajax({
        type: "POST",
        url: "/workerClick",
        data: JSON.stringify({
            "b_name": "Clicked the linked text"
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            console.log(JSON.stringify(data));
        }
    });

    $("#highlightCxt0").removeClass('unfocused');
    $("#highlightCxt0").addClass('focused');
    for (clickIndex=1; clickIndex<=len_index_highlight_cxt; clickIndex++){
        $("#highlightCxt"+clickIndex+"").removeClass('focused');
        $("#highlightCxt"+clickIndex+"").addClass('unfocused');
    }
});

// choose between linguistic context through back/next buttons
// back button
$(document).on("click", "#botContainer .botMsg .botText .back", function(){
    $.ajax({
        type: "POST",
        url: "/workerClick",
        data: JSON.stringify({
            "b_name": "Clicked the back button"
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            console.log(JSON.stringify(data));
        }
    });

    clearHighlight();
    clickCounter-=1;
    if (clickCounter<0)
        clickCounter = len_index_highlight_cxt;
    animateHighlight();
});

// next button
$(document).on("click", "#botContainer .botMsg .botText .next", function(){
    $.ajax({
        type: "POST",
        url: "/workerClick",
        data: JSON.stringify({
            "b_name": "Clicked the next button"

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            console.log(JSON.stringify(data));
        }
    });

    clearHighlight();
    clickCounter+=1;
    if (clickCounter > len_index_highlight_cxt)
        clickCounter = 0;
    animateHighlight();
});

$(document).on("click", "#botContainer .botMsg .botText .collapsible", function() {

    $.ajax({
        type: "POST",
        url: "/workerClick",
        data: JSON.stringify({
            "b_name": $(this)[0].innerText
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            console.log(JSON.stringify(data));
        }
    });

    $(this)[0].classList.toggle("active");
    var content = $(this)[0].nextElementSibling;
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
});