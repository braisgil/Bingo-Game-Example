$(function(){

	// login
	$("#entrar").click(function(e) {
        var l = $("#login").val();
		var p = $("#password").val();
		
		$.post("login.php",
			{login:l, pass:p},
			function(data){
				if(data=="correcto"){
					document.location.href = "juego.php";
				}else{
					$("#error_login").html(data);
				}
			});
    });
	
	// registrarse
	$("#registrarse").click(function(e) {
        document.location.href = "registro.html";
    });
});