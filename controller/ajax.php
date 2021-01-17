<?php
class Controller_Ajax extends \Fuel\Core\Controller_Rest
{
  public function post_create()
  {
       $form = array();
       $nowdate = null;
       $clean = array();

       $form['view_name'] = Input::json('view_name');
       $clean['view_name'] = htmlspecialchars($form['view_name'], ENT_QUOTES);
       $clean['view_name'] = preg_replace( '/\\r\\n|\\n|\\r/', '', $clean['view_name']);
       $form['message'] = Input::json('message');
       $clean['message'] = htmlspecialchars($form['message'], ENT_QUOTES);
       $nowdate = date("Y-m-d H:i:s");
       $clean['post_date'] = $nowdate;

       Log::debug(var_export($clean, true));

       $posts = Model_Submit::forge();

       $posts->set($clean);

       if ($posts->validates()) {
           try {
               error_log('バリデーションチェックを通過しました');

               DB::start_transaction();

               $posts->save();

               DB::commit_transaction();

               error_log('書き込み完了');
           } catch (Exception $e) {
               DB::rollback_transaction();
           }
       } else {
           error_log('バリデーションで弾かれました');

           $errorslist = array();

           $errors = $posts->validation()->error();

           foreach ($errors as $err) {
               array_push($errorslist, $err->get_message());
           }

           Session::set_flash("validator_errors", $errorslist);
       }

       $postlist = DB::select()->from('message_table')->order_by('post_date', 'DESC')->execute()->as_array();

       error_log('データ取得完了');

       if (empty($errorslist)) {
           $resarray = array('message' => $postlist);
           print_r( json_encode($resarray) );
       } else {
           $errarray = array(
               'err' => $errorslist,
               'message' => $postlist
           );
           print_r( json_encode($errarray) );
       }
       error_log('出力完了', "0");
  }



  public function post_edit()
  {
    $form = array();
    //$now_date = null;
    $message_id = null;

    $message_id = Input::json('id');
    $form['id'] = $message_id;
    $form['view_name'] = Input::json('view_name');
    $form['message'] = Input::json('message');
    //$now_date = date("Y-m-d H:i:s");
    //$form['post_date'] = $now_date;

    Log::debug(var_export($form, true));

    $query = DB::update('message_table')->set($form)->where('id', $message_id)->execute();

    $postlist = DB::select()->from('message_table')->order_by('post_date', 'DESC')->execute()->as_array();

    $resarray = array('message' => $postlist);
    print_r( json_encode($resarray) );
  }



  public function post_edit2()
  {
      $form = array();
      $message_id = null;

      $message_id = Input::json('id');
      $form['id'] = $message_id;
      $form['message'] = Input::json('message');

      $query = DB::update('message_table')->set($form)->where('id', $message_id)->execute();

      $postlist = DB::select()->from('message_table')->order_by('post_date', 'DESC')->execute()->as_array();

      $resarray = array('message' => $postlist);
      print_r( json_encode($resarray) );
  }


  
  public function post_delete()
  {
      $message_id = null;

      $message_id = Input::json('id');

      $query = DB::delete('message_table')->where('id', $message_id)->execute();

      $postlist = DB::select()->from('message_table')->order_by('post_date', 'DESC')->execute()->as_array();

      $resarray = array('message' => $postlist);
      print_r( json_encode($resarray) );
  }
}
?>