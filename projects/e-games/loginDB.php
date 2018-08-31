<?php
session_start();
?>
<html>
	<head>
		<link rel = "stylesheet" type = "text/css" href = "index.css" />
			<title>E-Games</title>
	</head>

	<body>
		<div id="container">

			<div id = "header">
			<a style=font-family:BradleyHandITC;font-size:14pt; href = "signup.html" title="Link to Sign Up Page">Sign Up</a>
			<a style=font-family:BradleyHandITC;font-size:14pt; href = "loginForm.html" title="Link to Log In Page">Log In</a>
				<img src = "logo2.png"  alt = "Logo"/>
 <script>
					document.write(Date());
				</script>
			</div>

			<div id = "menu">
				<a href ="index.html" title="Link to Home Page">Home</a> <br>
				<a href = "store.html" title="Link to Store page">Store</a> <br>
				<a href = "order.html" title="Link to Order page">Order</a> <br>
				<a href = "help.html" title ="Link to Help page">Help</a> <br>
			</div>

			<div id = "content">
				<center>
				<h1>Login Confirmation</h1>
				<hr>
				<?php
                    include $_SERVER['DOCUMENT_ROOT']. '/config.php';

					$username=$_POST['username'];
					$password=$_POST['password'];

					//echo "You typed " . $username . " " . $password;//shows what user typed in for confirmation

					$con = mysqli_connect (DB_IP, DB_USERNAME, DB_PASSWORD);//gets login details for mysql

					if (!$con)
                    {
                        if (defined("DEBUG") && DEBUG) {
                            echo mysqli_connect_error();
                        }
                        die('Could not connect.');
                    }

					mysqli_select_db($con, DB_NAME);//gets database from mysql

					//searches the table for record that has the same username as the one that has been typed
                    $query = $con->prepare("SELECT * FROM EGamesUser WHERE Username = ?;");
                    $query->bind_param("s", $username);
                    $query->execute();
                    $result = $query->get_result();
                    $row = $result->fetch_assoc();

					if ($row)
						{
						if ($password == $row['Password'])// if password matches then following text is displayed
							{
							echo " Correct username and password";
							}
						else // if password dosen't match then following text is displayed
							{
							echo " Incorrect password";
							}
						}
						else// if password is right but username dosen't match then following text is displayed
							{
							echo " Invalid username";
							}

					mysqli_close($con);
				?>
			</div>

			<div id= "footer">
				Copyright @ E-games
			</div>
		</div>
	</body>
</html>
