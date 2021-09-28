import { AbstractEntity } from "../../../lib/shared/entities/AbstractEntity.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "../../users/entities/User.entity";
import { OutflowType } from "./OutflowType.entity";
import { Outflow } from "./Outflow.entity";

@Entity("categories")
export class Category extends AbstractEntity{

    @Column()
    name:string = "";


    @Column({ type:"boolean",default:true })
    status:boolean;

    @JoinColumn()
    @ManyToOne((_) => User, (user) => user.categories,{ nullable:false })
    user: User;

    @JoinColumn()
    @ManyToOne((_) => OutflowType, (outflowtype) => outflowtype.categories,{ nullable:false })
    outflowtype: OutflowType;

    @OneToMany((_)=>Outflow, (outflow)=>outflow.category)
    outflows:Category[];
}