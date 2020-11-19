import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseTableComponent } from './sithec-tools-suite.component';
import { TableComponent } from './controls/collapse-table/collapse-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColumnTextSearchPipe } from './filters/filter-column-text.pipe';
import { QuizGeneratorComponent } from './controls/quiz-generator/quiz-generator.component';
import { OpenQuestionComponent } from './controls/quiz-generator/question/open-question/open-question.component';
import { OptionsQuestionComponent } from './controls/quiz-generator/question/options-question/options-question.component';
import { HeaderQuestionComponent } from './controls/quiz-generator/question/header-question/header-question.component';
import { OptionsMultipleQuestionComponent } from './controls/quiz-generator/question/options-multiple-question/options-multiple-question.component';
import { QueryQuestionComponent } from './controls/quiz-generator/question/query-question/query-question.component';
import {HttpClientModule} from '@angular/common/http';
import { DndModule } from 'ngx-drag-drop';
import { SelectQuestionComponent } from './controls/quiz-generator/question/select-question/select-question.component';
import { RankQuestionComponent } from './controls/quiz-generator/question/rank-question/rank-question.component';
import { RaitingQuestionComponent } from './controls/quiz-generator/question/raiting-question/raiting-question.component';
import { InputComponent } from './controls/form-generator/form-fields/input/input.component';
import { FormGeneratorComponent } from './controls/form-generator/form-generator.component';
import { GroupComponent } from './controls/form-generator/form-fields/group/group.component';
import { SelectComponent } from './controls/form-generator/form-fields/select/select.component';
import { TableFormComponent } from './controls/form-generator/form-fields/table/table.component';
import { ButtonFormComponent } from './controls/form-generator/form-fields/button-form/button-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColumnSearchPipe } from './controls/form-generator/form-fields/table/column-search.pipe';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
@NgModule({
  declarations: [
    ColumnSearchPipe,
    CollapseTableComponent,
    TableComponent,
    ColumnTextSearchPipe,
    QuizGeneratorComponent,
    OpenQuestionComponent,
    OptionsQuestionComponent,
    HeaderQuestionComponent,
    OptionsMultipleQuestionComponent,
    QueryQuestionComponent,
    SelectQuestionComponent,
    RankQuestionComponent,
    RaitingQuestionComponent,
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
    DndModule,
    NgxPaginationModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule
  ],
  exports: [
    CollapseTableComponent,
    QuizGeneratorComponent
  ]
})
export class SithecSuiteModule { }
