<?php

class Model_Submit extends Model_Crud 
{
    protected static $_table_name = "message_table";

    protected static $_rules = array(
        "view_name" => "required",
        "message" => "required"
    );

    protected static $_labels = array(
        "view_name" => "表示名",
        "message" => "ひと言メッセージ"
    );
}

?>