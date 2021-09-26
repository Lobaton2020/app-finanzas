import { AbstractEntity } from "../../../lib/shared/entities/AbstractEntity.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "../../../api/users/entities/User.entity";
import { InflowPorcent } from "./InflowPorcent.entity";

@Entity("procents")
export class Porcent extends AbstractEntity{
    @Column({ unique:true })
    name:string;

    @Column({ type:"boolean",default:true })
    status:boolean;

    @JoinColumn()
    @ManyToOne(() => User, (users) => users.porcent)
    users: User[];

    @OneToMany(()=>InflowPorcent,(inflowporcent)=>inflowporcent.porcent)
    inflowporcents:InflowPorcent[]
}