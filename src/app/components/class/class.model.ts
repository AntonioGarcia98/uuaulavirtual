import { User } from 'src/app/models/user.model'

export class ClassModel{
    name:string
    group:string
    students: User[]//array de estudiantes
    
    teachers:  User[]//array de profesores
    user:string
}