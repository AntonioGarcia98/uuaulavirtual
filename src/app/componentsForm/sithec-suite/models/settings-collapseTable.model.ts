import { ColumnsCollapseTable } from './column-callapseTable.model'
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ButtonTableMode } from './buttons-table.model';
import { InitFilters } from './init-filters.model';
import { S2SettingsFormGeneratorModel } from './s2-settings-form-generator.model';

export class SettingsCollapseTable{
    /**
     * @param _id identificador unico
     */
    _id:string;
    /**
     * @param _title string que indica el titulo o la llaver del titulo para la traduccion
     * @typedef string
     */
    _title:string;
    /**
     * @param _columns
     */
    _columns:ColumnsCollapseTable[];
    _rows:any[]|Observable<any[]>;
    _settings:SettingsCollapseTable;
    _traslate:any;
    _buttons:ButtonTableMode[];
    _tableClass:string;
    _initFilters:InitFilters[];
    _form:S2SettingsFormGeneratorModel;
}