<?php

$con = mysql_connect("localhost","Jahidul1","Islam");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }


mysql_select_db("login2", $con);

/*This selects the database (Login) on the mySQL server. Note use the name of your database.*/

$result = mysql_query("SELECT * FROM Password");

/*This uses the SQL language to extract data from the table called Password. All the results are placed in the variable $result*/

//The following is simply html to set up a table

echo "<table border='1'>
<tr>
<th>Username</th>
<th>Password</th>
</tr>";

while($row = mysql_fetch_array($result))
  {
  echo "<tr>";
  echo "<td>" . $row['Username'] . "</td>";
  echo "<td>" . $row['Password'] . "</td>";
    echo "</tr>";
  }

echo "</table>";

mysql_close($con);

?>
