export class HeadersFormModel{
    /**
     * @param _title Asigna un nombre o la llave de la que se obtendra la traduccion del titulo de la columna
     * @typedef string
     * @example
     * _title:"Tipo usuario"
     * _title:"pages.admin.usertype"
     */
    _title:string;
    /**
     * @param _columName Indica el nombre de la columna de la cual se obtendran los datos
     * @typedef string
     */
    _columName:string;
    /**
     * @param _filter Indica si quieres que se genere un filtro para esta columna
     * @typedef boolean
     */
    _filter:boolean;
    /**
     * @param _filterValue Indica el valor inicial del filtro de la columna
     * @typedef string
     */
    _filterValue:string;
}