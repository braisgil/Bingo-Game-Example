<?php

	if(!empty($_POST['login'])){
		$l = $_POST['login'];
		require('dbconfig.php');
		if(mysql_connect($host, $usr, $pass)){
			$consulta = "SELECT * FROM usuarios WHERE usr_login='".$l."';";
			mysql_select_db($db);
			$datos = mysql_query($consulta);
			if($fila = mysql_fetch_array($datos)){
				$respuesta = "existe";
				echo $respuesta;
				return;
			} else {
				$respuesta = "correcto";
				echo $respuesta;
				return;
			}
		}
	}

?>