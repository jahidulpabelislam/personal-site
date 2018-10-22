<?php
$pageTitle = "About";
$headerTitle = "About Me";
$keywords = "";

$description = "Some Information About Jahidul Pabel Islam, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";

$headerDesc = "Find Out About Me";

$navTint = "light";

$techSkills = array(
	array("text" => "HTML", "desc" => "HTML5 & HTML4"),
	array("text" => "CSS", "desc" => "CSS3, SCSS, Bootstrap3/4"),
	array("text" => "JavaScript", "desc" => "Node.js (socket.io & Express), JQuery & AngularJS"),
	array("text" => "PHP", "desc" => "PHP5, PHP7, Wordpress, Laravel & PDO"),
	array("text" => "SQL", "desc" => "MySQL"),
	array("text" => "NoSQL", "desc" => "Amazon DynamoDB & MongoDB"),
	array("text" => "Java", "desc" => "Java EE 7, JSF 2, AWT & Swing"),
	array("text" => "Python", "desc" => "graphics.py"),
	array("text" => "Visual Basic"),
	array("text" => "DVCS", "desc" => "Git (GitHub & GitLab) & Mercurial (Bitbucket)"),
	array("text" => "Microsoft Office", "desc" => "Excel to create College/Uni grading systems and financial record system, Word, Powerpoint (Moved some work to Google Sheets, Docs & Slides)")
);

$otherSkills = array(
	array("text" => "Team Player", "desc" => "Being a good team player has been installed in me after playing with competitive Football teams"),
	array("text" => "Communication", "desc" => "Having experience in customer focused environments has taught me to have good written and spoken communication skills"),
	array("text" => "Hard Worker")
);

$interests = array(
	array("text" => "Sports"),
	array("text" => "Music"),
	array("text" => "Photography"),
	array("text" => "Fashion"),
	array("text" => "Programming"),
	array("text" => "Gaming"),
	array("text" => "Trading")
);

include $_SERVER['DOCUMENT_ROOT'] . '/partials/header.php';
?>

				<div class="article article--halved article--about">
					<div class="container">
						<div class="article__half">
							<div class="about__images-of-me">
								<img src="/assets/images/jahidul-pabel-islam-young.png?v=2" class="image-of-me image-of-me--baby" alt="Image of Jahidul Pabel Islam as a Child">
								<img src="/assets/images/jahidul-pabel-islam-casual.jpg?v=2" class="image-of-me image-of-me--grown" alt="Image of Jahidul Pabel Islam currently">
							</div>
						</div>
						<div class="article__half">
							<p>My name is Jahidul Pabel Islam.</p>
							
							<?php
							date_default_timezone_set("Europe/London");

							// Generate DateTime from my date of birth
							$dob = "22/02/1996";
							$dobDate = DateTime::createFromFormat("d/m/Y", $dob);
						
							// Today's DateTime
							$today = new DateTime();

							// Work out the time difference from both dates
							$diff = $today->diff($dobDate, true);
							
							// Get the number of years different
							$yearsDiff = $diff->format("%y");
							?>
							
							<p>I'm <?php echo $yearsDiff; ?> years old.</p>
							<p>A Full Stack Web and Software Developer.</p>
						</div>
					</div>
				</div>

				<div class="article article--halved article--about">
					<div class="container">
						<div class="article__half">
							<a href="https://www.brightminded.com" title="Link to BrightMinded website." target="_blank"><img src="/assets/images/brightminded.png?v=2" alt="Logo of BrightMinded"></a>
						</div>
						<div class="article__half">
							<p>Joined <a class="link-styled link-styled--lime-green" href="https://www.brightminded.com" title="Link to BrightMinded website." target="_blank">BrightMinded</a> as a Junior Web Developer in June 2017.</p>
						</div>
					</div>
				</div>

				<div class="article article--halved article--about">
					<div class="container">
						<div class="article__half">
							<a href="http://www.port.ac.uk" title="Link to University of Portsmouth website." target="_blank"><img src="/assets/images/uop.png?v=2" alt="Logo of University of Portsmouth"></a>
						</div>
						<div class="article__half">
							<p>Graduated from <a class="link-styled link-styled--purple" href="http://www.port.ac.uk" title="Link to University of Portsmouth website." target="_blank">University of Portsmouth</a> with First Class Honours in BSc (Hons) Web Technologies in July 2017.</p>
						</div>
					</div>
				</div>

				<div class="article article--halved article--about">
					<div class="container">
						<div class="article__half">
							<a href="https://goo.gl/maps/KEJgpYCxm6x" title="Link to Map of Bognor Regis." target="_blank"><img src="/assets/images/beach.jpg?v=2" alt="Image of a Beach"></a>
						</div>
						<div class="article__half">
							<p>Based in <a class="link-styled link-styled--red" href="https://goo.gl/maps/KEJgpYCxm6x" title="Link to Map of Bognor Regis." target="_blank">Bognor Regis</a>, <a class="link-styled link-styled--red" href="https://goo.gl/maps/EopyB2gtqXF2" title="Link to Map of West Sussex." target="_blank">West Sussex</a>, South East Coast of England.</p>
						</div>
					</div>
				</div>

				<div class="article article--map">
					<div class="map" id="map"></div>
				</div>

				<div class="article article--halved article--about">
					<div class="container">
						<div class="article__half">
							<img src="/assets/images/languages.png?v=2" alt="Image of 'hello' in different languages">
						</div>
						<div class="article__half">
							<p>I am Bilingual, I can speak English &amp; Bengali.</p>
						</div>
					</div>
				</div>

				<section class="article article--about">
					<div class="container">
						<h3 class="article__header">Technical Skills</h3>

						<ul class="about__skills-interests">
							<?php
							foreach ($techSkills as $skill) {
								$skillText = $skill["text"];
								$skillDesc = (isset($skill["desc"])) ? $skill["desc"] : false;

								$expandClass = ($skillDesc) ? "js-expand-skill-interest" : "";

								echo '<li class="skills-interests__item skills-interests__item--blue ' . $expandClass . '">';
								echo $skillText;

								if ($skillDesc) {
									echo ' <span class="fa fa-plus skills-interests__item-expand-icon"></span><div class="skills-interests__item-expand-content">' . $skillDesc . '</div>';
								}
								echo '</li>';
							}
							?>
						</ul>
					</div>
				</section>

				<section class="article article--about">
					<div class="container">
						<h3 class="article__header">Other Skills</h3>

						<ul class="about__skills-interests">
							<?php
							foreach ($otherSkills as $skill) {
								$skillText = $skill["text"];
								$skillDesc = (isset($skill["desc"])) ? $skill["desc"] : false;

								$expandClass = ($skillDesc) ? "js-expand-skill-interest" : "";

								echo '<li class="skills-interests__item skills-interests__item--purple ' . $expandClass . '">';
								echo $skillText;

								if ($skillDesc) {
									echo ' <span class="fa fa-plus skills-interests__item-expand-icon"></span><div class="skills-interests__item-expand-content">' . $skillDesc . '</div>';
								}
								echo '</li>';
							}
							?>
						</ul>
					</div>
				</section>

				<section class="article article--about">
					<div class="container">
						<h3 class="article__header">Interests</h3>

						<ul class="about__skills-interests">

							<?php
							foreach ($interests as $interest) {
								$interestText = $interest["text"];
								$interestDesc = (isset($interest["desc"])) ? $interest["desc"] : false;

								$expandClass = ($skillDesc) ? "js-expand-skill-interest" : "";

								echo '<li class="skills-interests__item skills-interests__item--green ' . $expandClass . '">';
								echo $interestText;

								if ($interestDesc) {
									echo ' <span class="fa fa-plus skills-interests__item-expand-icon"></span><div class="skills-interests__item-expand-content">' . $interestDesc . '</div>';
								}

								echo '</li>';
							}
							?>
						</ul>
					</div>
				</section>

				<section class="article">
					<div class="container">
						<h3 class="article__header">What I've Been Up To</h3>
						<div class="timeline">
							<div class="timeline__item timeline__item--active">
								<h2 class="timeline-item__date">2017 - Present</h2>
								<div class="timeline-item__content timeline-item__content--work">
									<p>Junior Web Developer @ <a class="link-styled link-styled--orange" href="https://www.brightminded.com" title="Link to BrightMinded website." target="_blank">BrightMinded</a></p>
								</div>
							</div>
							<div class="timeline__item">
								<h2 class="timeline-item__date">2014 - 2017</h2>
								<div class="timeline-item__content timeline-item__content--school">
									<p>BSc (Hons) Web Technologies Student @ <a class="link-styled link-styled--orange" href="http://www.port.ac.uk" title="Link to University of Portsmouth website." target="_blank">University of Portsmouth</a></p>
								</div>
							</div>
							<div class="timeline__item">
								<h2 class="timeline-item__date">2014 - 2017</h2>
								<div class="timeline-item__content timeline-item__content--film">
									<p>Working Part Time @ <a class="link-styled link-styled--orange" href="https://uk.webuy.com/" title="Link to CeX website." target="_blank">CeX</a> as a Sales Assistant</p>
								</div>
							</div>
							<div class="timeline__item">
								<time class="timeline-item__date">2014</time>
								<div class="timeline-item__content timeline-item__content--food">
									<p>Working Part Time @ <a class="link-styled link-styled--orange" href="https://www.kfc.co.uk/" title="Link to KFC website." target="_blank">KFC</a> as a Team Member</p>
								</div>
							</div>
							<div class="timeline__item">
								<h2 class="timeline-item__date">2012 - 2014</h2>
								<div class="timeline-item__content timeline-item__content--school">
									<p>BTEC Extended Diploma in IT Student @ <a class="link-styled link-styled--orange" href="https://chichester.ac.uk/" title="Link to Chichester College website." target="_blank">Chichester College</a></p>
								</div>
							</div>
							<div class="timeline__item">
								<time class="timeline-item__date">2010</time>
								<div class="timeline-item__content timeline-item__content--coding">
									<p>Got Introduced to Developing/Coding</p>
								</div>
							</div>
							<div class="timeline__item">
								<h2 class="timeline-item__date">2005 - 2009</h2>
								<div class="timeline-item__content timeline-item__content--football">
									<p>Playing for a Competitive Football Team @ <a class="link-styled link-styled--orange" href="http://www.felphamcolts.com/" title="Link to Felpham Colts website." target="_blank">Felpham Colts</a></p>
								</div>
							</div>
							<div class="timeline__item">
								<h2 class="timeline-item__date">1996 - 2007</h2>
								<div class="timeline-item__content timelime-item__content--childhood">
									<p>Life before getting introduced to technology</p>
								</div>
							</div>
							<div class="timeline__item">
								<time class="timeline-item__date">1996</time>
								<div class="timeline-item__content timeline-item__content--baby">
									<p>Born</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<div class="article article--halved">
					<div class="container">
						<div class="article__half">
							<a class="btn btn--purple" href="/projects/">View My Work</a>
						</div>

						<div class="article__half">
							<a class="btn btn--red" href="/contact/">Get in Touch</a>
						</div>
					</div>
				</div>

				<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDMU8a7-Fl8_ozCH4y_ZAL6n5fdy1sLeJg"></script>

				<script>
					var style = <?php echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/assets/map-styling.json'); ?>;

					var initMap = function () {
						var lat = 50.78420;
						var lng = -0.67400;

						var bognorRegis = new google.maps.LatLng(lat, lng);
						var zoom = 12;

						var map = new google.maps.Map(document.getElementById('map'), {
							center: bognorRegis,
							zoom: zoom,
							zoomControl: true,
							mapTypeControl: false,
							scaleControl: false,
							streetViewControl: false,
							rotateControl: false,
							fullscreenControl: false,
							styles: style
						});

						var bognorRegisMarker = new google.maps.Marker({
							position: bognorRegis,
							map: map
						});

						google.maps.event.addDomListener(window, 'resize', function () {
							map.setCenter(bognorRegis);
						});
					};

					google.maps.event.addDomListener(window, 'load', initMap);
				</script>

<?php
include $_SERVER['DOCUMENT_ROOT'] . '/partials/footer.php';
?>