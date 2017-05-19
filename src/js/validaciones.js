/**
 * Created by Curso on 19/05/2017.
 */

export function validarFormularioContacto(){
    //recoger los valores de la vista
    var pdni = $("#dni").val();
    var pnombre = $("#nombre").val();
    var papellidos = $("#apellidos").val();
    var ptelefono = $("#telefono").val();
    var valido = false;
    //evaluarlos
    var dniValido= validarDni(pdni); //en funcion de si estan bien o mal o se envia o no
    var nomValido = validarNombre(pnombre);
    var apeValido = validarApellidos(papellidos);
    var teleValido = validarTelefono(ptelefono);
    $("#dni").siblings("div.text-error").text("");
    $("#nombre").siblings("div.text-error").text("");
    $("#apellidos").siblings("div.text-error").text("");
    $("#telefono").siblings("div.text-error").text("");
    if(dniValido&&nomValido&&apeValido&&teleValido){
        // $("#contactForm").submit();//se envia el Formulario(Consumir REST)
        valido = true;
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
            $("#telefono").siblings("div.text-error").text("El telefono no es valido, tiene que tener 9 numeros");
        }
        //text y html
    }
    return false;
}
export function validarActividad(actividad){
    const pattern = new RegExp(/[a-zA-Z]{3,}/);
    return pattern.test(actividad);
}
export function validarGrupoMuscular(grupomuscular) {
    const pattern = new RegExp(/[a-zA-Z]{2,}\s[a-zA-Z]{2,}/);
    return pattern.test(grupomuscular);
}
export function validarMaquina(maquina){
    const pattern = new RegExp(/[a-zA-Z]{3,}/);
    return pattern.test(maquina);
}
export function validarDescripcion(descripcion) {
    const pattern = new RegExp(/[a-zA-Z]{2,}\s[a-zA-Z]{2,}/);
    return pattern.test(descripcion);
}
