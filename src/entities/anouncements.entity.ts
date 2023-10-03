import { Column, Entity,  JoinColumn,  ManyToOne,  OneToMany,  PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";
import Image from "./images.entity";
import Comment from "./comments.entity";

@Entity("anouncements")
class Anouncement {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length:100 })
  marca: string;

  @Column({ length:100 })
  modelo: string;

  @Column({ type:"integer" })
  ano: number;
  
  @Column({ length:200 })
  combustivel: string;

  @Column({ type:"integer" })
  quilometragem: number;

  @Column({ length:150})
  cor: string;

  @Column({ type:"decimal",
   precision:6,
    scale: 2})
  valor_tabela_fip: number|string;

  @Column({ type:"decimal",
  precision:6,
   scale: 2})
 valor: number|string;

 @Column({ length:2000})
 descricao: string;

 @Column({length:2000})
 img_capa:string



 @ManyToOne(() => User, (u) => u.anouncements)
 user: User;

 @OneToMany(() => Image, (img) => img.anouncement,{onDelete:'CASCADE'})
images:Array<Image>

@OneToMany(()=>Comment,(c)=> c.anouncement)
comments:Array<Comment>
}

export default Anouncement
