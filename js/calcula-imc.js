
var pesoEhValido = true;
var alturaEhValida = true; 

var pacientes = document.querySelectorAll(".paciente"); 
var qtdPacientes = pacientes.length;


for (var i=0; i< qtdPacientes; i++){
/*     console.log(pacientes[i].querySelector(".info-peso").textContent + 'kkk'); */
    

    var paciente = pacientes[i];//.querySelector(".info-nome");    
    //console.log(paciente.textContent + 'primeiro')
    
    //pega o peso de cada paciente
    var tdPeso = pacientes[i].querySelector(".info-peso")
    var peso = tdPeso.textContent;
    
    //pega a altura
    var tdAltura = pacientes[i].querySelector(".info-altura")
    var altura = tdAltura.textContent;

     //validações
    var pesoEhValido = validaPeso(peso);
    var alturaEhValida = validaAltura(altura);

   
    if(!pesoEhValido){
/*         console.log("peso inválido"); */
        pesoEhValido = false;
       /*  alert('passeio tbm') */
    }
    if(!alturaEhValida){
/*         console.log("altura inválido"); */
        alturaEhValida = false;
    }
    
    //calcula imc
    if (pesoEhValido && alturaEhValida){
        //var imc =  peso / (altura*altura);
        var imc = calculaImc(peso,altura);
        //imc = imc.toFixed(2)
    }else {
        //alert('impossível calcular')
        imc = 'impossível calcular'
        //paciente.style.backgroundColor = 'red';
        paciente.classList.add("paciente-invalido");
    }

    //escreve imc
    var tdImc = pacientes[i].querySelector(".info-imc");
    tdImc.textContent = imc;

}


/* function calculaIdade(dataDeNascimento){
    var idade =  dataDeNascimento + 10;
    return idade;

} */

/* function validaRenda(renda){
    if(renda >= 1000){
        return true;
    }else{
        return false;
    }
}
 */
function validaPeso(peso){
    if(peso >= 0 && peso < 1000){
        return true;
    }else{
        return false;
    }

}

function validaAltura(altura){
    if(altura>= 0 && altura  <= 3.0){
        return true;
    }else{
        return false;
    }
}


