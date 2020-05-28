import { Observable } from 'rxjs';

export class ColumnsCollapseTable{
    /**
     * @param _columnTitle string del titulo o la llave de traduccion 
     * @typedef string
     */
    _columnTitle:string;
    /**
     * @param _columnName string que indica el nombre del campo a mostrar en el array de _options
     * @typedef string
     */
    _columnName:string;
    /**
     * @param _type tipo de casilla en la tabla
     * @typedef string
     * @description valores validos ['static','text','number','select']
     */
    _type:string;
    /**
     * @param _readOnly solo mostrar la informacion y no editar
     * @typedef boolean
     */
    _readOnly:boolean;

    _filter:boolean;

    _filterPlaceholder:string;

    _key:string;
    _value:string;
    _options:any[]|Observable<any[]>;
}