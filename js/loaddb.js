'use strict'

$(function(){
    $.ajax({
      type: "get",
      url: "/ajax-board/public/home/loadsubmit",
      contentType: 'application/json',
      dataType: "json",
      scriptCharset: 'utf-8'
    })
      .done(function(response){
         console.log('送信完了');
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
             }).appendTo("."+div_class).text(post_i.view_name)

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


  $(document).on('click', 'p[name^="info"]', function(){
    var classname = $(this).attr('name');
    console.log(classname);
    var result = window.confirm('ひと言メッセージを編集しますか？');
  
    if(result){
      $("."+classname).find('p').remove();

      $('form[name="'+classname+'"]').show();

      $('form[name='+classname+']').find('label').show();

      $('form[name='+classname+']').find('textarea').show();

      $('form[name='+classname+']').find('input').show();
    }
  });