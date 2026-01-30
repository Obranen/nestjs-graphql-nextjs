import { Query, Resolver } from '@nestjs/graphql'
import { Product } from './product.model'
import { ProductsService } from './products.service'

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product])
  products() {
    return this.productsService.findAll()
  }

  @Query(() => Product)
  product(id: string) {
    return this.productsService.findOne(id)
  }
}
