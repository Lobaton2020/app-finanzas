import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id:number = 0;

    @Column()
    name:string = "";

    @Column()
    lastname:string = "";

    @Column()
    age:number = 2;

}