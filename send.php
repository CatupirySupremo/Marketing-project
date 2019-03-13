<?php
    include("connection.php");
    $sql=null;
        $mysqli = new mysqli($server, $user, $passw, $bd);
        if($mysqli->connect_error) {
            exit('Could not connect');
        }
        $sql = "INSERT INTO tb01_messages (tb01_Receive_ID, tb01_User_ID, tb01_User_Name, tb01_Corpo) VALUES ('$_GET[r]', '$_GET[u]', '$_GET[n]', '$_GET[m]');";
        $mysqli->query($sql);
        $mysqli->close();
?>
