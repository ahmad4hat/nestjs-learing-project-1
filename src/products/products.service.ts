import {
  Injectable,
  NotFoundException,
  BadRequestException
} from "@nestjs/common";
import { ProductModel, Product } from "./product.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async insertProduct(title: string, description: string, price: number) {
    const insertedProduct = new Product();
    insertedProduct.description = description;
    insertedProduct.title = title;
    insertedProduct.price = price;

    try {
      const result = await this.productRepository.save(insertedProduct);

      return result;
    } catch (error) {
      throw new BadRequestException("fields cant be empty");
      //new BadRequestException("can't send empty stuff ");
    }
  }

  async getProducts() {
    try {
      return await this.productRepository.find();
    } catch (error) {
      return new NotFoundException("no products");
    }
  }

  async getSingleProduct(productId: string) {
    try {
      const result = await this.productRepository.findOne({ id: productId });
      if (!result) {
        throw "Not foudn";
      }

      return result;
    } catch (error) {
      throw new NotFoundException("cant find that product");
    }
  }

  async updateProduct(
    id: string,
    title: string,
    description: string,
    price: number
  ) {
    try {
      const result = await this.productRepository.findOne({ id: id });
      if (!result) {
        throw "Not found";
      }

      result.title = title ? title : result.title;
      result.price = price ? price : result.price;
      result.description = description ? description : result.description;

      return await this.productRepository.save(result);
    } catch (error) {
      throw new NotFoundException("cant find that product");
    }
  }

  async deleteProduct(id: string) {
    try {
      const result = await this.productRepository.findOne({ id: id });
      if (!result) {
        throw "Not found";
      }
      await this.productRepository.remove(result);
    } catch (error) {
      throw new NotFoundException("cant find that product");
    }
  }

  // private findProduct(productId: string): [ProductModel, number] {
  //   const productIndex = this.products.findIndex(prod => prod.id === productId);
  //   const product = this.products[productIndex];
  //   if (!product) {
  //     throw new NotFoundException("could not find the product");
  //   }
  //   return [product, productIndex];
  // }
}
