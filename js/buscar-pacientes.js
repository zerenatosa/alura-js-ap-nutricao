console.log('buscar')

var botaoAdicionar = document.querySelector("#buscar-pacientes")
botaoAdicionar.addEventListener("click",function(){
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");
    
    xhr.addEventListener("load", function(){

        if(xhr.status == 200){
            var resposta = xhr.responseText;
            var pacientes = JSON.parse(resposta);
            pacientes.forEach(function(cadaPaciente){
            adicionaPacienteNaTabela(cadaPaciente);
        })
        }else{
            console.log(xhr.status);
            console.log(xhr.responseText);
            
        }

        var statusAjax = document.querySelector("#status-ajax");
        statusAjax.classList.remove("invisivel");
        statusAjax.classList.add("destaqueTexto");
        console.log(xhr.status)
        statusAjax.textContent = ("O código retornado pela API do heroku é : " + xhr.status);        
    })

    xhr.send();
    
   

})