<?php
/*
 * All the functions for API
 * @author Jahidul Pabel Islam
*/

//contains the different functions for the API

//get a particular project defined by $projectID
function getProject($projectID)
{
    $db = new pdodb;
    $query = "SELECT * FROM Project WHERE ID = :projectID;";
    $bindings = array(':projectID' => $projectID);
    $result = $db->query($query, $bindings);
    if ($result["count"] <= 0 && !isset($result["meta"])) {
        //check if database provided any meta data if so problem with executing query
        $result["meta"]["ok"] = false;
        $result["meta"]["status"] = 404;
        $result["meta"]["feedback"] = "No project found with ${projectID} as ID.";
        $result["meta"]["message"] = "Not Found";
    }
    return $result;
}

//gets goals , either of a user or filtered by a search or goals of other users user is following plus theirs
function getProjects($data)
{
    if (isset($data["projectID"])) {
        $results = getProject($data["projectID"]);
    } else {
        $limit = "";
        $limit2 = min(abs(intval($data["limit"])), 20);
        if (isset($limit2) && $limit2 > 0 && is_int($limit2)) {
            $limit = "LIMIT $limit2";
        }
        $db = new pdodb;
        $query = "SELECT * FROM Project ORDER BY Date DESC $limit;";
        $results = $db->query($query);

    }

    //check if database provided any meta data if not all ok
    if (!isset($results["meta"])) {
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
            $query = "INSERT INTO Project (Name, Skills, Description, Link, GitHub, Download, Date) VALUES (:projectName, :skills, :description, :link, :github, :download, :date);";
            $bindings = array(":projectName" => $data["projectName"], ":skills" => $data["skills"], ":description" => $data["description"], ":link" => $data["link"], ":github" => $data["github"], ":download" => $data["download"], ":date" => $data["date"]);
            $results = $db->query($query, $bindings);

            //if add was ok
            if ($results["count"] > 0) {

                $projectID = $db->lastInsertId();
                $results = getProject($projectID);

                $results["meta"]["ok"] = true;
                $results["meta"]["status"] = 201;
                $results["meta"]["message"] = "Created";

            } //else error adding goal
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
                $query = "UPDATE Project SET Name = :projectName, Skills = :skills, Description = :description, Link = :link, GitHub = :github, Download = :download, Date = :date WHERE ID = :projectID;";
                $bindings = array(":projectID" => $data["projectID"], ":projectName" => $data["projectName"], ":skills" => $data["skills"], ":description" => $data["description"], ":link" => $data["link"], ":github" => $data["github"], ":download" => $data["download"], ":date" => $data["date"]);
                $results = $db->query($query, $bindings);

                //if update was ok
                if ($results["count"] > 0) {
                    $results = getProject($data["projectID"]);
                    $results["meta"]["ok"] = true;
                } //error updating goal
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
                $query = "DELETE FROM ProjectImage WHERE ProjectID = :projectID;";
                $bindings = array(":projectID" => $data["projectID"]);
                $db->query($query, $bindings);

                //finally delete the actual goal
                $query = "DELETE FROM Project WHERE ID = :projectID;";
                $results = $db->query($query, $bindings);

                //if deletion was ok
                if ($results["count"] > 0) {
                    $results["meta"]["ok"] = true;

                    $results["rows"]["projectID"] = $data["projectID"];
                } //error deleting goal
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

function getPictures($data)
{
    //checks if requests needed are present and not empty
    $dataNeeded = array("projectID");
    if (checkData($data, $dataNeeded)) {

        //get goal provided
        $results = getProject($data["projectID"]);
        if ($results["count"] > 0) {

            $limit = "";
            $bindings = array();
            $limit2 = min(abs(intval($data["limit"])), 20);
            if (isset($limit2) && $limit2 > 0 && is_int($limit2)) {
                $limit = "LIMIT $limit2";
            }

            $db = new pdodb;
            $query = "SELECT * FROM ProjectImage WHERE ProjectID = :projectID $limit;";
            $bindings[':projectID'] = $data["projectID"];
            $results = $db->query($query, $bindings);

            //check if database provided any meta data if not assume query all ok
            if (!isset($results["meta"])) {
                $results["meta"]["ok"] = true;
            }
        }
    } //else data was not provided
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
                        $query = "INSERT INTO ProjectImage (File, ProjectID) VALUES (:file, :projectID);";
                        $bindings = array(":file" => $fileLocation, ":projectID" => $data["projectID"]);
                        $results = $db->query($query, $bindings);

                        //if update of user was ok
                        if ($results["count"] > 0) {

                            $query = "SELECT * FROM ProjectImage WHERE File = :file AND ProjectID = :projectID;";
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
                $query = "DELETE FROM ProjectImage WHERE ProjectID = :projectID AND File = :file;";
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