var paciente = document.querySelectorAll(".paciente");

document.querySelector("table").addEventListener("dblclick", function(event){
    
    var texto = event.target.parentNode.parentNode.innerText
    console.log('aqui vai o texto quebrado' + texto)
    arrayTexto = texto.split("\t")
    alert('Parabéns. Você deu um duplo clique em ' + arrayTexto[3] + 'nada vai acontecer, fique tranquilo.')
    
})
