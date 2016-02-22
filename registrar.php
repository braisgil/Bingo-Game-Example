<?php

	require('dbconfig.php');
	if(mysql_connect($host, $usr, $pass)){
			$consulta = "INSERT INTO usuarios (usr_login, usr_pass, usr_nombre, usr_apellidos, usr_direccion,
			usr_cp, usr_poblacion, usr_provincia, usr_telefono, usr_movil, usr_email, usr_tarjeta_tipo,
			usr_tarjeta_titular, usr_tarjeta_numero, usr_tarjeta_cv, usr_tarjeta_fecha, usr_saldo) 
			VALUES('".$_POST['login']."', '".md5($_POST['pass'])."', '".$_POST['nombre']."', '".$_POST['apellidos']."',
			'".$_POST['direccion']."', ".$_POST['cp'].", '".$_POST['poblacion']."', '".$_POST['provincia']."',
			".$_POST['telefono'].", ".$_POST['movil'].", '".$_POST['email']."', '".$_POST['tarjetatipo']."',
			'".$_POST['tarjetatitular']."', ".$_POST['tarjetanumero'].", ".$_POST['tarjetacv'].", '".$_POST['tarjetafecha']."', ".$_POST['cantidad'].");";
			mysql_select_db($db);
			if(mysql_query($consulta)){
				echo "correcto";
				return;
			} else {
				//echo "error al insertar";
				echo "ERROR: ".mysql_error();
				return;
			}
		} else {
			$respuesta = "Error conectando al servidor";
			echo $respuesta;
			return;
		}

?>
