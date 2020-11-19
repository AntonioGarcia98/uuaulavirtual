import { S2FormField } from './s2-form-field.model';

export class S2FormGroupItemModel{
    /**
     * @param _control Identifica el campo del formulario reactivo con el que estara ligado el item
     * @typedef string
     */
    _control:string;
    /**
     * @param _renameAs Asigna un nombre al campo donde el formulario regresara el valor de este control
     * @typedef string
     */
    _renameAs:string;
    /**
     * @param _config Especifica la configuracion del campo para definir su comportamiento
     * @typedef S2FormField
     */
    _config:S2FormField;
}