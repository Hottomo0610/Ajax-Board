'use strict'

$(document).on('click', '#del_button', function(){
    var del_id = $(this).attr('postid');
    var postdata = {id: del_id};
    var result = window.confirm('削除してよろしいですか？');
    console.log(postdata);

    if(result){
        $.ajax({
            type: 'post',
            url: '/ajax-board/public/ajax/delete.json',
            data: JSON.stringify(postdata),
            contentType: 'application/json',
            dataType: "json",
            scriptCharset: 'utf-8'
        }).done(function(response){
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

            var classHas = $('div[class*=info]').hasClass();
            if(classHas!=null){
                $('div[class*=info]').remove();
            }

            for (var i = 0; i<obj_num; i++){
                var post_i = MessageArray[i];
                console.log(post_i);
                var div_class = "info"+i;
           
              $('<div>').attr({
                  id: 'id' + i,
                  name: post_i.id,
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
        }).fail(function(XMLHttpRequest, textStatus, errorThrown, response){
            console.log('送信に失敗しました。');
            console.log("XMLHttpRequest : " + XMLHttpRequest.status);
　　         console.log("textStatus     : " + textStatus);
　　         console.log("errorThrown    : " + errorThrown.message);
             console.log(response);
        })
    }
})