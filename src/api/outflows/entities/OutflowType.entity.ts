import { Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import { AbstractEntity } from "../../../lib/shared/entities/AbstractEntity.entity";

import { Outflow } from "./Outflow.entity";
import { Category } from "./Category.entity";
import { User } from "../../../api/users/entities/User.entity";

@Entity("outflowtypes")
export class OutflowType extends AbstractEntity{

    @Column()
    name:string = "";

    @Column({ type:"boolean",default:true })
    status:boolean;

    @OneToMany(() => Outflow, (outflow) => outflow.outflowtype)
    outflows: Outflow[]

    @OneToMany((_)=>Category, (category)=>category.outflowtype)
    categories:Category[];

    @JoinColumn()
    @ManyToOne((_)=>User, (user)=>user.outflowtypes, { nullable:true})
    user:User;

}