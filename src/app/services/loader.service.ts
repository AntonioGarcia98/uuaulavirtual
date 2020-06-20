import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoaderService {

    private loaderState : BehaviorSubject<boolean> = new BehaviorSubject(false);

    _loaderState : Observable<boolean> = this.loaderState.asObservable()

    constructor() { }

    show()
    {
        this.loaderState.next(true)
    }

    hide()
    {
        setTimeout(() => {
            this.loaderState.next(false)    
        }, 100);
        
    }
    
}