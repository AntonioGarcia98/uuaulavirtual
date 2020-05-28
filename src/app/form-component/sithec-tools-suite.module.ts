import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseTableComponent } from './sithec-tools-suite.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColumnTextSearchPipe } from './filters/filter-column-text.pipe';


import {HttpClientModule} from '@angular/common/http';
import { InputComponent } from './controls/form-generator/form-fields/input/input.component';
import { FormGeneratorComponent } from './controls/form-generator/form-generator.component';
import { GroupComponent } from './controls/form-generator/form-fields/group/group.component';
import { SelectComponent } from './controls/form-generator/form-fields/select/select.component';
import { TableFormComponent } from './controls/form-generator/form-fields/table/table.component';
import { ButtonFormComponent } from './controls/form-generator/form-fields/button-form/button-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColumnSearchPipe } from './controls/form-generator/form-fields/table/column-search.pipe';


@NgModule({
  declarations: [
    ColumnSearchPipe,
    CollapseTableComponent,
    ColumnTextSearchPipe,
    InputComponent,
    FormGeneratorComponent,
    GroupComponent,
    SelectComponent,
    TableFormComponent,
    ButtonFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule
  ],
  exports: [
    CollapseTableComponent,
  ]
})
export class SithecSuiteModule { }
