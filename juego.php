<?php
	session_start();
	// comprobamos que la variable login esta definida y no es NULL
	if(isset($_SESSION['login'])){
		// comprobamos que la variable login no esta vacía
		if(empty($_SESSION['login'])){
			// si está vacío redireccionamos al index.html
			header('Location: index.html');
		} else {
			// si no está vacío, prodecemos a cargar la página
			$usuario = $_SESSION['login'];
			
			
			
			
		}
	} else {
		// si la variable no esta definida o es NULL, redireccionamos al index.html
		header('Location: index.html');
	}
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Juego Bingo</title>
<link href="juego.css" rel="stylesheet" type="text/css">
<script src="jquery-1.11.2.min.js"></script>
<script src="juego.js"></script>
</head>

<body>

	<div id="wrapper">
    	
        <div id="barra_top">
        	<div id="grupo_nombre">
            	<label for="nombre">Nombre:</label>
                <input type="text" name="nombre" id="nombre" value="<?=$usuario?>" disabled="disabled"/>
            </div>
            <div id="grupo_saldo">
            	<label for="saldo">Saldo:</label>
                <input type="text" name="saldo" id="saldo" disabled="disabled" />
            </div>
            <div id="grupo_logout">
            	<form action="cerrar_session.php" method="get">
                	<input type="submit" name="cerrar" value="Cerrar Sesión" id="cerrar" />
                </form>
            </div>
        </div>
        
        <div id="barra_control">
        	<div id="grupo_control">
            	<label for="num_cartones">¿Cuantos cartones quieres jugar? (1-8)</label>
                <input type="text" name="num_cartones" id="num_cartones" value="1" />
                <input type="button" name="jugar" id="jugar" value="Jugar Partida" />
                <input type="text" name="error_carton" id="error_carton" disabled="disabled" />
            </div>
        </div>
        
        <div id="barra_cartones">
        	<div id="bolas" class="marcador">
            	<div id="bola1" class="numero"></div>
                <div id="bola2" class="numero"></div>
                <div id="bola3" class="numero"></div>
                <div id="bola4" class="numero"></div>
                <div id="bola" class="numero_actual"></div>
            </div>
        </div>
    </div>

</body>
</html>