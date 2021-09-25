import { AbstractEntity } from "../../../lib/shared/entities/AbstractEntity.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { DocumentType } from "./DocumentType.entity";
import { Rol } from "./Rol.entity";
import { hash } from "bcryptjs"

@Entity("users")
export class User extends AbstractEntity{

    @Column()
    documentNumber:string;

    @Column()
    completeName:string;

    @Column()
    email:string;

    @Column({ type: "varchar"})
    password:string;

    @Column({ type: "varchar", nullable:true})
    image:string;

    @Column({ type: "boolean",default:true})
    status:boolean;

    @Column({ type: "timestamp"})
    bornDate:Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
      if (!this.password) return;
      this.password = await hash(this.password, 10);
    }

    @JoinColumn()
    @OneToOne((_)=>Rol,(rol)=>rol.users,{ nullable:false,onDelete:"CASCADE" })
    rol:Rol;

    @JoinColumn()
    @OneToOne((_)=>DocumentType, (documentType)=>documentType.users,{ nullable:false,onDelete:"CASCADE" })
    documentType:DocumentType;
}