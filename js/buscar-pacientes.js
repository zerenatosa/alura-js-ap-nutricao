

var botaoAdicionar = document.querySelector("#buscar-pacientes")
botaoAdicionar.addEventListener("click",function(){
   limpaTabela();
    spinnerAdd();

    var xhr = new XMLHttpRequest();
    
    xhr.open("GET", "http://127.0.0.1:3000/clientes");
    
    xhr.addEventListener("load", function(){
        if(xhr.status == 200){
            var resposta = xhr.responseText;
            var pacientes = JSON.parse(resposta);
            pacientes.response.forEach(function(cadaPaciente){
            adicionaClienteNaTabela(cadaPaciente); 
            mostraTabelaClientes()
            somaRenda()
        })
        }else{
            /*se vc chegou até aqui, parabéns. Essa porra não faz nada. Avance para a próxima casa.
            */
        }

        var statusAjax = document.querySelector("#status-ajax");
        statusAjax.classList.remove("invisivel");
        statusAjax.classList.add("destaqueTexto");
        statusAjax.textContent = ("O código retornado pela API é : " + xhr.status);       
        spinnerRemove(); 
    })

    xhr.send();
    
})


//adiciona spinner
function spinnerAdd(){
    var spinnerAguardaClientes = document.querySelector("#spinnerAguardaClientes")
    spinnerAguardaClientes.classList.remove("invisivel")
}

//remove spinner
function spinnerRemove(){
    var spinnerAguardaClientes = document.querySelector("#spinnerAguardaClientes")
        spinnerAguardaClientes.classList.add("invisivel")
}

//desativado, não faz nada (acho)
var botaoLimparTabela = document.querySelector("#limpar-clientes")
botaoLimparTabela.addEventListener("click",function(){

    var tabela = document.querySelector("#tabela-geral")
    console.log(tabela.rows[1].cells[0].textContent)

})


//limpa a tabela
function limpaTabela(){
    var tabela = document.querySelector("#tabela-clientes")
    tabela.innerHTML="";
}

//busca clientes do banco
function buscaClientes(){
    limpaTabela();
    spinnerAdd();
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:3000/clientes");
    
    xhr.addEventListener("load", function(){

        if(xhr.status == 200){
            var resposta = xhr.responseText;
            var pacientes = JSON.parse(resposta);
            pacientes.response.forEach(function(cadaPaciente){
            adicionaClienteNaTabela(cadaPaciente); 
            somaRenda()
        })
        }else{
        /*se vc chegou até aqui, parabéns. Essa porra não faz nada. Avance para a próxima casa.
        */
        }

        var statusAjax = document.querySelector("#status-ajax");
        statusAjax.classList.remove("invisivel");
        statusAjax.classList.add("destaqueTexto");
        statusAjax.textContent = ("O código retornado pela API é : " + xhr.status);       
        spinnerRemove(); 
    })

    xhr.send();
    
}

