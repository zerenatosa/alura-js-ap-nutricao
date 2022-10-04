function validaRenda(renda){
    if(renda > 1000){
        return true;
    }else{
        return false;
    }
}


var renda = document.querySelector("#renda");
console.log('aqui')
renda.onblur= function(){
    if (renda.value<=1000){
        removeInvisivel()
        alert('Atenção! Você informou uma renda menor que R$ 1.000,00. Apresente uma justificativa.')
        var justificativa = document.querySelector("#justificativa");
        justificativa.focus();
    }else{
        AddInvisivel();

    }
    
}

function AddInvisivel(){
    var justificativa = document.querySelector("#justificativa");
    var justificativaLabel = document.querySelector("#justificativaLabel");
    console.log(justificativa.value)
    justificativa.classList.add("invisivel");
    justificativaLabel.classList.add("invisivel")

}

function removeInvisivel(){
    var justificativa = document.querySelector("#justificativa");
    var justificativaLabel = document.querySelector("#justificativaLabel");
    console.log(justificativa.value)
    justificativa.classList.remove("invisivel");
    justificativaLabel.classList.remove("invisivel")

}
