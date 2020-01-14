import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete
} from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  addProduct(
    @Body("title") prodtitle: string,
    @Body("description") prodDescription: string,
    @Body("price") prodPrice: number
  ): any {
    const genareatedId = this.productService.insertProduct(
      prodtitle,
      prodDescription,
      prodPrice
    );
    return { id: genareatedId };
  }

  @Get()
  getAllProducts() {
    return this.productService.getProducts();
  }

  @Get(":id")
  getproduct(@Param("id") prodId: string) {
    return this.productService.getSingleProduct(prodId);
  }

  @Patch(":id")
  updateProduct(
    @Param("id") prodId,
    @Body("title") prodtitle: string,
    @Body("description") prodDescription: string,
    @Body("price") prodPrice: number
  ) {
    return this.productService.updateProduct(
      prodId,
      prodtitle,
      prodDescription,
      prodPrice
    );
  }

  @Delete(":id")
  deleteProduct(@Param("id") prodId) {
    return this.productService.deleteProduct(prodId);
  }
}
