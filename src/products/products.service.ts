import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductModel } from "./product.model";

@Injectable()
export class ProductsService {
  products: ProductModel[] = [];

  insertProduct(title: string, description: string, price: number) {
    const product = new ProductModel(
      Math.random().toString(),
      title,
      description,
      price
    );
    this.products.push(product);
    return product.id;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  updateProduct(id: string, title: string, description: string, price: number) {
    const [product, productIndex] = this.findProduct(id);
    this.products[productIndex] = {
      ...product,
      title: title ? title : product.title,
      description: description ? description : product.description,
      price: price ? price : product.price
    };
  }

  deleteProduct(id: string) {
    const [_, productIndex] = this.findProduct(id);
    this.products.splice(productIndex, 1);
    return null;
  }

  private findProduct(productId: string): [ProductModel, number] {
    const productIndex = this.products.findIndex(prod => prod.id === productId);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException("could not find the product");
    }
    return [product, productIndex];
  }
}
