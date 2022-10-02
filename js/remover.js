var paciente = document.querySelectorAll(".paciente");
/* var tabela = document.querySelectorAll */

document.querySelector("table").addEventListener("dblclick", function(event){
    event.target.parentNode.classList.add("fadeOut");
    
    setTimeout(function(){
        event.target.parentNode.remove();
    },500);
    /* event.target.parentNode.remove(); */
})

/* paciente.forEach(function(cadaPaciente){
    cadaPaciente.addEventListener("dblclick",function(){
        this.remove();
    })
}) */
