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
				<h1>User Details</h1>
				<hr>
				<?php
                    include $_SERVER['DOCUMENT_ROOT']. '/config.php';

					$con = mysqli_connect(DB_IP, DB_USERNAME, DB_PASSWORD);
					//gets login details for mysql
					if(!$con)
					{
                        if (defined("DEBUG") && DEBUG) {
                        	echo "Error adding password for e-games: " . mysqli_connect_error();
                        }
                        error_log("Error adding password for e-games: " . mysqli_connect_error());
                        die('Could not connect.');
					}
					mysqli_select_db($con, DB_NAME);
					//gets database from mysql

					$username = $_POST['txtUsername'];
					$password = $_POST['txtPassword'];
					//gets sign up details from text boxes on the form
                    $query = $con->prepare("INSERT INTO EGamesUser (Username, Password) VALUES (?, ?);");
                    $query->bind_param("ss", $username, $password);
                    $query->execute();
					//inputs data into database.

					mysqli_close($con);

					echo "Your details have been added! <br/>";
					//displays this text
				?>
			</div>

			<div id= "footer">
				Copyright @ E-games
			</div>
		</div>
	</body>
</html>
