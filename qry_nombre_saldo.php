<?php
	if(isset($_POST['login']) && !empty($_POST['login'])){
		$l = $_POST['login'];
		
		require('dbconfig.php');
		if(mysql_connect($host, $usr, $pass)){
			$consulta = "SELECT usr_nombre, usr_apellidos, usr_saldo FROM usuarios WHERE usr_login='".$l."';";
			mysql_select_db($db);
			$datos = mysql_query($consulta);
			
			if($fila = mysql_fetch_array($datos)){
				$nombre = $fila[0];
				$apellidos = $fila[1];
				$saldo = $fila[2];
			}
			
			$jsondata = array();
			$jsondata['nombre'] = $nombre." ".$apellidos;
			$jsondata['saldo'] = $saldo;
			
			header('Content-type: application/json; charset=utf-8');
			echo json_encode($jsondata);
			exit();
		}
	}
?>