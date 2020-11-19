import { S2BootstrapColumnsModel } from './s2-bootstrap-columns.model';

export class S2InputForm{
    /**
     * @param _label Asigna un nombre o la llave de la que se obtendra la traduccion del label del campo
     * @typedef string
     * @example
     * _title:"Tipo usuario"
     * _title:"pages.admin.usertype"
     */
    _label:string;
    /**
     * @param _placeholder Asigna un nombre o la llave de la que se obtendra la traduccion del placeholder del campo
     * @typedef string
     * @example
     * _title:"Tipo usuario"
     * _title:"pages.admin.usertype"
     */
    _placeholder:string;
    /**
     * @param _columns Configuracion de las columnas del boton
     * @typedef S2BootstrapColumnsModel
     */
    _columns:S2BootstrapColumnsModel;
}