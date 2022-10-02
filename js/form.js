var botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();
    console.log("oi");
    var form = document.querySelector("#form-adiciona")
 /*    var nome = form.nome.value;
    var peso = form.peso.value;
    var altura = form.altura.value;
    var gordura = form.gordura.value; */
    var paciente = obtemPacienteDoForm(form);
    console.log(nome);
    console.log(peso);
    console.log(altura);
    console.log(gordura);
    var erros = validaPaciente(paciente);
    console.log(erros)
    if(erros.length > 0){
        exibeMensagemDeErro(erros);
        return;
/*         var mensagemErro = document.querySelector("#mensagem-erro");
        mensagemErro.textContent = "Existe um problema na validação de seu paciente"; */
    }
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML="";

/*    if (!validaPaciente(paciente)){
        alert('paciente invalido')    
        var mensagemErro = document.querySelector("#mensagem-erro");
        mensagemErro.textContent = "Existe um problema na validação de seu paciente";
        return;
   }
    var pacienteValido = validaPaciente(paciente) ; */
   adicionaPacienteNaTabela(paciente); 
   /* var pacienteTr = montaTr(paciente) ;
   console.log("o nome é " + nome)
   console.log(pacienteTr)
   var tabela = document.querySelector("#tabela-pacientes");
   tabela.appendChild(pacienteTr); */

    form.reset();

});

function obtemPacienteDoForm(form){

    var paciente = {
        nome : form.nome.value,
        peso : form.peso.value,
        altura : form.altura.value,
        gordura : form.gordura.value,
        imc : calculaImc(form.peso.value,form.altura.value)
    }
    
    return paciente;

}

function montaTr(paciente){


    
    
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");


    var nomeTd = montaTd(paciente.nome, "info-nome");
    var pesoTd = montaTd(paciente.peso, "info-peso");
    var alturaTd = montaTd(paciente.altura, "info-altura");
    var gorduraTd = montaTd(paciente.gordura, "info-gordura");
    var imcTd = montaTd(paciente.imc, "info-imc");
    

    nomeTd.textContent    = paciente.nome;
    pesoTd.textContent    = paciente.peso
    alturaTd.textContent  = paciente.altura;
    gorduraTd.textContent = paciente.gordura;
    imcTd.textContent     = paciente.imc;

    pacienteTr.appendChild(nomeTd);
    pacienteTr.appendChild(pesoTd);
    pacienteTr.appendChild(alturaTd);
    pacienteTr.appendChild(gorduraTd);
    pacienteTr.appendChild(imcTd);

    return pacienteTr;

}

function montaTd(dado, classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td;
}



function validaPaciente(paciente){

    var erros = [];

    if(validaPeso(paciente.peso)){
        /* return true; */
    }else{
        /* return false; */
        erros.push("peso inválido");
    }

    if (validaAltura(paciente.altura)){

    }else{
        erros.push("altura inválida");
    }
    
    if (paciente.peso.length == 0){
        erros.push("peso não pode ser nulo");
    }

    if (paciente.gordura.length == 0){
        erros.push("gordura não pode ser nulo");
    }

    if(paciente.nome.length == 0){
        erros.push("nome não pode ser nulo");
    }

    if (paciente.altura.length == 0){
        erros.push("altura não pode ser nulo");
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

function adicionaPacienteNaTabela(paciente){

    var pacienteTr = montaTr(paciente) ;
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}