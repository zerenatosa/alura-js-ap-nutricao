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

//liga o processo de adição de um novo cliente, disparado pelo botão de adionar
botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();
    var form = document.querySelector("#form-adiciona")
    var cliente = obtemClienteDoForm(form);
    var valorRenda = validaRenda(cliente.renda);
    if (!valorRenda){
        console.log('validou a renda')
        var justificativa = document.querySelector("#justificativa");
        if (justificativa.value.length <=0){
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

    adicionaBD(cliente)
    somaRenda();
    escondeAdicionaPacientesManualmente();
    limpaTabela()
    buscaClientes();

});


//pega um cliente do form e faz os tratamentos
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
        
    var f = cliente.renda.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    
    return cliente;
}


// monta a tr de um cliente
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
    
    //adiciona classes que fiquei com preguiça de mandar na função alí de cima
    //essas classes controlam o que pode ser exibido e os campos que podem ser editados
    cd_clienteTd.classList.add("textoFixo")
    matriculaTd.classList.add("textoFixo")
    dataDeNascimentoTd.classList.add("textoFixo")
    idadeTd.classList.add("textoFixo")
    rendaTd.classList.add("textoFixo")
    nomeTd.classList.add("textoNaoEditavel")
    nomeTd.innerHTML = "<div contenteditable=false>" + cliente.nome + "</div>"
    cpfTd.classList.add("textoNaoEditavel")
    cpfTd.innerHTML = "<div contenteditable=false>" + cliente.cpf + "</div>"
    justificativaTd.innerHTML = "<div contenteditable=false>" + cliente.justificativa + "</div>"
    justificativaTd.classList.add("textoNaoEditavel")
    acao.innerHTML = "<button id='remover-paciente' onclick='deletaCliente(event)'>del</button> <button id='editar-paciente' onclick='abreEdicao(event)'>edição</button>"  
    
    //maracutaias para converter os valores em R$
    value = parseInt(rendaTd.textContent);
    var price = value.toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    })

    rendaTd.textContent = price;

    //inclui na tabela    
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

//monta a td
function montaTd(dado, classe){
    var td = document.createElement("td");
    td.textContent = dado; 
    td.classList.add(classe);
    return td;
}


//fiz e não lembro pra que serve, acho que não está sendo usada. não deletei pq deu preguiça de testar
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
    alert('Você adicionou ' + cliente.nome)
}

//adivinha? deleta um cliente do BD!!
function deletaCliente(){
    var texto = event.target.parentNode.parentNode.innerText
    arrayTexto = texto.split("\t")
    console.log('cpf - ' + arrayTexto[2] + 'nome - ' + arrayTexto[3] + 'justificativa da renda - ' + arrayTexto[7])
    var rowId = arrayTexto[0]
    var val = confirm("Deseja mesmo deletar " + arrayTexto[3] + " ?" );

    if (val == true) {
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE","http://127.0.0.1:3000/clientes" )
        var data = 'id_produto=' + rowId;
              
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send(data)
        limpaTabela()
        xhr.addEventListener("load", function(){
        buscaClientes();
        mostraTabelaClientes()
        somaRenda()
    })  
    alert('Feito! Você deletou ' + arrayTexto[3])
    } else {
        alert("ficou com medo, né? \nok, ninguém será excluído.");
    }
    
 } 


 //daqui pra baixo é só gambiarra mas funciona, pode testar

 
 //abre os campos passíveis para edição 
 function abreEdicao(){
    htmlInicial = event.target.parentNode.parentNode.innerHTML
    html0 = htmlInicial.replaceAll("textoFixo","textoFixoApos")
    html1 = html0.replaceAll("textoNaoEditavel","textoEditavel")
    html2 = html1.replaceAll("false", "true")
    html3 = html2.substr(0,(html2.length-5))
    html3 = html3.replaceAll("abreE","cancelaE")
    html3 = html3.replaceAll("edição","cancela edição")
    html4 = html3 + '<button id="editar-paciente" onclick="editaCliente(event)">salvar edição</button></td>'
    event.target.parentNode.parentNode.innerHTML = html4
 }

 //permite edição de um cliente, depois de aberta a edição
 function editaCliente(){
    var texto = event.target.parentNode.parentNode.innerText
  
    arrayTexto = texto.split("\t")
  
    var data = 'nome='           + arrayTexto[3]
             + '&cpf='           + arrayTexto[2]
             + '&justificativa=' + arrayTexto[7]
             + '&cd_cliente='    + arrayTexto[0]
    
    var xhr = new XMLHttpRequest();
    xhr.open("PATCH","http://127.0.0.1:3000/clientes")
    
    //esse pedaço não faz nada mas se eu tiro para de funcionar a atualização. 
    //se faz alguma coisa deve estar fazendo escondido de mim, fdp
    xhr.addEventListener("load", function(){
    })  

    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');   
    limpaTabela();
    xhr.send(data) 
    xhr.addEventListener("load", function(){
        buscaClientes();
    }) 
    
    alert('registro atualizado')
    
 }


 //cancela a edição feita, mas só funciona antes de salvar o dado no BD
 function cancelaEdicao(){
    limpaTabela()
    buscaClientes() 
    mostraTabelaClientes()
    alert('edição cancelada')
 }


 