/**
 * Created by Curso on 17/05/2017.
 * Funcionalidad de hacer llamadas a ajax.
 */
export class GenericService{
    constructor(){

    }

    //PROMESA
    ajax(url, method, data, tipo) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                "url": url,
                "data": data,
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType: tipo,
                type: method
            }).done(function (data) {
                console.log(data);
                resolve(data);
            }).fail(function (error, errorMsj) {
                reject(errorMsj);
            });
        });
    }
}
