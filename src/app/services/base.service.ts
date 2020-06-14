import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class ServiceBase<TClass> {

    url: string;

    protected http: HttpClient;

    constructor(
        protected TCreator: { new(): TClass; }
    ) {}

    get(id: number) {
        return this.http.get(this.url + '/' + id, {
        });
    }

    getAll() {

        return this.http.get(this.url, {
        }).pipe(
            map((x: any) => {
                console.log(x)
                x.items = x.items.map(i => Object.assign(new this.TCreator(), i));
                return x;
            })
        )
    }


    create(item: TClass) {
        return this.http.post(this.url, item);
    }

    delete(id: number) {
        return this.http.delete(this.url + '/' + id);
    }

    update(id: number, item: TClass) {
        return this.http.put(this.url + '/' + id, item);
    }
}