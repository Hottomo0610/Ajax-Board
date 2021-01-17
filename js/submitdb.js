'use strict'

$(function(){
    $("#btn_submit").on('click', function(event){
        event.preventDefault();

        var form_1 = $('#f1 [name=view_name]').val();
        var form_2 = $('#f1 [name=message]').val()

        var formData = {
          view_name: form_1,
          message: form_2
        };
        console.log(formData);

        console.log('ボタンクリック処理完了');

        $.ajax({
            type: "post",
            url: "/ajax-board/public/ajax/create.json",
            data: JSON.stringify(formData),
            contentType: 'application/json',
            dataType: "json",
            scriptCharset: 'utf-8'
        })
          .done(function (response) {
              console.log('送信完了');

              if(response['err'] != null){
                var ErrorArray = response['err'];
                if(ErrorArray[0] != null && ErrorArray[1] != null){
                  $('h1').after('<li>'+ErrorArray[1]+'</li>').after('<li>'+ErrorArray[0]+'</li>');
                } else if(ErrorArray[0] != null && ErrorArray[1] == null){
                  $('h1').after('<li>'+ErrorArray[0]+'</li>');
                } else if(ErrorArray[0] == null && ErrorArray[1] !=null){
                  $('h1').after('<li>'+ErrorArray[1]+'</li>');
                }
              }

              var MessageArray = response['message'];

              var obj_num = Object.keys(MessageArray).length;

              var classHas = $('div').hasClass('info0');

              for (var i = 0; i<obj_num; i++){
                  var post_i = MessageArray[i];
                  console.log(post_i);
                  var div_class = 'info' +i;

                  if(classHas != null){
                    $("div").remove("."+div_class);
                  }
                  
                  $('<div>').attr({
                      id: 'id' + i,
                      postid: post_i.id,
                      class: div_class
                  }).appendTo('body');

                  $('<h2>').attr({
                      id: 'view_name'
                  }).appendTo("."+div_class).text(post_i.view_name);

                  $('<time>').attr({
                      id: 'post_date'
                  }).appendTo("."+div_class).text(post_i.post_date);

                  $('<p>').attr({
                      id: 'message'
                  }).appendTo("."+div_class).append(post_i.message);

                  $('<form>').attr({
                      id: "edit_form",
                      name: div_class,
                      method: "post",
                      action: "javascript:void(0);",
                      postid: post_i.id
                  }).appendTo("."+div_class).hide();

                  $('<label>').attr({
                      id: 'edit_label',
                      for: 'edit_message'
                  }).appendTo('form[name='+div_class+']').text("ひと言メッセージ").hide();

                  $('<textarea>').attr({
                      id: 'edit_message',
                      name: 'edit_message',
                      value: ""
                  }).appendTo('form[name='+div_class+']').hide();

                  $('<input>').attr({
                      type: 'submit',
                      id: 'edit_submit2',
                      name: 'edit_submit2',
                      value: "編集完了"
                  }).appendTo('form[name='+div_class+']').hide();

                  $('<button>').attr({
                      id: 'edit_button',
                      name: div_class,
                      postid: post_i.id
                  }).appendTo("."+div_class).text("編集");

                  $('<button>').attr({
                      id: 'del_button',
                      name: div_class,
                      postid: post_i.id
                  }).appendTo("."+div_class).text("削除");
              }
          })
          .fail(function(XMLHttpRequest, textStatus, errorThrown, response){
               console.log('送信に失敗しました。');
               console.log("XMLHttpRequest : " + XMLHttpRequest.status);
　　           console.log("textStatus     : " + textStatus);
　　           console.log("errorThrown    : " + errorThrown.message);
               console.log(response);
          });
        });
      });