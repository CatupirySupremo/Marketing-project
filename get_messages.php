<?php
    include("connection.php");
    $sql=null;
    $mysqli = new mysqli($server, $user, $passw, $bd);
    if($mysqli->connect_error) {
        exit('Could not connect');
    }
    $sql = "SELECT tb01_User_ID, tb01_User_Name, tb01_Corpo, tb01_Data_Hora FROM tb01_messages WHERE (tb01_User_ID=$_GET[id] AND tb01_Receive_ID=0) OR (tb01_User_ID=0 AND tb01_Receive_ID=$_GET[id]) ORDER BY tb01_Data_Hora;";
    $result = $mysqli->query($sql);
    while ($row = $result->fetch_row()) {
        if($row[0]==0){ echo "<div class='chat-body-right'>"; } else echo "<div class='chat-body-left'>";
        $date_time = explode(" ", $row[3]);
        echo "<p>".$row[2]."</p>".
            "<span>".date('H:i', strtotime($date_time[1])).", ".date('d/m/Y', strtotime($date_time[0]))."</span>".
            "</div>";
    }
    $result->free_result();
    $mysqli->close();
?>
