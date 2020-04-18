<?php
header ( "Content-type:text/html;charset=utf-8" );
$songName = $_POST["songname"];
$query = "SELECT * FROM `".$songName."` ORDER BY `score` DESC";
   if ( !( $database = mysqli_connect( "localhost", "root", "aa" ) ) )
       die( "Could not connect to database." );
   mysqli_query($database,'set names utf8');
   if ( !mysqli_select_db($database,"score_list" ) )
       die( "Could not open products database." );
   if ( !( $result = mysqli_query($database, $query) ) )
   {
       print( "Could not execute query!" );
       die( mysqli_error() );
   }
   mysqli_close( $database );
   $count = 0;
   while ( $row = mysqli_fetch_row( $result ) and $count < 8)
   {
	   print($row[0]."-".$row[1]."/");
	   
	   $count++;
   }
?>