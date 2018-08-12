<?php
/*
 * A RESTful API router.
 * @author Jahidul Pabel Islam
*/

//include all files needed
include $_SERVER['DOCUMENT_ROOT'] . '/api/inc/app.php';

list($method, $path, $data) = Helper::extractFromRequest();

$api = new API();

//do relevant stuff with path[1]
switch ($path[0]) {
	case "login":
		switch ($method) {
			case "POST":
				$results = Auth::login($data);
				break;
			default:
				$results["meta"] = Helper::methodNotAllowed($method, $path);
		}
		break;
	case "logout":
		switch ($method) {
			case "GET":
				$results = Auth::logout();
				break;
			default:
				$results["meta"] = Helper::methodNotAllowed($method, $path);
		}
		break;
	case "session":
		switch ($method) {
			case "GET":
				$results = $api->getAuthStatus();
				break;
			default:
				$results["meta"] = Helper::methodNotAllowed($method, $path);
		}
		break;
	case "projects":
		switch ($method) {
			case "GET":
				if (isset($path[1]) && trim($path[1]) !== "")
				{
					$projectID = $path[1];
					if (isset($path[2]) && $path[2] === "pictures") {
						$results = $api->getPictures($projectID);
					}
					else {
						$results = $api->getProject($projectID);
					}
				}
				else {
					$results = $api->getProjects($data);
				}
				break;
			case "POST":
				if (isset($path[1]) && trim($path[1]) !== "" && isset($path[2]) && $path[2] === "pictures") {
					if (isset($_FILES["picture"])) {
						$data["projectID"] = $path[1];
						$results = $api->addPicture($data);
					}
				}
				else {
					$results = $api->addProject($data);
				}
				break;
			case "PUT":
				if (isset($path[1]) && trim($path[1]) !== "") {
					$data["projectID"] = $path[1];
					$results = $api->editProject($data);
				}
				break;
			case "DELETE":
				if (isset($path[1]) && trim($path[1]) !== "") {
					$data["projectID"] = $path[1];

					if (isset($path[2]) && $path[2] === "pictures" && isset($path[3]) && $path[3] !== "") {
						$data["id"] = $path[3];
						$results = $api->deletePicture($data);
					}
					else {
						$results = $api->deleteProject($data);
					}
				}
				break;
			default:
				$results["meta"] = Helper::methodNotAllowed($method, $path);
		}
		break;
	default:
		$results["meta"]["ok"] = false;
		$results["meta"]["status"] = 404;
		$results["meta"]["feedback"] = "Unrecognised URI (/api/1/" . implode("/", $path) . ")";
		$results["meta"]["message"] = "Not Found";
}

if (empty($results)) {
	$results["meta"] = Helper::methodNotAllowed($method, $path);
}

Helper::sendData($results, $data, $method, $path);