<?php
/*
 * All the functions for this API
 * @author Jahidul Pabel Islam
*/

date_default_timezone_set("Europe/London");

//gets a user, either trying to log in or trying to get information of a user
function login($data)
{
    //checks if data needed are present and not empty
    $dataNeeded = array("username", "password");
    if (checkData($data, $dataNeeded)) {

        if ($data["username"] === PORTFOLIOUSERNAME && $data["password"] === PORTFOLIOPASSWORD) {
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

//get a particular project defined by $projectID
function getProject($projectID)
{
    $db = new pdodb;
    $query = "SELECT * FROM portfolioproject WHERE ID = :projectID;";
    $bindings = array(':projectID' => $projectID);
    $result = $db->query($query, $bindings);

    //check if database provided any meta data if so no problem with executing query but no project found
    if ($result["count"] <= 0 && !isset($result["meta"])) {
        $result["meta"]["ok"] = false;
        $result["meta"]["status"] = 404;
        $result["meta"]["feedback"] = "No project found with ${projectID} as ID.";
        $result["meta"]["message"] = "Not Found";
    } else {
        $result["rows"][0]["pictures"] = getPictures($projectID);

        $result["meta"]["ok"] = true;
    }
    return $result;
}

//gets all projects but limited
function getProjects($data)
{
    if (isset($data["limit"])) {
        $limit = min(abs(intval($data["limit"])), 10);
    }
    if (!isset($limit) || !is_int($limit) || $limit < 1) {
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

        $filter = "WHERE Name LIKE '" . $search . "' OR Name LIKE '" . $search2 . "' OR LongDescription LIKE '" . $search . "' OR LongDescription LIKE '" . $search2 . "' OR ShortDescription LIKE '" . $search . "' OR ShortDescription LIKE '" . $search2 . "' OR Skills LIKE '" . $search . "' OR Skills LIKE '" . $search2 . "'";
    }

    $db = new pdodb;
    $query = "SELECT * FROM portfolioproject $filter ORDER BY Date DESC LIMIT $limit OFFSET $offset;";
    $results = $db->query($query);

    //check if database provided any meta data if not all ok
    if (!isset($results["meta"])) {

        $query = "SELECT COUNT(*) AS Count FROM portfolioproject $filter;";
        $count = $db->query($query);
        $results["count"] = $count["rows"][0]["Count"];

        //loop through each project and the projects images
        for ($i = 0; $i < count($results["rows"]); $i++) {

            //run the function provided as data exists and is valid
            $results["rows"][$i]["pictures"] = getPictures($results["rows"][$i]["ID"]);
        }

        $results["meta"]["ok"] = true;
    }

    return $results;
}

//add a project user has attempted to add
function addProject($data)
{
    //checks if requests needed are present and not empty
    $dataNeeded = array("username", "password", "projectName", "skills", "longDescription", "shortDescription", "github", "date");
    if (checkData($data, $dataNeeded)) {

        //checks if user provided exists
        $results = login($data);
        if ($results["meta"]["ok"] === true) {

            $db = new pdodb;
            $query = "INSERT INTO portfolioproject (Name, Skills, LongDescription, ShortDescription, Link, GitHub, Download, Date, Colour) VALUES (:projectName, :skills, :longDescription, :shortDescription, :link, :github, :download, :date, :colour);";
            $bindings = array(":projectName" => $data["projectName"], ":skills" => $data["skills"], ":longDescription" => $data["longDescription"], ":shortDescription" => $data["shortDescription"], ":link" => $data["link"], ":github" => $data["github"], ":download" => $data["download"], ":date" => $data["date"], ":colour" => $data["colour"]);
            $results = $db->query($query, $bindings);

            //if add was ok
            if ($results["count"] > 0) {

                $projectID = $db->lastInsertId();
                $results = getProject($projectID);

                $results["meta"]["ok"] = true;
                $results["meta"]["status"] = 201;
                $results["meta"]["message"] = "Created";

            } //else error adding project
            else {

                //check if database provided any meta data if so problem with executing query
                if (!isset($results["meta"])) {
                    $results["meta"]["ok"] = false;
                }
            }

        }

    } //else data was not provided
    else {
        $results["meta"] = dataNotProvided($dataNeeded);
    }

    return $results;
}

//try to edit a project user has posted before
function editProject($data)
{
    //checks if requests needed are present and not empty
    $dataNeeded = array("username", "password", "projectID", "projectName", "skills", "longDescription", "shortDescription", "github", "date");
    if (checkData($data, $dataNeeded)) {

        //checks if user provided exists
        $results = login($data);
        if ($results["meta"]["ok"] === true) {

            //Check the project trying to edit actually exists
            $project = getProject($data["projectID"]);
            if ($project["count"] > 0) {

                $data["date"] = date("Y-m-d", strtotime($data["date"]));

                $db = new pdodb;
                $query = "UPDATE portfolioproject SET Name = :projectName, Skills = :skills, LongDescription = :longDescription, Link = :link, ShortDescription = :shortDescription, GitHub = :github, Download = :download, Date = :date, Colour = :colour WHERE ID = :projectID;";
                $bindings = array(":projectID" => $data["projectID"], ":projectName" => $data["projectName"], ":skills" => $data["skills"], ":longDescription" => $data["longDescription"], ":shortDescription" => $data["shortDescription"], ":link" => $data["link"], ":github" => $data["github"], ":download" => $data["download"], ":date" => $data["date"], ":colour" => $data["colour"]);
                $results = $db->query($query, $bindings);

                //if update was ok
                if ($results["count"] > 0) {
                    $pictures = json_decode($data["pictures"]);

                    if (count($pictures) > 0)
                    {
                        foreach ($pictures as $picture)
                        {
                            $query = "UPDATE PortfolioProjectImage SET Number = :Number WHERE ID = :ID;";
                            $bindings = array(":ID" => $picture->ID, ":Number" => $picture->Number);
                            $db->query($query, $bindings);
                        }
                    }

                    $results = getProject($data["projectID"]);
                    $results["meta"]["ok"] = true;
                } //error updating project
                else {
                    //check if database provided any meta data if so problem with executing query
                    if (!isset($project["meta"])) {
                        $results["meta"]["ok"] = false;
                    }
                }
            }
        }
    } //else data was not provided
    else {
        $results["meta"] = dataNotProvided($dataNeeded);
    }

    return $results;
}

//Try's to delete a project user has posted before
function deleteProject($data)
{

    //checks if requests needed are present and not empty
    $dataNeeded = array("username", "password", "projectID");
    if (checkData($data, $dataNeeded)) {

        //checks if user provided exists
        $results = login($data);
        if ($results["meta"]["ok"] === true) {

            //Check the project trying to edit actually exists
            $results = getProject($data["projectID"]);
            if ($results["count"] > 0) {

                $db = new pdodb;
                //Delete the images linked to project
                $query = "DELETE FROM PortfolioProjectImage WHERE ProjectID = :projectID;";
                $bindings = array(":projectID" => $data["projectID"]);
                $db->query($query, $bindings);

                //finally delete the actual project
                $query = "DELETE FROM portfolioproject WHERE ID = :projectID;";
                $results = $db->query($query, $bindings);

                //if deletion was ok
                if ($results["count"] > 0) {
                    $results["meta"]["ok"] = true;

                    $results["rows"]["projectID"] = $data["projectID"];
                } //error deleting project
                else {
                    //check if database provided any meta data if so problem with executing query
                    if (!isset($results["meta"])) {
                        $results["meta"]["ok"] = false;
                    }
                }
            }
        }
    } //else data was not provided
    else {
        $results["meta"] = dataNotProvided($dataNeeded);
    }

    return $results;
}

function getPictures($projectID)
{
    $db = new pdodb;
    $query = "SELECT * FROM PortfolioProjectImage WHERE ProjectID = :projectID ORDER BY Number;";
    $bindings[":projectID"] = $projectID;
    $results = $db->query($query, $bindings);
    return $results["rows"];
}

//Tries to upload a picture user has tried to add as a project image
function addPicture($data)
{
    //checks if requests needed are present and not empty
    $dataNeeded = array("username", "password", "projectID");
    if (checkData($data, $dataNeeded) && isset($_FILES["picture"])) {

        //checks if user provided exists
        $results = login($data);
        if ($results["meta"]["ok"] === true) {

            //Check the project trying to edit actually exists
            $project = getProject($data["projectID"]);
            if ($project["count"] > 0) {

                //get the file type
                $imageFileType = pathinfo(basename($_FILES["picture"]["name"]), PATHINFO_EXTENSION);

                //the directory to upload file
                $directory = "/assets/images/projects/";

                //the full path for new file
                $filename = date('YmdHis', time()) . mt_rand() . "." . $imageFileType;
                $fileLocation = $directory . $filename;
                $fullPath = $_SERVER['DOCUMENT_ROOT'] . $directory . $filename;

                //check if file is a actual image
                $fileType = mime_content_type($_FILES["picture"]["tmp_name"]);
                if ((strpos($fileType, 'image/') !== false)) {

                    //try to upload file
                    if (move_uploaded_file($_FILES["picture"]["tmp_name"], $fullPath)) {

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


                        } //else error updating user
                        else {
                            //check if database provided any meta data if so problem with executing query
                            if (!isset($picture["meta"])) {
                                $results["meta"]["ok"] = false;
                            }
                        }
                    } //else problem uploading file to server
                    else {
                        $results["meta"]["feedback"] = "Sorry, there was an error uploading your file.";
                    }
                } //else bad request as file uploaded is not a image
                else {
                    $results["meta"]["status"] = 400;
                    $results["meta"]["message"] = "Bad Request";
                    $results["meta"]["feedback"] = "File is not an image.";
                }
            }
        }
    } //else data was not provided
    else {
        array_push($dataNeeded, "pictureUploaded");
        $results["meta"] = dataNotProvided($dataNeeded);
    }

    $results["meta"]["files"] = $_FILES;

    return $results;
}

//Tries to delete a picture linked to a project
function deletePicture($data)
{
    //checks if requests needed are present and not empty
    $dataNeeded = array("username", "password", "projectID", "file");
    if (checkData($data, $dataNeeded)) {

        //checks if user provided exists
        $results = login($data);
        if ($results["meta"]["ok"] === true) {

            //Check the project trying to edit actually exists
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

                } //else error updating
                else {
                    //check if database provided any meta data if so problem with executing query
                    if (!isset($results["meta"])) {
                        $results["meta"]["ok"] = false;
                    }
                }
            }
        }
    } //else data was not provided
    else {
        $results["meta"] = dataNotProvided($dataNeeded);
    }

    return $results;
}