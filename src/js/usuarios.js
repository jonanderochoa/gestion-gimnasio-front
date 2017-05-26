/**
 * API de usuarios
 * Created by Curso on 18/05/2017.
 */
"use strict";
import $ from "jquery";
window.jQuery = window.$ = $;
import * as service from "./genericservice";
const urlUsuarios = "http://localhost:8080/gestiongimnasio/api/usuarios";

//Clase publica que extiende de GenericService
export class UsuarioService extends service.GenericService{
    constructor() {
        super();
    }
    getAll(){
        //Devolvemos una promesa para recoger los datos y no perderlos
        return super.ajax(urlUsuarios,"get", null);
    }
    getById(codigo){
        //Devolvemos una promesa para recoger los datos y no perderlos
        return super.ajax(urlUsuarios+"/"+codigo, "get", null);
    }
}






//GetById para Crear / Modificar un usuario
export  function rederizarFormulario(codigo = -1){
    let us = new UsuarioService();
    let usuario = new Usuario();
    let txt ="";
    return new Promise(function(resolve, reject) {
        if(codigo > -1){
            us.getById(codigo)
                .then(function(usu){
                    txt = parseForm(usu);
                    resolve(txt);
                })
                .catch(function () {
                    reject("No se han podido acceder a los datos del codigo "+codigo);
                });
        }else{
            txt = parseForm(usuario);
            resolve(txt);
        }
    });
    //rellaner datos en el form
}

function parseForm(usuario) {
    let txt="";
    txt="<form action='#' id='usuarioForm' method='post'>";
    txt = "<input type='text' name='nombre'"
        +" id='nombre' value='"+usuario.nombre()+"'>"
    txt+="</form>";
    return txt;
}

//GetAll
export function renderizar() {
    //Creamos una variable que contiene un objeto UsuarioService
    let us = new UsuarioService();
    //Creamos un usuario vacio
    let usuario = new Usuario();
    let txt = "";
    return new Promise(function (resolve, reject) {
        //Si el codigo existe...
        if (codigo > -1) {
            //Carga el usuario del codigo determinado
            us.getById(codigo)
            //El then se ejecuta cuando no hay errores de ejecucion
                .then(function (usu) {
                    txt = parseForm(usu);
                    //Devuelve los datos de la promesa
                    resolve(txt);
                })
                .catch(function () {
                    reject("No se ha podido acceder a los datos del codigo: " + code);
                });
        } else {
            txt = parseForm(usuario);
            resolve(txt);
        }
    });

}




function parseUsuario(usuario) {
    let codigo = usuario.codigo;
    let nombre = usuario.nombre;
    let apellidos = usuario.apellidos;
    let user = usuario.user;
    let pass = usuario.pass;
    let email = usuario.email;
    let activo = usuario.activo;
    let htmlEdit ="<button>Editar</button>";
    let htmlDelete ="<button>Borrar</button>";

    let texto = "<tr>" +
        "<td><input type='checkbox' value='" + codigo + "'></td>" +
        "<td>"+nombre+"</td>" +
        "<td>"+apellidos+"</td>" +
        "<td>"+user+"</td>" +
        "<td>"+pass+"</td>" +
        "<td>"+email+"</td>" +
        "<td>"+activo+"</td>" +
        "<td>"+htmlEdit+htmlDelete+"</td>" +
        "</tr>";

    return texto;
}

export class Usuario{
    constructor(){
        this._codigo = -1;
        this._nombre = "";
        this._apellidos = "";
        this._user = "";
        this._pass = "";
        this._email = "";
        this._activo = true;
    }

    get codigo(){
        return this._codigo;
    }
    get nombre(){
        return this._nombre;
    }
    get apellidos(){
        return this._apellidos;
    }
    get user(){
        return this._user;
    }
    get pass(){
        return this._pass;
    }
    get email(){
        return this._email;
    }
    get activo(){
        return this._activo;
    }
    set codigo(code){
        this._codigo = code;
    }
    set nombre(name){
        this._nombre = name;
    }
    set apellidos(lastname){
        this._apellidos = lastname;
    }
    set user(user){
        this._user = user;
    }
    set pass(pass){
        this._pass = pass;
    }
    set email(email){
        this._email = email;
    }
    set activo(active){
        this._activo = activo;
    }
}
