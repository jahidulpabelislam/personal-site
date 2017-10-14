                <div id="socialMediaLinks">
                    <div class="container">
                        <h5 class="wow fadeInDown" data-wow-delay="0.6s">Ways to Contact Me!</h5>
                        <a href="mailto:jahidul.pabel.islam@hotmail.com" target="_blank" class="emailLink "><img src="/images/email.svg" alt="Email me" class="socialMediaImg emailImg wow fadeInLeft" data-wow-delay="0.8s"></a>
                        <a href="http://uk.linkedin.com/in/jahidulpabelislam" target="_blank" class="linkedinLink"><img src="/images/linkedin.svg" alt="Find me on Linkedin /jahidulpabelislam" class="socialMediaImg linkedinImg wow fadeInUp" data-wow-delay="0.8s"></a>
                        <a href="https://github.com/jahidulpabelislam" target="_blank" class="githubLink "><img src="/images/github.svg" alt="Find me on GitHub /jahidulpabelislam" class="socialMediaImg githubImg wow fadeInRight" data-wow-delay="0.8s"></a>
                    </div>
                </div>
            </div>
        </section>

        <footer class="footer">

            <div class="container">

                <div class="footer__links">
                    <p>
                        <a class="footer__link" href="/site-map.xml">Site Map</a>
                        <a class="footer__link" href="http://validator.w3.org/check?uri=referer" target="_blank">Valid HTML</a>
                        <a class="footer__link" href="http://jigsaw.w3.org/css-validator/check/referer" target="_blank">Valid CSS</a>
                    </p>
                </div>

                <div class="footer__legal">
                    <p>&copy; Jahidul Pabel Islam <?php echo date("Y"); ?> All Rights Reserved</p>
                </div>

            </div>
        </footer>

        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <?php if (!isset($_GET["debug"])):?>
            <script src="/lib/js/main.min.js" type="text/javascript"></script>
        <?php else: ?>
            <script src="/lib/js/expandImage.js" type="text/javascript"></script>
            <script src="/lib/js/slideShow.js" type="text/javascript"></script>
            <script src="/lib/js/helperFunctions.js" type="text/javascript"></script>
            <script src="/lib/js/xhr.js" type="text/javascript"></script>
            <script src="/lib/js/projects.js" type="text/javascript"></script>
            <script src="/lib/js/projectsPreview.js" type="text/javascript"></script>
            <script src="/lib/js/form.js" type="text/javascript"></script>
            <script src="/lib/js/stickyFooter.js" type="text/javascript"></script>
            <script src="/lib/js/third-party/wow.min.js" type="text/javascript"></script>
            <script src="/lib/js/nav.js" type="text/javascript"></script>
        <?php endif; ?>

        <script>
            new WOW().init();
        </script>
    </body>
</html>