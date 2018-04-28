                <div class="social-links">
                    <div class="container">
                        <h5 class="social-links__header">Follow Me Here!</h5>
                        <a href="https://uk.linkedin.com/in/jahidulpabelislam" target="_blank" class="social-link"><img src="/assets/images/linkedin.svg" alt="Find me on Linkedin /jahidulpabelislam" class="social-links__img social-link__img social-link__img--linkedin"></a>
                        <a href="https://github.com/jahidulpabelislam" target="_blank" class="social-link "><img src="/assets/images/github.svg" alt="Find me on GitHub /jahidulpabelislam" class="social-links__img social-link__img social-link__img--github"></a>
                        <a href="https://www.instagram.com/jahidulcodes/" target="_blank" class="social-link "><span class="social-links__img social-link__img social-link__img--instagram "><i></i></span></a>
                    </div>
                </div>
            </div>
        </section>

        <footer class="footer">

            <div class="container">

                <div class="footer__links">
                    <p>
                        <a class="footer__link" href="/site-map">Site Map</a>
                        <a class="footer__link" href="https://validator.w3.org/check?uri=referer" target="_blank">Valid HTML</a>
                        <a class="footer__link" href="https://jigsaw.w3.org/css-validator/check/referer" target="_blank">Valid CSS</a>
                    </p>
                </div>

                <div class="footer__legal">
                    <?php date_default_timezone_set("Europe/London"); ?>
                    <p>&copy; Jahidul Pabel Islam <?php echo date("Y"); ?> All Rights Reserved</p>
                </div>

            </div>
        </footer>

        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <?php if (!isset($_GET["debug"])):?>
            <script src="/assets/js/main.min.js?v=1" type="text/javascript"></script>
        <?php else: ?>
            <script src="/assets/js/expandImage.js?v=1" type="text/javascript"></script>
            <script src="/assets/js/slideShow.js?v=1" type="text/javascript"></script>
            <script src="/assets/js/helperFunctions.js?v=1" type="text/javascript"></script>
            <script src="/assets/js/xhr.js?v=1" type="text/javascript"></script>
            <script src="/assets/js/projects.js?v=1" type="text/javascript"></script>
            <script src="/assets/js/projectsPreview.js?v=1" type="text/javascript"></script>
            <script src="/assets/js/form.js?v=1" type="text/javascript"></script>
            <script src="/assets/js/stickyFooter.js?v=1" type="text/javascript"></script>
            <script src="/assets/js/third-party/waypoint.min.js?v=1" type="text/javascript"></script>
            <script src="/assets/js/third-party/jquery.countTo.js?v=1" type="text/javascript"></script>
            <script src="/assets/js/main.js?v=1" type="text/javascript"></script>
        <?php endif; ?>
    </body>
</html>