$(function() {
  function buildHTML(message){
  var imageHtml = (message.imageUrl) ? `<img src=${ message.imageUrl }>` : ""
  var html = `<div class="message">
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
    $('.messages').animate({scrollTop: $('.message')[0].scrollHeight});
  }

  $('#new_message').on('submit', function(e) {
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
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message').val("");
      $('#message_image').val("") //messageを送信したら、formのimageを空にする
      $('.form__submit').prop('disabled', false)
      scroll()
    })
    .fail(function(){
      alert('error');
    })
  });

  //自動更新
  $(function() {
    if(location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(update, 10000);
    }
  });

  function update(){
    if($('.messages')[0]){
      var message_id = $('.messages:last').data('id');
    } else {
      var message_id = 0
    }
    $.ajax({
      url: location.href,
      type: 'GET',
      data: {
      message: { id: message_id }
      },
      dataType: 'json'
    })
    .done(function(data) {
      data.forEach(function(data) {
        var html = buildHTML(data);
        $('.messages').append(html);
      })
    })
    .fail(function(data) {
      alert('自動更新に失敗しました')
    })
  }

});



