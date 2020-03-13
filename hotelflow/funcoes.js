$(function(){
    mostrar_cadastrados();
	
	for (var i = 0; i < localStorage.length; i++){
	
		let ver = localStorage.getItem(localStorage.key(i), localStorage[localStorage.key(i)]);
		
		let obj = JSON.parse(ver);
		
		x = obj;
		
		document.getElementById("previcao_cidades").innerHTML +='<option value=' 
                + x.cidade + '>'
                + x.cidade + '</option>';
	}
	
	$('#previcao_cidades').on('change',function(name){
		var cidade = $('#previcao_cidades :selected').text();
		
		fetch('https://api.openweathermap.org/data/2.5/weather?q='+cidade+'&appid=043416b71842a6032c97a66395a32963'+'&units=metric'+'&lang=pt_br')
		.then(response => response.json())
		.then(data => {
			  var tempValue = data['main']['temp'];
			  var tempMax = data['main']['temp_max'];
			  var temMin = data['main']['temp_min'];
			  var nameValue = data['name'];
			  var descValue = data['weather'][0]['description'];
			  
			  document.getElementById("name").innerHTML = nameValue;
			  document.getElementById("desc").innerHTML = "Descrição: " + descValue;
			  document.getElementById("temp").innerHTML = "Temperatura: " + tempValue + "°C";
			  document.getElementById("max_min").innerHTML = "Maximo: " + tempMax + "°C" + "<br>Minimo: " + temMin + "°C";
			})
			.catch(err => alert("Cidade não cadastrada"));
		return false;
	});
});

function cadastrar(){
    var cidade = document.getElementById("cidade").value;
    var estado = document.getElementById("estado").value;
    var ibge = document.getElementById("ibge").value;
    var populacao = document.getElementById("popest").value;
    var observacao = document.getElementById("obs").value;
	
	let dados = {
		"cidade": cidade,
		"estado": estado,
		"ibge": ibge,
		"populacao": populacao,
		"observacao": observacao
	}

	var achar_cidade = document.getElementById("cidade").value;

	for (var i = 0; i < localStorage.length; i++){
		if(achar_cidade == localStorage.key(i)){
			alert("Cidade já cadastrada!");
			var existe = 1;
		}
	}


	if(existe != 1){
	  
		let str = JSON.stringify(dados);
	   
		localStorage.setItem(cidade, str);
	  
		alert("Cidade cadastrada com sucesso!");
	  
		mostrar_cadastrados();
	  
		window.location.reload();
	}
}

function mostrar_cadastrados(){	  
	for (var i = 0; i < localStorage.length; i++){
	
		let ver = localStorage.getItem(localStorage.key(i), localStorage[localStorage.key(i)]);
		
		let obj = JSON.parse(ver);
		
		x = obj;
		
		document.getElementById("corpoTabela").innerHTML += '<tr class="table-success text"></td><th scope="row">' 
                + x.cidade + '</th><td>'
                + x.estado + '</td><td>' 
                + x.ibge + '</td><td>'
                + x.populacao + '</td><td>'
                + x.observacao + '</td></tr>';
	}
	return false;
}

function atualizar(){
	var atualizar_cidade = document.getElementById("cidadeAtualizar").value;
    var estado = document.getElementById("estadoAtualizar").value;
    var ibge = document.getElementById("ibgeAtualizar").value;
    var populacao = document.getElementById("popestAtualizar").value;
    var observacao = document.getElementById("obsAtualizar").value;
	
	for(var i = 0; i < localStorage.length; i++){
	
		if(atualizar_cidade == localStorage.key(i)){
			
			let dados = {
				"cidade": atualizar_cidade,
				"estado": estado,
				"ibge": ibge,
				"populacao": populacao,
				"observacao": observacao
			}
			
			let str = JSON.stringify(dados);
			
			localStorage.setItem(atualizar_cidade, str);
			
			i = localStorage.length;
			
			mostrar_cadastrados();
			
			alert("cidade atualizada com successo");
			
			return false;
		}
	}
	alert("Cidade não se encontra no sistema");
	window.location.reload();
}

function remover(){

    var remover_cidade = document.getElementById("remove_cidade").value;

    for (var i = 0; i < localStorage.length; i++){
		if(remover_cidade == localStorage.key(i)){
			localStorage.removeItem(localStorage.key(i));
			i = localStorage.length;
			alert("Cidade removida com sucesso!");
			return false;
		}
	}
	alert("Cidade não se encontra no sistema!");
	window.location.reload();
}