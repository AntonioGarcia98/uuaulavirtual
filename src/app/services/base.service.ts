import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class ServiceBase<TClass> {

    url: string;

    protected http: HttpClient;

    constructor(
        protected TCreator: { new(): TClass; }
    ) {}

    get(id: any) {
        return this.http.get(this.url + '/' + id, {
        });
    }

    getAll() {
        return this.http.get(this.url);
    }


    create(item: TClass) {
        return this.http.post(this.url, item);
    }

    delete(id: any) {
        return this.http.delete(this.url + '/' + id);
    }

    update(id: any, item: TClass) {
        return this.http.put(this.url + '/' + id, item);
    }
}