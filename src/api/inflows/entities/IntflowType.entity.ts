import { AbstractEntity } from "../../../lib/shared/entities/AbstractEntity.entity";
import { Column, Entity, OneToMany} from "typeorm";
import { Inflow } from "./Intflow.entity";

@Entity("inflowtypes")
export class InflowType extends AbstractEntity{

    @Column({ unique:true })
    name:string = "";

    @Column({ type:"boolean",default:true })
    status:boolean;

    @OneToMany(() => Inflow, (inflow) => inflow.inflowtype)
    inflows: Inflow[]


}