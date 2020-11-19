import { Observable } from 'rxjs';
import { S2BootstrapColumnsModel } from './s2-bootstrap-columns.model';
import { HeadersFormModel } from './s2-headers-form.model';
import { S2IconButtonModel } from './s2-icon-button.model';

export class S2TableFormModel{
    /**
     * @param _enableFilters Activar filtros de las columnas de la tablaq
     * @typedef boolean
     */
    _enableFilters:boolean;
    /**
     * @param _label nombre del campo en los objetos de las opciones del cual se tomara el valor value del option del select
     * @typedef string
     */
    _label:string;
    /**
     * @param _checkbox Activar controles de seleccion de checkbox en la tabla
     * @typedef boolean
     */
    _checkbox:boolean;
    /**
     * @param _checkboxHeader Activar checkbox en header para seleccionar toda la tabla
     * @description requiere activar _checkbox
     * @typedef boolean
     */
    _checkboxHeader:boolean;
    /**
     * @param _collapse Activar controles para colapsar la tabla
     * @typedef boolean
     */
    _collapse:boolean;
    /**
     * @param _primaryKey Indicar cual es la llave primaria de los objecto en el array de _options
     * @typedef boolean
     */
    _primaryKey:string;
    /**
     * @param _limit Define un limite de selecciones para la tabla
     * @description requiere activar _checkbox
     * @typedef number
     */
    _limit:number;
    /**
     * @param _tableHeaders Configuracion de las columnas de la tabla
     * @typedef HeadersFormModel[]
     */
    _tableHeaders:HeadersFormModel[];
    /**
     * @param _optionKey nombre del campo en los objetos de las opciones del cual se tomara el valor a mostrar en la casilla de la tabla
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
    /**
     * @param _columns Configuracion de las array de iconos en la tabla
     * @typedef IconButtonModel
     */
    _iconsButtons:S2IconButtonModel[];
}


