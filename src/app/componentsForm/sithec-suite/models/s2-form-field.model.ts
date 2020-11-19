import { S2InputForm } from './s2-input-form.model';
import { S2FormGroupModel } from './s2-form-group.model';
import { S2SelectFormModel } from './s2-select-form.model';
import { S2TableFormModel } from './s2-table-form.model';
import { S2ButtonFormModel } from './s2-button-form.model';

export class S2FormField{
    /**
     * @param _id Identificador unico del campo
     * @typedef string
     * @example _id:"select-categories"
     */
    _id:string;
    /**
     * @param _type Indica el tipo de campo a utilizar
     * @typedef string
     * @description Valores validos ['text','password','date','number','select','table','button','group','time']
     */
    _type:string;
    /**
     * @param _hide Esconder el campo
     * @typedef boolean
     */
    _hide:boolean;
    /**
     * @param _input Indica la configuracion de los campos input del formulario
     * @typedef S2InputForm
     * @description Valido para los tipos ['text','password','date','number']
     */
    _input:S2InputForm;
    /**
     * @param _select Indica la configuracion del campo select del formulario
     * @typedef S2SelectFormModel
     * @description Valido para el tipo 'select'
     */
    _select:S2SelectFormModel;
    /**
     * @param _group Indica la configuracion del campo group del formulario
     * @typedef S2FormGroupModel
     * @description Valido para el tipo 'group'
     */
    _group:S2FormGroupModel;
    /**
     * @param _table Indica la configuracion del campo table del formulario
     * @typedef S2TableFormModel
     * @description Valido para el tipo 'table'
     */
    _table:S2TableFormModel;
    /**
     * @param _table Indica la configuracion del campo button del formulario
     * @typedef S2ButtonFormModel
     * @description Valido para el tipo 'button'
     */
    _button:S2ButtonFormModel;

    _min: string

   
}