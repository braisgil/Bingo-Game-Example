$(function(){
	
	// AJAX -> datos NOMBRE y SALDO
	
	// Sacamos el dato de LOGIN del input de id="nombre", para hacer las consultas ajax
	var l = $("#nombre").val();
	// consulta AJAX
	$.post("qry_nombre_saldo.php",
			{login:l},
			null,
			"json")
			.done(function(data){
				$("#nombre").val(data.nombre).css("color", "red");
				$("#saldo").val(data.saldo).css("color", "red");
			}
			);
	
	
	// JUGAR --> evento click del boton JUGAR
	$("#jugar").click(function(e) {
		// comprobamos que el numero de cartones introducido es valido
		var num_cartones = parseInt($("#num_cartones").val());
        if(num_cartones<1 || num_cartones>8){
			// si el valor es incorrecto mostramos alert
			$("#error_carton").val("La cantidad de cartones debe ser mayor de 0 y menor de 9.");
		} else {
			// si el valor es correcto, comprobamos que el usuario tenga suficiente saldo como para comprar esa cantidad
			if($("#saldo").val()<num_cartones){
				// si el saldo es menor que el coste total de los cartones, mostramos alert indicándolo
				$("#error_carton").val("Tu saldo es insuficiente para comprar ese numero de cartones.");
			} else {
				// si el saldo es mayor que el precio de los cartones:
				// * tenemos que actualizar el saldo en la base de datos por AJAX
				// * tenemos que actualizar el valor del saldo por JQuery en $("#saldo")
				//var booleano1 = actualizarSaldo(num_cartones);
				actualizarSaldo(num_cartones);
				//alert(booleano1);
				//if(booleano1){
					// continuamos con el programa
					// haremos una a una function de javascript (aqui insertaremos la llamada):
					// * enviaremos como parametro el numero de cartones, y nos devolvera un array con los cartones.
					
					//var cartones = generaCartones(num_cartones);
					
					// una vez generados los cartones, debemos mostrarlos en pantalla.
					// esto lo haremos llamando a una función mostrarCartones() a la que pasaremos
					// el array "cartones" como parámetro
					// puede darnos el siguiente problema: que no termine de generar los cartones cuando empieze a mostrarlos
					
					//setTimeout(mostrarCartones(cartones), 3000);
					
					
				//}
			}
		}
    });
	
	function juego(cartones){
		// mostramos los cartones al usuario
		$("#barra_cartones").toggle();
		// variable que controla el final del juego (bucle while)
		var final_juego = false;
		// variable donde iremos guardando los numeros que salen
		var bola;
		// array donde guardamos los numeros que han salido
		var salidos = new Array();
		// variable booleana que utilizaremos para comprobar que el numero extraido no ha sido extraido antes
		var repetido;
		// booleano que nos indica si ha habido linea o no
		var linea = false;
		// boleano que nos indica si ha habido bingo o no
		var bingo;
		// variable que controla el intervalo
		var intervalo;
		// funcion de juego ejecutada en el intervalo
		function juegoDentroTimeout(){
			// bucle do-while de sacar bola
			do{
				// sacamos numero aleatorio de 1-90
				bola = Math.floor(Math.random()*(90-1))+1;
				// comprobamos que no esté en el array de numeros "salidos" con --> salidos.indexOf(bola) != -1
				if(salidos.indexOf(bola) != (-1)){
					repetido = true;
				}else{
					repetido = false;
					salidos.push(bola);
				}
			}while(repetido);
			
			//alert(bola);
			
			// una vez tenemos la bola, actualizamos el marcador
			$("#bola1").text($("#bola2").text());
			$("#bola2").text($("#bola3").text());
			$("#bola3").text($("#bola4").text());
			$("#bola4").text($("#bola").text());
			$("#bola").text(bola);
			
			// debemos comprobar si el numero extraído (variable "bola") existe en alguno de los cartones
			// recorremos los cartones
			for(i=0; i<cartones.length; i++){
				// recorremos las columnas
				for(c=0; c<9; c++){
					//recorremos las filas
					for(f=0; f<3; f++){
						// si el numero es igual al extraido, ponemos el fondo en rojo y cambiamos su valor en el array
						if(cartones[i][c][f]==bola){
							$("#"+i+""+c+""+f+"").css("backgroundColor", "red");
							$("#"+i+""+c+""+f+"").css("color", "rgba(255,255,255,1)");
							cartones[i][c][f]=(-1);
						}
					}
				}
			}
			// ahora comprobaremos si hay linea
			if(!linea){
				//recorremos cartones
				for(i=0; i<cartones.length; i++){
					//recorremos filas
					for(f=0; f<3; f++){
						if(!linea){
							if(cartones[i][0][f]==(-1) && cartones[i][1][f]==(-1) && cartones[i][2][f]==(-1) &&
							cartones[i][3][f]==(-1) && cartones[i][4][f]==(-1) && cartones[i][5][f]==(-1) &&
							cartones[i][6][f]==(-1) && cartones[i][7][f]==(-1) && cartones[i][8][f]==(-1)){
								linea=true;
								// recorremos las columnas para ir cambiando el fondo de las casillas
								for(c=0; c<9; c++){
									$("#"+i+""+c+""+f+"").css("backgroundColor", "yellow");
									$("#"+i+""+c+""+f+"").css("color", "black");
								}
								alert("¡¡LINEA!!Premio de 2€ abonado en su cuenta.");
								// cobramos el premio de la liga por ajax
								pagaPremio(2);
							}
						}
					}
				}
			}
			
			// ahora comprobamos si hay BINGo
			// bucle con booleano
			// si hay bingo se paga, y se acaba el juego
			// si no hay bingo se sigue jugando
			
			// recorremos los cartones
			for(i=0; i<cartones.length; i++){
				// ponemos variable "bingo" a true
				bingo = true;
				//recorremos las columnas
				for(c=0; c<9; c++){
					// recorremos las filas
					for(f=0; f<3; f++){
						// comprobamos que todos los numeros son -1
						if(cartones[i][c][f]==(-1)){
							// si el numero es -1 no cambiamos nada
						}else{
							// si algun numero no es -1 se cambia el valor de "bingo" a false;
							bingo = false;
						}
					}
				}
				// si "bingo" ha terminado siendo true:
				//   * se acaba el juego (suspendemos INTERVAL)
				//   * pagamos premio
				//   * reiniciamos pagina de juego
				//   * cambiamos el borde del carton premiado a otro color
				if(bingo){
					// cancelamos setInterval
					clearInterval(intervalo);
					// cambiamos color de borde de carton premiado
					$("#carton"+i+"").css("border", "green solid 2px");
					// pagamos el premio
					pagaPremio(5);
					// alert de enhorabuena
					alert("¡¡¡¡¡¡BINGO!!!!!!\nSe le ha ingresado un premio de 5€ en el saldo de su cuenta.");
					// redirigimos de nuevo a la URL del juego
					window.location.replace("juego.php");
					// salimos del bucle
					break;				
				}
			}
		}
		// bucle while del juego
		//while(!final_juego){
			// temporizador espera 5 segundos para sacar bola y ejecutar comprobaciones
			intervalo = setInterval(juegoDentroTimeout, 4000);
			/*
			setTimeout(function(){
				
			// bucle do-while de sacar bola
			do{
				// sacamos numero aleatorio de 1-90
				bola = Math.floor(Math.random()*(90-1))+1;
				// comprobamos que no esté en el array de numeros "salidos" con --> salidos.indexOf(bola) != -1
				if(salidos.indexOf(bola) != (-1)){
					repetido = true;
				}else{
					repetido = false;
					salidos.push(bola);
				}
			}while(repetido);
			
			//alert(bola);
			
			// debemos comprobar si el numero extraído (variable "bola") existe en alguno de los cartones
			// recorremos los cartones
			for(i=0; i<cartones.length; i++){
				// recorremos las columnas
				for(c=0; c<9; c++){
					//recorremos las filas
					for(f=0; f<3; f++){
						// si el numero es igual al extraido, ponemos el fondo en rojo y cambiamos su valor en el array
						if(cartones[i][c][f]==bola){
							$("#"+i+""+c+""+f+"").css("backgroundColor", "red");
							cartones[i][c][f]=(-1);
						}
					}
				}
			}
			// ahora comprobaremos si hay linea
			if(!linea){
				//recorremos cartones
				for(i=0; i<cartones.length; i++){
					//recorremos filas
					for(f=0; f<3; f++){
						if(!linea){
							if(cartones[i][0][f]==(-1) && cartones[i][1][f]==(-1) && cartones[i][2][f]==(-1) &&
							cartones[i][3][f]==(-1) && cartones[i][4][f]==(-1) && cartones[i][5][f]==(-1) &&
							cartones[i][6][f]==(-1) && cartones[i][7][f]==(-1) && cartones[i][8][f]==(-1)){
								linea=true;
								alert("¡¡LINEA!!");
								//falta cobrar el premio por la linea(ajax)
								
							}
						}
					}
				}
			}
			
			// ahora comprobamos si hay BINGo
			// bucle con booleano
			// si hay bingo se paga, y se acaba el juego
			// si no hay bingo se sigue jugando
			
			
			}, 3000);	*/		
		//} cierre del while
	}
	
	function mostrarCartones(cartones){
		//alert(cartones);		
		//recorremos los cartones
		for(i=0; i<cartones.length; i++){
			//creamos cada cartón
			$("#barra_cartones").append('<div class="carton" id="carton'+i+'"></div>');
			// recorremos filas
			for(f=0; f<3; f++){
				// recorremos columnas y pintamos
				for(c=0; c<9; c++){
					// aqui hay que distinguir entre los numeros y las casillas vacías
					if(cartones[i][c][f]==(-1)){
						//aqui pintamos casilla en blanco
						$("#carton"+i+"").append('<div class="carton_vacio" id="'+i+''+c+''+f+'"></div>');
					} else {
						//aquí pintamos los numeros
						$("#carton"+i+"").append('<div class="carton_numero" id="'+i+''+c+''+f+'">'+cartones[i][c][f]+'</div>');
						//$("#carton"+i+"").append('<div class="carton_numero" id="'+i+''+c+''+f+'"></div>');
					}
				}
			}
		}
		juego(cartones);
	}
	
	function generaCartones(num){
		// creamos el array que guardara los cartones
		var arrayCartones = new Array(num);
		// ahora dinamicamente creamos los cartones y los metemos en el array
		// * crearemos los 27 numeros de cada carton primero, y luego tachamos 4 en cada fila
		// * no puede haber 3 numeros en blanco en una columna
		// * el rango de numeros es entre 1 y 90
		// * va por columnas: la primera numeros del 1-9, la segunda del 10-19, etc...
		// * 3 filas por 9 columnas = 27 numeros
		// * tambien podría hacerse haciendo una matriz 3x9
		for(i=0; i<num; i++){
			// metemos el array de columnas en arrayCartones
			arrayCartones[i] = new Array(9);
			// metemos el array de filas en los arrays columna
			for(c=0; c<9; c++){
				arrayCartones[i][c] = new Array(3);
			}
		}
		// pasamos a meter los números aleatorios en los cartones
		// primero rellenaremos los 27 numeros de cada carton, mas tarde eliminaremos numeros para que haya 5 por fila (15)
		// creamos el array de numeros repetidos
		var repetidos1 = new Array();
		// creamos la variable donde guardaremos los numeros aleatorios
		var aleatorio;
		// creamos la variable booleana que controlará el bucle WHILE cuando comprobemos los repetidos
		var repe1;
		// recorremos los cartones
		for(i=0; i<num; i++){
			//recorremos las columnas
			for(c=0; c<9; c++){
				// recorremos las filas
				for(f=0; f<3; f++){
					// bucle DO-WHILE que se repite mientras no saquemos un aleatorio UNICO (no repetido)
					do {
						// al principio de cada vuelta del for seteamos la booleana en FALSE
						repe1 = false;
					
						switch(c){
							case 0:
								aleatorio = Math.floor(Math.random()*(9-1))+1;
								break;
							case 1:
								aleatorio = Math.floor(Math.random()*(19-10))+10;
								break;
							case 2:
								aleatorio = Math.floor(Math.random()*(29-20))+20;
								break;
							case 3:
								aleatorio = Math.floor(Math.random()*(39-30))+30;
								break;
							case 4:
								aleatorio = Math.floor(Math.random()*(49-40))+40;
								break;
							case 5:
								aleatorio = Math.floor(Math.random()*(59-50))+50;
								break;
							case 6:
								aleatorio = Math.floor(Math.random()*(69-60))+60;
								break;
							case 7:
								aleatorio = Math.floor(Math.random()*(79-70))+70;
								break;
							case 8:
								aleatorio = Math.floor(Math.random()*(90-80))+80;
								break;
						}
						// ahora comprobamos que el numero no esté repetido
						for(r=0; r<repetidos1.length; r++){
							if(aleatorio == repetidos1[r]){
								repe1 = true;
							}
						}
					} while(repe1);
					// si sale del while es porque el número no está repetido y por tanto es valido
					// por lo que procedemos a guardarlo
					arrayCartones[i][c][f] = aleatorio;
					// tambien lo guardamos en el array de repetidos
					repetidos1.push(aleatorio);
				}
			}
			// ponemos el array de repetidos como array vacío para el siguiente carton
			// así nos evitamos crear un array de repetidos bidimensional
			repetidos1 = [];
		}
		// ahora debemos eliminar numeros de los cartones, hasta que:
		// * haya solamente 5 números en cada fila (borraremos 4 numeros de cada fila).
		// * no haya una columna con sus 3 casillas vacías
		// creamos un array para almacenar los numeros aleatorios y evitar que se repitan
		// EN VEZ DE BORRAR EL NUMERO Y HACER ARRAYS PARA LOS REPETIDOS, SIMPLEMENTE CAMBIAMOS EL NUMERO POR -1,
		// Y LUEGO CADA VEZ QUE BORRAMOS UN NUMERO COMPROBAMOS QUE NO SEA -1 (mucho mas facil)
		// creamos el booleano repe2 que controla el WHILE, y la variable aleatorio2
		var aleatorio2;
		var repe2;
		// recorremos los cartones
		for(i=0; i<num; i++){
			// recorremos las filas
			for(f=0; f<3; f++){
				// FOR donde eliminamos 4 posiciones de cada fila
				for(j=0; j<4; j++){
					// DO-WHILE para controlar repeticiones
					do{
						repe2 = false;
						// sacamos el numero aleatorio entre 0 y 8 (posicion de la columna a borrar)
						aleatorio2 = Math.floor(Math.random()*(8-0));
						// comprobamos que no hayamos borrado ya esa posicion
						if(arrayCartones[i][aleatorio2][f]==(-1)){
							repe2 = true;
						} else {
							if(f==2){
								if(arrayCartones[i][aleatorio2][0]==(-1) && arrayCartones[i][aleatorio2][1]==(-1)){
									repe2=true;
								} else {
									arrayCartones[i][aleatorio2][f]=(-1);
								}
							} else {
								arrayCartones[i][aleatorio2][f]=(-1);
							}
						}
					} while(repe2);
				}				
			}
		}
		/*
		var alerta = "";
		for(i=0; i<num; i++){
			alerta += "\n";
			alerta += "\n";
			for(c=0; c<9; c++){
				alerta += "\n";
				for(f=0; f<3; f++){
					alerta += "-"+arrayCartones[i][c][f];
				}
			}
		}
		alert(alerta);
		*/
		//return arrayCartones;
		mostrarCartones(arrayCartones);
	}
	
	function actualizarSaldo(precio){
		//var resultado;
		//hacemos AJAX para actualizar la BD. si ajax devuelve correcto, actualizamos con JQuery el saldo, si devuelve error
		// no actualizamos el saldo.
		$.post("actualizar_saldo.php",
			{dato:precio},
			function(data){
				if(data=="error"){
					$("#error_carton").val("Ha habido un error conectando con el servidor. Vuelve a intentarlo.");
					//return false;
					//resultado = false;
				}else{
					$("#saldo").val($("#saldo").val()-precio);
					$("#barra_control").hide();
					//return true;
					//resultado = true;
					generaCartones(precio);
				}
			}
		);
		//return resultado;
	}
	
	function pagaPremio(premio){
		$.post("paga_premio.php",
			{dato:premio},
			function(data){
				if(data=="error"){
					pagaPremio(premio);
				}else{
					// actualizamos saldo en pantalla
					$("#saldo").val(parseInt($("#saldo").val())+premio);
				}
			}
		);
	}
});