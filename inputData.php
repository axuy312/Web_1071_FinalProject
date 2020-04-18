<?php
header ( "Content-type:text/html;charset=utf-8" );
$name = $_POST["name"];
$score = $_POST["score"];
$songname = $_POST["songname"];

$query = "SELECT * FROM `".$songname."`";
$insertData = "INSERT INTO `".$songname."` (`name`, `score`) VALUES ('".$name."', '".$score."')";
$updateData = "UPDATE `".$songname."` SET `score` = '".$score."' WHERE `".$songname."`.`name` = '".$name."'";
   if ( !( $database = mysqli_connect( "localhost", "root", "aa" ) ) )
       die( "Could not connect to database </body></html>" );
   mysqli_query($database,'set names utf8');
   if ( !mysqli_select_db($database,"score_list" ) )
       die( "Could not open products database </body></html>" );
   if ( !( $result = mysqli_query($database, $query) ) )
   {
       print( "<p>Could not execute query!</p>" );
       die( mysqli_error());
   }
   
   while ( $row = mysqli_fetch_row( $result ) )
   {
	   if($row[0] == $name && $row[1] < $score){
		   if ( !( mysqli_query($database, $updateData) ) )
		   {
			   print( "<p>Could not update data!</p>" );
			   die( mysqli_error() );
		   }
		   die("1");
	   }
	   else if($row[0] == $name && $row[1] >= $score){
		   die("1");
	   }
   }
	if ( !mysqli_query($database, $insertData) )
	{
		print( "<p>Could not insert data!</p>" );
		die( mysqli_error());
	}
   
   mysqli_close( $database );
   print("1");
?>