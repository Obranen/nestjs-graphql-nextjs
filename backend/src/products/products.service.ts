import { Injectable } from '@nestjs/common'
import { Product } from './product.model'

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      price: 100,
    },
    {
      id: '2',
      name: 'Product 2',
      price: 200,
    },
    {
      id: '3',
      name: 'Product 3',
      price: 300,
    },
  ]

  findAll() {
    return this.products
  }

  findOne(id: string) {
    return this.products.find((product) => product.id === id)
  }
}
