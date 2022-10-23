var botaoAdicionar = document.querySelector("#adicionar-cliente");
var botaoIncluirPacienteManualmente = document.querySelector("#buscar-pacientes4")
var botaomostrarclientes = document.querySelector("#mostrar-clientes");
var botaoesconderclientes = document.querySelector("#esconder-clientes");

botaoesconderclientes.addEventListener("click", function(event){
    event.preventDefault();
    escondeTabelaClientes()
})

botaomostrarclientes.addEventListener("click", function(event){
    event.preventDefault();
    mostraTabelaClientes();
})


botaoIncluirPacienteManualmente.addEventListener("click", function(event){
    event.preventDefault();
    mostraAdicionaPacientesManualmente();
    escondeTabelaClientes();

})

botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();
    var form = document.querySelector("#form-adiciona")
    var cliente = obtemClienteDoForm(form);
    console.log(cliente.cpf);
    console.log(cliente.data_nascimento);
    console.log(cliente.nome);
    console.log(cliente.renda);
    var valorRenda = validaRenda(cliente.renda);
    if (!valorRenda){
        console.log('validou a renda')
        var justificativa = document.querySelector("#justificativa");
        if (justificativa.value.length <=0){
            console.log('vc deve incluir a justifcatvia')
            alert('Você informou uma renda menor que R$ 1.000,00. Inclua uma justificativa')
            removeInvisivel();
            justificativa.focus();
            return;
        }else{
            adicionaClienteNaTabela(cliente);
            AddInvisivel();
            form.reset();  
        }
    }else{
        adicionaClienteNaTabela(cliente);
        AddInvisivel();
        form.reset();  
    }

    //faz mostrar a tabela que contém os clientes
    var containerInicial = document.querySelector("#containerInicial");
    containerInicial.classList.remove("invisivel")
/*     var containerIncialSemPacientes = document.querySelector("#containerNaoPossuiClientes");
    containerIncialSemPacientes.classList.add("invisivel") */
    adicionaBD(cliente)
    somaRenda();
    escondeAdicionaPacientesManualmente();
    limpaTabela()
    /* mostraTabelaClientes(); */

});

function obtemClienteDoForm(form){
    
    if (form.justificativa.value.length>0){
        textoJustificativa = form.justificativa.value + " - indicio de trabalho escravo"
    }else{
        textoJustificativa = "renda maior que mil"
    }
    var cliente = {
        cd_clientes: 1,
        nome : form.nome.value,
        cpf : form.cpf.value,
        renda : form.renda.value,
        data_nascimento : form.data_nascimento.value,
        idade : calculaIdade(form.data_nascimento.value), 
        justificativa: textoJustificativa,
        matricula:'f6.666.666-6'
    }
    console.log('aqui vai idade ' + cliente.idade)
    
    var f = cliente.renda.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    console.log('valor em moeda' + f)

    alert(cliente.nome)
    console.log(cliente.nome + 'entrei aqui')
    /* adicionaBD(cliente) */
/*     var xhr = new XMLHttpRequest();
    xhr.open("POST","http://127.0.0.1:3000/clientes" )
    var data = 'nome='             + cliente.nome 
             + '&cpf='             + cliente.cpf 
             + '&renda='           + cliente.renda 
             + '&data_nascimento=' + cliente.data_nascimento 
             + '&idade='           + cliente.idade
             + '&justificativa='   + cliente.justificativa
             + '&matricula='       + cliente.matricula; 
    console.log(data + 'aqui vai o data')
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send(data) */

    return cliente;
}

function montaTr(cliente){

  
    var clienteTr = document.createElement("tr");
    clienteTr.classList.add("cliente");
    clienteTr.id = cliente.cd_cliente;
    
    var cd_clienteTd = montaTd(cliente.cd_cliente, "info-cd_cliente")
    var matriculaTd = montaTd(cliente.matricula, "info-matricula")
    var nomeTd = montaTd(cliente.nome, "info-nome")
    var cpfTd = montaTd(cliente.cpf,"info-cpf")
    var rendaTd = montaTd(cliente.renda,"info-renda")
    var dataDeNascimentoTd = montaTd(cliente.data_nascimento, "info-data-de-nascimento")
    var idadeTd = montaTd(cliente.idade,"info-idade");
    var justificativaTd = montaTd(cliente.justificativa, "info-justificativa")
    var acao = montaTd("", "info-remover");
    
    
    /* cd_clienteTd.textContent = cliente.cd_cliente;
    matriculaTd.textContent = cliente.matricula;
    nomeTd.textContent = cliente.nome;
    cpfTd.textContent = cliente.cpf;
    rendaTd.textContent = cliente.renda;
    dataDeNascimentoTd.textContent = cliente.data_nascimento;
    idadeTd.textContent = cliente.idade;*/
    cd_clienteTd.classList.add("textoFixo")
    matriculaTd.classList.add("textoFixo")
    dataDeNascimentoTd.classList.add("textoFixo")
    idadeTd.classList.add("textoFixo")
    rendaTd.classList.add("textoFixo")
    /* rendaTd.innerHTML = "<div contenteditable=true>" + cliente.renda + "</div>" */
    nomeTd.classList.add("textoNaoEditavel")
    nomeTd.innerHTML = "<div contenteditable=false>" + cliente.nome + "</div>"
    cpfTd.classList.add("textoNaoEditavel")
    cpfTd.innerHTML = "<div contenteditable=false>" + cliente.cpf + "</div>"
    justificativaTd.innerHTML = "<div contenteditable=false>" + cliente.justificativa + "</div>"
    justificativaTd.classList.add("textoNaoEditavel")
     
/*     justificativaTd.textContent = cliente.justificativa;  */
     acao.innerHTML = "<button id='remover-paciente' onclick='deletaCliente(event)'>del</button> <button id='editar-paciente' onclick='abreEdicao(event)'>edit</button>"  
    
    value = parseInt(rendaTd.textContent);
    var price = value.toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    })

console.log('price' + price)

rendaTd.textContent = price;

    
/*     var formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    }) */

    
    

    clienteTr.appendChild(cd_clienteTd);
    clienteTr.appendChild(matriculaTd);
    clienteTr.appendChild(cpfTd);
    clienteTr.appendChild(nomeTd);
    clienteTr.appendChild(dataDeNascimentoTd);
    clienteTr.appendChild(rendaTd);
    clienteTr.appendChild(idadeTd);
    clienteTr.appendChild(justificativaTd);
    clienteTr.appendChild(acao);
    

    var justificativa = document.querySelector("#justificativa");
    if (justificativa.value.length>0){
        clienteTr.classList.add("destaqueTexto")
    }

    return clienteTr;
 
}

function montaTd(dado, classe){
    var td = document.createElement("td");
    td.textContent = dado; 
    td.classList.add(classe);
    return td;
}



function validaCliente(cliente){

    var erros = [];

    if(!validaRenda(cliente.renda)){
        erros.push("renda inválida. deve ser superior a R$ 1.000,00")
    }

    return erros;
    
}


function exibeMensagemDeErro(erros){
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML="";
    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    })
}

function adicionaClienteNaTabela(cliente){

    var clienteTr = montaTr(cliente) ; 
    var tabela = document.querySelector("#tabela-clientes");
    tabela.appendChild(clienteTr);  
}

function calculaIdade(dataDeNascimento){
    var ano_atual = new Date().getFullYear();
    var ano_nascimento = new Date(dataDeNascimento).getFullYear();
    total = ano_atual - ano_nascimento;
    return total;
}


var botaoDeletar = document.querySelector("#info-bt");

botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();


})

function escondeTabelaClientes(){
    var containerInicial = document.querySelector("#containerInicial");
    containerInicial.classList.add("invisivel")
}

function mostraTabelaClientes(){
    var containerInicial = document.querySelector("#containerInicial");
    containerInicial.classList.remove("invisivel")
/*     var containerIncialSemPacientes = document.querySelector("#containerNaoPossuiClientes");
    containerIncialSemPacientes.classList.add("invisivel") */
    var containerInicial2 = document.querySelector("#containerAdicionaPacinetes");
    containerInicial2.classList.add("invisivel")
}

function mostraAdicionaPacientesManualmente(){
    var containerInicial2 = document.querySelector("#containerAdicionaPacinetes");
    containerInicial2.classList.remove("invisivel")
}


var cancelarAdicionarPaciente = document.querySelector('#cancelarAdicionarPaciente')
console.log(cancelarAdicionarPaciente)
cancelarAdicionarPaciente.addEventListener("click",function(event){
    event.preventDefault();
    escondeAdicionaPacientesManualmente();
} );

function escondeAdicionaPacientesManualmente(){
    var form = document.querySelector("#form-adiciona")
    form.reset(); 
    var containerInicial2 = document.querySelector("#containerAdicionaPacinetes");
    containerInicial2.classList.add("invisivel")
    
}

function adicionaBD(cliente){
    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://127.0.0.1:3000/clientes" )
    var data = 'nome='             + cliente.nome 
             + '&cpf='             + cliente.cpf 
             + '&renda='           + cliente.renda 
             + '&data_nascimento=' + cliente.data_nascimento 
             + '&idade='           + cliente.idade
             + '&justificativa='   + cliente.justificativa
             + '&matricula='       + cliente.matricula; 
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send(data)
}

/*  var botaoRemover = document.querySelector("#remover-paciente");


 botaoRemover.onclick = alerta  ;

 function alerta(){
    alert('clieuqie')
 } */
/* botaoRemover.addEventListener("click", function(){
    
    alert('clicquei no deletar')
})
 */

function deletaCliente(){
/*     alert('clieuqie')
    alert(event.target.parentNode.parentNode.innerText) */
    var texto = event.target.parentNode.parentNode.innerText
    /* event.target.parentNode.parentNode.classList.add("destaqueTexto"); */
    /* console.table(event.target.parentNode.parentNode.firstChild.children[1] + ' filhos'); */
    /* htmlInicial = event.target.parentNode.parentNode.innerHTML
    console.table('primeira tabela' + htmlInicial)
    html1 = htmlInicial.replaceAll("textoNaoEditavel","textoEditavel")
    html2 = html1.replaceAll("false", "true")
    console.table('tabela' + html2)
    event.target.parentNode.parentNode.innerHTML = html2 */
  /*    console.table(event.target.parentNode.parentNode.innerHTML + 'innerhtml')  */
/*     console.table(event.parentNode.nodeName + 'novos filhos')


    console.log('aqui vai o texto quebrado' + texto) */
    arrayTexto = texto.split("\t")
    console.log('cpf - ' + arrayTexto[2] + 'nome - ' + arrayTexto[3] + 'justificativa da renda - ' + arrayTexto[7])
/*     var rowId = event.target.parentNode.parentNode.id */
    var rowId = arrayTexto[0]

   alert(rowId)

/*     var xhr = new XMLHttpRequest();
    xhr.open("DELETE","http://127.0.0.1:3000/clientes" )
    var data = 'id_produto=' + rowId;
              
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send(data) */

var val = confirm("Deseja mesmo deletar " + arrayTexto[3] + " ?" );
if (val == true) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE","http://127.0.0.1:3000/clientes" )
    var data = 'id_produto=' + rowId;
              
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send(data)
    limpaTabela()
} else {
    alert("You pressed Cancel.");
}



    /* limpaTabela() */
 /*    var index, table = document.getElementById('tabela-geral');
    for(var i = 1; i < table.rows.length; i++)
    { */
        /* table.rows[i].cells[3].onclick = function()
        {
            var c = confirm("do you want to delete this row");
            if(c === true)
            { */
/*                 index = this.parentElement.rows 
                alert(index)
            }
             */
            //console.log(index);


 } 

 function abreEdicao(){
    htmlInicial = event.target.parentNode.parentNode.innerHTML
    console.table('primeira tabela' + htmlInicial)
    html0 = htmlInicial.replaceAll("textoFixo","textoFixoApos")
    html1 = html0.replaceAll("textoNaoEditavel","textoEditavel")
    html2 = html1.replaceAll("false", "true")
    console.table('tabela' + html2)
    /* event.target.parentNode.parentNode.innerHTML = html2 */
    /* rendaAp = tdRenda.textContent.substr(3,(tamanhoRenda-3)) */
    html3 = html2.substr(0,(html2.length-5))
    console.table('substring ' + html3)
    html4 = html3 + '<button id="editar-paciente" onclick="editaCliente(event)">salvar edição</button></td>'
    event.target.parentNode.parentNode.innerHTML = html4
 }

 function editaCliente(){
    var texto = event.target.parentNode.parentNode.innerText
    alert('tamanho' + texto.length)
    console.log('aqui vai o texto quebrado' + texto)
    arrayTexto = texto.split("\t")
    console.log('cpf - ' + arrayTexto[2] + 'nome - ' + arrayTexto[3] + 'justificativa da renda - ' + arrayTexto[7])
    var data = 'nome='           + arrayTexto[3]
             + '&cpf='           + arrayTexto[2]
             + '&justificativa=' + arrayTexto[7]
             + '&cd_cliente='    + arrayTexto[0]
    console.table('tabela  ' + data )         
    
    var xhr = new XMLHttpRequest();
    xhr.open("PATCH","http://127.0.0.1:3000/clientes" )
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send(data)

 }