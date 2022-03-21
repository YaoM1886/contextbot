// js script for early_MI condition

// extract worker's prolific ID
var prolific_q_str = window.location.search;
const w_id = prolific_q_str.split("?PROLIFIC_PID=")[1]

// different dimensions of contexts
const social_cxt_MI = "to <strong>listen to and engage the user in this session</strong>";
const semantic_cxt_MI = `<ul>
<li>The user has broken up with her boyfriend. </li>
<li>She also feels upset and confused about what's been going on.</li>
<li>Her past romantic relationships were awful. </li>
</ul>`;
const cognitive_cxt_MI_1 = `<dl>
<dd>seek for help and reasons with her down emotions and bad relationships;</dd>
</dl>`;
const cognitive_cxt_MI_2 = `<dl>
<dd> provide empathetic and reflective responses in terms of the user's problems;</dd>
</dl>`;
const cognitive_cxt_MI_3 = `<dl>
<dd>continue improving the engagement of this dialog by providing <strong>empathetic and reflective listening</strong>.</dd>
</dl>`;

// insert the chat history here
const historyBotText = ["You are feeling upset and confused. One confusing thing, then, is you don\u2019t understand why you\u2019re doing what you\u2019re doing. What\u2019s been happening?", "This blowup wasn\u2019t the first time that\u2019s happened to you.", "Kind of like a pattern that\u2019s repeating itself."];
const historyUserText=
    ["I feel like I am falling apart. I don\u2019t have any energy. I don\u2019t know what is going on with me.",
        " I just broke up with my boyfriend. I mean we\u2019ve been living together and I thought he loved me, but he\u2019s just so distant. He won\u2019t talk to me, and I think maybe he\u2019s seeing someone else. Anyhow, he told me I\u2019m crazy.",
        "Men just drive me crazy. This is the third guy I\u2019ve lived with, and they all kind of ended in the same way. I just seem to fall in love with the wrong guys.",
        "Yes! It is so sad."];

// index id for the linguistic context to which the ContextBot refers
const linguistic_cxt_link_ids = {"Bot": [2], "User": [2]};


// start loading the experiment page
$("document").ready(function(){
    $.ajax({
        type: "POST",
        url: "/setTime",
        data: JSON.stringify({
            "workerID": w_id
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


    $("#chatContainer").append("<div class='userMsg'>"+"<span class='user'>User: </span>"+historyUserText[historyUserText.length-1]+"</div>"+"<br>");
    $('#chatContainer').scrollTop($('#chatContainer')[0].scrollHeight);


    // after clicking the help icon, start the interaction with ContextBot
    $("#helpIcon").click(function(){

        $.ajax({
            type: "POST",
            url: "/workerClick",
            data: JSON.stringify({
                "b_name": $(this).name
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                console.log(JSON.stringify(data));
            }
        });

        // initial greetings from ContextBot
        $(this).replaceWith(
            "<div id='botWindow'><div id='botHeader'><h5>Chat with me </h5> </div><div id='botContainer'></div></div>"
        );


        $("#botContainer").append("<div class='botMsg'>"+`<div class='botImg'><img src='/static/img/bot.jpg' height="40%" width="40%" alt="Bot"/></div>`+"<div class='botText'>"+"Hi, I am your ContextBot today! I will walk you through the important contexts that have been talked in previous conversation turns."+"</div></div>");
        $("#botContainer").append("<div class='botMsg'>"+`<div class='botImg'><img src='/static/img/bot.jpg' height='40%' width='40%' alt='Bot' /></div>`+"<div class='botText'>"+"The contexts will help you better understand how the conversation comes to the current turn <code>Yes! It is so sad.</code> Shall we begin?"+"</div></div>");

        addQuickReplyBtn(["Sure, let us begin!", "Hmm...I think so."]);
        sendReply(callbackReply, "social_cxt_MI");

    });


    function preprocessReply(reply_string){
        const re = /Sure|Yes|Hmm|Maybe|Nice|Okay|Wow*/;
        return (re.test(reply_string));
    }

    function addQuickReplyBtn(options) {
        var q = "<div class='action_btn'>";
        var arrayLength = options.length;
        for (var i = 0; i < arrayLength; i++) {
            q += "<button class='quickReplyBtn' style='margin:20px' type='button'>" + options[i] + "</button>";
        }
        q+= "<br></div>";
        $('#botContainer').append(q);
    }

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
            callbackReply(replyBool, cxtTag);
        })
    }

    function callbackReply(replyBool, cxtTag){

        if (replyBool && cxtTag == "social_cxt_MI"){

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
            messageText = `The highlighted texts you've seen on the left chat window show the relevant situation which the keyword <a href='#highlightCxt0' id='linkToCxt'>"It"</a> refers to. How about you let me give you more context and then you can know better?`;
            contextBotSendMessage(messageText);
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
            case "social_cxt_MI":
                messageText = `Your role is to act as a coach ${social_cxt_MI}. You need to let the user feel that he/she is being listened to and make the dialog engaging. How does that sound to you?`;
                contextBotSendMessage(messageText);
                break;
            // add the link
            case "linguistic_cxt_MI":
                messageText1 = `First I guess you'd like to click <a href="#highlightCxt0" id="linkToCxt">"It"</a> to see to which content it refers in the previous chat. Use <code>Back</code> <button class="back">Back</button> and <code>Next</code> <button class="next">Next</button> to navigate through multiple sentences.`;
                messageText2 = `Are you now aware of the chat history relevant to the current utterance ?`;
                contextBotSendMessage(messageText1);
                setTimeout(()=>{contextBotSendMessage(messageText2)}, 3000);
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
                messageText1 = `Know yourself, know the enemy:) You don't have enemy here but a sad user and your peer workers. Find out what they intended to do in the previous turns.`
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
                <p>Congratulations! You have mastered all the context discussed earlier. It's time to respond to the user with MI techniques.</p>`;
                messageText1 = `<p>Below you will find the techniques commonly used for making better responses as a coach. Good luck!</p>`;
                messageText2 = `
                <dl><dt>Reflective listening:</dt><dd>This involves listening to what the user means; it requires you to be aware of nuance in their expressions and not be judgmental. For example: "I know that annoyed you"; "You don't know what to do about that"...</dd></dl>
                <dl><dt>Affirmations:</dt><dd>You use positive emotions to encourage the user, such as "I appreciate your willingness to share so openly"; "I see you are being honest"...</dd></dl>
                <dl><dt>Open question:</dt><dd>This requires you to come up with open questions where answers are not expected, such as "What was it like for you when...?"; "Could you please elaborate more on...?"...</dd></dl>
                
                `;
                contextBotSendMessage(messageText);
                setTimeout(()=>{contextBotSendMessage(messageText1)}, 2000);
                setTimeout(()=>{contextBotSendMessage(messageText2)}, 4000);

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


    function sendThanks(){
        $("#chatContainer").append("<div class='thanksMsg'>"+"Thanks for your help to the user! Your response has been recorded!"+"</div>");
    }

    $("#textbox").keypress(function(event){
        //    to check only for enter key (13 is value for enter)
        if(event.which==13){
            $("#sendBtn").click();
            // to prevent creating new line on pressing Enter key, when checkbox is checked
            event.preventDefault();
        }
    });

    $("#sendBtn").on("click", function(){
        // before clearing the textbox we store its values in variable newmsg
        var newmsg=$("#textbox").val();
        $("#textbox").val("");
        // to display users message on screen
        $("#chatContainer").append("<div class='coachMsg'>"+"<span class='coach'>Coach: </span>"+newmsg+"</div>"+"<br>");
        // to scroll the contents in container in case of overflow
        $("#chatContainer").scrollTop($("#chatContainer").prop("scrollHeight"));
        // converts all user inputs to lower case
        $('#chatContainer').scrollTop($('#chatContainer')[0].scrollHeight);
    });



    var len_index_highlight_cxt = linguistic_cxt_link_ids["Bot"].length + linguistic_cxt_link_ids["User"].length - 1;
    var clickCounter = 0;

    $(document).on("click", "#botContainer .botMsg .botText #linkToCxt", function(){
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
        clearHighlight();
        clickCounter-=1;
        if (clickCounter<0)
            clickCounter = len_index_highlight_cxt;
        animateHighlight();
    });

    // next button
    $(document).on("click", "#botContainer .botMsg .botText .next", function(){
        clearHighlight();
        clickCounter+=1;
        if (clickCounter > len_index_highlight_cxt)
            clickCounter = 0;
        animateHighlight();
    });

    function animateHighlight(){
        $("#highlightCxt"+clickCounter+"").removeClass('unfocused');
        $("#highlightCxt"+clickCounter+"").addClass('focused');
        document.getElementById("highlightCxt"+clickCounter+"").scrollIntoView();
    }

    function clearHighlight(){
        $("#highlightCxt"+clickCounter+"").removeClass('focused');
        $("#highlightCxt"+clickCounter+"").addClass('unfocused');
    }


    $(document).on("click", "#botContainer .botMsg .botText .collapsible", function() {
        $(this)[0].classList.toggle("active");
        var content = $(this)[0].nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }

    });

    $(".submit_task").click(function (){
        sendThanks();

        $.ajax({
            type: "POST",
            url: "/endTime",
            data: JSON.stringify({
                "endTask": true

            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                console.log(JSON.stringify(data));
            }
        });

        // setTimeout(()=>{
        //     window.location.replace("https://qfreeaccountssjc1.az1.qualtrics.com/jfe/form/SV_7VRHG9PMepAPyU6" + prolific_q_str);
        // }, 1500)
    });

})

