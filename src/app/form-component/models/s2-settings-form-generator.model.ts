import { FormGroup } from '@angular/forms';
import { S2FormGroupModel } from './s2-form-group.model';
import { S2ButtonModel } from './s2-button.model';

export class S2SettingsFormGeneratorModel{
    /**
     * @param _id identificador unico del formulario
     * @typedef string
     * @description 
     * _id: "form-id"
     */
    _id:string;
    /**
     * @param _translate
     * @typedef TranslateService
     * @package @ngx-translate/core
     * @description Es necesaria configuracion inicial https://www.npmjs.com/package/@ngx-translate/core
     */
    _translate:any;
    /**
     * @param _formGroup formulario a mostrar en el componente
     * @typedef FormGroup
     */
    _formGroup:FormGroup;
    /**
     * @param _groups configuracion de los controles de _formGroup
     * @typedef S2FormGroupModel[]
     */
    _groups:S2FormGroupModel[];
    /**
     * @param _saveButton configuracion del boton del formulario
     * @typedef S2ButtonModel
     */
    _saveButton:S2ButtonModel;   
}