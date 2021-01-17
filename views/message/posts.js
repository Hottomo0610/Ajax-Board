'use strict';

$(function(){
    $("#btn_submit").on('click', function(event){
        event.preventDefault();

        var formData = $('#f1').serializeArray();
        console.log(formData);

        console.log('ボタンクリック処理完了');

        $.ajax({
            type: "post",
            url: "/ajax/submit.json",
            data: formData,
            contentType: 'application/json',
            dataType: "json",
            scriptCharset: 'utf-8'
        })
        .done(function (response) {
                console.log('送信完了');

                var MessageArray = response['message'];
                console.log(MessageArray);
                var obj_num = Object.keys(MessageArray).length;

                for (var i = 0; i<obj_num; i++){
                    var post_i = MessageArray[i];
                    console.log(post_i);
                    var div_class = 'info' +i
                    
                    $('<div>').attr({
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
                    }).appendTo('body').append(post_i.message);
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