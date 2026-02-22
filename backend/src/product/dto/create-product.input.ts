import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  slug: string;

  @Field()
  sku: string;

  @Field(() => Float)
  price: number;

  @Field({ nullable: true })
  currency?: string;

  @Field({ nullable: true })
  stock?: number;

  @Field({ nullable: true })
  category?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field(() => [String], { nullable: true })
  images?: string[];

  @Field(() => Float, { nullable: true })
  weight?: number;

  @Field({ nullable: true })
  dimensions?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  isFeatured?: boolean;

  @Field(() => Float, { nullable: true })
  rating?: number;

  @Field({ nullable: true })
  reviewCount?: number;

  @Field({ nullable: true })
  vendorId?: string;
}
