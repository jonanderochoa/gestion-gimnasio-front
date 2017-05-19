"use strict";
//jquery
//var $ = require("jquery");
//jquery en JQuery 6
import $ from "jquery";
window.jQuery = window.$ = $;
require("bootstrap");

//Importa las entidades
import * as ejercicio from "./ejercicios";
import * as usuario from "./usuarios";
import * as validaciones from "./validaciones";

var $listadoEjercicios = $("#listadoEjercicios");
var $listadoUsuarios = $("#listadoUsuarios");
var $contactForm = $("#contactForm");
var $pagebody = $("#page-body");


//Si existe listado de usuarios...
if($listadoUsuarios.length){
    //Coge el listado de usuarios
    let u1 = usuario.renderizar();
    u1.then(function (txt) {
        $listadoUsuarios.find("div.flexcontainer:last-child").append(txt);
    }).catch(function (txt) {

    });
}
//Si existe listado de ejercicios...
if($listadoEjercicios.length){
    //Coge el listado de ejercicios
    let e1 = ejercicio.renderizar();
    e1.then(function (txt) {
        $listadoEjercicios.find("div.flexcontainer:last-child").append(txt);
    }).catch(function (txt) {

    });
}

/*
if($listadoEjercicios.length){ //Estamos en la pagina de ejercicios
    //Creamos un nuevo ejercicio
    var as = new ejercicio.EjercicioService();

    as.getAll()
        .then(function (data) {
            //console.log(data);
            cargarArrayEjercicios(JSON.parse(data));
        },function(error){ //error
            console.log(error);
        }).catch(function () {

    });

    as.getById()
        .then(function (data) {
            //console.log(data);
            cargarArrayEjercicios(JSON.parse(data));
        },function(error){ //error
            console.log(error);
        }).catch(function () {

    });
}
*/
    //$.noConflict();
    //$(document).ready(function($) {
    $contactForm.on("submit",validaciones.validarFormularioContacto);
    $listadoEjercicios.find("div a:last-child").click(borrarVarios);
    //borrar
    $pagebody.on("click","tbody td:last-child button:last-child", function(){
        //alert("has pulsado el boton de borrado");
        var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
        //Llamar al REST para Borrar
        //
        // alert(codigo);
        //borra la tupla del boton que se ha seleccionado
        $(this).parents("tr").remove();
    });
    //editar
    $pagebody.on("click","tbody td:last-child button:first-child",function(){
        //alert("has pulsado el boton de actualizar");
        var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
        //Llamar al REST para el GetById
        var nombre = $(this).parents("tr").find("td:nth-child(2)").text();
    });
    $pagebody.on('click',"#borrartodos", function (event) {
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
        //recoger los checksboxes marcados de cualquier tabla
        $("table tbody input:checked").each(function () {
            var codigo = $(this).val();
            //Llamar al REST
            $(this).parents("tr").remove();
        });
        //actualizar el nº de elementos de la tabla
        $("tbody tr").length;
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
            $("#listadoEjercicios").text("No se han encontrado ejercicios")
        }
    }

/*
    const urlEjercicios = "http://localhost:8080/gestiongimnasio/api/ejercicios";
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

});

*/


