<?php
/*
 * A RESTful API router.
 * @author Jahidul Pabel Islam
*/

//include all files needed
include '../../inc/all.php';

//do relevant stuff with path[1]
switch ($path[0]) {
    case "login":
        switch ($method) {
            case "POST":
                $results = login($data);
                break;
            default:
                $results["meta"] = methodNotAllowed($method, $path);
        }
        break;
    case "projects":
        switch ($method) {
            case "GET":
                if (isset($path[1]) && trim($path[1]) !== "") {
                    $results = getProject($path[1]);
                }
                else {
                    $results = getProjects($data);
                }
                break;
            case "POST":
                $results = addProject($data);
                break;
            case "PATCH":
                if (isset($path[1]) && trim($path[1]) !== "") {
                    $data["projectID"] = $path[1];
                }
                $results = editProject($data);
                break;
            case "DELETE":
                if (isset($path[1]) && trim($path[1]) !== "") {
                    $data["projectID"] = $path[1];
                }
                $results = deleteProject($data);
                break;
            default:
                $results["meta"] = methodNotAllowed($method, $path);
        }
        break;
    case "pictures":
        switch ($method) {
            case "GET":
                if (isset($path[1]) && trim($path[1]) !== "") {
                    $data["projectID"] = $path[1];
                }
                $results = getPictures($data);
                break;
            case "POST":
                if (isset($path[1]) && trim($path[1]) !== "") {
                    $data["projectID"] = $path[1];
                }
                $results = addPicture($data);
                break;
            case "DELETE";
                if (isset($path[1]) && trim($path[1]) !== "") {
                    $data["projectID"] = $path[1];
                }
                $results = deletePicture($data);
                break;
            default:
                $results["meta"] = methodNotAllowed($method, $path);
        }
        break;
    case "countProjects":
        switch ($method) {
            case "GET":
                $results = countProjects($data);
                break;
            default:
                $results["meta"] = methodNotAllowed($method, $path);
        }
        break;
    default:
        $results["meta"]["ok"] = false;
        $results["meta"]["status"] = 404;
        $results["meta"]["feedback"] = "Unrecognised URI.";
        $results["meta"]["message"] = "Not Found";
}

sendData($results, $data, $method, $path);