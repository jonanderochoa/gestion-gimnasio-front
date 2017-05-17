
//jquery
//var $ = require("jquery");
//jquery en JQuery 6
import $ from "jquery";
window.jQuery = window.$ = $;
//require("bootstrap");

//$.noConflict();
//$(document).ready(function($) {
    // Code that uses jQuery's $ can follow here.
    $("#contactForm").on("submit",validarFormularioContacto);
    $("#listadoEjercicios div a:last-child").click(borrarVarios);
    $("#tablaEjercicios tbody").on("click","td:last-child button:last-child",function(){
        //alert("has pulsado el boton de borrado");
        var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
        //Llamar al REST para Borrar
        //
        // alert(codigo);
        //borra la tupla del boton que se ha seleccionado
        $(this).parents("tr").remove();
    });
    $("#tablaEjercicios tbody").on("click","td:last-child button:first-child",function(){
        //alert("has pulsado el boton de actualizar");
        var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
        //Llamar al REST para el GetById
        var nombre = $(this).parents("tr").find("td:nth-child(2)").text();
    });
    $("#borrartodos").click(function (event) {
        //attr ---> cambios de atributos
        // prop --> propiedades
        // is ----> validacion booleana
        if($(this).is(":checked")){
            $("tbody input[type=checkbox]").prop("checked",true);
            //
            //checked = checked
            //selected= selected
            //
        }else{
            $("tbody input[type=checkbox]").prop("checked",false);
        }


    });
    function borrarVarios() {
        //recoger los checksboxes marcados
        $("#tablaEjercicios tbody input:checked").each(function () {
            var codigo = $(this).val();
            //Llamar al REST
            $(this).parents("tr").remove();


        });
        //actualizar el nº de ejercicios
        $("tbody tr").length;

    }


    function validarFormularioContacto(){
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



    //cargarArrayEjercicios();
    function cargarArrayEjercicios(ejercicios) {
        //recorrer el array
        if (ejercicios.length > 0) {
            for(var i = 0; i < ejercicios.length; i++) {
                console.log(ejercicios[i]);
                var codigo = ejercicios[i].codigo;
                var actividad = ejercicios[i].actividad;
                var grupomuscular = ejercicios[i].grupomuscular;
                var maquina = ejercicios[i].maquina;
                var descripcion = ejercicios[i].descripcion;
                var htmlEdit ="<button>Editar</button>";
                var htmlDelete ="<button>Borrar</button>";

                var texto = "<tr>" +
                    "<td><input type='checkbox' value='" + codigo + "'></td>" +
                    "<td>"+actividad+"</td>" +
                    "<td>"+grupomuscular+"</td>" +
                    "<td>"+maquina+"</td>" +
                    "<td>"+descripcion+"</td>" +
                    "<td>"+htmlEdit+htmlDelete+"</td></tr>";
                //añadir el html correspondiente a la página
                $("#tablaEjercicios tbody").append(texto);
                //-->
            }
            $("#tablaEjercicios tfoot td").html("<span class='text-error'>Total ejercicios:"+ejercicios.length,10+"</span>");
        }else{
            $("#tablaEjercicios").remove();
            $("#listadoEjercicios").text("No se han encontrado ejercicios")
        }
    }

    const urlEjercicios = "http://localhost:8080/gestiongimnasio/api/ejercicios"
    ajax({"url":urlEjercicios,"method":"get"})
        .then(function (data) {
            cargarArrayEjercicios(data);
            //aqui tengo los datos cargados (data)
            console.log(data);
            cargarArrayEjercicios(data);
        })
        .then(function () {
            //poner mensaje los datos se han cargado correctamente
        })
        .catch(function (jqXHR, textStatus, errorThrown ) {
            console.log(jqXHR);
            //gestión de errores del primer metodo.
        });
    function ajax(opciones) {
        return new Promise(function (resolve, reject) {
            $.ajax(opciones).done(resolve).fail(reject);
        });
    }

//});
function validarActividad(actividad){
    const pattern = new RegExp(/[a-zA-Z]{3,}/);
    return pattern.test(actividad);
}
function validarGrupoMuscular(grupomuscular) {
    const pattern = new RegExp(/[a-zA-Z]{2,}\s[a-zA-Z]{2,}/);
    return pattern.test(grupomuscular);
}
function validarMaquina(maquina){
    const pattern = new RegExp(/[a-zA-Z]{3,}/);
    return pattern.test(maquina);
}
function validarDescripcion(descripcion) {
    const pattern = new RegExp(/[a-zA-Z]{2,}\s[a-zA-Z]{2,}/);
    return pattern.test(descripcion);
}
