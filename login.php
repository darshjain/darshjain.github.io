<html>
<head>
<style>
.error {color:red;}
</style>
</head>
<body>

<?php
$nameError=$emailError=$mobileError="";
$name=$email=$mobileno="";
if($_SERVER["REQUEST_METHOD"]=="POST")
{
if(empty($_POST['name'])) 
	$nameError="Name is required";
else
{
	$name = test_input($_POST['name']);
	if(!preg_match('/^[a-zA-Z ]*$/',$name))
		$nameError= "Only letters and whitespace allowed";
}
if(empty($_POST['email'])) 
	$emailError="Email is required";
else 
{
       	$email = test_input($_POST["email"]);       
       	// check if e-mail address is well-formed
       	if(!filter_var($email, FILTER_VALIDATE_EMAIL)) 
	{
       		$emailError= "Invalid email format"; 
       	}
}
if (empty($_POST['mobileno'])) 
{
	$mobileError="Mobile number is required";
} 
else 
{
  	$mobileno = test_input($_POST['mobileno']);
    	// check if mobileno contains only 10 digits
    	if (!preg_match('/^[0-9]{10}$/', $mobileno)) 
	{
      		$mobileError= "Enter valid 10 digit Mobile Number"; 
    	}
}
}
function test_input($data) 
{
	$data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
}
?>

<h1>Data Validation</h1>
<p><span class="error">* required field</span></p>
<form action=exp12.php method=POST>
<table>
<tr>
<td>Name</td>
<td> <input type="text" name="name">
<span class="error">* <?php echo $nameError; ?></span>
</td>
</tr>
<tr>
<td>Email</td> 
<td><input type="text" name="email">
<span class="error">* <?php echo $emailError; ?></span>
</td>
</tr>
<tr>
<td>Mobile Number</td>
<td><input type="text" name="mobileno">
<span class="error">* <?php echo $mobileError; ?></span>
</td>
</tr>
<tr>
<td>
<input type="submit" name="submit" value="Submit"><br>
</td>
</tr>
</table>
</form>

<?php
echo "<h2>Your Responses are:</h2>";
echo $name."<br>";
echo $email."<br>";
echo $mobileno."<br>";
?>
</body>
</html>
