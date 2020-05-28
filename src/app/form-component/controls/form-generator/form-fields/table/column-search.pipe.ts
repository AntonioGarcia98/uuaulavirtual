import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ColumnSearchPipe', pure: false })
export class ColumnSearchPipe implements PipeTransform {
    transform(value, args?): Array<any> {

        //let searchText = new RegExp(args, 'ig');
        if (value && value.length > 0) {
            return value.filter(table_Data => {
                let bln_return: boolean = true;
                if (!args) {
                    return true;
                }

                args.forEach(header => {

                    if (header._filter) {
                        let input: string = (header._filterValue)?(header._filterValue):'';
                        input = input.toUpperCase();
                        input = input.split("Á").join("A");
                        input = input.split("É").join("E");
                        input = input.split("Í").join("I");
                        input = input.split("Ó").join("O");
                        input = input.split("Ú").join("U");

                        let value: string = (table_Data[header._columName])?(table_Data[header._columName]):'';
                        value = value.toUpperCase();
                        value = value.split("Á").join("A");
                        value = value.split("É").join("E");
                        value = value.split("Í").join("I");
                        value = value.split("Ó").join("O");
                        value = value.split("Ú").join("U");
                        
                        if(input != ''){
                            if(value.indexOf(input)==-1){
                                bln_return = false;
                            }
                        }
                    }
                });

                return bln_return;

            });
        }
        return value;
    }

}