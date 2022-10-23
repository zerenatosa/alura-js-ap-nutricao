
//atenção. as avançadas técnicas que você verá aditante não podem mais ser desvitas. 
//continue por sua conta e risco.
//eu escrevi e se precisar explicar como funciona eu to encrencado, pq não lembro como fiz.
//algumas linhas provavelmente são inúteis, mas se eu tiro para de funcionar. Então tem que ficar assim mesmo.
//funciona, mas é inexplicável.

function somaRenda(){
var clientes = document.querySelectorAll(".cliente");
total = 0;

for (var i=0;i<clientes.length; i++){
    var cliente = clientes[i];
    var tdRenda = cliente.querySelector(".info-renda");
    tamanhoRenda = tdRenda.textContent.length;
    rendaAp = tdRenda.textContent.substr(3,(tamanhoRenda-3))
    arraySemVirgula = rendaAp.split(",")
    numeroSemVirgula = arraySemVirgula[0]
    numeroSemPonto = numeroSemVirgula.replace(/[^0-9]/g, '')
    numeroSemPontoParseado = Number.parseInt(numeroSemPonto)
    total = numeroSemPontoParseado + total;
    if (numeroSemPontoParseado < 1000){
        clientes[i].classList.add("destaqueTexto")
    }
    
}

/* destacaTrabalhoEscravo() */

var soma = document.querySelector("#totalizadorDaRendaDosClientes");

value = parseInt(total);
var price = value.toLocaleString("pt-BR",{
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
})

soma.textContent = price;
}