import { AbstractEntity } from "../../../lib/shared/entities/AbstractEntity.entity";
import { Column, Entity, OneToMany} from "typeorm";
import { Outflow } from "./Outflow.entity";
import { Category } from "./Category.entity";

@Entity("outflowtypes")
export class OutflowType extends AbstractEntity{

    @Column({ unique:true })
    name:string = "";

    @Column({ type:"boolean",default:true })
    status:boolean;

    @OneToMany(() => Outflow, (outflow) => outflow.outflowtype)
    outflows: Outflow[]

    @OneToMany((_)=>Category, (category)=>category.outflowtype)
    categories:Category[];

}