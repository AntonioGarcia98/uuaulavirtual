import { S2BootstrapColumnsModel } from './s2-bootstrap-columns.model';

export class S2ButtonFormModel{
    /**
     * @param _text texto o llave de traduccion del texto que se mostrara en el boton
     * @example 
     * _text:"Guardar" 
     * _text:"pages.button.text"
     * @typedef string
     */
    _text:string;
    /**
     * @param _class Clases que se le asignaran al boton
     * @example _class:"btn btn-primary"
     * @typedef string
     */
    _class:string;

    /**
     * @param _columns Configuracion de las columnas del boton
     * @typedef S2BootstrapColumnsModel
     */
    _columns:S2BootstrapColumnsModel;
}