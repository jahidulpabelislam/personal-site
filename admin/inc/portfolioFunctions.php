<?php
/*
 * All the functions for this API
 * @author Jahidul Pabel Islam
*/

//contains the different functions for the API

//get a particular project defined by $projectID
function getProject($projectID)
{
    $db = new pdodb;
    $query = "SELECT * FROM PortfolioProject WHERE ID = :projectID;";
    $bindings = array(':projectID' => $projectID);
    $result = $db->query($query, $bindings);

    //check if database provided any meta data if so no problem with executing query but no project found
    if ($result["count"] <= 0 && !isset($result["meta"])) {
        $result["meta"]["ok"] = false;
        $result["meta"]["status"] = 404;
        $result["meta"]["feedback"] = "No project found with ${projectID} as ID.";
        $result["meta"]["message"] = "Not Found";
    } else {
        $result["meta"]["ok"] = true;
    }

    return $result;
}

//gets a user, either trying to log in or trying to get information of a user
function login($data)
{
    //checks if data needed are present and not empty
    $dataNeeded = array("username", "password");
    if (checkData($data, $dataNeeded)) {

        if ($data["username"] === hidden && $data["password"] === hidden) {
            $results["meta"]["ok"] = true;
            $results["rows"]["username"] = $data["username"];
            $results["rows"]["password"] = $data["password"];
        } else {
            $results["meta"]["ok"] = false;
            $results["meta"]["status"] = 401;
            $results["meta"]["message"] = "Unauthorized";
            $results["meta"]["feedback"] = "Wrong Username and Password.";
        }

    } else {
        $results["meta"] = dataNotProvided($dataNeeded);
    }

    return $results;
}

//gets all projects but limited
function getProjects($data)
{
    if (isset($data["limit"])) {
        $limit = min(abs(intval($data["limit"])), 10);
    }
    if (!isset($limit) || !is_int($limit) || $limit < 1 ) {
        $limit = 10;
    }

    $offset = 0;
    if (isset($data["offset"])) {
        $offset = min(abs(intval($data["offset"])), 10);
    }

    if (isset($data["page"])) {
        $page = intval($data["page"]);
        if (is_int($page) && $page > 1) {
            $offset = $limit * ($data["page"] - 1);
        }
    }

    $filter = "";
    if (isset($data["search"])) {
        //split each word in search
        $searches = explode(" ", $data["search"]);

        $search = "%";

        //loop through each search word
        foreach ($searches as $aSearch) {
            $search .= "${aSearch}%";
        }

        $searchesReversed = array_reverse($searches);

        $search2 = "%";

        //loop through each search word
        foreach ($searchesReversed as $aSearch) {
            $search2 .= "${aSearch}%";
        }

        $filter = "WHERE Name LIKE '" . $search . "' OR Name LIKE '" . $search2 . "' OR Description LIKE '" . $search . "' OR Description LIKE '" . $search2 . "' OR Skills LIKE '" . $search . "' OR Skills LIKE '" . $search2 . "'";
    }

    $db = new pdodb;
    $query = "SELECT * FROM PortfolioProject $filter ORDER BY Date DESC LIMIT $limit OFFSET $offset;";
    $results = $db->query($query);

    //check if database provided any meta data if not all ok
    if (!isset($results["meta"])) {

        $query = "SELECT COUNT(*) AS Count FROM PortfolioProject $filter;";
        $count = $db->query($query);
        $results["count"] = $count["rows"][0]["Count"];

        $results["meta"]["ok"] = true;
    }

    return $results;
}

//add a goal user has attempted to add
function addProject($data)
{
    //checks if requests needed are present and not empty
    $dataNeeded = array("username", "password", "projectName", "skills", "description", "github", "date");
    if (checkData($data, $dataNeeded) && preg_match("/\b[\d]{4}-[\d]{2}-[\d]{2}\b/im", $data["date"])) {

        //checks if user provided exists
        $results = login($data);
        if ($results["meta"]["ok"] === true) {

            $db = new pdodb;
            $query = "INSERT INTO PortfolioProject (Name, Skills, Description, Link, GitHub, Download, Date) VALUES (:projectName, :skills, :description, :link, :github, :download, :date);";
            $bindings = array(":projectName" => $data["projectName"], ":skills" => $data["skills"], ":description" => $data["description"], ":link" => $data["link"], ":github" => $data["github"], ":download" => $data["download"], ":date" => $data["date"]);
            $results = $db->query($query, $bindings);

            //if add was ok
            if ($results["count"] > 0) {

                $projectID = $db->lastInsertId();
                $results = getProject($projectID);

                $results["meta"]["ok"] = true;
                $results["meta"]["status"] = 201;
                $results["meta"]["message"] = "Created";

            }
            //else error adding goal
            else {

                //check if database provided any meta data if so problem with executing query
                if (!isset($results["meta"])) {
                    $results["meta"]["ok"] = false;
                }
            }

        }

    }
    //else data was not provided
    else {
        $results["meta"] = dataNotProvided($dataNeeded);
    }

    return $results;
}

//edits a goal user has posted before
function editProject($data)
{
    //checks if requests needed are present and not empty
    $dataNeeded = array("username", "password", "projectID", "projectName", "skills", "description", "github", "date");
    if (checkData($data, $dataNeeded) && preg_match("/\b[\d]{4}-[\d]{2}-[\d]{2}\b/im", $data["date"])) {

        //checks if user provided exists
        $results = login($data);
        if ($results["meta"]["ok"] === true) {

            //get goal provided
            $project = getProject($data["projectID"]);
            if ($project["count"] > 0) {

                $db = new pdodb;
                $query = "UPDATE PortfolioProject SET Name = :projectName, Skills = :skills, Description = :description, Link = :link, GitHub = :github, Download = :download, Date = :date WHERE ID = :projectID;";
                $bindings = array(":projectID" => $data["projectID"], ":projectName" => $data["projectName"], ":skills" => $data["skills"], ":description" => $data["description"], ":link" => $data["link"], ":github" => $data["github"], ":download" => $data["download"], ":date" => $data["date"]);
                $results = $db->query($query, $bindings);

                //if update was ok
                if ($results["count"] > 0) {
                    $results = getProject($data["projectID"]);
                    $results["meta"]["ok"] = true;
                }
                //error updating goal
                else {
                    //check if database provided any meta data if so problem with executing query
                    if (!isset($project["meta"])) {
                        $results["meta"]["ok"] = false;
                    }
                }
            }
        }
    }
    //else data was not provided
    else {
        $results["meta"] = dataNotProvided($dataNeeded);
    }

    return $results;
}

//deletes a goal user has posted before
function deleteProject($data)
{

    //checks if requests needed are present and not empty
    $dataNeeded = array("username", "password", "projectID");
    if (checkData($data, $dataNeeded)) {

        //checks if user provided exists
        $results = login($data);
        if ($results["meta"]["ok"] === true) {

            //error getting goal
            $results = getProject($data["projectID"]);
            if ($results["count"] > 0) {

                $db = new pdodb;
                //delete the comments linked to goal
                $query = "DELETE FROM PortfolioProjectImage WHERE ProjectID = :projectID;";
                $bindings = array(":projectID" => $data["projectID"]);
                $db->query($query, $bindings);

                //finally delete the actual goal
                $query = "DELETE FROM PortfolioProject WHERE ID = :projectID;";
                $results = $db->query($query, $bindings);

                //if deletion was ok
                if ($results["count"] > 0) {
                    $results["meta"]["ok"] = true;

                    $results["rows"]["projectID"] = $data["projectID"];
                }
                //error deleting goal
                else {
                    //check if database provided any meta data if so problem with executing query
                    if (!isset($results["meta"])) {
                        $results["meta"]["ok"] = false;
                    }
                }
            }
        }
    }
    //else data was not provided
    else {
        $results["meta"] = dataNotProvided($dataNeeded);
    }

    return $results;
}

function getPictures($data)
{
    //checks if requests needed are present and not empty
    $dataNeeded = array("projectID");
    if (checkData($data, $dataNeeded)) {

        //get goal provided
        $results = getProject($data["projectID"]);
        if ($results["count"] > 0) {

            if (isset($data["limit"])) {
                $limit = min(abs(intval($data["limit"])), 15);
            }
            if (!isset($limit) || !is_int($limit) || $limit < 0 ) {
                $limit = 15;
            }

            $db = new pdodb;
            $query = "SELECT * FROM PortfolioProjectImage WHERE ProjectID = :projectID LIMIT $limit;";
            $bindings[':projectID'] = $data["projectID"];
            $results = $db->query($query, $bindings);

            //check if database provided any meta data if not assume query all ok
            if (!isset($results["meta"])) {
                $results["meta"]["ok"] = true;
            }
        }
    }
    //else data was not provided
    else {
        $results["meta"] = dataNotProvided($dataNeeded);
    }

    return $results;
}

//upload a picture a user has uploaded as their profile picture
function addPicture($data)
{

    //checks if requests needed are present and not empty
    $dataNeeded = array("username", "password", "projectID");
    if (checkData($data, $dataNeeded) && isset($_FILES["picture"])) {

        //checks if user provided exists
        $results = login($data);
        if ($results["meta"]["ok"] === true) {

            //error getting goal
            $project = getProject($data["projectID"]);
            if ($project["count"] > 0) {

                //get the file type
                $imageFileType = pathinfo(basename($_FILES["picture"]["name"]), PATHINFO_EXTENSION);

                //the directory to upload file
                $directory = "../../../images/";

                //the full path for new file
                $fileLocation = $directory . date('YmdHis', time()) . mt_rand() . "." . $imageFileType;

                //check if file is a actual image
                $fileType = mime_content_type($_FILES["picture"]["tmp_name"]);
                if ((strpos($fileType, 'image/') !== false)) {

                    //try to upload file
                    if (move_uploaded_file($_FILES["picture"]["tmp_name"], $fileLocation)) {

                        //update database with location of new picture
                        $db = new pdodb;
                        $query = "INSERT INTO PortfolioProjectImage (File, ProjectID, Number) VALUES (:file, :projectID, 0);";
                        $bindings = array(":file" => $fileLocation, ":projectID" => $data["projectID"]);
                        $results = $db->query($query, $bindings);

                        //if update of user was ok
                        if ($results["count"] > 0) {

                            $query = "SELECT * FROM PortfolioProjectImage WHERE File = :file AND ProjectID = :projectID;";
                            $results = $db->query($query, $bindings);

                            $results["meta"]["ok"] = true;
                            $results["meta"]["status"] = 201;
                            $results["meta"]["message"] = "Created";


                        }
                        //else error updating user
                        else {
                            //check if database provided any meta data if so problem with executing query
                            if (!isset($picture["meta"])) {
                                $results["meta"]["ok"] = false;
                            }
                        }
                    }
                    //else problem uploading file to server
                    else {
                        $results["meta"]["feedback"] = "Sorry, there was an error uploading your file.";
                    }
                }
                //else bad request as file uploaded is not a image
                else {
                    $results["meta"]["status"] = 400;
                    $results["meta"]["message"] = "Bad Request";
                    $results["meta"]["feedback"] = "File is not an image.";
                }
            }
        }
    }
    //else data was not provided
    else {
        array_push($dataNeeded, "pictureUploaded");
        $results["meta"] = dataNotProvided($dataNeeded);
    }

    $results["meta"]["files"] = $_FILES;

    return $results;
}

//deletes a profile picture user uploaded before
function deletePicture($data)
{

    //checks if requests needed are present and not empty
    $dataNeeded = array("username", "password", "projectID", "file");
    if (checkData($data, $dataNeeded)) {

        //checks if user provided exists
        $results = login($data);
        if ($results["meta"]["ok"] === true) {

            //error getting goal
            $results = getProject($data["projectID"]);
            if ($results["count"] > 0) {

                //update database
                $db = new pdodb;
                $query = "DELETE FROM PortfolioProjectImage WHERE ProjectID = :projectID AND File = :file;";
                $bindings = array(":projectID" => $data["projectID"], ":file" => $data["file"]);
                $results = $db->query($query, $bindings);

                //if update was ok
                if ($results["count"] > 0) {

                    //checks if file exists to delete the picture
                    if (file_exists($data["file"])) {
                        unlink($data["file"]);
                    }

                    $results["meta"]["ok"] = true;
                    $results["rows"]["file"] = $data["file"];

                }
                //else error updating
                else {
                    //check if database provided any meta data if so problem with executing query
                    if (!isset($results["meta"])) {
                        $results["meta"]["ok"] = false;
                    }
                }
            }
        }
    }
    //else data was not provided
    else {
        $results["meta"] = dataNotProvided($dataNeeded);
    }

    return $results;
}