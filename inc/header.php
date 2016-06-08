<!doctype html>
<html lang="en-gb">

	<head>
		<meta charset="utf-8">
		<link href="/lib/style.css" rel="stylesheet" title="style" media="all" type="text/css">
		<link rel="icon" href="/images/favicon.ico">
		<title><?php echo $title ?> | Jahidul Pabel Islam</title>
	</head>

	<body>
		<header>
			<a href = "/" title="Link to About Page"><img src="/images/logo.svg" width=150 height=150 alt="Logo"></a>
			<h1>Jahidul Pabel Islam,</h1>
			<p>I'm a Web Developer</p>
		</header>
			
		<nav>
			<a <?php if ($title == "Home") echo "id='active'"; ?> href = "/" title="Link to Home Page">Home</a> |
			<a <?php if ($title == "About Me") echo "id='active'"; ?> href = "/about-me/" title="Link to About Me Page">About Me</a> |
			<a <?php if ($title == "Previous Work") echo "id='active'"; ?> href = "/previous-work/" title="Link to Previous Work Page">Previous Work</a> |
			<a <?php if ($title == "Contact") echo "id='active'"; ?> href = "/contact/" title="Link to Contact Page">Contact</a>
		</nav>
			
		<section>
			<h2><?php echo $title ?></h2>
			<hr>