<?php
	session_start();
	session_destroy();

	echo "cerrando sesion...";

	header ("Refresh: 1; index.html");
?>