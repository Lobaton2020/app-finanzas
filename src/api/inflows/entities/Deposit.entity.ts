import { Outflow } from "../../../api/outflows/entities/Outflow.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity } from "../../../lib/shared/entities/AbstractEntity.entity";
import { User } from "../../users/entities/User.entity";
import { InflowPorcent } from "./InflowDeposit.entity";

@Entity("deposits")
export class Deposit extends AbstractEntity{
    @Column({ unique:true })
    name:string;

    @Column({ type:"boolean",default:true })
    status:boolean;

    @JoinColumn()
    @ManyToOne(() => User, (user) => user.deposits)
    user: User;

    @OneToMany(()=>InflowPorcent,(inflowporcent)=>inflowporcent.deposit)
    inflowporcents:InflowPorcent[]

    @OneToMany(()=>Outflow,(outflows)=>outflows.deposit)
    outflows:Outflow[]

}