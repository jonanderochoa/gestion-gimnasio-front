/**
 * API de usuarios
 * Created by Curso on 18/05/2017.
 */
import $ from "jquery";
window.jQuery = window.$ = $;
import * as service from "./genericservice";
const urlEjercicios = "http://localhost:8080/gestiongimnasio/api/usuarios";

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
