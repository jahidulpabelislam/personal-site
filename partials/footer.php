				<!-- End dynamic content -->
				<section class="social-links">
					<div class="container">
						<h5 class="social-links__header">Follow Me Here!</h5>
						<a href="https://uk.linkedin.com/in/jahidulpabelislam/" class="social-link" target="_blank"><img src="/assets/images/linkedin.svg?v=1" alt="Find me on Linkedin /jahidulpabelislam" class="social-links__img social-link__img social-link__img--linkedin"></a>
						<a href="https://github.com/jahidulpabelislam/" class="social-link" target="_blank"><img src="/assets/images/github.svg?v=1" alt="Find me on GitHub /jahidulpabelislam" class="social-links__img social-link__img social-link__img--github"></a>
						<a href="https://www.instagram.com/jahidulcodes/" class="social-link" target="_blank"><span class="social-links__img social-link__img social-link__img--instagram "><i></i></span></a>
					</div>
				</section>
			</div>
		</main>

		<footer class="footer">

			<div class="container">

				<div class="footer__version">
					<?php echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/assets/version.txt') . PHP_EOL; ?>
				</div>

				<div class="footer__links">
					<p>
						<a href="<?php Site::echoURL("site-map"); ?>" class="footer__link" >Site Map</a>
						<a href="<?php Site::echoURL("privacy-policy"); ?>" class="footer__link" >Privacy Policy</a>
						<a href="https://validator.w3.org/check/?uri=referer" class="footer__link" target="_blank">Valid HTML</a>
						<a href="https://jigsaw.w3.org/css-validator/check/referer/" class="footer__link" target="_blank">Valid CSS</a>
					</p>
				</div>

				<div class="footer__legal">
					<?php date_default_timezone_set("Europe/London"); ?>
					<p>&copy; Jahidul Pabel Islam <?php echo date("Y"); ?> All Rights Reserved</p>
				</div>

			</div>
		</footer>

		<?php
		Site::echoCookieBanner();
		?>

		<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

		<script src="/assets/js/jpi/config.js?v=1" type="text/javascript"></script>

		<!-- Include all compiled plugins (below), or include individual files as needed -->
		<?php if (!isset($_GET["debug"])) {
			?>
			<script src="/assets/js/main.min.js?v=1" type="text/javascript"></script>
			<?php
		}
		else { ?>
			<script src="/assets/js/jpi/expandedSlideShow.js?v=1" type="text/javascript"></script>
			<script src="/assets/js/jpi/slideShow.js?v=1" type="text/javascript"></script>
			<script src="/assets/js/jpi/helpers.js?v=1" type="text/javascript"></script>
			<script src="/assets/js/jpi/ajax.js?v=1" type="text/javascript"></script>
			<script src="/assets/js/jpi/projects.js?v=1" type="text/javascript"></script>
			<script src="/assets/js/jpi/home.js?v=1" type="text/javascript"></script>
			<script src="/assets/js/jpi/form.js?v=1" type="text/javascript"></script>
			<script src="/assets/js/jpi/stickyFooter.js?v=1" type="text/javascript"></script>
			<script src="/assets/js/third-party/waypoint.min.js?v=1" type="text/javascript"></script>
			<script src="/assets/js/third-party/jquery.countTo.js?v=1" type="text/javascript"></script>
			<script src="/assets/js/jpi/nav.js?v=1" type="text/javascript"></script>
			<script src="/assets/js/jpi/cookieBanner.js?v=1" type="text/javascript"></script>
			<script src="/assets/js/jpi/main.js?v=1" type="text/javascript"></script>
			<?php
		}
		?>

	</body>

</html>