import { AbstractEntity } from "../../../lib/shared/entities/AbstractEntity.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { DocumentType } from "./DocumentType.entity";
import { Rol } from "./Rol.entity";
import { hash } from "bcryptjs"
import { Porcent } from "../../../api/inflows/entities/Porcent.entity";
import { Inflow } from "src/api/inflows/entities/Intflow.entity";
import { Category } from "src/api/outflows/entities/Category.entity";
import { Outflow } from "src/api/outflows/entities/Outflow.entity";

@Entity("users")
export class User extends AbstractEntity{

    @Column({ unique:true })
    documentNumber:string;

    @Column()
    completeName:string;

    @Column({ unique:true })
    email:string;

    @Column({ type: "varchar", select:false})
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
    @ManyToOne((_)=>Rol,(rol)=>rol.users,{ nullable:false,onDelete:"CASCADE" })
    rol:Rol;

    @JoinColumn()
    @ManyToOne((_)=>DocumentType, (documentType)=>documentType.users,{ nullable:false,onDelete:"CASCADE" })
    documentType:DocumentType;

    @OneToMany((_)=>Porcent, (porcent)=>porcent.users)
    porcent:Porcent;

    @OneToMany((_)=>Inflow, (inflow)=>inflow.user)
    inflows:Inflow;

    @OneToMany((_)=>Outflow, (outflows)=>outflows.user)
    outflows:Outflow[];

    @OneToMany((_)=>Category, (category)=>category.user)
    categories:Category[];
}