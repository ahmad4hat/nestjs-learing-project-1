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
  async addProduct(
    @Body("title") prodtitle: string,
    @Body("description") prodDescription: string,
    @Body("price") prodPrice: number
  ) {
    try {
      const createdProduct = await this.productService.insertProduct(
        prodtitle,
        prodDescription,
        prodPrice
      );
      return createdProduct;
    } catch (err) {
      throw err;
    }
  }

  @Get()
  async getAllProducts() {
    try {
      return this.productService.getProducts();
    } catch (error) {
      throw error;
    }
  }

  @Get(":id")
  async getproduct(@Param("id") prodId: string) {
    try {
      return this.productService.getSingleProduct(prodId);
    } catch (error) {
      throw error;
    }
  }

  @Patch(":id")
  async updateProduct(
    @Param("id") prodId,
    @Body("title") prodtitle: string,
    @Body("description") prodDescription: string,
    @Body("price") prodPrice: number
  ) {
    try {
      return await this.productService.updateProduct(
        prodId,
        prodtitle,
        prodDescription,
        prodPrice
      );
    } catch (error) {
      throw error;
    }
  }

  @Delete(":id")
  async deleteProduct(@Param("id") prodId) {
    try {
      return await this.productService.deleteProduct(prodId);
    } catch (error) {
      throw error;
    }
  }
}
