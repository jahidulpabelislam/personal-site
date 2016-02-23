<html>
	<head>
		<link rel = "stylesheet" type = "text/css" href = "index.css" />
			<title>E-Games</title>
		<script>
			function changeImage() // this creates a function 
			{
			element=document.getElementById('fifa14')
			if (element.src.match("fifa14back")) //this sets a if statement
				{
				element.src="fifa14.jpg"; //this is the result if if statement is true
				}
			else
				{
				element.src="fifa14back.png"; //this is the result if if statement is false
				}
			}
		</script>
	</head>

	<body>
		<div id="container">

			<div id = "header">
			<a style=font-family:BradleyHandITC;font-size:14pt; href = "SignUp.html" title="Link to Home Page">Sign Up</a>
				<img src = "logo22.png"  alt = "Logo"/>
				<script align="right">
					document.write(Date()); //this displays the date and time
				</script>
			</div>

			<div id = "menu">
				<a href = "index.html" title="Link to Home Page">Home</a> <br>
				<a href = "store.html" title="Link to Store page">Store</a> <br>
				<a href = "order.html" title="Link to Order page">Order</a> <br>
				<a href = "help.html" title ="Link to Help page">Help</a> <br>
			</div>

			<div id = "content">
			<center>
			<h1>User Details</h1>
			<hr>
			<?PHP
			//get data from form
			$username = $_GET['txtUsername'];
			$password = $_GET['txtPassword'];
		
			//display data on screen
			echo "Your details are:<br/>";
			echo "Username: " . $username . " <br> " . "Password: " . $password . "<br/>";
			?>
			<center>
			</div>

			<div id= "footer">
				Copyright @ E-games
			</div>
		</div>
	</body>
</html>
