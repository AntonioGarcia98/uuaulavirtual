import { NgModule } from '@angular/core';

import { ActivityComponent } from './activity.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ResourcesService } from 'src/app/services/resources.service';

@NgModule({
    declarations: [ActivityComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatTableModule
    ],
    exports: [ActivityComponent],
    providers: [
        ResourcesService
    ],
})
export class ActivityModule { }
