<?php

if ( !empty( $_FILES ) ) {

    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    $uploadPath = iconv("utf-8","gbk",$uploadPath);

    if (!move_uploaded_file($tempPath,$uploadPath)) {
        echo json_encode(array('success' => false));
        exit(0);
    }

    $answer = array( 'success' =>  true);
    $json = json_encode( $answer );

    echo $json;

} else {
    echo 'No files';

}

?>