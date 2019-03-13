<?php
    include("connection.php");
    $sql=null;
    $mysqli = new mysqli($server, $user, $passw, $bd);
    if($mysqli->connect_error) {
        exit('Could not connect');
    }
    $sql = "select max(tb01_Session_ID) from tb01_messages;";
    $result = $mysqli->query($sql);
    $row = $result->fetch_row();
    echo($row[0]);
    $result->free_result();
    $mysqli->close();
?>
