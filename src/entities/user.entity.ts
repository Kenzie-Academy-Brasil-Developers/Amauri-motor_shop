import { getRounds, hashSync } from "bcryptjs";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Address from "./address.entity";
import Anouncement from "./anouncements.entity";
import Comment from "./comments.entity";

export enum UserType {
  COMPRADOR = "Comprador",
  ANUNCIANTE = "Anunciante",
}

@Entity("users")
class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 50 })
  nome: string;
  

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 30  })
  cpf:string

  @Column({ length: 30 })
  celular: string;

  @Column({ length: 30 })
  data_de_nascimento: string;

  @Column({ type: "text", nullable: true })
  descricao?: string | null | undefined;

  @Column({ type: "enum", enum: UserType, default: UserType.COMPRADOR })
  tipo_de_conta: UserType;

  @Column({ length: 200 })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const hasRounds: any = getRounds(this.password);
    if (!hasRounds) {
      this.password = hashSync(this.password, 10);
    }
  }
  @OneToOne(() => Address, { onDelete: "CASCADE" })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Anouncement, (an) => an.user)
  anouncements: Array<Anouncement>;

  @OneToMany(() => Comment, (c) => c.user)
  comments: Array<Comment>;
}

export default User;
