console.log('buscar')

var botaoAdicionar = document.querySelector("#buscar-pacientes")
botaoAdicionar.addEventListener("click",function(){
    spinnerAdd();
/*     alert('entrei nob ')
    var spinnerAguardaClientes = document.querySelector("#spinnerAguardaClientes")
    console.log(spinnerAguardaClientes)
    spinnerAguardaClientes.classList.remove("invisivel") */
    var xhr = new XMLHttpRequest();
    /* xhr.open("GET", "https://pxl0hosp0577.dispositivos.bb.com.br/talentosos/listarClientes/F11111"); */

/*     xhr.open("POST","http://127.0.0.1:3000/clientes" )
    var data = 'cd_clientes=99&nome=leilalalala';
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send(data) */


    
    xhr.open("GET", "http://127.0.0.1:3000/clientes");
    /* xhr.open("GET", "https://zerenatosa-filmes.herokuapp.com/"); */
    /* https://api-pacientes.herokuapp.com/pacientes" */

    
     /* xhr.open("GET","https://zerenatosa-back10.herokuapp.com/clientes"); */ 
    /*  xhr.open("GET","https://zerenatosa-clientes.herokuapp.com/clientes");  */

     console.log('aaa' + xhr.responseXML)
    
    
    xhr.addEventListener("load", function(){

        alert('entrei tbm')
        if(xhr.status == 200){

            alert('entrei aqui')
            
            var resposta = xhr.responseText;
            var pacientes = JSON.parse(resposta);
            console.log(pacientes.response)
            pacientes.response.forEach(function(cadaPaciente){
            adicionaClienteNaTabela(cadaPaciente); 
            mostraTabelaClientes()
            somaRenda()
            console.log(pacientes)
        })
        }else{
            console.log(xhr.status + 'nnnn');
            console.log(xhr.responseText);
            
        }

        var statusAjax = document.querySelector("#status-ajax");
        statusAjax.classList.remove("invisivel");
        statusAjax.classList.add("destaqueTexto");
        console.log(xhr.status)
        statusAjax.textContent = ("O código retornado pela API do heroku é : " + xhr.status);       
        spinnerRemove(); 
    })

    xhr.send();
    
   
    
})

function spinnerAdd(){
    var spinnerAguardaClientes = document.querySelector("#spinnerAguardaClientes")
    console.log(spinnerAguardaClientes)
    spinnerAguardaClientes.classList.remove("invisivel")
}

function spinnerRemove(){
    var spinnerAguardaClientes = document.querySelector("#spinnerAguardaClientes")
    console.log(spinnerAguardaClientes)
    spinnerAguardaClientes.classList.add("invisivel")
}