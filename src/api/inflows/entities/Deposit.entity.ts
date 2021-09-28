import { Outflow } from "../../../api/outflows/entities/Outflow.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity } from "../../../lib/shared/entities/AbstractEntity.entity";
import { User } from "../../users/entities/User.entity";
import { InflowDeposit } from "./InflowDeposit.entity";

@Entity("deposits")
export class Deposit extends AbstractEntity{
    @Column()
    name:string;

    @Column({ type:"boolean",default:true })
    status:boolean;

    @JoinColumn()
    @ManyToOne(() => User, (user) => user.deposits)
    user: User;

    @OneToMany(()=>InflowDeposit,(inflowdeposit)=>inflowdeposit.deposit)
    inflowdeposits:InflowDeposit[]

    @OneToMany(()=>Outflow,(outflows)=>outflows.deposit)
    outflows:Outflow[]

}