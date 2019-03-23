$(function() {
function buildSendMessageHTML(message){
  var imageHtml = (message.imageUrl) ? `<img src=${ message.imageUrl }>` : ""
  var html = `<div class="message" data-id='${message.id}'>
              <div class="upper-message">
                <div class="upper-message__user-name">
                  ${ message.user_name }
                </div>
                <div class="upper-message__date">
                  ${ message.time }
                </div>
              </div>
              <div class="lower-message">
                <p class="lower-message__content">
                  ${ message.content }
                </p>
                <div class="lower-message__image">
                  ${ imageHtml }
                </div>
              </div>
            </div>`;
    return html;
  }

  function scroll() {
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
  }

  $('#new_message').on('submit', function(e) {
    if ($('.form__message').val() === "") {
     alert('メッセージを入力してください');
    } else {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(NewMessage){
      var html = buildSendMessageHTML(NewMessage);
      $('.messages').append(html);
      $('.form__message').val("");
      $('#message_image').val(""); //messageを送信したら、formのimageを空にする
      $('.form__submit').prop('disabled', false);
      scroll()
    })
    .fail(function(){
      alert('error');
    })
    return false;
   }
  });

  //自動更新
  if (location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(appendNewMsg, 10000);
  }

  function appendNewMsg(message){
    if ($('.messages')[0]) {
      var message_latest_id = $('.message:last').data('id');
    } else {
      var message_latest_id = 0
    }

    $.ajax({
      url: location.href,
      type: 'GET',
      data: {
        message: { id: message_latest_id }
      },
      dataType: 'json'
    })
    .done(function(data) {
      data.forEach(function(message) {
        var html = buildSendMessageHTML(message);
        $('.messages').append(html);
      })
    })
    .fail(function(data) {
      alert('自動更新に失敗しました')
    })
  }

});

