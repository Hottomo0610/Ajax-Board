<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ひと言掲示板</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>
<body>
    <h1>ひと言掲示板</h1>
      <?php if( !empty($error_list) ): ?>
	    <ul class="error_message">
		  <?php foreach( $error_list as $value1 ): ?>
			<li><?php echo $value1; ?></li>
		  <?php endforeach; ?>
	    </ul>
      <?php endif; ?>
    <form id="f1" method="post" action="javascript:void(0);">
        <div>
         <label for="view_name">表示名</label>
         <input id="view_name" type="text" name="view_name" value=""> 
        </div>
        <div>
            <label for="message">ひと言メッセージ</label>
            <textarea id="message" name="message" value=""></textarea>
        </div> 
        <input type="submit" id="btn_submit" name="btn_submit" value="書き込む" ></button>
    </form>
      <hr>
      <section>
        <?php echo Asset::js('loaddb.js'); ?>
        <?php echo Asset::js('submitdb.js'); ?>
        <?php echo Asset::js('edit.js'); ?>
        <?php echo Asset::js('delete.js'); ?>
</body>
</html>