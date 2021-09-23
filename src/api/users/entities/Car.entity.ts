import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("cars")
export class User{
    @PrimaryGeneratedColumn()
    id:number = 0;

    @Column()
    name:string = "";

    @Column()
    color:string = "";

    @Column()
    model:number = 2000;

}