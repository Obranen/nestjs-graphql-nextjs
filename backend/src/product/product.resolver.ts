import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => [Product], { name: 'products' })
  async findAll(): Promise<Product[]> {
    const products = await this.productService.findAll();
    return products.map(p => this.mapProduct(p));
  }

  @Query(() => Product, { name: 'product', nullable: true })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<Product | null> {
    const product = await this.productService.findOne(id);
    return product ? this.mapProduct(product) : null;
  }

  @Query(() => Product, { name: 'productBySlug', nullable: true })
  async findBySlug(@Args('slug') slug: string): Promise<Product | null> {
    const product = await this.productService.findBySlug(slug);
    return product ? this.mapProduct(product) : null;
  }

  @Query(() => [Product], { name: 'productsByCategory' })
  async findByCategory(@Args('category') category: string): Promise<Product[]> {
    const products = await this.productService.findByCategory(category);
    return products.map(p => this.mapProduct(p));
  }

  @Query(() => [Product], { name: 'featuredProducts' })
  async findFeatured(): Promise<Product[]> {
    const products = await this.productService.findFeatured();
    return products.map(p => this.mapProduct(p));
  }

  @Mutation(() => Product)
  async createProduct(@Args('input') input: CreateProductInput): Promise<Product> {
    const product = await this.productService.create(input);
    return this.mapProduct(product);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateProductInput,
  ): Promise<Product> {
    const { id: _, ...updateData } = input;
    const product = await this.productService.update(id, updateData);
    return this.mapProduct(product);
  }

  @Mutation(() => Product)
  async deleteProduct(@Args('id', { type: () => ID }) id: string): Promise<Product> {
    const product = await this.productService.delete(id);
    return this.mapProduct(product);
  }

  private mapProduct(product: any): Product {
    return {
      ...product,
      price: Number(product.price),
    };
  }
}
