import { AbstractEntity } from "../../../lib/shared/entities/AbstractEntity.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "../../users/entities/User.entity";
import { InflowType } from "./IntflowType.entity";
import { InflowPorcent } from "./InflowDeposit.entity";

@Entity("inflows")
export class Inflow extends AbstractEntity{

    @Column({ type: "float"})
    total:number;

    @Column({ type: "mediumtext", nullable:true})
    description:string;

    @Column({ type: "timestamp"})
    setDate:Date;

    @Column({ type:"boolean",default:true })
    status:boolean;

    @JoinColumn()
    @ManyToOne((_) => User, (user) => user.inflows,{ nullable:false })
    user: User;

    @JoinColumn()
    @ManyToOne((_) => InflowType, (inflowtype) => inflowtype.inflows, { nullable:false})
    inflowtype: InflowType;

    //no keys in table
    @OneToMany(()=>InflowPorcent,(inflowporcent)=>inflowporcent.inflow)
    inflowporcents:InflowPorcent[]
}