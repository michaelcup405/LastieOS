<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type="text/css">
        body {
            background-color: transparent;
            overflow: hidden;
            color: white;
        }

        ::-webkit-scrollbar {
            height: 16px;
            width: 16px;
        }

        ::-webkit-scrollbar-track,
        ::-webkit-scrollbar-corner {
            background-color: transparent;
        }

        ::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.25);
        }

        ::-webkit-scrollbar-thumb:hover {
            background-color: rgba(255, 255, 255, 0.4);
        }

        #container {
            width: 100%;
            height: 100%;
        }

        #status {
            display: none;
            position: absolute;
            right: 30px;
            top: 10px;
            background-color: rgba(0, 0, 0, 0.75);
            padding: 5px;
            border-radius: 5px;
            color: white;
            font-size: 12px;
            line-height: 12px;
        }

        #new_messages {
            display: none;
            position: absolute;
            right: 230px;
            bottom: 60px;
            background-color: rgba(13, 71, 161, 0.75);
            padding: 5px;
            border-radius: 5px;
            color: white;
            cursor: pointer;
            font-size: 12px;
            line-height: 12px;
        }

        body {
            margin: 0;
            padding: 0;
        }

        form {
            margin: 0;
            padding: 0;
        }

        table {
            margin: 0;
            padding: 0;
        }

        td {
            font-size: 13px;
        }

        .chat {
            padding: 4px;
            margin-bottom: 4px;
            transition: background-color 0.5s;
        }

        .name {
            font-weight: 500;
        }

        .date {
            color: #9e9e9e;
        }

        .message {
            color: #eeeeee;
            word-break: break-word;
        }

        .message img {
            max-width: 100%;
        }

        #chat_table {
            position: absolute;
            left: 0;
            right: 160px;
            top: 0;
            bottom: 50px;
            background-color: rgba(107, 107, 107, 0.4);
            overflow-y: scroll;
            padding-right: 16px;
        }

        #message {
            color: white;
            width: 100%;
            height: 36px;
            line-height: 36px;
            margin: 10px 0 0 0;
        }

        #container .input-field {
            margin: 0;
            align-items: center;
        }

        #reply_name {
            margin-right: 5px;
            line-height: 16px;
            position: absolute;
            font-size: 12px;
            color: #9e9e9e;
        }

        #reply_cancel {
            cursor: pointer;
            vertical-align: top;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: #676e7a;
            width: 16px;
            height: 16px;
        }

        #container .input-field input {
            flex: 1;
        }

        .input-message {
            position: absolute;
            left: 0;
            bottom: 2px;
            height: 36px;
            line-height: 36px;
        }

        #message_disabled {
            width: 100%;
            height: 36px;
            line-height: 36px;
            margin: 0;
            background-color: #eee;
        }

        #chatbutton {
            display: block;
            position: absolute;
            bottom: 0;
            right: 0;
            width: 100px;
            height: 46px;
            line-height: 46px;
            background-color: #0D47A1;
            text-transform: none;
        }

        .char {
            float: left;
            margin-right: 8px;
            width: 32px;
            height: 32px;
        }

        .robo-label {
            color: #11cf45;
            font-size: 10px;
            vertical-align: top;
            margin-left: 4px;
        }

        .reply_text {
            color: #9e9e9e;
            font-size: 11px;
            line-clamp: 2;
            -webkit-line-clamp: 2;
            overflow: hidden;
            -webkit-box-orient: vertical;
            display: -webkit-box;
        }

        .reply_text a {
            color: #9e9e9e;
        }

        .reply_text a:hover {
            text-decoration: underline;
        }

        .actions {
            display: none;
            color: #676e7a;
            margin-left: 5px;
        }

        .chat:hover .actions {
            display: inline;
        }

        .actions img {
            cursor: pointer;
            margin-left: 5px;
            vertical-align: sub;
        }

        .actions i {
            cursor: pointer;
            margin-left: 5px;
        }

        #user_list {
            width: 160px;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 50px;
            background-color: rgba(107, 107, 107, 0.4);
            display: flex;
            flex-direction: column;
            overflow-y: auto;
        }

        #online_title {
            background-color: rgba(107, 107, 107, 0.4);
            font-size: 12px;
            padding-left: 8px;
        }

        .user {
            align-items: center;
            border-bottom: 1px solid rgba(214, 214, 214, 0.4);
            display: flex;
            height: 26px;
        }

        .user:last-child {
            border: 0;
        }

        .user img {
            margin: 0 8px;
        }

        .user .name {
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .pm {
            display: none;
            color: #A0C5FA;
            font-size: 10px;
            line-height: 10px;
            margin-left: 8px;
            margin-right: 4px;
            cursor: pointer;
        }

        .user:hover .pm {
            display: flex;
        }

        .user i.hover {
            display: none;
            color: #676e7a;
            cursor: pointer;
        }

        .user:hover i.hover {
            display: flex;
        }

        @media (max-width: 485px) {
            #user_list {
                display: none;
            }

            #status {
                display: inline-block;
            }

            #chat_table {
                right: 0;
            }
        }
    </style>
    <title>MyBB AJAX Chat</title>
</head>

<body>
    <div id="container">
        <div id="content">
            <div id="chat_table">
            </div>
            <div id="user_list">
            </div>
            <form action="chat_frame.php" onsubmit="javascript:sendChat(); return false;">
                <div class="input-field" style="position:absolute;left:0;right:108px; bottom: 2px; height: 46px;">
                    <span id="reply_name"></span>
                    <input autocomplete="off" type="text" id="message" size="90" maxlength="512" value="" />
                </div>
                <a href="#send" id="chatbutton" class="waves-effect waves-light btn" onclick="sendChat()">Send</a>
            </form>
            <div id="status"></div>
            <div id="new_messages">New messages ↓</div>
            <a name="send"></a>
        </div>
    </div>
    <link href="/resources/fontawesome.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="jscripts/ajaxchat.js?20240310a"></script>
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/js/materialize.min.js"></script>
</body>

</html>