<?php
include "db.php";

$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];

mysqli_query($conn, "INSERT INTO users VALUES('', '$name', '$email', '$password')");
header("Location: login.html");
?>