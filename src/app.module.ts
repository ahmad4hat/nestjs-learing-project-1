import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { productsModule } from "./products/products.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./products/product.model";

@Module({
  imports: [
    productsModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "123456",
      database: "nestjstest",
      entities: [Product],
      synchronize: true
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
