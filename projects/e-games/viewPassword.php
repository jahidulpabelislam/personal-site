<?php
include $_SERVER['DOCUMENT_ROOT']. '/config.php';
$con = mysqli_connect(DB_IP, DB_USERNAME, DB_PASSWORD);
if(!$con)
{
    if (defined("DEBUG") && DEBUG) {
        echo mysqli_connect_error();
    }
    die('Could not connect.');
}


mysqli_select_db($con, DB_NAME);

/*This selects the database (Login) on the mySQL server. Note use the name of your database.*/

$result = mysqli_query($con, "SELECT * FROM Password;");

/*This uses the SQL language to extract data from the table called Password. All the results are placed in the variable $result*/

//The following is simply html to set up a table

echo "<table border='1'>
<tr>
<th>Username</th>
<th>Password</th>
</tr>";

while($row = mysqli_fetch_array($result))
  {
  echo "<tr>";
  echo "<td>" . $row['Username'] . "</td>";
  echo "<td>" . $row['Password'] . "</td>";
    echo "</tr>";
  }

echo "</table>";

mysqli_close($con);

?>
