var ejercicios = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];

$.noConflict();
jQuery(document).ready(function($) {
    // Code that uses jQuery's $ can follow here.
    $("#contactForm").on("submit",validarFormularioContacto);
    $("#borrartodos").click(function(event){
        //attr --> Cambios de atributos
        //prop --> Propiedades
        //is   --> validaciones de expresion booleana
        if($(this).is(":checked")){
            $("tbody input[type=checkbox]").prop("checked", true);
        }else{
            $("tbody input[type=checkbox]").prop("checked", false);
        }
    });

    cargarArrayEjercicios();
    function validarFormularioContacto(){
        //recoger los valores de la vista
        var pdni = $("#dni").val();
        var pnombre = $("#nombre").val();
        var papellidos = $("#apellidos").val();
        var ptelefono = $("#telefono").val();
        var valido = false;

        //evaluarlos(VALIDARLOS)
        var dniValido= validarDni(pdni); //en funcion de si estan bien o mal o se envia o no
        var nomValido = validarNombre(pnombre);
        var apeValido = validarApellidos(papellidos);
        var teleValido = validarTelefono(ptelefono);

        if(dniValido&&nomValido&&apeValido&&teleValido){
            // $("#contactForm").submit();//se envia el Formulario(Consumir REST)
            valido = true;
            $("#dni").siblings("div.text-error").text("");
            $("#nombre").siblings("div.text-error").text("");
            $("#apellidos").siblings("div.text-error").text("");
            $("#telefono").siblings("div.text-error").text("");
        }else {
            //mostar mensaje de error
            if(!dniValido){
                $("#dni").siblings("div.text-error").text("El DNI esta mal formado");
            }
            if(!nomValido){
                $("#nombre").siblings("div.text-error").text("El nombre tiene que tener al menos 3 letras");
            }
            if(!apeValido){
                $("#apellidos").siblings("div.text-error").text("Los apellidos tienen que tener al menos 7 letras");
            }
            if(!teleValido){
                $("#telefono").siblings("div.text-error").text("El teléfono esta mal formado");
            }
            //text y html
        }
        return false;
    }
    function cargarArrayEjercicios() {
        //Recorremos el array
        if(ejercicios.length > 0){
            for(var ejercicio in ejercicios){
                console.log(ejercicio);
                var texto = "<tr>" +
                    "<td><input type='checkbox' value=''"+ ejercicio +"'></td>" +
                    "<td></td>" +
                    "<td></td>" +
                    "<td></td>" +
                    "<td></td>" +
                    "<td></td>" +
                    "</tr>";
                //Añadir el html correspondiente a la pagina
                $("#tablaEjercicios tbody").append(texto);
            }
            $("#tablaEjercicios tfoot td").html("<span class='text-error'>Total de ejercicios: "+ejercicios.length+"</span>");
        }else{
            $("#tablaEjercicios").remove();
            $("#tablaEjercicios").text("No se han encontrado ejercicios");
        }

    }
});

function validarDni(dni) {
    var valido =true;
    const pattern = new RegExp(/^\d{8}[a-zA-Z]$/);
    if(pattern.test(dni)){
        numero = parseInt(dni.substr(0,dni.length-1),10);
        letr = dni.substr(dni.length-1,1);
        numero = numero % 23;
        letra='TRWAGMYFPDXBNJZSQVHLCKET';
        letra=letra.substring(numero,numero+1);
        if (letra!=letr.toUpperCase()) {
            valido = true;
        }
    }
    return valido;
}

function validarNombre(nombre) {
    const  pattern = new RegExp(/[A-Za-z]{3,}/);
    return pattern.test(nombre);
}

function validarApellidos(apellidos) {
    const  pattern = new RegExp(/[A-Za-z]{2,}\s[A-Za-z]{2,}/);
    return pattern.test(apellidos);
}
function validarTelefono(telefono) {
    var valido = true;
    const  pattern = new RegExp(/\d{9}/);
    if(telefono != ""){
        valido = pattern.test(telefono);
    }
    return valido;
}
