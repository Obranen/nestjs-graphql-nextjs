import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => String)
  slug: string;

  @Field(() => String)
  sku: string;

  @Field(() => Float)
  price: number;

  @Field(() => String)
  currency: string;

  @Field(() => Int)
  stock: number;

  @Field(() => String, { nullable: true })
  category: string | null;

  @Field(() => [String])
  tags: string[];

  @Field(() => [String])
  images: string[];

  @Field(() => Float, { nullable: true })
  weight: number | null;

  @Field(() => String, { nullable: true })
  dimensions: string | null;

  @Field(() => String)
  status: string;

  @Field()
  isFeatured: boolean;

  @Field(() => Float)
  rating: number;

  @Field(() => Int)
  reviewCount: number;

  @Field(() => String, { nullable: true })
  vendorId: string | null;

  @Field(() => String, { nullable: true })
  vendor?: string | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
