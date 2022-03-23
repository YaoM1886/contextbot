// js script for early_MI condition

// extract worker's prolific ID
var prolific_q_str = window.location.search;
const w_id = prolific_q_str.split("?PROLIFIC_PID=")[1]

// different dimensions of contexts
const social_cxt_MI = "to <strong>listen to and engage the user in this session</strong>";
const linguistic_cxt_MI = `First I guess you'd like to click <a href="#highlightCxt0" id="linkToCxt">"It"</a> to see to which content it refers in the previous chat. Use <code>Back</code> <button class="back">Back</button> and <code>Next</code> <button class="next">Next</button> to navigate through multiple sentences.`;
const semantic_cxt_MI = `<ul>
<li>The user has broken up with her boyfriend. </li>
<li>She also feels upset and confused about what's been going on.</li>
<li>Her past romantic relationships were awful. </li>
</ul>`;
const prompts_semantic_cxt_MI = `The highlighted texts you've seen on the left chat window show the relevant situation which the keyword <a href='#highlightCxt0' id='linkToCxt'>"It"</a> refers to. How about you let me give you more context and then you can know better?`;
const cognitive_cxt_MI_1 = `<dl>
<dd>seek for help and reasons with her down emotions and bad relationships;</dd>
</dl>`;
const cognitive_cxt_MI_2 = `<dl>
<dd> provide empathetic and reflective responses in terms of the user's problems;</dd>
</dl>`;
const cognitive_cxt_MI_3 = `<dl>
<dd>continue improving the engagement of this dialog by providing <strong>empathetic and reflective listening</strong>.</dd>
</dl>`;
const prompts_MI = `
<dl><dt>Reflective listening:</dt><dd>This involves listening to what the user means; it requires you to be aware of nuance in their expressions and not be judgmental. For example: "I know that annoyed you"; "You don't know what to do about that"...</dd></dl>
                <dl><dt>Affirmations:</dt><dd>You use positive emotions to encourage the user, such as "I appreciate your willingness to share so openly"; "I see you are being honest"...</dd></dl>
                <dl><dt>Open question:</dt><dd>This requires you to come up with open questions where answers are not expected, such as "What was it like for you when...?"; "Could you please elaborate more on...?"...</dd></dl>`;

// insert the chat history here
const historyBotText = ["You are feeling upset and confused. One confusing thing, then, is you don\u2019t understand why you\u2019re doing what you\u2019re doing. What\u2019s been happening?", "This blowup wasn\u2019t the first time that\u2019s happened to you.", "Kind of like a pattern that\u2019s repeating itself."];
const historyUserText=
    ["I feel like I am falling apart. I don\u2019t have any energy. I don\u2019t know what is going on with me.",
        " I just broke up with my boyfriend. I mean we\u2019ve been living together and I thought he loved me, but he\u2019s just so distant. He won\u2019t talk to me, and I think maybe he\u2019s seeing someone else. Anyhow, he told me I\u2019m crazy.",
        "Men just drive me crazy. This is the third guy I\u2019ve lived with, and they all kind of ended in the same way. I just seem to fall in love with the wrong guys.",
        "Yes! It is so sad."];

// index id for the linguistic context to which the ContextBot refers
const linguistic_cxt_link_ids = {"Bot": [2], "User": [2]};




