import { AbstractEntity } from "../../../lib/shared/entities/AbstractEntity.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { DocumentType } from "./DocumentType.entity";
import { Rol } from "./Rol.entity";
import { hash } from "bcryptjs"
import { Deposit } from "../../inflows/entities/Deposit.entity";
import { Inflow } from "../../../api/inflows/entities/Intflow.entity";
import { Category } from "../../../api/outflows/entities/Category.entity";
import { Outflow } from "../../../api/outflows/entities/Outflow.entity";
import { OutflowType } from "../../../api/outflows/entities/OutflowType.entity";
import { InflowType } from "../../../api/inflows/entities/IntflowType.entity";
import { Traceability } from "../../../api/admin/entities/Traceability.entity";

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


    @Column({ type: "varchar", nullable:true, select:false})
    emailVerifyDate:string;

    @Column({ type: "varchar", nullable:true, select:false})
    recoveryPasswordToken:string;


    @Column({ type: "varchar", nullable:true, select:false})
    rememberToken:string;

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

    @OneToMany((_)=>Traceability, (traceabily)=>traceabily.user)
    traceabilities:Traceability[];

    @OneToMany((_)=>Deposit, (deposit)=>deposit.user)
    deposits:Deposit[];

    @OneToMany((_)=>OutflowType, (outflowtype)=>outflowtype.user)
    outflowtypes:OutflowType[];

    @OneToMany((_)=>InflowType, (inflowtype)=>inflowtype.user)
    inflowtypes:InflowType[];

    @OneToMany((_)=>Inflow, (inflow)=>inflow.user)
    inflows:Inflow;

    @OneToMany((_)=>Outflow, (outflows)=>outflows.user)
    outflows:Outflow[];

    @OneToMany((_)=>Category, (category)=>category.user)
    categories:Category[];
}