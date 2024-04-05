disabled = false;
lastRequest = 0;
inprogress = false
small = window.location.search.indexOf('small') > -1;
var param = 'context=';
var idx = window.location.search.indexOf(param);
context = idx > -1 ? window.location.search.substring(idx + param.length) : 0;
scrolledToBottom = true;
replyId = 0;
replyUserId = 0;
replyIsPrivate = false;
var getChatsTimeout;

let baseUrl = window.location.origin.replace('/onlinesequencer.net',
                                             '/server.onlinesequencer.net') +
              '/forum/';

function sendChat() {
  var msg = document.getElementById('message');
  var btn = document.getElementById('chatbutton');
  var isCommand = msg.value.startsWith('/');
  if (msg && !disabled) {
    msg.id = 'message_disabled';
    msg.disabled = 'disabled';
    if (!isCommand)
      disabled = true;
    $.post(baseUrl + 'xmlhttp.php?action=ajaxchat_send', {
      message : (replyIsPrivate ? '@#' + replyUserId + ' ' : '') + msg.value,
      context : context,
      reply_id : replyId,
      my_post_key : my_post_key,
    },
           function() {
             msg.id = 'message';
             msg.disabled = '';
             msg.value = '';
             msg.focus();

             if (isCommand)
               return;
             if (replyId > 0) {
               $('#reply_name').html('');
               replyId = 0;
               replyUserId = 0;
               replyIsPrivate = false;
             }
             var sendTimeout = 5;
             btn.innerHTML = sendTimeout;
             var sendTimeoutInterval = window.setInterval(function() {
               sendTimeout -= 1;
               if (sendTimeout == 0) {
                 disabled = false;
                 btn.innerHTML = 'Send';
                 window.clearInterval(sendTimeoutInterval);
               } else {
                 btn.innerHTML = sendTimeout;
               }
             }, 1000);

             if (!inprogress) {
               clearTimeout(getChatsTimeout);
               getChats();
             }
           });
  }
}

function replyTo(messageId, userId, username, isPrivate) {
  replyId = messageId;
  replyUserId = userId;
  replyIsPrivate = isPrivate;
  $('#reply_name')
      .html('<i id="reply_cancel" class="far fa-times"></i>Replying to ' +
            username + ':');
  $('#reply_cancel').click(function() {
    $('#reply_name').html('');
    replyId = 0;
    replyUserId = 0;
    replyIsPrivate = false;
  });
  $('#message').focus();
}

function openModCp(userId) { window.open('/modcp?user=' + userId); }

function openMessage(id) {
  var element = document.getElementById('chat-' + id);
  if (element != null) {
    element.style.backgroundColor = 'rgba(107, 107, 107, 0.25)';
    setTimeout(function() { element.style.backgroundColor = ''; }, 2000);
    element.scrollIntoView({behavior : 'smooth'});
    return false;
  }
  return true;
}

function getChats() {
  inprogress = true;
  $.post(
      baseUrl + 'xmlhttp.php?action=ajaxchat_get', {
        id : lastRequest,
        small : small ? 1 : 0,
        context : context,
        my_post_key : my_post_key,
      },
      function(result) {
        inprogress = false;
        lastRequest = result['id'];
        n = result['count'];
        chatHTML = '';
        for (var i = 0; i < n; i++) {
          var data = result['chats'][i];

          if (data['command'] != '') {
            var parts = data['command'].split(' ');
            switch (parts[0]) {
            case 'delete':
              $('#chat-' + parts[1]).remove();
              break;
            }
            continue;
          }

          var name;
          var image;
          if (data['user_id'] == 0) {
            name = '';
            image = '';
          } else {
            name = '<a href="/members/' + data['user_id'] +
                   '" target="_blank" data-user="' + data['user_name'] + '">' +
                   data['user_name_html'] + '</a>';
            image =
                '<img src="' + data['user_avatar'] +
                '" width="25" class="char" ' +
                (data['reply_text'] != '' ? ' style="margin-top: 15px;' : '') +
                '/>';
            if (data['webhook'] == 1) {
              name +=
                  '<a class="robo-label" href="https://robo.onlinesequencer.net/" target="_blank">[Robo]</a>'
            }
          }

          var actions = '';
          for (var j = 0; j < data['actions'].length; j++) {
            var action = data['actions'][j];
            if (action == 'reply') {
              actions += '<i class="fas fa-reply" onclick="replyTo(' +
                         data['id'] + ', \'' + data['user_id'] + '\', \'' +
                         data['user_name'] + '\', ' + data['is_private'] +
                         ')"></i>';
            } else if (action == 'modcp') {
              actions += '<i class="fas fa-shield" onclick="openModCp(' +
                         data['user_id'] + ')"></i>';
            } else if (action == 'delete') {
              actions +=
                  '<i class="far fa-times" onclick="chatAction(\'delete\', ' +
                  data['user_id'] + ', ' + data['id'] + ')"></i>';
            } else {
              actions += '<img src="images/ajaxchat_' + action +
                         '.png" title="' + action + '" onclick="chatAction(\'' +
                         action + '\', ' + data['user_id'] + ', ' + data['id'] +
                         ',)"/>';
            }
          }

          if (data['reply_text'] == '[Message deleted]') {
            var element = document.getElementById('chat-' + data['reply_id']);
            if (element != null) {
              var text = element.getElementsByClassName('message')[0];
              data['reply_text'] = text;
            }
          }

          var replyHTML =
              context == 0
                  ? '<a href="/logs?id=' + data['reply_id'] + '#m' +
                        data['reply_id'] +
                        '" target="_blank" onclick="return openMessage(' +
                        data['reply_id'] + ')">' + data['reply_text'] + '</a>'
                  : '<a href="javascript:;" onclick="return openMessage(' +
                        data['reply_id'] + ')">' + data['reply_text'] + '</a>';

          var html = `
<div class="chat" id="chat-${data['id']}">
  ${image}
  <div class="info">
    <div style="display: flex; flex-direction: column;">
      <span class="reply_text">
        ${data['reply_text'] != '' ? '⌐ ' : ''} ${replyHTML}
      </span>
      <span>
        <span class="name">${name}</span>
        <span class="date">${data['date']}</span>
        <span class="actions">${actions}</span>
      </span>
      <div class="message">${data['message']}</div>
    </div>
  </div>
</div>
`;

          chatHTML = html + '\n' + chatHTML;
        }
        if (n > 0) {
          var table = document.getElementById(small ? 'chat' : 'chat_table');
          if (small) {
            table.innerHTML = chatHTML;
          } else {
            table.innerHTML += chatHTML;
          }
          if (scrolledToBottom) {
            window.setTimeout(
                function() { table.scrollTop = table.scrollHeight + 10000; },
                0);
          } else {
            $('#new_messages').css('display', 'inline-block');
          }
        }
        var timeout;
        if (small) {
          timeout = 10000;
        } else if (result['long_poll']) {
          timeout = 0;
        } else {
          timeout = 1000;
        }
        getChatsTimeout = setTimeout('getChats()', timeout);
      });
}

function chatAction(action, user_id, id) {
  $.post(baseUrl + 'xmlhttp.php?action=ajaxchat_action', {
    chat_action : action,
    user_id : user_id,
    id : id,
    context : context,
    my_post_key : my_post_key,
  },
         function(result) {
           if (!inprogress) {
             clearTimeout(getChatsTimeout);
             getChats();
           }
         });
}

function getStatus() {
  if (!small && context == 0) {
    $.post(baseUrl + 'xmlhttp.php?action=ajaxchat_status', {
      id : lastRequest,
      my_post_key : my_post_key,
    },
           function(result) {
             var html = '<div id="online_title">Online members</div>';
             for (var i = 0; i < result.length; i++) {
               var user = result[i];
               html += '<div class="user">';
               html += '<img src="' + user['user_avatar'] +
                       '" width="16" height="16">';
               html += '<a class="name" href="/members/' + user['user_id'] +
                       '" target="_blank" data-user="' + user['user_name'] +
                       '">' + user['user_name_html'] + '</a>';
               html += '<div class="pm" onclick="sendPM(\'' +
                       user['user_name'] + '\')">Send<br/>PM</div>';
               if (isModerator) {
                 html += '<i class="fas fa-shield hover" onclick="openModCp(' +
                         user['user_id'] + ')"></i>';
               }
               html += '</div>';
             }
             var userlist = document.getElementById('user_list');
             userlist.innerHTML = html;
             $('#status').html(
                 'In Chat: ' +
                 result.map(user => user['user_name']).join(', '));
           });
  }
}

function sendPM(name) {
  $('#message').val('@' + name.replace(' ', '_') + ' ');
  $('#message').focus();
}

window.onload = function() {
  $.ajaxSetup({
    crossDomain : true,
    xhrFields : {withCredentials : true},
  });

  getChats();
  getStatus();
  chatAudioContext = new AudioContext();
  if (!small) {
    var table = document.getElementById(small ? 'chat' : 'chat_table');
    table.onscroll = function(e) {
      scrolledToBottom = Math.abs(table.scrollTop + table.clientHeight -
                                  table.scrollHeight) <= 1;
      if (scrolledToBottom) {
        $('#new_messages').css('display', 'none');
      }
    };
    $('#new_messages').click(function() {
      window.setTimeout(
          function() { table.scrollTop = table.scrollHeight + 10000; }, 0);
    });
  }
};
window.setInterval(getStatus, 10000);
