// js script for half_MI condition

// different dimensions of contexts
const social_cxt_MI = "to identify the change talk of the user and elicit the change from the user";
const semantic_cxt_MI = `<ul>
<li>The user's past romantic relationships were awful.</li>
<li>The user does not know why she keeps destroying relationships. </li>
<li>She was depressed and wants to feel happy again. </li>
<li>She thinks she is a burden to her friends.</li>
<li>She feels like her friends avoid her.</li>
</ul>`;
var cognitive_cxt_MI_1 = `<dl>
<dd>need and desire to not destroy relationships and change her relationship patterns with friends;</dd>
</dl>`;
var cognitive_cxt_MI_2 = `<dl>
<dd>figure out and focus on the depression problem of the user by using reflections and asking evocative questions;</dd>
</dl>`;
var cognitive_cxt_MI_3 = `<dl>
<dd>propose evocative questions focused on the user's <strong>ability</strong> of change.</dd>
</dl>`;

// insert the chat history here
var historyBotText = ["You are feeling upset and confused. One confusing thing, then, is you don\u2019t understand why you\u2019re doing what you\u2019re doing. What\u2019s been happening?", "This blowup wasn\u2019t the first time that\u2019s happened to you.", "Kind of like a pattern that\u2019s repeating itself.", "These are really strong feelings. It\u2019s pretty painful that this has happened once again.", "That frightens you, not understanding what is going on with you.", "And that annoyed you.", "All right. What you\u2019ve told me so far is that these really strong feelings, and how you\u2019ve reacted, are scaring you a little. You\u2019re not sure what\u2019s going on. You\u2019re having trouble sleeping and concentrating at work. You really blew up at Ray and felt out of control, and you\u2019re also wondering about what seems like a painful pattern that repeats itself in your relationships with men. You don\u2019t have much energy, feel lonely, and sometimes you just break out crying for no apparent reason. But you especially wonder what\u2019s happening.", "Yes, I do. This all feels pretty strange to you, even coming here, but I\u2019ve worked with women before who have had concerns like this, and I believe I can help. If our work together were really successful from your perspective, what would be different?", "So one thing you\u2019d like to change is how you\u2019re feeling. Tell me a little more about that.", "OK, you\u2019d like to get your emotional life settled down some, to be able to sleep better and have more energy. What else?", "That\u2019s another thing that upsets you\u2014not knowing why you feel so bad and why these things happen to you.", "I do have an idea that puts some of the pieces of the puzzle together. If it\u2019s alright with you, we can talk about that next.", "You\u2019re really struggling to understand what is happening to you, and I wonder if I might ask you what you already knew about depression.", "Well, if it\u2019s all right, let me describe some of what people experience with depression, and you can tell me what parts of this may fit for you.", "Depression is really a set of different symptoms, and you don\u2019t need to have all of them. It\u2019s like when people catch a cold; they experience it in different ways. Depression is like that\u2014a set of symptoms that might or might not be present. Does that make sense?", "One of them, as you said, is in a sad mood, feeling down, crying.", "Another change is in sleeping patterns. Some people have trouble sleeping. Some lose their weight. Have you experienced any of those?", "OK. As I said, different people have different symptoms. It sounds like you have quite a few of them. Have I been clear? What else can I tell you about depression?", "The next thing is how you would like things to be different. You know how you don\u2019t want to feel. How do you want to feel?", "You\u2019d like to feel happy and good about yourself again. What else?", " How important is that to you, to have a relationship like that?", "You need that.", "Tell me a little about why you want to feel better.", "It would be good to feel lighthearted, to enjoy life and be with your friends."];
var historyUserText=
    ["I feel like I am falling apart. I don\u2019t have any energy. I don\u2019t know what is going on with me.", " I just broke up with my boyfriend. I mean we\u2019ve been living together and I thought he loved me, but he\u2019s just so distant. He won\u2019t talk to me, and I think maybe he\u2019s seeing someone else. Anyhow, he told me I\u2019m crazy.", "Men just drive me crazy. This is the third guy I\u2019ve lived with, and they all kind of ended in the same way. I just seem to fall in love with the wrong guys.", "Yes! It is so sad.", "I can\u2019t sleep. I can\u2019t think. I\u2019m a mess at work. I was waiting on a customer this week and just started crying for no reason. I think I\u2019m losing it.", "It\u2019s just so discouraging! I was so happy with Ray when we were first together. There\u2019s this soft teddy bear inside his tough exterior, and that\u2019s the man I loved, but then he wouldn\u2019t open up to me anymore.", "Yes! It\u2019s such a waste for him to stay locked up inside there, and I was lonely even though we were living together. Anyhow, he\u2019s gone now. He moved out. It\u2019s over.", "Yes. Do you think you can help me?", "I guess I wouldn\u2019t feel so bad all the time.", "I just feel upset and I\u2019m crying a lot. I\u2019m not sleeping and I feel worn out, run down.", "Yes. I also want to know why I keep screwing up all my relationships. What\u2019s wrong with me?", "Yes, can you help me figure these out?", "Sure. What is your idea?", "I guess it\u2019s like when you feel really sad and down, maybe don\u2019t have energy to do anything. Do you think that\u2019s what I have?", "Yes, OK.", "Yes, what are the symptoms?", "That sounds like me. I\u2019m not having much fun lately.", "I\u2019m certainly not sleeping well. But my weight did not change.", "That sounds alright.", "Normal, I guess. Happy. To have energy to do things again. When I broke up with Ray it just made me crazy. I feel like there\u2019s something wrong with me, that I always screw up my relationships.", "I want to be with a man who loves me. I seem to attract guys who are hung up about telling me how they feel. I need a man I can talk to.", "Very important. I don\u2019t want to be alone. I need to be loved.", "Yes! I don\u2019t want to keep destroying relationships. I don\u2019t know why I do that.", "I just feel like I\u2019m dragging around this heavy weight with me all the time. I like to have fun, but I\u2019ve really become a drag to be with. I feel like even my friends avoid me.", "Yes it would. Do you think it\u2019s possible for me?"];

var linguistic_cxt_link_ids = {"Bot":[23], "User":[10, 22]};

$("document").ready(function(){

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

        // initial greetings from ContextBot
        $(this).replaceWith(
            "<div id='botWindow'><div id='botHeader'><h3>Chat with me </h3> </div><div id='botContainer'></div></div>"
        );

        $("#botContainer").append("<div class='botMsg'>"+`<div class='botImg'><img src='/static/img/bot.jpg' height="30%" width="30%" alt="Bot"/></div>`+"<div class='botText'>"+"Hi, I am your ContextBot today!"+"</div></div>");
        $("#botContainer").append("<div class='botMsg'>"+`<div class='botImg'><img src='/static/img/bot.jpg' height='30%' width='30%' alt='Bot'  /></div>`+"<div class='botText'>"+"I will walk you through the important contexts that have been talked in previous conversation turns. They will help you better understand how the conversation comes to the current turn <code>Yes it would. Do you think it's possible for me?</code> Shall we begin?"+"</div></div>");

        addQuickReplyBtn(["Yes, let us begin!"]);
        sendReply(callbackReply, "social_cxt_MI");

    })


    function preprocessReply(reply_string){
        const re = /Yes*/;
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
            replyBool = preprocessReply(text);
            callbackReply(replyBool, cxtTag);
        })
    }

    function callbackReply(replyBool, cxtTag){

        if (replyBool && cxtTag == "social_cxt_MI"){

            addCxtPrompts("social_cxt_MI");
            setTimeout(() => {
                addQuickReplyBtn(["Yes, very clear!"]);
                $('#botContainer').scrollTop($('#botContainer')[0].scrollHeight);
                sendReply(callbackReply, "linguistic_cxt_MI");
            }, 1800);

        }else if (replyBool && cxtTag == "linguistic_cxt_MI"){
            addCxtPrompts("linguistic_cxt_MI");
            setTimeout(() => {
                addQuickReplyBtn(["Yes, tell me more!"]);
                $('#botContainer').scrollTop($('#botContainer')[0].scrollHeight);
                sendReply(callbackReply, "semantic_cxt_MI");
            }, 6000);


        }else if (replyBool && cxtTag == "semantic_cxt_MI"){
            addCxtPrompts("semantic_cxt_MI");
            setTimeout(() => {
                addQuickReplyBtn(["Yes, I am ready!"]);
                $('#botContainer').scrollTop($('#botContainer')[0].scrollHeight);
                sendReply(callbackReply, "cognitive_cxt_MI");
            }, 6000);
        }else if (replyBool && cxtTag == "cognitive_cxt_MI"){
            addCxtPrompts("cognitive_cxt_MI");
        }else if (replyBool && cxtTag == "templates_MI"){
            setTimeout(()=>{
                addCxtPrompts();
                $('#botContainer').scrollTop($('#botContainer')[0].scrollHeight);
            },1800);
        }
    }

    // start the prompts with context
    function addCxtPrompts(cxtTag){
        switch (cxtTag){
            case "social_cxt_MI":
                messageText = `Your role is to act as a coach ${social_cxt_MI}. You need to pay attention to the desire and ability of the user to change. How does that sound to you?`;
                contextBotSendMessage(messageText);
                break;
            // add the link
            case "linguistic_cxt_MI":
                messageText1 = `First I guess you'd like to click <a href="#highlightCxt0" id="linkToCxt">"it's possible"</a> to see to which content it refers in the previous chat. Use <code>Back</code> <button class="back">Back</button> and <code>Next</code> <button class="next">Next</button> to navigate through multiple sentences.`;
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
                <div>Congratulations! You have mastered all the context discussed earlier. It's time to respond to the user with MI techniques. I have prepared some templates for you. Feel free to use them and be a good counsellor! Good luck!</div>
                <p>Click any number of them to use on the left chat window:</p>
                <button class="addable">You must have been so &nbsp. Could you please elaborate more on &nbsp?</button>`;
                contextBotSendMessage(messageText);

        }
    }

    function contextBotSendMessage(messageText){

        // $.ajax({
        //     type: "GET",
        //     url: "/setTime",
        //     data: JSON.stringify({
        //       "nothing": {}
        //     }),
        //     contentType: "application/json; charset=utf-8",
        //     dataType: "json",
        //     success: function(data) {
        //     console.log(JSON.stringify(data));
        //     }
        // });

        const typingHTML = `
            <div class='botMsg'> 
            <div class='botImg'>
            <img height='30%' width='30%' alt='Bot' style='vertical-align:middle' src='/static/img/bot.jpg' />
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

        $("#botContainer").append("<div style='float:right; margin:10px; font-size:18px; background-color:#425B76; color:white; width:30%; height:6%; text-align:center; padding:6px; border-radius: 0 3% 3% 3%'>"+messageText+"</div><br><br>");
    }


    function sendThanks(){
        $("#chatContainer").append("<div class='thanksMsg'>"+"Thanks for your help to the user! Your response has been recorded!"+"</div>");
    }

    $("#textbox").keypress(function(event){
        //    to check only for enter key (13 is value for enter)
        if(event.which==13){
            // clear textbox when checkbox is clicked and user presses enter key
            $("#sendBtn").click();
            // to prevent creating new line on pressing Enter key, when checkbox is checked
            event.preventDefault();

        }

    });

    $("#sendBtn").one("click", function(){
        // before clearing the textbox we store its values in variable newmsg
        var newmsg=$("#textbox").val();
        $("#textbox").val("");
        // to display users message on screen
        $("#chatContainer").append("<div class='coachMsg'>"+"<span class='coach'>Coach: </span>"+newmsg+"</div>"+"<br>");
        // to scroll the contents in container in case of overflow
        $("#chatContainer").scrollTop($("#chatContainer").prop("scrollHeight"));
        // converts all user inputs to lower case
        sendThanks();
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

    })

    $(document).on("click", "#botContainer .botMsg .botText .addable", function() {
        document.getElementById("textbox").innerHTML = $(this).text();

    })

})

