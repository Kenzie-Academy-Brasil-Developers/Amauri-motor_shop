import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length:150 })
  rua: string;

  @Column({ type:"integer" })
  cep: number;

  @Column({ type: "varchar", length: 7, nullable: true })
  numero?: string | null | undefined;

  @Column({ length: 150 })
  cidade: string;

  @Column({ length: 2 })
  estado: string;

  @Column({ type: "varchar", length: 30, nullable: true })
  complemento?: string | null | undefined;


}

export default Address;