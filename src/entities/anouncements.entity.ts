import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./user.entity";
import Image from "./images.entity";
import Comment from "./comments.entity";

@Entity("anouncements")
class Anouncement {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 100 })
  marca: string;

  @Column({ length: 100 })
  modelo: string;

  @Column({ length: 200 })
  ano: string;

  @Column({ length: 200 })
  combustivel: string;

  @Column({ length: 200 })
  quilometragem: string;

  @Column({ length: 150 })
  cor: string;

  @Column({ length:50 })
  valor_tabela_fip:  string;

  @Column({ length:50 })
  valor:string;

  @Column({ length: 2000 })
  descricao: string;

  @Column({ length: 200, default:'ativo'  })
  is_active: string;

  @Column({ length: 2000 })
  img_capa: string;

  @ManyToOne(() => User, (u) => u.anouncements)
  user: User;

  @OneToMany(() => Image, (img) => img.anouncement)
  images: Array<Image>;

  @OneToMany(() => Comment, (c) => c.anouncement)
  comments: Array<Comment>;
}

export default Anouncement;
