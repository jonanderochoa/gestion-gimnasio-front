/**
 * API de ejercicio
 * Created by Curso on 17/05/2017.
 */
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
        return super.ajax(urlEjercicios,"get", null);
    }
    getById(codigo){
        //Devolvemos una promesa para recoger los datos y no perderlos
        return super.ajax(urlEjercicios+"/"+codigo, "get", null);
    }
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









/*
var Ejercicio = function (ejercicioCodigo, actividad, grupomuscular, maquina, descripcion, ejercicioActivo) {
    this.ejercicioCodigo = ejercicioCodigo;
    this.actividad = actividad;
    this.grupomuscular = grupomuscular;
    this.maquina = maquina;
    this.description = descripcion;
    this.ejercicioActivo = ejercicioActivo;
    //Todas las variables de la funcion es self
    var self = this;

    return {
        getById: function () {
            ajax({url:urlEjercicios+"/"+this.codigo, method:"get"})
            .then(function(data){
               return data;
            });
        },
        update: function () {
            ajax({url:urlEjercicios+"/"+this.codigo, method:"put", data:self});
        },
        create: function () {
            ajax({url:urlEjercicios, method:"post", data:self})
                .then(function(data){
                    return(data)
                });
        },
        delete: function () {
            ajax({url:urlEjercicios+"/"+this.codigo, method:"delete"});
        }
    }
};

export function getAll() {
    ajax({"url":urlEjercicios,"method":"get"})
        .then(
            function (data) {
                return data;
            }
        )
        .catch(function (jqXHR, textStatus, errorThrown ) {
            console.log(jqXHR);
            //mostrar mensajes de errores
        });
}

function ajax(opciones) {
    return new Promise(function (resolve, reject) {
        $.ajax(opciones).done(resolve).fail(reject);
    });
}
export {Ejercicio};
*/
