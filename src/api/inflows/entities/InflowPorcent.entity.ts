import { AbstractEntity } from "../../../lib/shared/entities/AbstractEntity.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Porcent } from "./Porcent.entity";
import { Inflow } from "./Intflow.entity";

@Entity("inflow_porcent")
export class InflowPorcent extends AbstractEntity{

    @Column({ type:"boolean",default:true })
    status:boolean;

    @JoinColumn()
    @ManyToOne(() => Porcent, (porcent) => porcent.inflowporcents,{nullable:true})
    porcent: Porcent;

    @JoinColumn()
    @ManyToOne(() => Inflow, (inflow) => inflow.inflowporcents,{nullable:false})
    inflow: Inflow;

    @Column({ type:"bigint"})
    porcentNumber:number;

}