import { S2FormGroupItemModel } from './s2-form-group-item.model';

export class S2FormGroupModel{
    /**
     * @param _title Asigna un nombre o la llave de la que se obtendra la traduccion del titulo del grupo
     * @typedef string
     * @example
     * _title:"Direccion"
     * _title:"pages.addres.title"
     */
    _title:string;
    /**
     * @param _nameAs Asigna un nombre al campo donde el formulario regresara el valor de este control
     * @typedef string
     */
    _nameAs:string;
    /**
     * @param _items Indica los items que seran parte de este grupo
     * @typedef S2FormGroupItemModel[]
     */
    _items:S2FormGroupItemModel[];
}