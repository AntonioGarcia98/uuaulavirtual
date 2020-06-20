import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-loader',
    templateUrl: 'loader.component.html',
    styleUrls: ['./loader.component.scss']
})

export class LoaderComponent implements OnInit {
    loaderState : Observable<boolean>
    
    constructor(
        private loaderService : LoaderService
    ) { 
        this.loaderState = this.loaderService._loaderState;
    }

    ngOnInit() { }
}