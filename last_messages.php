<?php
    include("connection.php");
    $sql=null;
    $mysqli = new mysqli($server, $user, $passw, $bd);
    if($mysqli->connect_error) {
        exit('Could not connect');
    }
    $sql = "SELECT tb01_User_ID FROM tb01_messages WHERE tb01_User_ID!=0 GROUP BY tb01_User_ID;";
    $result = $mysqli->query($sql);
    while ($row = $result->fetch_row()) {
        $sql = "SELECT tb01_User_Name, tb01_Corpo, tb01_Data_Hora FROM tb01_messages WHERE tb01_Data_Hora=(SELECT MAX(tb01_Data_Hora) FROM tb01_messages WHERE tb01_User_ID=$row[0]) AND tb01_User_ID=$row[0];";
        $subresult = $mysqli->query($sql);
        $subrow = $subresult->fetch_row();
        $date_time = explode(" ", $subrow[2]);
        echo "<div class='chat-body-left header hollow secondary' id='div$row[0]'>".
            "<p class='name'>$subrow[0]</p>".
            "<p class='message' id='message$row[0]'>".$subrow[1]."</p>".
            "<div class='datetime' id='timestamp$row[0]'><span>".date('H:i', strtotime($date_time[1])).", ".date('d/m/Y', strtotime($date_time[0]))."</span></div>".
            "</div>";
    }
    $subresult->free_result();
    $result->free_result();
    $mysqli->close();
?>
