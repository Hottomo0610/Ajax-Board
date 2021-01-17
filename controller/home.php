<?php

class Controller_Home extends Controller
{
    public function action_index()
    {
        return View::forge('message/index');
    }

    public function get_loadsubmit()
    {
        if (Input::is_ajax()) {
            $postlist = DB::select()->from('message_table')->order_by('post_date', 'DESC')->execute()->as_array();
            $resarray = array('message' => $postlist);
            print_r(json_encode($resarray));
        }
    }
}
?>