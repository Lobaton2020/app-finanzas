import { AbstractEntity } from "../../../lib/shared/entities/AbstractEntity.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import { Inflow } from "./Intflow.entity";
import { User } from "../../../api/users/entities/User.entity";

@Entity("inflowtypes")
export class InflowType extends AbstractEntity{

    @Column({ unique:true })
    name:string = "";

    @Column({ type:"boolean",default:true })
    status:boolean;

    @OneToMany(() => Inflow, (inflow) => inflow.inflowtype)
    inflows: Inflow[]

    @JoinColumn()
    @ManyToOne((_)=>User, (user)=>user.inflowtypes, { nullable:true})
    user:User;
}