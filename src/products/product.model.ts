import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
export class ProductModel {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public price: number
  ) {}
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column("decimal")
  price: number;
}
