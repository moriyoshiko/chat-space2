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



// $(document).on("turbolinks:load", function() {

//   // 検索したユーザーのHTMLを組み立て
//   function buildAddUserHTML(user) {
//     var html =
//       '<div class="chat-group-user">' +
//       '<p class="chat-group-user__name">' +
//       user.name +
//       '</p>' +
//       '<p class="chat-group-user__btn chat-group-user__btn--add" data-id = ' + user.id + '>' +
//       '追加' +
//       '</p>' +
//       '</div>';
//     return html;
//   }

//   // 追加するユーザーのHTMLを組み立て
//   function buildMemberHTML(user, id) {
//     var html =
//       '<div class="chat-group-user">' +
//       '<input type = "hidden", value = ' + id + ', name = "group[user_ids][]", id ="group_user_ids_' + id + '">' +
//       '<p class="chat-group-user__name">' +
//       user +
//       '</p>' +
//       '<p class="chat-group-user__btn chat-group-user__btn--remove">' +
//       '削除' +
//       '</p>' +
//       '</div>';
//     return html;
//   }

//   // ユーザー検索機能本体(インクリメンタルサーチ)
//   function searchUsers() {
//     $("#user-search-result").children().remove();
//     var textField = $("#user_search_field");
//     var user = textField.val();

//     // 検索フィールドが空に戻った場合はajax通信を行わない
//     if (user == ""){

//     } else {

//       $.ajax({
//         type: 'GET',
//         url: '/users',
//         data: {
//           user: user
//         },
//         dataType: 'json'
//       })

//       .done(function(data) {
//         data.forEach(function(user){
//           var html = buildAddUserHTML(user);
//           $('#user-search-result').append(html);
//         });
//       })

//       .fail(function() {
//         alert('エラーが起きました');
//       });
//       // Turbolinksを止めないためにfalseを返しておく
//       return false;
//     }
//   }

//   // // ユーザー検索(インクリメンタルサーチ)の発火イベントの指定
//   $("#user_search_field").on("keyup", searchUsers);


//   // ユーザーを追加
//   // Ajaxで動的に継ぎ足した要素を直接セレクタに指定することは出来ないので、
//   // Ajaxが動く前から存在している要素を調査範囲に指定する
//   $("#user-search-result").on("click", ".chat-group-user__btn--add", function() {
//     var user = $(this).prev().text();
//     // buildHTML内で付与したデータ属性からユーザーのidを取得する
//     var id = $(this).data('id');
//     var html = buildMemberHTML(user, id);
//     $('#chat-group-users').append(html);
//     $(this).parent().remove();
//   });

//   // ユーザーを削除

