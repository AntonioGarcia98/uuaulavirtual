export class User{
    user_name : string = "";

    name : string = "";
    last_name : string ="";
    password : string = "";
    birthdate : string = "";

    contact : {
        email : string;
    } = { 
            email : ""
        }
}

export class Student extends User{
    student : {
        scholarship : string;
        grade : number;
        school : string;
    } =  {
            scholarship : "",
            grade : 0,
            school : ""
        }
}

export class Teacher extends User{
    teacher : {
        title : string;
        professional_number : string;
        role : string;
    } = {
            title : "",
            professional_number : "",
            role : ""
        }
}

/* {
    "user_name" : "juanito",

    "name" : "juanito",
    "last_name" : "banana",
    "password" : "1234",
    "birthdate" : "10/06/2020",

    "contact" : {
        "email" : "juanito@hotmail.com"
    }
} */