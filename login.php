<?php
	session_start();

	if(empty($_POST['login'])){
		$respuesta = "El campo login es obligatorio";
		echo $respuesta;
		return;
	}else if(empty($_POST['pass'])){
		$respuesta = "El campo password es obligatorio";
		echo $respuesta;
		return;
	} else{
		$l = $_POST['login'];
		$p = $_POST['pass'];
		
		require('dbconfig.php');
		if(mysql_connect($host, $usr, $pass)){
			$consulta = "SELECT * FROM usuarios WHERE usr_login='".$l."';";
			mysql_select_db($db);
			$datos = mysql_query($consulta);
			if($fila = mysql_fetch_array($datos)){
				if($fila[2]==md5($p)){
					$_SESSION['login'] = $l;
					$respuesta = "correcto";
					echo $respuesta;
					return;
				}else{
					$respuesta = "La contraseña es incorrecta";
					echo $respuesta;
					return;
				}
			}else{
				$respuesta = "Ese usuario no existe";
				echo $respuesta;
				return;
			}
		} else {
			$respuesta = "Error conectando al servidor";
			echo $respuesta;
			return;
		}
	}
	
	
	

?>