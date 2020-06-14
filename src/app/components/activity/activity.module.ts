import { NgModule } from '@angular/core';

import { ActivityComponent } from './activity.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [ActivityComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
    ],
    exports: [ActivityComponent],
    providers: [],
})
export class EmailConfigModule { }
