import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Anouncement from "./anouncements.entity";

@Entity("images")
class Image {
  @PrimaryGeneratedColumn("increment")
  id: number;

 
  @Column({length:2000})
  img_url:string

  @ManyToOne(()=>Anouncement, (a)=> a.images)
  anouncement:Anouncement
}

export default Image