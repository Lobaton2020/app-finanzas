import { AbstractEntity } from "../../../lib/shared/entities/AbstractEntity.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { OutflowType } from "./OutflowType.entity";
import { Category } from "./Category.entity";
import { User } from "src/api/users/entities/User.entity";

@Entity("outflows")
export class Outflow extends AbstractEntity{

    @Column({ type: "float"})
    amount:string;

    @Column({ type: "mediumtext"})
    description:string;

    @Column({ type: "timestamp"})
    setDate:Date;

    @Column({ type:"boolean",default:true })
    status:boolean;

    @JoinColumn()
    @ManyToOne((_) => Category, (category) => category.outflows, { nullable:false})
    category: OutflowType;

    @JoinColumn()
    @ManyToOne((_) => User, (user) => user.outflows, { nullable:false})
    user: User;

    @JoinColumn()
    @ManyToOne((_) => OutflowType, (outflowtype) => outflowtype.outflows, { nullable:false})
    outflowtype: OutflowType;


}