import { Observable } from 'rxjs';
import { S2BootstrapColumnsModel } from './s2-bootstrap-columns.model';

export class S2SelectFormModel{
    /**
     * @param _label Asigna un nombre o la llave de la que se obtendra la traduccion del label del campo
     * @typedef string
     * @example
     * _title:"Tipo usuario"
     * _title:"pages.admin.usertype"
     */
    _label:string;
    /**
     * @param _valueKey nombre del campo en los objetos de las opciones del cual se tomara el valor value del option del select
     * @typedef string
     */
    _valueKey:string;
    /**
     * @param _optionKey nombre del campo en los objetos de las opciones del cual se tomara el valor opcion del option del select
     * @typedef string
     */
    _optionKey:string;
    /**
     * @param _options array con las opciones que se mostraran en el select
     * @typedef any[]|Observable<any[]>
     */
    _options:any[]|Observable<any[]>;
    /**
     * @param _columns Configuracion de las columnas del boton
     * @typedef S2BootstrapColumnsModel
     */
    _columns:S2BootstrapColumnsModel;
}