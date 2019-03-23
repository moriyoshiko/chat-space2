$(document).on("turbolinks:load", function() {

$(function() {
 var search_list = $('#user-search-result');

  function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">
                  ${ user.name }
                <span class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">
                  追加
                </span>
               </p>
              </div>`
    search_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">${ msg }
                </div>`
    search_list.append(html);
  }

  $('#user-search-field').on('keyup', function() {
    var input = $(this).val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(users){
          appendUser(users);
        });
      } else {
        appendErrMsgToHTML("一致するユーザが見つかりません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  var member_list = $("#chat-group-users");

  function buildMemberHTML(userName, userId) {
    var html =
      `
        <div class='chat-group-user clearfix js-chat-member' id='${ userId }'>
          <input name='group[user_ids][]' type='hidden' value='${ userId }'>
          <p class='chat-group-user__name'>
            ${ userName }
          <span class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>
            削除
          </span>
          </p>
        </div>
      `
    member_list.append(html);
  }

  $(document).on('click', '.chat-group-user__btn--add', function(){
    $(this).parent().remove();
    var userName = $(this).data('userName');
    var userId = $(this).data('userId');
    buildMemberHTML(userName, userId);
  });

  //  $(document).on('click', '.user-search-add', function(){
  //   $(this).parent().remove();
  //   var userName = $(this).data('userName');
  //   var userId = $(this).data('userId');
  //   buildMemberHTML(userName, userId);
  // });

  // $(document).on('click', '.user-search-remove', function(){
  //   $(this).parent().remove();
  // });
  $(document).on('click', '.chat-group-user__btn--remove', function(){
     $(this).parent().remove();
  });

 });
});

