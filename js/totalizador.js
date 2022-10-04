
function somaRenda(){
var clientes = document.querySelectorAll(".cliente");
total = 0;
console.log('tamanho do cliente' + clientes.length)
for (var i=0;i<clientes.length; i++){
    var cliente = clientes[i];
    var tdRenda = cliente.querySelector(".info-renda");
    var total = parseInt(tdRenda.textContent) + total;
    console.log('este é o total'+ total)
}
var soma = document.querySelector("#totalizadorDaRendaDosClientes");
soma.textContent = total;
}