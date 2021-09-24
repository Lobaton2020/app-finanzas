import { AbstractEntity } from "../../../lib/shared/entities/AbstractEntity.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { DocumentType } from "./DocumentType.entity";
import { Rol } from "./Rol.entity";

@Entity("users")
export class User extends AbstractEntity{


    @Column()
    numberDocument:string = "";

    @Column()
    born_date:string = "";

    @Column()
    email:string = "";

    @Column()
    completeName:string = "";

    @Column({ type: "varchar"})
    password:string = "";


    @Column({ type: "boolean"})
    status:string = "";

    @Column({ type: "timestamp"})
    bornDate:Date =new Date();


    @JoinColumn()
    @ManyToOne((_)=>Rol,(rol)=>rol.users)
    rol:Rol;

    @JoinColumn()
    @ManyToOne((_)=>DocumentType, (documentType)=>documentType.users)
    documentType:DocumentType;
}