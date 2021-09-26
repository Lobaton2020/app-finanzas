import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "../../../lib/shared/entities/AbstractEntity.entity";
import { User } from "../../users/entities/User.entity";

@Entity("traceabilities")
export class Traceability extends AbstractEntity{

    @Column({ type:"json"})
    agent:any

    @Column({ type:"varchar"})
    clientIp:string;


    @Column({ type:"varchar"})
    requestId:string

    @Column({ type:"varchar"})
    endpoint:string;

    @Column({ type:"varchar"})
    httpMethod:string;


    @JoinColumn()
    @ManyToOne((_) => User, (user) => user.traceabilities,{ nullable:true })
    user: User;

}