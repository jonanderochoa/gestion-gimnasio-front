/**
 * API de ejercicio
 * Created by Curso on 17/05/2017.
 */
"use strict";
import $ from "jquery";
window.jQuery = window.$ = $;
import * as service from "./genericservice";
const urlEjercicios = "http://localhost:8080/gestiongimnasio/api/ejercicios";



//Clase publica que extiende de GenericService
export class EjercicioService extends service.GenericService{
    constructor() {
        super();
    }
    getAll(){
        //Devolvemos una promesa para recoger los datos y no perderlos
        return super.ajax(urlEjercicios,"get", null, "text");
    }
    getById(codigo){
        //Devolvemos una promesa para recoger los datos y no perderlos
        return super.ajax(urlEjercicios+"/"+codigo, "get", null, "text");
    }
    delete(codigo){
        return super.ajax(urlEjercicios+"/"+codigo,"delete", null, "text");
    }
    create(ejercicio){
        return super.ajax(urlEjercicios, "post", ejercicio, "json");
    }
}

//
export function renderizarFormulario(codigo = -1){
    let es = new EjercicioService();
    let ejercicio = new Ejercicio();
    let txt ="";
    return new Promise(function(resolve, reject) {
        if(codigo > -1 && codigo != null){
            es.getById(codigo)
                .then(function(ejer){
                    txt = parseForm(JSON.parse(ejer));
                    resolve(txt);
                })
                .catch(function (txt) {
                    console.log(txt);
                    reject("No se han podido acceder a los datos del codigo "+codigo);
                });
        }else{
            txt = parseForm(ejercicio);
            resolve(txt);
        }
    });
    //rellaner datos en el form
}

function parseForm(ejercicio) {
    console.log(ejercicio);
    let txt="";
    txt="<form action='#' id='ejercicioForm' method='post'>";
    txt = "<input type='text' name='nombre'"
        +" id='nombre' value='"+ejercicio.nombre()+"'>"
    txt+="<div class='flexcontainer'><button>Enviar</button><button>Cancelar</button></div></form>";
    return txt;
}

//Crear una funcion para crear el ejercicio, que va a llamar al servicio de ejercicio
export function crearEjercicio(ejercicioJSON){
    let es = new EjercicioService();
    return new Promise(function (resolve, reject) {
        es.create(ejercicioJSON)
            .then(function (data) {
                console.log(data);
                resolve(data);
            })
            .catch(function (error) {
                reject(new Error(error));
            });
    });

}

//GetAll
export function renderizar(){
    //Creamos una variable que contiene un objeto EjercicioService
    let es = new EjercicioService();
    let txt = "";
    return new Promise(function(resolve, reject){
        eS.getAll().then(function (data) {
            let ejercicios = data;
            //Si ...
            if(ejercicios.length > 0){
                txt ="<table data-table='ejercicios' id='tablaEjercicios' class='rwd-table'><thead><tr>"
                    +"<th><input type='checkbox' name='borrartodos' id='borrartodos'/></th>"
                    +"<th>Actividad</th>"
                    +"<th>Grupo Muscular</th>"
                    +"<th>Máquina</th>"
                    +"<th>Descripción</th>"
                    +"<th></th></tr></thead><tbody>";
                for (let i = 0; i < ejercicios.length; i++) {
                    let ejercicio = ejercicios[i];
                    console.log(ejercicio);
                    txt += parseEjercicio(ejercicio);
                }
                txt+="</tbody><tfoot><tr><td colspan='6'>Total Ejercicios: "+ejercicios.length+"</td></tr></tfoot></table>";
            }else{
                txt ="no se encuentran ejercicios en la BBDD";
            }
            resolve(txt)
        }, function(error) {//error
            console.log(error);
            txt ="error en la carga de ejercicios";
            reject(txt);
        });
    });
}

function parseEjercicio(ejercicio) {
    let codigo = ejercicio.codigo;
    let actividad = ejercicio.actividad;
    let grupomuscular = ejercicio.grupomuscular;
    let maquina = ejercicio.maquina;
    let descripcion = ejercicio.description;
    let activo = ejercicio.activo;
    let htmlEdit ="<button>Editar</button>";
    let htmlDelete ="<button>Borrar</button>";

    let texto = "<tr>" +
        "<td><input type='checkbox' value='" + codigo + "'></td>" +
        "<td>"+actividad+"</td>" +
        "<td>"+grupomuscular+"</td>" +
        "<td>"+maquina+"</td>" +
        "<td>"+descripcion+"</td>" +
        "<td>"+activo+"</td>" +
        "<td>"+htmlEdit+htmlDelete+"</td>" +
        "</tr>";

    return texto;
}

export class Ejercicio{
    constructor(){
        this._codigo = -1;
        this._actividad = "";
        this._grupomuscular = "";
        this._maquina = "";
        this._descripcion = "";
        this._activo = true;
    }

    get codigo(){
        return this._codigo;
    }
    get actividad(){
        return this._actividad;
    }
    get grupomuscular(){
        return this._grupomuscular;
    }
    get maquina(){
        return this._maquina;
    }
    get descripcion(){
        return this._descripcion;
    }
    get activo(){
        return this._activo;
    }
    set codigo(code){
        this._codigo = code;
    }
    set actividad(activity){
        this._actividad = activity;
    }
    set grupomuscular(musculargroup){
        this._grupomuscular = musculargroup;
    }
    set maquina(machine){
        this._maquina = machine;
    }
    set descripcion(description){
        this._descripcion = description;
    }
    set activo(active){
        this._activo = active;
    }

}

