import { AbstractEntity } from "../../../lib/shared/entities/AbstractEntity.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Deposit } from "./Deposit.entity";
import { Inflow } from "./Intflow.entity";

@Entity("inflow_deposit")
export class InflowPorcent extends AbstractEntity{

    @Column({ type:"boolean",default:true })
    status:boolean;

    @Column({ type:"bigint"})
    porcentNumber:number;

    @JoinColumn()
    @ManyToOne(() => Deposit, (deposit) => deposit.inflowporcents,{nullable:false})
    deposit: Deposit;

    @JoinColumn()
    @ManyToOne(() => Inflow, (inflow) => inflow.inflowporcents,{nullable:false})
    inflow: Inflow;


}