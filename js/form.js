var botaoAdicionar = document.querySelector("#adicionar-cliente");

botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();
    var form = document.querySelector("#form-adiciona")
    var cliente = obtemClienteDoForm(form);
    console.log(cliente.cpf);
    console.log(cliente.dataDeNascimento);
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
somaRenda();

});

function obtemClienteDoForm(form){
    
    if (form.justificativa.value.length>0){
        textoJustificativa = form.justificativa.value + " - indicio de trabalho escravo"
    }else{
        textoJustificativa = "renda maior que mil"
    }
    var cliente = {
        nome : form.nome.value,
        cpf : form.cpf.value,
        renda : form.renda.value,
        dataDeNascimento : form.dataDeNascimento.value,
        idade : calculaIdade(form.dataDeNascimento.value), 
        justificativa: textoJustificativa
    }
    console.log('aqui vai idade ' + cliente.idade)
    
    var f = cliente.renda.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    console.log('valor em moeda' + f)
    return cliente;
}

function montaTr(cliente){

  
    var clienteTr = document.createElement("tr");
    clienteTr.classList.add("cliente");

    var nomeTd = montaTd(cliente.nome, "info-nome")
    var cpfTd = montaTd(cliente.cpf,"info-cpf")
    var rendaTd = montaTd(cliente.renda,"info-renda")
    var dataDeNascimentoTd = montaTd(cliente.dataDeNascimento, "info-data-de-nascimento")
    var idadeTd = montaTd(cliente.idade,"info-idade");
    var justificativaTd = montaTd(cliente.justificativa, "info-justificativa")
    
    

    nomeTd.textContent = cliente.nome;
    cpfTd.textContent = cliente.cpf;
    rendaTd.textContent = cliente.renda;
    dataDeNascimentoTd.textContent = cliente.dataDeNascimento;
    idadeTd.textContent = cliente.idade;
    justificativaTd.textContent = cliente.justificativa;
    

    clienteTr.appendChild(cpfTd);
    clienteTr.appendChild(nomeTd);
    clienteTr.appendChild(dataDeNascimentoTd);
    clienteTr.appendChild(rendaTd);
    clienteTr.appendChild(idadeTd);
    clienteTr.appendChild(justificativaTd);
    

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


