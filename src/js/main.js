"use strict";
//jquery
//var $ = require("jquery");
//jquery en JQuery 6
import $ from "jquery";
window.jQuery = window.$ = $;
require("bootstrap"); //Añade la dependencia de bootstrap js

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
    let e1 = ejercicio.renderizar(); //Renderizar devuelve una promesa
    e1.then(function (txt) {
        $listadoEjercicios.find("div.flexcontainer:last-child").append(txt);
    }).catch(function (txt) {

    });
}

/*
//Antiguo listado de ejercicios
if($listadoEjercicios.length) {
    //Coge el listado de ejercicios
    var es = new ejercicio.EjercicioService();
    es.getAll()
        .then(function (data) {
            cargarArrayEjercicios(JSON.parse(data));
        }, function (error) {
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
    $pagebody.on("click","tbody li:last-child", function(){
        //alert("has pulsado el boton de borrado");
        var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
        //Llamar al REST para Borrar
        //
        // alert(codigo);
        //borra la tupla del boton que se ha seleccionado
        $(this).parents("tr").remove();
    });
    //editar
    $pagebody.on("click","tbody li:first-child",function(){
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

/*
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
                //var htmlEdit ="<button>Editar</button>";
                //var htmlDelete ="<button>Borrar</button>";
                var botones = "<div class='btn-group'>" +
                    "<button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown'>" +
                    "Acciones <span class='caret'></span>" +
                    "</button><ul class='dropdown-menu' role='menu'>" +
                    "<li><a href='#'>Editar</a></li>" +
                    "<li><a href='#'>Borrar</a></li>" +
                    "</div>";

                var texto = "<tr>" +
                    "<td><input type='checkbox' value='" + codigo + "'></td>" +
                    "<td>"+actividad+"</td>" +
                    "<td>"+grupomuscular+"</td>" +
                    "<td>"+maquina+"</td>" +
                    "<td>"+descripcion+"</td>" +
                    "<td>"+botones+"</td></tr>";
                //añadir el html correspondiente a la página
                $("#tablaEjercicios tbody").append(texto);
                //-->

            }
            $("#tablaEjercicios tfoot td").html("<span class='text-error'>Total ejercicios:"+ejercicios.length,10+"</span>");
        }else{
            $("#listadoEjercicios").text("No se han encontrado ejercicios")
        }


    }

    //cargarArrayUsuarios();
    function cargarArrayUsuarios(usuarios) {
        //recorrer el array
        if (usuarios.length > 0) {
            for(var i = 0; i < usuarios.length; i++) {
                console.log(usuarios[i]);
                var codigo = usuarios[i].codigo;
                var nombre = usuarios[i].nombre;
                var apellidos = usuarios[i].apellidos;
                var user = usuarios[i].user;
                var pass = usuarios[i].pass;
                var email = usuarios[i].email;
                var activo = usuarios[i].activo;
                var htmlEdit ="<button>Editar</button>";
                var htmlDelete ="<button>Borrar</button>";

                var texto = "<tr>" +
                    "<td><input type='checkbox' value='" + codigo + "'></td>" +
                    "<td>"+nombre+"</td>" +
                    "<td>"+apellidos+"</td>" +
                    "<td>"+user+"</td>" +
                    "<td>"+pass+"</td>" +
                    "<td>"+email+"</td>" +
                    "<td>"+htmlEdit+htmlDelete+"</td></tr>";
                //añadir el html correspondiente a la página
                $("#tablaUsuarios tbody").append(texto);
                //-->
            }
            $("#tablaUsuarios tfoot td").html("<span class='text-error'>Total usuarios:"+usuarios.length,10+"</span>");
        }else{
            $("#listadoUsuarios").text("No se han encontrado usuarios")
        }
    }
*/


//Creamos el evento que crear el objeto al pulsar submit en el formulario
$("#guardar").on("click", function () {
    //Parsea lo que obtenemos del formulario a JSON mediante serializeObject()
    var ejercicioJSON = JSON.stringify($("#formCrearEjercicio").serializeObject());
    //Guardamos en una constante el objeto resultante de ejecutar el metodo crearEjercicio
    //de la entidad ejercicio que hemos importado.
    const nuevoEjercicio = ejercicio.crearEjercicio(ejercicioJSON);
    nuevoEjercicio
        .then(function () {
            //Oculta el formulario
            $("#myModal").modal("hide");
            //Borra los campos del formulario
            $("#myModal")[0].reset();
        })
        .catch(function (error) {
            console.log(error);
        })
});

//Creamos esta funcion en el jquery de nuestro proyecto para parsear
// a JSON de nombre valor {name:value}
$.fn.serializeObject = function()
{
    var obj = {};
    var array = this.serializeArray();
    $.each(array, function() {
        if (obj[this.name] || obj[this.name] == '') {
            if (!obj[this.name].push) {
                obj[this.name] = [obj[this.name]];
            }
            obj[this.name].push(this.value || '');
        } else {
            obj[this.name] = this.value || '';
        }
    });
    return obj;
};


