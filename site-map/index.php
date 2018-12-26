<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/site.php");

$site = Site::get();

$headTitle = $headerTitle = "Site Map";
$headDesc = "Site Map for Jahidul Pabel Islam's Portfolio, a Web and Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";
$site->echoHTMLHead($headTitle, $headDesc);

$navTint = "light";
$site->echoHeader($headerTitle, "", "", $navTint);
?>

                <div class="article">
                    <div class="container">
                        <ul class="site-map__list">
                            <li>
                                <a href="<?php $site->echoURL(); ?>" class="link">Home</a>
                            </li>
                            <li>
                                <a href="<?php $site->echoURL("projects"); ?>" class="link">Projects</a>
                                <ul>
                                    <li>
                                        <a href="<?php $site->echoURL("projects/mind-map"); ?>" class="link">Mind Map</a>
                                    </li>
                                    <li>
                                        <a href="<?php $site->echoURL("projects/bubbles-bargain-world"); ?>" class="link">BubblesBargainWorld</a>
                                    </li>
                                    <li>
                                        <a href="<?php $site->echoURL("projects/lials"); ?>" class="link">Lials</a>
                                    </li>
                                    <li>
                                        <a href="<?php $site->echoURL("projects/muesli"); ?>" class="link">Muesli</a>
                                    </li>
                                    <li>
                                        <a href="/projects/izibalo-android/frame.html" class="link">Izibalo - Android</a>
                                    </li>
                                    <li>
                                        <a href="<?php $site->echoURL("projects/e-games"); ?>" class="link">e-games</a>
                                    </li>
                                    <li>
                                        <a href="<?php $site->echoURL("projects/sportsite-universal"); ?>" class="link">Sportsite Universal</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="<?php $site->echoURL("contact"); ?>" class="link">Contact</a>
                            </li>
                            <li>
                                <a href="<?php $site->echoURL("about"); ?>" class="link">About</a>
                            </li>
                            <li>
                                <a href="<?php $site->echoURL("privacy-policy"); ?>" class="link">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="<?php $site->echoURL("links"); ?>" class="link">Links</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="article article--halved">
                    <div class="container">
                        <div class="article__half">
                            <a href="<?php $site->echoURL("contact"); ?>" class="btn btn--red">Get in Touch</a>
                        </div>

                        <div class="article__half">
                            <a href="<?php $site->echoURL("projects"); ?>" class="btn btn--purple">View My Work</a>
                        </div>
                    </div>
                </div>

<?php $site->echoFooter();