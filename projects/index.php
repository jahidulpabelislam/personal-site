<?php
$headerTitle = "My Projects";
$keywords = "";
$description = "Look at the Previous Projects of Jahidul Pabel Islam has developed, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";
$headerDesc = "See My Skills in Action in My Previous Projects";

$navTint = "dark";

$page = $_GET["page"] ?? 1;

$search = $_GET["search"] ?? "";

$pageTitle = "Projects";

if (strlen(trim($search)) > 0) {
	$pageTitle .= " with $search";
}

if ($page > 1) {
	$pageTitle .= " - Page $page";
}

include $_SERVER['DOCUMENT_ROOT'] . '/partials/header.php';

include $_SERVER['DOCUMENT_ROOT'] . '/config.php';
?>

				<section class="article">
					<div class="container">

						<h2>These are some of the pieces of work I have completed during my time as a developer.</h2>

						<form class="search-form">
							<label for="search" class="screen-reader-text">Search for projects.</label>
							<input type="text" class="input search-form__input" placeholder="Search for projects..." value="<?php echo $search; ?>">
							<button class="btn btn--blue search-form__submit" type="submit">
								<i class="fa fa-search"></i>
							</button>
						</form>

						<p class="feedback feedback--error"></p>
						<i class="projects__loading-img fa fa-spinner fa-spin fa-3x"></i>
						<div class="projects js-all-projects"></div>
						<ul class="pagination pagination--projects"></ul>
						
						<input type="hidden" class="js-projects-page" value="<?php echo $page; ?>">
					</div>
				</section>

				<div class="article article--halved">
					<div class="container">
						<div class="article__half">
							<a class="btn btn--purple" href="/contact/">Get in Touch</a>
						</div>

						<div class="article__half">
							<a class="btn btn--green" href="/about/">Learn About Me</a>
						</div>
					</div>
				</div>

				<div class="expanded-slide-show">
					<div class="expanded-image-container">
						<img src="/assets/images/blank.svg?v=1" class="expanded-image current" alt="Expanded Image of slide">
					</div>

					<div class="expanded-image-container">
						<img src="/assets/images/blank.svg?v=1" class="expanded-image" alt="Expanded Image of slide">
					</div>

					<div class="expanded-slide-show__controls">
						<div class="expanded-slide-show__navs">
							<img class="expanded-slide-show__nav js-expanded-slide-show-previous" src="/assets/images/previous-white.svg?v=1" alt="Arrow pointing to the right" aria-label="Click to View Previous Image">
							<img class="expanded-slide-show__nav js-expanded-slide-show-next" src="/assets/images/next-white.svg?v=1" alt="Arrow pointing to the left" aria-label="Click to View Next Image">
						</div>

						<div class="expanded-slide-show__bullets"></div>
						
						<p class="expanded-slide-show__counter">
							<span class="js-expanded-slide-show-current-count"></span>
							<span>/</span>
							<span class="js-expanded-slide-show-total-count"></span>
						</p>
					</div>

					<button type="button" class="btn btn--red expanded-slide-show__close">X</button>
				</div>

				<div class="modal detailed-project">
					<div class="modal__content">
						<div class="project__header">
							<h3 class="project__title project__title--inline"></h3>
							<time class="project__date project__date--inline project__date--modal">2018</time></div>
						<div class="project__skills"></div>
						<div class="project__description"></div>
						<p class="project__links"></p>
						<div id="detailed-project__slide-show" class="slide-show">
							<div class="slide-show__viewpoint" data-slide-show-id="#detailed-project__slide-show">
								<div class="slide-show__slides-container"></div>
								<img class="slide-show__nav slide-show__nav--blue slide-show__nav-previous js-move-slide" src="/assets/images/previous.svg?v=1" alt="Arrow pointing to the right" aria-label="Click to View Previous Image"data-slide-show-id="#detailed-project__slide-show" data-nav-direction="previous">
								<img class="slide-show__nav slide-show__nav--blue slide-show__nav-next js-move-slide" src="/assets/images/next.svg?v=1" alt="Arrow pointing to the left" aria-label="Click to View Next Image" data-slide-show-id="#detailed-project__slide-show" data-nav-direction="next">
							</div>
							<div class="js-slide-show-bullets"></div>
						</div>
					</div>
				</div>

				<script type="text/template" id="tmpl-project-template">
					<article id="project--{{ID}}" class="project">
						<h3 class="article__header project__title">{{Name}}</h3>
						<time class="project__date">{{Date}}</time>
						<div class="project__skills"></div>
						<div class="project__description">{{ShortDescription}}</div>
						<div class="project__links"></div>
						<button class="btn btn--{{Colour}} js-open-modal project__read-more project__read-more--{{Colour}}">Read More</button>
						<div id="slide-show--{{ID}}" class="slide-show">
							<div class="slide-show__viewpoint" data-slide-show-id="#slide-show--{{ID}}">
								<div class="slide-show__slides-container"></div>
								<img class="slide-show__nav slide-show__nav--{{Colour}} slide-show__nav-previous js-move-slide" src="/assets/images/previous.svg?v=1" alt="Arrow pointing to the right" aria-label="Click to View Previous Image" data-slide-show-id="#slide-show--{{ID}}" data-nav-direction="previous">
								<img class="slide-show__nav slide-show__nav--{{Colour}} slide-show__nav-next js-move-slide" src="/assets/images/next.svg?v=1" alt="Arrow pointing to the left" aria-label="Click to View Next Image" data-slide-show-id="#slide-show--{{ID}}" data-nav-direction="next">
							</div>
							<div class="js-slide-show-bullets"></div>
						</div>
					</article>
				</script>

				<script type="text/template" id="tmpl-slide-template">
					<div class="slide-show__slide" id="slide-{{ID}}">
						<img src="{{File}}?v=2" class="slide-show__img js-expandable-image" alt="Screen shot of project" data-slide-show-id="#slide-show--{{ProjectID}}" data-slide-colour="{{Colour}}">
					</div>
				</script>

				<script type="text/template" id="tmpl-slide-bullet-template">
					<label class="slide-show__bullet slide-show__bullet--{{Colour}} js-slide-show-bullet" data-slide-show-id="{{Slide-Show-ID}}" data-slide-id="slide-{{ID}}"></label>
				</script>
	
				<script>
					window.jpi = window.jpi || {};
					window.jpi.config = window.jpi.config || {};
					window.jpi.config.jpiAPIEndpoint = "<?php echo (defined("JPI_API_ENDPOINT")) ? JPI_API_ENDPOINT : 'https://api.jahidulpabelislam.com/v2/'; ?>";
				</script>

<?php
include $_SERVER['DOCUMENT_ROOT'] . '/partials/footer.php';
?>