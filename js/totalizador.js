
function somaRenda(){
var clientes = document.querySelectorAll(".cliente");
total = 0;
console.log('tamanho do cliente' + clientes.length)
for (var i=0;i<clientes.length; i++){
    var cliente = clientes[i];
    var tdRenda = cliente.querySelector(".info-renda");
    /* var total = parseFloat(tdRenda.textContent) + total; */

    tamanhoRenda = tdRenda.textContent.length;
    rendaAp = tdRenda.textContent.substr(3,(tamanhoRenda-3))
    console.log('nova tentativa' + rendaAp)
    arraySemVirgula = rendaAp.split(",")
    numeroSemVirgula = arraySemVirgula[0]
    console.log('array sem virgula' + numeroSemVirgula)
    numeroSemPonto = numeroSemVirgula.replace(/[^0-9]/g, '')
    console.log('numero sem ponto' + numeroSemPonto)

    numeroSemPontoParseado = Number.parseInt(numeroSemPonto)
    console.log(numeroSemPontoParseado + "numero sem ponto parseado")
    total = numeroSemPontoParseado + total;

    /* somadosnumeros = numeroSemPontoParseado + 2 */
    /* 
    console.log('numero novo parseado int ' + numeroSemPontoParseado + ' o outro' + somadosnumeros)
    rendaAdap = tdRenda.textContent.split("$ ")
    console.log('rendadap' + rendaAdap[1])
    numeroparseado = parseFloat(rendaAdap[1])
    numeroparseado = numeroparseado + 1
    console.log('numero parseado' + numeroparseado)
    console.log('tamanho da renda' + tamanhoRenda)
    console.log(total + 'aqui é o total' + tdRenda.textContent) */
/*     console.log('split' + tdRenda.textContent.split(R$) )
    console.log('este é o total'+ total) */
}
var soma = document.querySelector("#totalizadorDaRendaDosClientes");


value = parseInt(total);
var price = value.toLocaleString("pt-BR",{
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
})

console.log('price' + price)





soma.textContent = price;
}