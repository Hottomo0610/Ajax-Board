<?php 
class Controller_Post extends Controller
{
    public function action_index()
    {
        $form = array();
        $now_date = null;

        $form['view_name'] = Input::post('view_name');
        $form['message'] = Input::post('message');
        $now_date = date("Y-m-d H:i:s");
        $form['post_date'] = $now_date;

        $posts = Model_Submit::forge();

        $posts->set($form);

        if($posts->validates()) {
            try {
                error_log('バリデーションチェックを通過しました');

                DB::start_transaction();

                $posts->save();

                DB::commit_transaction();

                error_log('書き込み完了');

            } catch(Database_Exception $e) {
                DB::rollback_transaction();
            }
        } else {
            error_log('バリデーションで弾かれました');

            $errorslist = array();

            $errors = $posts->validation()->error();

            foreach($errors as $err) {
                array_push($errorslist, $err->get_message());
            }

            Session::set_flash("validator_errors", $errorslist);
        }

        $postlist = DB::select()->from('message_table')->order_by('post_date', 'DESC')->execute();

        error_log('データ取得完了');

        $view=View::forge('message/index');

        $view->set('error_list', $errorslist);
        $view->set('post_list', $postlist->as_array());

        return $view;
    }
}
?>