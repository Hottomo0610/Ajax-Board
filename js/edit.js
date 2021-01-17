'use strict'

$(document).on('click', '#edit_button', function(){
    var div_name = $(this).attr("name");
    var div_id = $(this).attr("postid");
    console.log(div_name);

    $('[id$=button]').remove();

    $('<form>').attr({
        id: "edit_form",
        method: "post",
        action: "javascript:void(0);",
        postid: div_id
    }).appendTo("."+div_name);

    $('<div>').attr({
        id: 'edit_div1'
    }).appendTo('#edit_form');

    $('<label>').attr({
        for: 'view_name'
    }).appendTo('#edit_div1').text("表示名");

    $('<input>').attr({
        id: 'view_name',
        type: 'text',
        name: 'view_name',
        value: ""
    }).appendTo('#edit_div1');

    $('<div>').attr({
        id: 'edit_div2',
    }).appendTo('#edit_form');

    $('<label>').attr({
        for: 'message'
    }).appendTo('#edit_div2').text("ひと言メッセージ");

    $('<textarea>').attr({
        id: 'message',
        name: 'message',
        value: ""
    }).appendTo('#edit_div2');

    $('<input>').attr({
        type: 'submit',
        id: 'edit_submit',
        name: 'edit_submit',
        value: "編集完了"
    }).appendTo('#edit_form');
});

$(document).on('click', '#edit_submit', function(event){
    event.preventDefault();

    var form_0 = $('div form').attr('postid');
    var form_1 = $('#edit_form [name=view_name]').val();
    var form_2 = $('#edit_form [name=message]').val();

    var formData = {
      id: form_0,
      view_name: form_1,
      message: form_2
    };
    console.log(formData);

    console.log('ボタンクリック処理完了');

    $.ajax({
        type: "post",
        url: "/ajax-board/public/ajax/edit.json",
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



$(document).on('click', '#edit_submit2', function(event){
    event.preventDefault();

    var form_0 = $(this).parent('form').attr('postid');
    var form_1 = $(this).parent('form').find('textarea').val();

    var formData = {
        id: form_0,
        message: form_1
    };

    console.log('ボタンクリック処理完了');
    console.log(formData);

    $.ajax({
        type: 'post',
        url: "/ajax-board/public/ajax/edit2.json",
        data: JSON.stringify(formData),
        contentType: 'application/json',
        dataType: 'json',
        scriptCharset: 'utf-8'
    })
      .done(function(response){
          console.log("送信完了");

          var MessageArray = response['message'];
          var obj_num = Object.keys(MessageArray).length;
          var classHas = $('div').hasClass('info0');

          for (var i = 0; i<obj_num; i++){
            var post_i = MessageArray[i];
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
                id: 'message',
                name: div_class
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