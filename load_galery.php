<?php
    include("connection.php");
    $sql=null;
    $mysqli = new mysqli($server, $user, $passw, $bd);
    if($mysqli->connect_error) {
        exit("Could not connect");
    }
    $sql = "SELECT * FROM tb03_galery;";
    $result = $mysqli->query($sql);
    $c = 0;
    while ($row = $result->fetch_row()) {
        echo "<div class='tiny reveal' id='mediaModal$c' data-reveal>".
            "<img src='$row[0]' alt='' style='width: 100%; padding: 2em 0 0 0;' />".
            "<button class='close-button' data-close aria-label='Close modal' type='button'>".
                "<span aria-hidden='true'>&times;</span>".
            "</button>".
        "</div>".
        "<div class='small-2 medium-3 large-3 cell column-block filter-simple-item $row[1]' data-open='mediaModal$c'>".
            "<img src='$row[0]' class='thumbnail' alt='' />".
        "</div>";
        $c = $c + 1;
    }
    $result->free_result();
    $mysqli->close();
?>
