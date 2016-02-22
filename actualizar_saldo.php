<?php
	session_start();

	if(isset($_POST['dato']) && !empty($_POST['dato'])){
		$precio = $_POST['dato'];
		require('dbconfig.php');
		if(mysql_connect($host, $usr, $pass)){
			$consulta = "UPDATE usuarios SET usr_saldo=usr_saldo-(".$precio.") WHERE usr_login='".$_SESSION['login']."';";
			mysql_select_db($db);
			$resultado = mysql_query($consulta);
			if($resultado){
				echo "correcto";
				return;
			} else {
				echo "error";
				return;
			}
		}
	} else {
		echo "error";
		return;
	}

?>